import { Component, OnInit } from '@angular/core';
import { ModalService } from 'ngx-ds-secret-house';
import { Player } from '../../../interfaces/player';
import { Room } from '../../../interfaces/room';
import { HttpService } from "../../../services/http.service";
import { StoreService } from "../../../store/store.service";
import { GameRoomsService } from './game-rooms.service';
import slugify from "slugify";

@Component({
	selector: 'app-game-rooms',
	templateUrl: './game-rooms.component.html',
	styleUrls: ['./game-rooms.component.scss']
})
export class GameRoomsComponent implements OnInit {
	selectedRoom : Room | null = null;
	playersInRoom : Array<Player> = [];
	viewPlayer : Player | null = null;

	constructor (public httpService: HttpService, public storeService: StoreService, private gameRoomsService : GameRoomsService, private modalService : ModalService ) {}

	ngOnInit (): void {
		// On récupère la liste des pièces
		this.httpService.getRooms().subscribe()
	}

	get roomsList () {
		return this.storeService.rooms
	}

	getChatServerId() {
		// @ts-ignore
		return `zone-chat-${slugify(this.selectedRoom.name)}`
	}

	// Lorsqu'on survole une pièce (animation de style)
	overRoom(roomClassName : string){
		const foundRooms = document.querySelectorAll('.' + roomClassName);
		if(foundRooms) foundRooms.forEach(function(e) {
			e.classList.toggle('hover');
		});
	}

	// Lorsqu'on accède à une pièce
	accessRoom( roomName : string ) {
		let foundRoom =  this.roomsList.find(o => o.name.toLowerCase() === roomName.toLowerCase()) as Room;

		if(foundRoom){
			document.querySelector('.room-not-selected')?.classList.remove('viewable');
			setTimeout(() => {
				// Sélectionne la room et display l'écran avec chat
				this.selectedRoom = foundRoom;

				// Récupération de la liste des habitants dans la pièce
				this.gameRoomsService.getRoomPlayers()
					.subscribe(response => {
						this.playersInRoom = response;

						// On affiche le nouvel écran (transition CSS)
						document.querySelector('.room-selected')?.classList.add('viewable');
					});

			}, 300)
		}
	}

	// On quitte une pièce
	resetRoom(){
		// Ajouter une classe pour transition
		document.querySelector('.room-selected')?.classList.remove('viewable');
		setTimeout(() => {
			this.selectedRoom = null;
			document.querySelector('.room-not-selected')?.classList.add('viewable');
		}, 300)
	}

	// Lorsqu'on veux voir le profil d'un joueur
	seePlayer(playerId : number){
        this.playersInRoom.filter(player => {
			if( player.id === playerId ){
				this.viewPlayer = player;
				this.modalService.open();
			}
        })
	}

}
