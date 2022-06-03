import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Player } from '../../../interfaces/player';
import { GameBuzzService } from './game-buzz.service';// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Navigation} from 'swiper';

SwiperCore.use([
    Navigation
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
    config: SwiperOptions = {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: true,
        pagination: { clickable: true },
        scrollbar: { draggable: true },
    };

	constructor (private gameBuzzService : GameBuzzService ) {
        
	}

    ngOnInit() {
        this.gameBuzzService.getPlayers()
            .subscribe(response => {
                console.log(response);
                this.playersList = response;
                this.contentLoaded = true;
            });
    }

    onSwiper([swiper] : any) {
        console.log(swiper);
        
    }

    onSlideChange(){
        console.log('slide change');
    }

    ngAfterViewInit(): void {
        console.log(this.swiper.swiperRef);
        //Swiper instance will be displayed in console
    }
}
