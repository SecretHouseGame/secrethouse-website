import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GameService } from "../../../../../services/game.service";
import { HttpService } from "../../../../../services/http.service";
import { StoreService } from "../../../../../store/store.service";
import { GameLobbyService } from "../../game-lobby.service";
import { GameLobbyStepService } from "../step.service";

@Component({
	selector: 'app-lobby-step-lobby',
	templateUrl: './lobby-step-lobby.component.html',
	styleUrls: ['./lobby-step-lobby.component.scss']
})
export class LobbyStepLobbyComponent implements OnInit {

	isAdmin: boolean = true

	constructor (
		public stepService: GameLobbyStepService,
		public lobbyService: GameLobbyService,
		public httpService: HttpService,
		public storeService: StoreService,
		public gameService: GameService,
		private router: Router
	) {}

	ngOnInit (): void {
		this.httpService.getPlayers().subscribe()
	}

	get character () {
		return this.lobbyService.character
	}

	get players () {
		return this.storeService.players.slice(0, parseInt(this.lobbyService.parameters.maxPlayers))
	}

	characterGender () {
		return this.character.gender === 'male' ? 'Homme' : (this.character.gender === 'female' ? 'Femme' : 'Autre')
	}

	goToStep (stepNumber: number) {
		this.stepService.activeStep = stepNumber
	}

	startGame () {
		this.gameService.isPlaying = true
		this.router.navigate(['/game/play/1/residents'])
	}

	leaveGame () {
		this.router.navigate(['/game'])
	}
}
