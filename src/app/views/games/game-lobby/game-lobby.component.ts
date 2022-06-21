import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GameLobbyService } from "./game-lobby.service";
import { GameLobbyStepService } from "./steps/step.service";

@Component({
	selector: 'app-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameLobbyComponent implements OnInit {

	constructor (public stepService: GameLobbyStepService, public gameLobbyService: GameLobbyService) {
	}

	get steps () {
		return this.stepService.steps
	}

	get activeStep () {
		return this.stepService.activeStep
	}

	ngOnInit (): void {
		this.stepService.steps = [
			{id: 1, title: 'Paramètres de la partie'},
			{id: 2, title: 'Création du personnage'},
			{id: 3, title: 'Lobby'},
		]

		this.stepService.activeStep = 3
	}
}
