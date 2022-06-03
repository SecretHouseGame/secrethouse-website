import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sh',
	templateUrl: './sh.component.html',
	styleUrls: ['./sh.component.scss']
})
export class ShComponent implements OnInit {

	navbarSection: any = [
		{
			title: 'La maison des secrets',
			elements: [
				{
					title: 'Habitants',
					icon: 'people-outline',
					isActive: false,
					url: '/habitants',
				},
				{
					title: 'Rooms',
					icon: 'home-outline',
					isActive: false,
					url: '/rooms',
				},
				{
					title: 'Buzz',
					icon: 'hand-left-outline',
					isActive: false,
					url: '/buzz',
				},
				{
					title: 'Secrets',
					icon: 'eye-outline',
					isActive: false,
					url: '/secrets',
				},
			],
		},
		{
			title: 'Le prime',
			elements: [
				{
					title: 'Nominations',
					icon: 'megaphone-outline',
					isActive: false,
					url: '/nominations',
				},
				{
					title: 'Pépites de la semaine',
					icon: 'diamond-outline',
					isActive: false,
					url: '/pepites',
				},
				{
					title: 'Éliminations',
					icon: 'skull-outline',
					isActive: false,
					url: '/eliminations',
				},
			],
		},
		{
			title: 'Mon profil',
			elements: [
				{
					title: 'Mon personnage',
					icon: 'happy-outline',
					isActive: false,
					url: '/mon-personnage',
				},
				{
					title: 'Mon compte',
					icon: 'person-outline',
					isActive: false,
					url: '/mon-compte',
				},
				{
					title: 'Paramètres',
					icon: 'settings-outline',
					isActive: false,
					url: '/parametres',
				},
			],
		},
		{
			title: 'Aide',
			elements: [
				{
					title: 'Règles du jeu',
					icon: 'information-circle-outline',
					isActive: false,
					url: '/regles',
				},
				{
					title: 'FAQ',
					icon: 'help-circle-outline',
					isActive: false,
					url: '/faq',
				},
				{
					title: 'Contacter un admin',
					icon: 'chatbubble-ellipses-outline',
					isActive: false,
					url: '/contacter-admin',
				},
			],
		},
	]

	constructor () {
	}

	ngOnInit (): void {
	}

}
