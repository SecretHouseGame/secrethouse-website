import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatServerService} from './chat-server.service';
import {ChatMessage} from '../interfaces/chat-message';
import {Player} from '../interfaces/player';
import slugify from "slugify";

@Component({
	selector: 'app-chat-server',
	templateUrl: './chat-server.component.html',
	styleUrls: ['./chat-server.component.scss']
})
export class ChatServerComponent implements OnInit {
	messageForm: FormGroup = new FormGroup({
		newMessage: new FormControl('', Validators.required)
	});

	@Input() id: string = "tab-general";
	@Input() roomName: string = "Général";
	@Input() channel: string = "tab-general";

	// Variables de Nico
	newMessage!: string;
	socketId: any;
	currentUser: Player = {
		"id":1,
		"name":"Catherine",
		"jackpot":0,
		"secret":"",
		"canBuzz": true,
		"canBeBuzzed": true
	} as Player;
	party :string = '123';
	arrayDiscussion = [];

	userDefaultAvatar : string = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
	messageList: ChatMessage[] = [];

	constructor(private chatService: ChatServerService) {
	}

	ngOnInit() {
		this.chatService.getNewMessage(this.party, slugify(this.roomName)).subscribe((data: string) => {
			console.debug(data);
            if(data){
                let chatMessage: ChatMessage = JSON.parse(data);
                console.debug(chatMessage);
                if(chatMessage){
                    this.messageList.push(chatMessage);
                }
                this.chatScroll();
            }
		})
	}

	chatScroll () {
		let chat : HTMLElement | null;

		if (this.channel === 'tab-general') {
			chat = document.querySelector('#zone-chat-' + slugify(this.roomName));
		} else {
			chat = document.querySelector('#zone-chat-' + this.channel);
		}

		if (chat) {
			chat.scroll({
				top: chat.scrollHeight, behavior: "smooth"
			})
		}
	}

	get formNewMessage() {
		return this.messageForm.get('newMessage') as FormControl;
	}

	sendMessage() {
		if(this.currentUser && this.currentUser.name){
			let message: ChatMessage = {
				channel: this.channel,
				gameId: this.party,
				roomId: slugify(this.roomName),
				username: this.currentUser.name,
				message: this.newMessage,
				fromUserId: this.currentUser.id,
				targetUserId: null,
				isCurrentUser: true
			} as ChatMessage;

			this.chatService.sendMessage(
				this.channel,
				this.party,
				slugify(this.roomName),
				this.currentUser.name,
				this.newMessage,
				this.currentUser.id,
				null
			);

			this.messageList.push(message);

			this.newMessage = '';
			this.chatScroll();
		}

		return false;
	}

}
