import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatServerService} from './chat-server.service';
import {ChatMessage} from '../interfaces/chat-message';
import {Player} from '../interfaces/player';

@Component({
	selector: 'app-chat-server',
	templateUrl: './chat-server.component.html',
	styleUrls: ['./chat-server.component.scss']
})
export class ChatServerComponent implements OnInit {
	messageForm: FormGroup = new FormGroup({
		newMessage: new FormControl('', Validators.required)
	});

	@Input() name: string = "Général";
	@Input() channel: string = "tab-general";

	// Variables de Nico
	newMessage!: string;
	socketId: any;
	currentUser: Player = {
		"id":1,
		"name":"Catherine",
		"avatar":"/assets/images/players/catherine.png",
		"cagnotte":0,
		"secret":"",
		"canBuzz": true,
		"canBeBuzzed": true
	};
	party = '';
	arrayDiscussion = [];
	userDefaultAvatar : string = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
	messageList: ChatMessage[] = [
		{content: "Salut ça va ?", isCurrentUser: false, imageUrl: this.userDefaultAvatar},
		{content: "Oui salut ça va et toi ?", isCurrentUser: true, imageUrl: this.userDefaultAvatar},
		{content: "Cool, il fait chaud..", isCurrentUser: false, imageUrl: this.userDefaultAvatar},
		{content: "OUI", isCurrentUser: true, imageUrl: this.userDefaultAvatar}
	];

	constructor(private chatService: ChatServerService) {
	}

	ngOnInit() {
		this.chatService.getNewMessage().subscribe((message: string) => {
			if(message){
				this.messageList.push({content: message, isCurrentUser: false, imageUrl: this.userDefaultAvatar});
			}
		})
	}

	get formNewMessage() {
		return this.messageForm.get('newMessage') as FormControl;
	}

	sendMessage() {
		if(this.currentUser && this.currentUser.name){
			this.chatService.sendMessage(this.newMessage, this.channel, this.currentUser.name, null, this.currentUser.id, 123);

			this.messageList.push({content:this.newMessage, isCurrentUser: true, imageUrl: this.userDefaultAvatar})
	
			this.newMessage = '';
		}
	
		return false;
	}

}
