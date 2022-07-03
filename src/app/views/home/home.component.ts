import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from "@angular/router";
import {ModalService} from 'ngx-ds-secret-house';
import {HttpService} from "../../services/http.service";

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

	constructor(private modalService: ModalService, private router: Router, public httpService: HttpService) {
	}

	ngOnInit(): void {
	}

	openRegister() {
		this.isRegister = true;
		this.modalService.open();
	}

	openLogin() {
		this.isRegister = false;
		this.modalService.open();
	}

	get registerFormUsername() {
		return this.registerFormGrp.get('username') as FormControl;
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

	/*goToPlay() {
		this.router.navigate(['/game'])
	}*/

	handleLogin() {
		this.httpService.login(this.loginFormEmail.value, this.loginFormPassword.value).subscribe((data) => {
			if (data.dataToSend.token) {
				console.log("Got the token !");
				localStorage.setItem("accessToken", data.dataToSend.token);
				this.router.navigate(['/game']);
			}
		});
	}

	handleRegister() {
		if (this.registerFormPassword === this.registerFormConfirmPassword.value) {
			this.httpService.register(this.registerFormUsername.value, this.registerFormEmail.value, this.registerFormPassword.value).subscribe((data) => {
				if (data.dataToSend.token) {
					console.log("Got the token !");
					localStorage.setItem("accessToken", data.dataToSend.token);
				}
			});
			this.router.navigate(['/game']);
		} else {
			console.log("Different passwords supplied");
		}
	}
}
