import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Player } from "../../../interfaces/player";
import { HttpService } from "../../../services/http.service";

@Component({
	selector: 'app-game-secrets',
	templateUrl: './game-secrets.component.html',
	styleUrls: ['./game-secrets.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameSecretsComponent implements OnInit {
	players: Player[] = []

	constructor (public httpService: HttpService) {
	}

	ngOnInit (): void {
		this.httpService.getPlayers().subscribe((players) => {
			this.players = players
		})
	}

}
