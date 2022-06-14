import { Component, OnInit } from '@angular/core';
import { GameRoomsService } from './game-rooms.service';
import { Room } from '../../../interfaces/room';
import { RoomGame } from '../../../interfaces/room_game';
import { Player } from '../../../interfaces/player';

@Component({
	selector: 'app-game-rooms',
	templateUrl: './game-rooms.component.html',
	styleUrls: ['./game-rooms.component.scss']
})
export class GameRoomsComponent implements OnInit {
	roomsList : Array<Room> = [];
	selectedRoom : Room | null = null;
	playersInRoom : Array<Player> = [];

	constructor (private gameRoomsService : GameRoomsService ) {}

	ngOnInit (): void {
		this.gameRoomsService.getRooms()
			.subscribe(response => {
				this.roomsList = response;
				console.log(this.roomsList);
		});
	}

	accessRoom( roomName : string ) {
		let foundRoom =  this.roomsList.find(o => o.name.toLowerCase() === roomName.toLowerCase()) as Room;

		if(foundRoom){
			// Sélectionne la room et display l'écran avec chat
			this.selectedRoom = foundRoom;

			// Récupération de la liste des habitants dans la pièce
			this.gameRoomsService.getRoomPlayers()
				.subscribe(response => {
					this.playersInRoom = response;
			});
		}
	}

	resetRoom(){
		this.selectedRoom = null;
	}

}
