import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameLobbyComponent implements OnInit {
	activeStep: number = 1;

	constructor () {
	}

	ngOnInit (): void {
	}
}
