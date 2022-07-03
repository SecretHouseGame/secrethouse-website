import { Injectable } from '@angular/core';
import { Player } from "../interfaces/player";
import { Room } from "../interfaces/room";
import {User} from "../interfaces/user";

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	players: Player[] = []
	rooms: Room[] = [];
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
}
