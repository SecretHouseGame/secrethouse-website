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

	setupDefaultValue () {
		this.parameters.maxPlayers = '5'
		this.parameters.intervalEvent = '1'

		this.character.name = 'Charlene'
		this.character.age = '31'
		this.character.gender = 'Femme'
		this.character.secret = 'Je ne vois pas les couleurs'
		this.character.bio = 'Je suis très drôle et j\'adore les animaux.'
		this.character.picture = '/assets/images/players/julie.png'
	}
}
