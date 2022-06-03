import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sh',
	templateUrl: './sh.component.html',
	styleUrls: ['./sh.component.scss']
})
export class ShComponent implements OnInit {

	navbarSections: any = [
		{
			title: 'La maison des secrets',
			elements: [
				{
					title: 'Habitants',
					icon: 'people-outline',
					isActive: false,
					url: '/game/play/1/residents',
				},
				{
					title: 'Maison',
					icon: 'home-outline',
					isActive: false,
					url: '/game/play/1/rooms',
				},
				{
					title: 'Secrets',
					icon: 'eye-outline',
					isActive: false,
					url: '/game/play/1/secrets',
				},
				{
					title: 'Buzz',
					icon: 'hand-left-outline',
					isActive: false,
					url: '/game/play/1/buzz',
				},
			],
		},
		{
			title: 'Mon profil',
			elements: [
				{
					title: 'Mon compte',
					icon: 'person-outline',
					isActive: false,
					url: '/game/account',
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
					url: '/rules',
				},
				{
					title: 'Signaler un bug',
					icon: 'chatbubble-ellipses-outline',
					isActive: false,
					url: '/contact',
				},
			],
		},
	]

	constructor () {
	}

	ngOnInit (): void {
	}

}
