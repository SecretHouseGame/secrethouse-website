import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatServerService} from './chat-server.service';

@Component({
	selector: 'app-chat-server',
	templateUrl: './chat-server.component.html',
	styleUrls: ['./chat-server.component.scss']
})
export class ChatServerComponent implements OnInit {
	messageForm: FormGroup = new FormGroup({
		newMessage: new FormControl('', Validators.required)
	});

	@Input() type: string = "general";
	@Input() channel: string = "tab-general";

	// Variables de Nico
	newMessage!: string;
	socketId: any;
	currentUser: string = ''; // pseudo de l'utilisateur connecté
	party = '';
	arrayDiscussion = [];
	messageList: string[] = [];

	constructor(private chatService: ChatServerService) {
	}

	ngOnInit() {
		localStorage.setItem('type', this.type);
		localStorage.setItem('channel', this.channel);

		this.chatService.getNewMessage().subscribe((message: string) => {
			this.messageList.push();
			console.log(this.messageList);
		})
	}

	get formNewMessage() {
		return this.messageForm.get('newMessage') as FormControl;
	}

	onChange(event: Event) {
		console.debug(event.target);
	}

	sendMessage() {
		this.chatService.sendMessage(this.newMessage);
		console.log(this.messageList);

		this.messageList.push(this.newMessage)

		this.newMessage = '';

		return false;
	}

}
