import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { GameLobbyService } from "../game-lobby/game-lobby.service";
import { GameLobbyStepService } from "../game-lobby/steps/step.service";

@Component({
	selector: 'app-game-create',
	templateUrl: './game-create.component.html',
	styleUrls: ['./game-create.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameCreateComponent implements OnInit {

	constructor (public stepService: GameLobbyStepService, public gameLobbyService: GameLobbyService, private router: Router) {
	}

	get steps () {
		return this.stepService.steps
	}

	get activeStep () {
		return this.stepService.activeStep
	}

	get isStepperValidated () {
		return this.stepService.isValidated
	}

	ngOnInit (): void {
		this.stepService.steps = [
			{id: 1, title: 'Création du personnage'},
			{id: 2, title: 'Lobby'}
		]
	}

}
