import { Injectable } from "@angular/core";
import { Step } from "../../../../interfaces/step";

@Injectable({
	providedIn: 'root'
})

export class GameLobbyStepService {
	steps: Step[] = []
	activeStep: number = 1;
	isValidated: boolean = false;

	constructor() { }

	cancelStep () {
		this.isValidated = false
		this.activeStep--
	}

	validateStep (isLastStep: boolean = false) {
		if (!isLastStep) {
			this.activeStep++
		} else {
			this.isValidated = true
		}
	}
}
