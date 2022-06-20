import { Injectable } from '@angular/core';
import { Player } from "../interfaces/player";

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	players: Player[] = []

	constructor () {
	}

	savePlayers = (players: Player[]) => {
		this.players = players
	}
}
