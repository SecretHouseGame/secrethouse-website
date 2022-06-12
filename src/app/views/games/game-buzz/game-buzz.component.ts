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
    @ViewChild('swiper') swiper: any; // Swiper
    contentLoaded : boolean = false; // Chargement
    playersList : Array<Player> = []; // Liste des habitants
    error : string = "";
    step : number = 1 ;
    ongoingBuzz : Buzz = {
        buzzId : 4545
    };
    currentPlayer : number = 15; // Catherine (1) Sabrina (15) Louis (8)
    confrontationState = {
        success : false,
        close : false
    }
    // Dans le cas du test avec fakedb > Catherine a buzzé Sabrina (respectivement step 2 et 3) et Louis n'est donc pas concerné 

    // Formulaire envoyé
    buzzForm : FormGroup = new FormGroup({
        currentPlayer: new FormControl(99, Validators.required),
        selectedPlayer: new FormControl(0, Validators.required),
        selectedPlayerSecret: new FormControl('', Validators.required),
    });
    
    public swiperConfig : SwiperOptions = {
        slidesPerView: 5,
        spaceBetween: 40,
        navigation: true,
        mousewheel: true,
        keyboard: true,
    };

	constructor (private gameBuzzService : GameBuzzService ) {
        
	}

    ngOnInit(): void {
        this.gameBuzzService.getPlayers()
            .subscribe(response => {
                this.playersList = response;
        });

        this.gameBuzzService.getOngoingBuzz()
            .subscribe(response => {
                this.ongoingBuzz = response;
                setTimeout(() => {
                    if(this.ongoingBuzz && this.ongoingBuzz.acterPlayerId) {
                        if(this.ongoingBuzz.acterPlayerId === this.currentPlayer) {

                            // ANCHOR Cas où l'user A buzzé

                            // buzz en cours, on doit donc afficher les boutons refuser / confirmer 
                            // et changer le texte des titres etc..
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

                            // ANCHOR Cas où l'user EST buzzé

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
                            // Il faut bloquer l'accès

                            this.step = -1;
                        }
                    }
                    this.contentLoaded = true;
                }, 1000);
        });
    }

	get formSelectedPlayer() {
		return this.buzzForm.get('selectedPlayer') as FormControl;
	}

	get formSelectedPlayerSecret() {
		return this.buzzForm.get('selectedPlayerSecret') as FormControl;
	}

    selectPlayer(target: string) {
        let targetSlide = document.getElementById(target);
        let targetForm = document.getElementById('secret-form');
        if( targetSlide && targetForm ) {
            targetSlide.parentNode?.appendChild( targetForm );
        }
    }

    submit(){
        this.gameBuzzService.sendBuzz(this.buzzForm.value);
        this.confrontation(2);
    }

    confrontation(newStep : number){
        this.step = newStep;
        let selectedPlayer = this.playersList.filter(player => {
            return player.id === this.formSelectedPlayer.value;
        })
        this.swiperConfig.slidesPerView = 1;
        this.swiperConfig.slideClass = "locked";
        this.playersList = selectedPlayer;
    }

    respondBuzz(type: string){
        this.gameBuzzService.respondBuzz(type, 4545 /*this.ongoingBuzz.buzzId*/).subscribe(
            response => {
                console.log(response);
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
            
            this.step = -2;
        });
    }
}
