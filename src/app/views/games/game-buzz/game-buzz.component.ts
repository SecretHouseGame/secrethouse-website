import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Player } from '../../../interfaces/player';
import { GameBuzzService } from './game-buzz.service';// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Navigation, Mousewheel, Keyboard} from 'swiper';

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
    @ViewChild('swiper') swiper: any;
    contentLoaded : boolean = false;
    playersList : Array<Player> = [];
    
    public swiperConfig : SwiperOptions = {
        slidesPerView: 5,
        spaceBetween: 50,
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
    }

    ngAfterViewInit(): void {
        //Swiper instance will be displayed in console
    }
}
