import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { Step } from "../../interfaces/step";
import { GameLobbyStepService } from "../../views/games/game-lobby/steps/step.service";

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

	constructor (public stepService: GameLobbyStepService) {
	}

	get steps () {
		return this.stepService.steps
	}

	get activeStep () {
		return this.stepService.activeStep
	}

	ngOnInit (): void {
	}


}
