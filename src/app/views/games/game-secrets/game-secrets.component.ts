import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from "../../../services/http.service";
import { StoreService } from "../../../store/store.service";

@Component({
	selector: 'app-game-secrets',
	templateUrl: './game-secrets.component.html',
	styleUrls: ['./game-secrets.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameSecretsComponent implements OnInit {

	constructor (public httpService: HttpService, public storeService: StoreService) {
	}

	ngOnInit (): void {
		this.httpService.getPlayers().subscribe()
	}

	get players () {
		return this.storeService.players
	}
}
