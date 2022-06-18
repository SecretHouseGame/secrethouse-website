import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Player } from "../../../interfaces/player";
import { listItem } from 'ngx-ds-secret-house/lib/components/interfaces/list-item'

@Component({
	selector: 'app-game-residents',
	templateUrl: './game-residents.component.html',
	styleUrls: ['./game-residents.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameResidentsComponent implements OnInit {
	residents: Player[] = [
		{
			id: 1,
			genre: 'female',
			cagnotte: 1500,
			name: 'Catherine',
			isEliminated: false,
			secret: '',
			avatar: '/assets/images/players/catherine.png'
		},
		{
			id: 2,
			genre: 'male',
			cagnotte: 900,
			name: 'Bryan',
			isEliminated: true,
			secret: 'Il a mangé son frère siamois',
			avatar: '/assets/images/players/bryan.png'
		},
		{
			id: 3,
			genre: 'female',
			cagnotte: 12200,
			name: 'Julie',
			isEliminated: false,
			secret: '',
			avatar: '/assets/images/players/julie.png'
		},
		{
			id: 4,
			genre: 'male',
			cagnotte: 4560,
			name: 'Nathan',
			isEliminated: false,
			secret: '',
			avatar: '/assets/images/players/nathan.png'
		},
	]
	selectedResident: Player = {
		id: 0
	}

	items: listItem[] = []

	constructor () {
	}

	ngOnInit (): void {
		// TODO : utiliser aussi le model user pour récupérer les autres informations
		this.selectedResident = this.residents[0]

		this.residents.forEach((resident) => {
			this.items.push(<listItem>{
				text: resident.name,
				img: {
					src: resident.avatar,
					alt: 'img'
				}
			})
		})
	}

	getResidentGenderTranslation (gender: string) {
		return gender === 'male' ? 'Homme' : 'Femme'
	}

	selectResident (residentId: number) {
		const resident = this.residents.find(resident => resident.id === residentId)
		if (resident) this.selectedResident = resident
	}
}
