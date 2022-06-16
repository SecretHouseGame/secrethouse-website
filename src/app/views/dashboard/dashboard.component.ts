import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	gameCode: FormControl = new FormControl('', [
		Validators.required
	])

	constructor () {
	}

	ngOnInit (): void {
	}

	isGameCodeValid () {
		return this.gameCode.valid
	}

	joinGame () {
		if (this.isGameCodeValid()) {
			console.log(this.gameCode.value)

			// api call to validate game code
			// if ok, navigate to game lobby
		}
	}
}
