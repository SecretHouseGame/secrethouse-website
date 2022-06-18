import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Player } from "../../../interfaces/player";
import { listItem } from 'ngx-ds-secret-house/lib/components/interfaces/list-item'
import { HttpService } from "../../../services/http.service";

@Component({
	selector: 'app-game-residents',
	templateUrl: './game-residents.component.html',
	styleUrls: ['./game-residents.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameResidentsComponent implements OnInit {
	players: Player[] = []
	items: listItem[] = []
	selectedResident: Player = {
		id: 0
	}

	constructor (public httpService: HttpService) {
	}

	ngOnInit (): void {
		this.httpService.getPlayers().subscribe((players) => {
			this.players = players
			this.selectedResident = players[0]

			players.forEach((resident) => {
				this.items.push(<listItem>{
					text: resident.name,
					img: {
						src: resident.avatar,
						alt: 'img'
					}
				})
			})
		})
	}

	getResidentGenderTranslation (gender: string) {
		return gender === 'male' ? 'Homme' : 'Femme'
	}

	selectResident (residentId: number) {
		const resident = this.players.find(resident => resident.id === residentId)
		if (resident) this.selectedResident = resident
	}
}
