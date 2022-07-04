import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatMessage} from '../interfaces/chat-message';
import slugify from "slugify";
import {StoreService} from "../store/store.service";
import {SocketService} from "../services/socket.service";

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

	userDefaultAvatar : string = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
	messageList: ChatMessage[] = [];

	constructor(private storeService:StoreService, private socketService:SocketService) {
	}

	ngOnInit() {
		this.storeService.getIncomingMessage().subscribe((message) =>{
			if(message.message){
				console.debug(message);
				this.messageList.push(message);
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
		this.storeService.setIncomingMessage(this.newMessage, true,this.storeService.currentPlayer.name);
		this.socketService.sendMessage(this.newMessage);
		this.newMessage = '';
		this.chatScroll();
	}

}
