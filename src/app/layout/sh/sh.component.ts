import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GameService } from "../../services/game.service";

@Component({
	selector: 'app-sh',
	templateUrl: './sh.component.html',
	styleUrls: ['./sh.component.scss']
})
export class ShComponent implements OnInit {

	navbarSections: any = [
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

	constructor (public gameService: GameService, private router: Router) {
	}

	get isPlaying () {
		// TODO: call api function to check if user is already in a game
		return this.gameService.isPlaying;
	}

	get menuElements (): any[] {
		const menuElements = this.isPlaying ? [
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
		] : null;

		return [
			{ title: 'La maison des secrets', elements: menuElements },
			...this.navbarSections
		]
	}

	ngOnInit (): void {
		const routesPlaying = ['residents', 'character', 'rooms', 'secrets', 'buzz']
		if (routesPlaying.find(route => this.router.url.includes(route))) {
			this.gameService.isPlaying = true
		}
	}
}
