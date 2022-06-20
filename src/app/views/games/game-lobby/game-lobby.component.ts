import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-game-lobby',
	templateUrl: './game-lobby.component.html',
	styleUrls: ['./game-lobby.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GameLobbyComponent implements OnInit {
	activeStep: number = 1;

	paramFormGrp: FormGroup = new FormGroup({
		maxPlayers: new FormControl(),
		intervalEvent: new FormControl(),
	});

	personnageFormGrp: FormGroup = new FormGroup({
		name: new FormControl(),
		age: new FormControl(),
		gender: new FormControl(),
		secret: new FormControl(),
		picture: new FormControl(),
		bio: new FormControl(),
	});

	constructor () {
	}

	ngOnInit (): void {
	}

	get paramFormMaxPlayers() {
		return this.paramFormGrp.get('maxPlayers') as FormControl;
	}
	get paramFormIntervalEvent() {
		return this.paramFormGrp.get('intervalEvent') as FormControl;
	}
	get personnageFormName() {
		return this.personnageFormGrp.get('name') as FormControl;
	}
	get personnageFormAge() {
		return this.personnageFormGrp.get('age') as FormControl;
	}
	get personnageFormGender() {
		return this.personnageFormGrp.get('gender') as FormControl;
	}
	get personnageFormSecret() {
		return this.personnageFormGrp.get('secret') as FormControl;
	}
	get personnageFormPicture() {
		return this.personnageFormGrp.get('picture') as FormControl;
	}
	get personnageFormBio() {
		return this.personnageFormGrp.get('bio') as FormControl;
	}
}
