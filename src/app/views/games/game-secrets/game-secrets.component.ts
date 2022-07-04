import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from "../../../services/http.service";
import { StoreService } from "../../../store/store.service";
import {listItem} from "ngx-ds-secret-house/lib/components/interfaces/list-item";
import {Secret} from "../../../interfaces/secret";

@Component({
	selector: 'app-game-secrets',
	templateUrl: './game-secrets.component.html',
	styleUrls: ['./game-secrets.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameSecretsComponent implements OnInit {
	items: Secret[] = [];

	constructor (public httpService: HttpService, public storeService: StoreService) {
	}

	ngOnInit (): void {
		if (this.storeService.gameId) {
			this.httpService.getSecrets().subscribe(value => {
				value.forEach((secret: Secret) => {
					this.items.push(<Secret>{
						name: secret.name,
						secret: secret.secret
					})
				})
			})
		} else {
			console.log("no gameId found");
		}
	}
}
