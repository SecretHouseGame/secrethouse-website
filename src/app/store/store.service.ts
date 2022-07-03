import { Injectable } from '@angular/core';
import { Player } from "../interfaces/player";
import { Room } from "../interfaces/room";
import {User} from "../interfaces/user";

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	players: Player[] = []
	rooms: Room[] = [
		<Room>{id:1,name:"terrasse"},
		<Room>{id:1,name:"cuisine"},
		<Room>{id:1,name:"balcon"},
		<Room>{id:1,name:"salle de bain"},
		<Room>{id:1,name:"salon"},
		<Room>{id:1,name:"chambre"},
		<Room>{id:1,name:"piscine"},
	];
	user: User = {} as User;
	gameId:number = 0;
	gameCode: string = "";
	token: string = "";
	currentPlayer: Player = {} as Player;
	currentRoom: string ="";

	constructor () {
	}

	savePlayers = (players: Player[]) => {
		this.players = players
	}

	saveRooms = (rooms: Room[]) => {
		this.rooms = rooms
	}

	saveCurrentRoom = (room:string) =>{
		this.currentRoom = room;
	}
}
