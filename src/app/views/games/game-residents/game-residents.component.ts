import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Player } from "../../../interfaces/player";
import { listItem } from 'ngx-ds-secret-house/lib/components/interfaces/list-item'
import { HttpService } from "../../../services/http.service";
import { StoreService } from "../../../store/store.service";

@Component({
	selector: 'app-game-residents',
	templateUrl: './game-residents.component.html',
	styleUrls: ['./game-residents.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameResidentsComponent implements OnInit {
	items: listItem[] = []
	selectedResident: Player = {} as Player;

	constructor (public httpService: HttpService, public storeService: StoreService) {
	}

	ngOnInit (): void {
		this.httpService.getPlayers().subscribe(() => {
			this.setupItemsList()
		})
	}

	get players () {
		return this.storeService.players
	}

	setupItemsList () {
		this.selectedResident = this.players[0]
		this.players.forEach((resident) => {
			this.items.push(<listItem>{
				text: resident.name,
				img: {
					src: "./assets/images/players/catherine.png",
					alt: 'img'
				}
			})
		})
	}

	getResidentGenderTranslation (gender: string) {
		return gender === 'MALE' ? 'Homme' : 'Femme'
	}

	selectResident (residentId: number) {
		const resident = this.players.find(resident => resident.id === residentId)
		if (resident) this.selectedResident = resident
	}
}
