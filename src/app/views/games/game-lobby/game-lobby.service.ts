import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})

export class GameLobbyService {

	parameters = {
		maxPlayers: '',
		intervalEvent: ''
	}

	character = {
		name: 'Vincent',
		age: '22',
		gender: 'male',
		secret: "J'aime les pates",
	}

	constructor() { }
}
