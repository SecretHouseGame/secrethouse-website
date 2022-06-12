import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Player } from '../../../interfaces/player';
import { Buzz } from '../../../interfaces/buzz';
import { GameBuzzService } from './game-buzz.service';// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Navigation, Mousewheel, Keyboard} from 'swiper';
import { FormGroup, FormControl, Validators} from '@angular/forms';

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
    contentLoaded : boolean = false; // Etat de chargement des datas
    playersList : Array<Player> = []; // Liste des habitants (utilisée pour le swiper)

     // Permet de changer d'écran 
    step : number = 1;
    /*
        Step -1 : Un buzz est en cours et je ne suis ni le buzzeur ni la personne visée par le buzz
        Step 1 : Pas de buzz en cours, sélection personnage déverouillée, on peux buzzer 
        Step 2 : J'ai buzzé : je suis en chat avec la personne visée
        Step 3 : Je suis buzzé : je suis en chat avec la personne qui m'a buzzéé
        Step -2 : Fin de la confrontation, écran finale indiquant si le secret est découvert ou non

    */

    // Permet d'identifier si un buzz en cours
    ongoingBuzz : Buzz = {};

    // Identifiant de l'utilisateur connecté
    // Dans le cas du test avec fakedb > Catherine a buzzé Sabrina (respectivement step 2 et 3) et Louis n'est donc pas concerné 
    currentPlayer : number = 1; // Catherine (1) Sabrina (15) Louis (8)

    // Etat de la fin confrontation , si le secret est découvert ou non
    confrontationState = {
        success : false, // découvert ou non
        close : false // proche ou non
    }

    // Formulaire envoyé lorsqu'on buzz quelqu'un
    buzzForm : FormGroup = new FormGroup({
        currentPlayer: new FormControl(99, Validators.required),
        selectedPlayer: new FormControl(0, Validators.required),
        selectedPlayerSecret: new FormControl('', Validators.required),
    });
    
    // Config Swiper
    public swiperConfig : SwiperOptions = {
        slidesPerView: 5,
        spaceBetween: 40,
        navigation: true,
        mousewheel: true,
        keyboard: true,
    };

	constructor (private gameBuzzService : GameBuzzService ) {}

	get formSelectedPlayer() {
		return this.buzzForm.get('selectedPlayer') as FormControl;
	}

	get formSelectedPlayerSecret() {
		return this.buzzForm.get('selectedPlayerSecret') as FormControl;
	}

    ngOnInit(): void {

        // On récupère la liste des habitants pour les afficher dans le swiper (même si celui-ci est verrouillé !)
        this.gameBuzzService.getPlayers()
            .subscribe(response => {
                this.playersList = response;

                // TODO Front : condition "canBuzz" et si son secret est découvert ou non
        });

        // On regarde si un buzz est en cours dans la maison
        this.gameBuzzService.getOngoingBuzz()
            .subscribe(response => {
                this.ongoingBuzz = response;
                setTimeout(() => {
                    // Si un buzz est en cours
                    if(this.ongoingBuzz && this.ongoingBuzz.acterPlayerId) {
                        if(this.ongoingBuzz.acterPlayerId === this.currentPlayer) {

                            // ANCHOR Cas où l'user connecté A buzzé

                            // buzz en cours, on doit donc afficher les boutons refuser / confirmer 
                            this.step = 2;
                            this.buzzForm = new FormGroup({
                                currentPlayer: new FormControl(this.ongoingBuzz.acterPlayerId, Validators.required),
                                selectedPlayer: new FormControl(this.ongoingBuzz.targetPlayerId, Validators.required),
                                selectedPlayerSecret: new FormControl(this.ongoingBuzz.secretGuessed, Validators.required),
                            });
                            
                            // Chargement delayed pour éviter un bug d'affichage (slides non chargées)
                            this.confrontation(this.step);
                            this.selectPlayer('player-slide-' + this.ongoingBuzz.targetPlayerId);

                        } else if (this.ongoingBuzz.targetPlayerId === this.currentPlayer) {

                            // ANCHOR Cas où l'user connecté EST buzzé

                            this.step = 3;
                            this.buzzForm = new FormGroup({
                                currentPlayer: new FormControl(this.ongoingBuzz.targetPlayerId, Validators.required),
                                selectedPlayer: new FormControl(this.ongoingBuzz.acterPlayerId, Validators.required),
                                selectedPlayerSecret: new FormControl(this.ongoingBuzz.secretGuessed, Validators.required),
                            });
                            
                            // Chargement delayed pour éviter un bug d'affichage (slides non chargées)
                            this.confrontation(this.step);
                            this.selectPlayer('player-slide-' + this.ongoingBuzz.acterPlayerId);

                        } else if (this.ongoingBuzz.acterPlayerId != this.currentPlayer 
                            && this.ongoingBuzz.targetPlayerId != this.currentPlayer  ) {
                            
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
    selectPlayer(target: string /* id de l'input de l'habitant : player-slide-XX */ ) {
        let targetSlide = document.getElementById(target);
        let targetForm = document.getElementById('secret-form');
        if( targetSlide && targetForm ) {
            targetSlide.parentNode?.appendChild( targetForm );
        }
    }

    // Envoi du formulaire de buzz
    submit(){
        this.gameBuzzService.sendBuzz(this.buzzForm.value);
        this.confrontation(2);
    }

    // Lorsque le buzz est envoyé, on rentre dans la phase de chat
    confrontation(newStep : number /* id de la step */){
        this.step = newStep;
        let selectedPlayer = this.playersList.filter(player => {
            return player.id === this.formSelectedPlayer.value;
        })
        this.swiperConfig.slidesPerView = 1;
        this.swiperConfig.slideClass = "locked";
        this.playersList = selectedPlayer;
    }

    // Réponse lorsqu'on valide ou non le secret buzzé
    respondBuzz(type: string /* "false", "true" ou "almost" */){
        if( this.ongoingBuzz.buzzId ){
            this.gameBuzzService.respondBuzz(type, this.ongoingBuzz.buzzId).subscribe(
                response => {
                    console.log(response);
    
                    // TODO Modifier ce code lorsque relié au back
                    if(response.confirmState === "almost"){
                        this.confrontationState = {
                            success: false, // true ou false
                            close: true, // true ou false
                        }
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
                    };
                    
                    // Etape post-confrontation
                    this.step = -2;
            });
        }
    }
}
