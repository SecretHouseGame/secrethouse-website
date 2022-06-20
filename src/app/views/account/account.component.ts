import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
	generalFormGrp: FormGroup = new FormGroup({
		pseudo: new FormControl(),
		email: new FormControl(),
	});

	changePasswordFormGrp: FormGroup = new FormGroup({
		password: new FormControl(),
		confirmPassword: new FormControl(),
	});

	constructor() {}

	ngOnInit(): void {}

	get generalFormPseudo() {
		return this.generalFormGrp.get('pseudo') as FormControl;
	}
	get generalFormEmail() {
		return this.generalFormGrp.get('email') as FormControl;
	}
	get changePasswordFormPassword() {
		return this.changePasswordFormGrp.get('password') as FormControl;
	}
	get changePasswordFormConfirmPassword() {
		return this.changePasswordFormGrp.get('confirmPassword') as FormControl;
	}
}
