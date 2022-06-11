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
    currentPlayer : number = 1;

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

    ngOnInit() {
        this.gameBuzzService.getPlayers()
            .subscribe(response => {
                this.playersList = response;
                this.contentLoaded = true;
        });

        this.gameBuzzService.getOngoingBuzz()
            .subscribe(response => {
                this.ongoingBuzz = response;
                if(this.ongoingBuzz && this.ongoingBuzz.acterPlayerId == this.currentPlayer) {
                    // buzz en cours, on doit donc afficher les boutons refuser / confirmer 
                    // et changer le texte des titres etc..
                    this.step = 3;
                    this.buzzForm = new FormGroup({
                        currentPlayer: new FormControl(this.ongoingBuzz.targetPlayerId, Validators.required),
                        selectedPlayer: new FormControl(this.ongoingBuzz.acterPlayerId, Validators.required),
                        selectedPlayerSecret: new FormControl(this.ongoingBuzz.secretGuessed, Validators.required),
                    });
                    
                    this.confrontation(3);
                    this.selectPlayer('player-slide-' + this.ongoingBuzz.acterPlayerId);
                }
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
        console.log('reponse');
        if(this.ongoingBuzz.buzzId){
            this.gameBuzzService.respondBuzz(type, this.ongoingBuzz.buzzId);
        }
    }
}
