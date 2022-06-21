import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-player-portrait',
	templateUrl: './player-portrait.component.html',
	styleUrls: ['./player-portrait.component.scss']
})
export class PlayerPortraitComponent implements OnInit {
	@Input() title: string | undefined = '';

	constructor () {
	}

	ngOnInit (): void {
	}

}
