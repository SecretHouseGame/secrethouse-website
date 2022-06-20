import { Injectable } from '@angular/core';
import { Player } from "../interfaces/player";
import { Room } from "../interfaces/room";

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	players: Player[] = []
	rooms: Room[] = []

	constructor () {
	}

	savePlayers = (players: Player[]) => {
		this.players = players
	}

	saveRooms = (rooms: Room[]) => {
		this.rooms = rooms
	}
}
