import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {Player} from "../../../interfaces/player";
import {FormControl, FormGroup} from "@angular/forms";
import {SelectOption} from "ngx-ds-secret-house/lib/components/interfaces/select-option";
import {HttpService} from "../../../services/http.service";

@Component({
	selector: 'app-game-character',
	templateUrl: './game-character.component.html',
	styleUrls: ['./game-character.component.scss'],
	encapsulation: ViewEncapsulation.None
})
// fixme : missing eye icon in bg
export class GameCharacterComponent implements OnInit {
	// fixme : validate genders
	genders: SelectOption[] = [
		{id: "0", name: "Homme", value: "MALE"},
		{id: "1", name: "Femme", value: "FEMALE"},
		{id: "2", name: "Autre", value: "OTHER"}
	]

	// fixme : missing age & bio in interface player
	character: Player = {} as Player;

	formGroup: FormGroup = new FormGroup({
		name: new FormControl(),
		age: new FormControl(),
		genre: new FormControl(),
		secret: new FormControl(),
		// fixme : how to upload file ?
		avatar: new FormControl(),
		bio: new FormControl(),
	})

	constructor(public httpService: HttpService) {

	}

	ngOnInit(): void {
		this.httpService.getCurrentPlayer().subscribe((player) => {
			this.character = player

			this.formGroup.setValue({
				name: this.character.name ? this.character.name : "Name",
				//age: this.character.age ? this.character.age : "Age",
				genre: this.character.gender ? this.character.gender : "Genre",
				secret: this.character.secret ? this.character.secret : "Secret",
				//avatar: this.character.avatar ? this.character.avatar : "/assets/images/players/catherine.png",
				//bio: this.character.bio ? this.character.bio : "Bio"
			})
		})

	}

	// todo : missing age, bio avatar
	get formGroupName() {
		return this.formGroup.get('name') as FormControl;
	}

	/*get formGroupAge() {
		return this.formGroup.get('age') as FormControl;
	}*/

	get formGroupGenre() {
		return this.formGroup.get('genre') as FormControl;
	}

	get formGroupSecret() {
		return this.formGroup.get('secret') as FormControl;
	}

	/*get formGroupBio() {
		return this.formGroup.get('bio') as FormControl;
	}*/

	updateCharacter(): void {
		if (!this.character) {
			console.log("Character undefined");
		} else {

			let updatedCurrentPlayer = this.character;
			updatedCurrentPlayer.name = this.formGroupName.value;
			//updatedCurrentPlayer.age = this.formGroupAge.value;
			updatedCurrentPlayer.gender = this.formGroupGenre.value;
			updatedCurrentPlayer.secret = this.formGroupSecret.value;
			//updatedCurrentPlayer.bio = this.formGroupBio.value;
			updatedCurrentPlayer.name = this.formGroupName.value;

			this.httpService.updateCurrentPlayer(updatedCurrentPlayer);
			this.character = updatedCurrentPlayer;
		}
	}
}
