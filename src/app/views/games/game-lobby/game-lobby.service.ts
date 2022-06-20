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
		name: '',
		age: '',
		gender: '',
		secret: '',
		picture: '',
		bio: ''
	}

	constructor() { }


}
