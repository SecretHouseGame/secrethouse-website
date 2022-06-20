import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	formContact: FormGroup =  new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', Validators.required),
		message: new FormControl('', Validators.required),
	});

	constructor (private builder: FormBuilder) {
	}

	get formContactName() {
		return this.formContact.get('name') as FormControl;
	}
	get formContactMail() {
		return this.formContact.get('email') as FormControl;
	}
	get formContactMessage() {
		return this.formContact.get('message') as FormControl;
	}

	ngOnInit (): void {

	}

	sendForm() {
		console.log(this.formContact.value)
	}

}
