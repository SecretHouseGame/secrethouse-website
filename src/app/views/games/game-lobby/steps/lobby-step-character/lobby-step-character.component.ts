import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from 'ngx-ds-secret-house/lib/components/interfaces/select-option';
import { GameLobbyService } from '../../game-lobby.service';
import { GameLobbyStepService } from '../step.service';

@Component({
	selector: 'app-lobby-step-character',
	templateUrl: './lobby-step-character.component.html',
	styleUrls: ['./lobby-step-character.component.scss'],
})
export class LobbyStepCharacterComponent implements OnInit {
	@Input() isInLobby: boolean = false

	validated: boolean = false;

	genders: SelectOption[] = [
		{ id: '0', name: 'Homme', value: 'MALE' },
		{ id: '1', name: 'Femme', value: 'FEMALE' },
		{ id: '2', name: 'Autre', value: 'OTHER' },
	];

	characterFormGrp: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		age: new FormControl('', [
			Validators.required,
			Validators.pattern('^[0-9]*$'),
		]),
		gender: new FormControl('', [Validators.required]),
		secret: new FormControl('', [Validators.required]),
		picture: new FormControl('', []),
		bio: new FormControl('', []),
	});

	constructor(
		public gameLobbyService: GameLobbyService,
		public stepService: GameLobbyStepService
	) {}

	ngOnInit(): void {
		this.characterFormGrp.setValue({
			name: this.gameLobbyService.character.name,
			age: this.gameLobbyService.character.age,
			gender: this.gameLobbyService.character.gender,
			secret: this.gameLobbyService.character.secret,
			picture: this.gameLobbyService.character.picture,
			bio: this.gameLobbyService.character.bio,
		});
	}

	get formName () {
		return this.characterFormGrp.get('name') as FormControl;
	}

	get formAge () {
		return this.characterFormGrp.get('age') as FormControl;
	}

	get formGender () {
		return this.characterFormGrp.get('gender') as FormControl;
	}

	get formSecret () {
		return this.characterFormGrp.get('secret') as FormControl;
	}

	get formPicture () {
		return this.characterFormGrp.get('picture') as FormControl;
	}

	get formBio () {
		return this.characterFormGrp.get('bio') as FormControl;
	}

	validate () {
		if (this.characterFormGrp.valid) {
			// TODO: back validation
			this.validated = true
			this.gameLobbyService.character = this.characterFormGrp.getRawValue()
			this.stepService.validateStep(true, this.isInLobby)
		} else {
			// TODO: show errors
			this.validated = false;
			console.log('error');
		}
	}
}
