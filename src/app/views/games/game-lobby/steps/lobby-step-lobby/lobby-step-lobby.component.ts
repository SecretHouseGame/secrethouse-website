import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../../../services/http.service";
import { StoreService } from "../../../../../store/store.service";
import { GameLobbyStepService } from "../step.service";

@Component({
	selector: 'app-lobby-step-lobby',
	templateUrl: './lobby-step-lobby.component.html',
	styleUrls: ['./lobby-step-lobby.component.scss']
})
export class LobbyStepLobbyComponent implements OnInit {

	isAdmin: boolean = false

	constructor (public stepService: GameLobbyStepService, public httpService: HttpService, public storeService: StoreService) {
	}

	ngOnInit (): void {
		this.httpService.getPlayers().subscribe()
	}

	get players () {
		return this.storeService.players
	}

	goToStep (stepNumber: number) {
		this.stepService.activeStep = stepNumber
	}
}
