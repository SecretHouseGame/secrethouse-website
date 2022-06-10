import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Player } from '../../../interfaces/player';
import { GameBuzzService } from './game-buzz.service';// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Navigation, Mousewheel, Keyboard} from 'swiper';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { CheckboxOption } from 'ngx-ds-secret-house';

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
               //  this.contentLoaded = true;
        });
    }

	get formSelectedPlayer() {
		return this.buzzForm.get('selectedPlayer') as FormControl;
	}

	get formSelectedPlayerSecret() {
		return this.buzzForm.get('selectedPlayerSecret') as FormControl;
	}

    selectPlayer(input: any) {
        let targetSlide = input.parentNode;
        console.log(document.getElementById('secret-form'));
        if(targetSlide){
            targetSlide.appendChild( document.getElementById('secret-form') );
        }
    }

    submit(){
        let result = this.gameBuzzService.sendBuzz(this.buzzForm.value);
        console.log(result);
        if( result === true ) {
            this.confrontation();
        } else {
            this.error = result;
        }
    }

    confrontation(){
        this.step = 2;
        let selectedPlayer = this.playersList.filter(player => {
            return player.id === this.formSelectedPlayer.value;
        })
        this.swiperConfig.slidesPerView = 1;
        this.swiperConfig.slideClass = "locked";
        this.playersList = selectedPlayer;
    }
}
