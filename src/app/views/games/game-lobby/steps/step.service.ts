import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Step } from "../../../../interfaces/step";

@Injectable({
	providedIn: 'root'
})

export class GameLobbyStepService {
	steps: Step[] = []
	activeStep: number = 1;
	isValidated: boolean = false;

	constructor(private router: Router) { }

	cancelStep () {
		this.isValidated = false
		this.activeStep--
	}

	validateStep (isLastStep: boolean = false, redirectToLobby: boolean = false) {
		if (!isLastStep) {
			this.activeStep++
		} else {
			this.isValidated = true

			if (redirectToLobby) {
				this.activeStep = 3
				this.router.navigate(['/game/play/1/lobby'])
			}
		}
	}
}
