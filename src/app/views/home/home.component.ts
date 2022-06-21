import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { ModalService } from 'ngx-ds-secret-house';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
	isRegister: Boolean = true;

	registerFormGrp: FormGroup = new FormGroup({
		email: new FormControl(),
		password: new FormControl(),
		confirmPassword: new FormControl(),
	});

	loginFormGrp: FormGroup = new FormGroup({
		email: new FormControl(),
		password: new FormControl(),
	});

	constructor (private modalService: ModalService, private router: Router) {
	}

	ngOnInit (): void {
	}

	openRegister() {
		this.isRegister = true;
		this.modalService.open();
	}

	openLogin() {
		this.isRegister = false;
		this.modalService.open();
	}

	get registerFormEmail() {
		return this.registerFormGrp.get('email') as FormControl;
	}
	get registerFormPassword() {
		return this.registerFormGrp.get('password') as FormControl;
	}
	get registerFormConfirmPassword() {
		return this.registerFormGrp.get('confirmPassword') as FormControl;
	}
	get loginFormEmail() {
		return this.loginFormGrp.get('email') as FormControl;
	}
	get loginFormPassword() {
		return this.loginFormGrp.get('password') as FormControl;
	}

	goToPlay () {
		this.router.navigate(['/game'])
	}
}
