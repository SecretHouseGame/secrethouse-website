import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import SwiperCore, { Keyboard, Mousewheel, Navigation, SwiperOptions } from 'swiper';
import { Buzz } from '../../../interfaces/buzz';
import { Player } from '../../../interfaces/player';
import { HttpService } from "../../../services/http.service";
import { StoreService } from "../../../store/store.service";
import { GameBuzzService } from './game-buzz.service';

SwiperCore.use([
	Navigation,
	Keyboard,
	Mousewheel
])

@Component({
	selector: 'app-game-buzz',
	templateUrl: './game-buzz.component.html',
	styleUrls: ['./game-buzz.component.scss']
})

export class GameBuzzComponent implements OnInit {
	@ViewChild('swiper') swiper: any; // Swiper des habitants
	contentLoaded: boolean = false; // Etat de chargement des datas
	playersList: Array<Player> = []; // Liste des habitants (utilisée pour le swiper)

	// Permet de changer d'écran
	step: number = 1;
	/*
		Step 1 : Pas de buzz en cours, sélection personnage déverouillée, on peux buzzer
		Step 2 : J'ai buzzé : je suis en chat avec la personne visée
		Step 3 : Je suis buzzé : je suis en chat avec la personne qui m'a buzzéé

		Step -1 : Un buzz est en cours et je ne suis ni le buzzeur ni la personne visée par le buzz
		Step -2 : Fin de la confrontation, écran finale indiquant si le secret est découvert ou non
	*/

	// Permet d'identifier si un buzz en cours
	ongoingBuzz: Buzz = {} as Buzz;

	// Utilisateur actuel
	currentPlayer: Player = {} as Player;

	// Etat de la fin confrontation , si le secret est découvert ou non
	confrontationState = {
		success: false, // découvert ou non
		close: false // proche ou non
	}

	// Formulaire envoyé lorsqu'on buzz quelqu'un
	buzzForm: FormGroup = new FormGroup({
		currentPlayer: new FormControl(99, Validators.required),
		selectedPlayer: new FormControl(0, Validators.required),
		selectedPlayerSecret: new FormControl('', Validators.required),
	});

	// Config Swiper
	public swiperConfig: SwiperOptions = {
		slidesPerView: 5,
		spaceBetween: 0,
		navigation: true,
		mousewheel: true,
		keyboard: true,
	};

	constructor (private gameBuzzService: GameBuzzService, public httpService: HttpService, public storeService: StoreService) {
	}

	get formSelectedPlayer () {
		return this.buzzForm.get('selectedPlayer') as FormControl;
	}

	get formSelectedPlayerSecret () {
		return this.buzzForm.get('selectedPlayerSecret') as FormControl;
	}

	isBuzzVisible (): boolean {
		return this.step != -1 && this.step != -2;
	}

	get players () {
		return this.storeService.players
	}

