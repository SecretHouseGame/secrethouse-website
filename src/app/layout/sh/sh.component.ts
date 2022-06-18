import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sh',
	templateUrl: './sh.component.html',
	styleUrls: ['./sh.component.scss']
})
export class ShComponent implements OnInit {

	navbarSections: any = [
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

	isUserPlayingGame () {
		// TODO: call api function to check if user is already in a game
		return true;
	}

	ngOnInit (): void {
		const playingMenuElements = this.isUserPlayingGame() ? [
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
		] : [{
			title: 'Acceuil',
			icon: 'home-outline',
			isActive: false,
			url: '/game',
		}]

		this.navbarSections.unshift({
			title: 'La maison des secrets',
			elements: playingMenuElements
		},)
	}

}
