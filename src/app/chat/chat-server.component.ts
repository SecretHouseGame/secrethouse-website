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
	messageList: { content: string, isCurrentUser: boolean, imageUrl:string }[] = [];

	constructor(private chatService: ChatServerService) {
	}

	ngOnInit() {
		localStorage.setItem('type', this.type);
		localStorage.setItem('channel', this.channel);

		this.chatService.getNewMessage().subscribe((message: string) => {
			this.messageList.push({content: message, isCurrentUser: false, imageUrl: 'https://pkimgcdn.peekyou.com/dfd8bab38ab56d2b89dac1dad40b9e1e.jpeg'});
		})
	}

	get formNewMessage() {
		return this.messageForm.get('newMessage') as FormControl;
	}

	sendMessage() {
		this.chatService.sendMessage(this.newMessage);
		console.log(this.messageList);

		this.messageList.push({content:this.newMessage, isCurrentUser: true, imageUrl: 'https://pkimgcdn.peekyou.com/dfd8bab38ab56d2b89dac1dad40b9e1e.jpeg'})

		this.newMessage = '';

		return false;
	}

}