	ngOnInit (): void {

		this.gameBuzzService.getCurrentPlayer()
			.subscribe(response => {
				this.currentPlayer = response;
				console.log(this.currentPlayer);
			});

		// On récupère la liste des habitants pour les afficher dans le swiper (même si celui-ci est verrouillé !)
		this.httpService.getPlayers().subscribe((data) => {
			this.playersList = data.dataToSend;
		})

		// On regarde si un buzz est en cours dans la maison
		this.gameBuzzService.getOngoingBuzz()
			.subscribe(response => {
				this.ongoingBuzz = response;

                console.log(this.ongoingBuzz);

				// On doit recevoir dans tous les cas une réponse !

				setTimeout(() => {

                    if(this.ongoingBuzz.id){
                        // Si un buzz est en cours
                        if (this.currentPlayer && this.ongoingBuzz.buzzer.id === this.currentPlayer.id) {

                            // ANCHOR Cas où l'user connecté A buzzé

                            // buzz en cours, on doit donc afficher les boutons refuser / confirmer
                            this.step = 2;
                            this.buzzForm = new FormGroup({
                                currentPlayer: new FormControl(this.ongoingBuzz.buzzer, Validators.required),
                                selectedPlayer: new FormControl(this.ongoingBuzz.target, Validators.required),
                                selectedPlayerSecret: new FormControl(this.ongoingBuzz.secret, Validators.required),
                            });

                            // Chargement delayed pour éviter un bug d'affichage (slides non chargées)
                            this.confrontation(this.step);
                            this.selectPlayer('player-slide-' + this.ongoingBuzz.target);

                        } else if (this.currentPlayer && this.ongoingBuzz.target.id === this.currentPlayer.id) {

                            // ANCHOR Cas où l'user connecté EST buzzé

                            this.step = 3;
                            this.buzzForm = new FormGroup({
                                currentPlayer: new FormControl(this.ongoingBuzz.target, Validators.required),
                                selectedPlayer: new FormControl(this.ongoingBuzz.buzzer, Validators.required),
                                selectedPlayerSecret: new FormControl(this.ongoingBuzz.secret, Validators.required),
                            });

                            // Chargement delayed pour éviter un bug d'affichage (slides non chargées)
                            this.confrontation(this.step);
                            this.selectPlayer('player-slide-' + this.ongoingBuzz.buzzer);

                        } else if (this.currentPlayer && this.ongoingBuzz.buzzer.id != this.currentPlayer.id
                            && this.ongoingBuzz.target.id != this.currentPlayer.id) {

                            // ANCHOR Cas où un buzz est en cours mais que l'utilisateur n'est pas concerné
                            // Blocage de l'accès
                            this.step = -1;
                        }
                    }

					// Fin du chargement
					this.contentLoaded = true;
				}, 1000);
			});
	}

	// Permet de sélectionner un habitant via le swiper
	selectPlayer (target: string /* id de l'input de l'habitant : player-slide-XX */) {
		let targetSlide = document.getElementById(target);
		let targetForm = document.getElementById('secret-form');
		if (targetSlide && targetForm) {
			targetSlide.parentNode?.appendChild(targetForm);
		}
	}

	// Envoi du formulaire de buzz
	submit () {
		this.gameBuzzService.createBuzz(this.currentPlayer.id, this.formSelectedPlayer.value, this.formSelectedPlayerSecret.value).subscribe(data => {
			if (data.dataToSend) {
				this.ongoingBuzz.id = data.dataToSend.id;
			}
		});
		this.confrontation(2);
	}

	// Lorsque le buzz est envoyé, on rentre dans la phase de chat
	confrontation (newStep: number /* id de la step */) {
		this.step = newStep;
		let selectedPlayer = this.playersList.filter(player => {
			return player.id === this.formSelectedPlayer.value;
		})
		this.swiperConfig.slidesPerView = 1;
		this.swiperConfig.slideClass = "locked";
		this.playersList = selectedPlayer;
	}

	// Réponse lorsqu'on valide ou non le secret buzzé
	respondBuzz (type: string /* "false", "true" ou "almost" */) {
		if (this.ongoingBuzz.id) {
			this.gameBuzzService.respondBuzz(type, this.ongoingBuzz.id).subscribe(
				response => {
					console.log(response);

					// TODO Modifier ce code lorsque relié au back
					if (response.confirmState === "almost" || response.confirmState === "false") {
						this.confrontationState = {success: false, close: false};
					} else if (response.confirmState === "true") {
						this.confrontationState = {
							success: true, // true ou false
							close: true, // true ou false
						}
					} else {
						this.confrontationState = {
							success: false, // true ou false
							close: false, // true ou false
						}
					}

					// Etape post-confrontation
					this.step = -2;
				});
		}
	}

    // Pour tester les pages
    cancelBuzz() {
        this.step = 1;
        this.ongoingBuzz = {} as Buzz;

        this.confrontationState = {
            success: false, // découvert ou non
            close: false // proche ou non
        }
    }

    setCurrentPlayer(){
        this.currentPlayer = {
            id : 2,
        } as Player;
    }
}
