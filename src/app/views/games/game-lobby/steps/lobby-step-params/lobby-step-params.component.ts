import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GameLobbyService } from "../../game-lobby.service";
import { GameLobbyStepService } from "../step.service";

@Component({
	selector: 'app-lobby-step-params',
	templateUrl: './lobby-step-params.component.html',
	styleUrls: ['./lobby-step-params.component.scss']
})
export class LobbyStepParamsComponent implements OnInit {

	validated: boolean = false;
	parametersFormGrp: FormGroup = new FormGroup({
		maxPlayers: new FormControl('', [
			Validators.required,
			Validators.pattern("^[0-9]*$")
		]),
		intervalEvent: new FormControl('', [
			Validators.required,
			Validators.pattern("^[0-9]*$")
		]),
	});

	constructor (public stepService: GameLobbyStepService, public gameLobbyService: GameLobbyService) {
	}

	get formMaxPlayers() {
		return this.parametersFormGrp.get('maxPlayers') as FormControl;
	}
	get formIntervalEvent() {
		return this.parametersFormGrp.get('intervalEvent') as FormControl;
	}

	ngOnInit (): void {
		this.parametersFormGrp.setValue({
			'maxPlayers': this.gameLobbyService.parameters.maxPlayers,
			'intervalEvent': this.gameLobbyService.parameters.intervalEvent
		})
	}

	validate () {
		if (this.parametersFormGrp.valid) {
			// TODO: back validation
			this.validated = true;
			this.gameLobbyService.parameters = this.parametersFormGrp.getRawValue()
			this.stepService.validateStep()
		} else {
			// TODO: show errors
			this.validated = false
			console.log('error')
		}
	}
}
