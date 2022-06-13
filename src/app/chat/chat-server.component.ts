import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatServerService } from './chat-server.service';

@Component({
  selector: 'app-chat-server',
  templateUrl: './chat-server.component.html',
  styleUrls: ['./chat-server.component.scss']
})
export class ChatServerComponent implements OnInit {
  messageForm : FormGroup = new FormGroup({
    newMessage: new FormControl('', Validators.required)
  });
  messageList: string[] = [];

  @Input() type : string = "general";
  @Input() channel : string = "tab-general";

  // Variables de Nico
  socketId : any;
  currentUser : string = ''; // pseudo de l'utilisateur connecté
  party = '';
  arrayDiscussion = [];

  constructor(private chatService: ChatServerService) { }

  ngOnInit(){

    localStorage.setItem('type', this.type);
    localStorage.setItem('channel', this.channel);

    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

	get formNewMessage() {
		return this.messageForm.get('newMessage') as FormControl;
	}

  sendMessage() {
    if(this.messageForm.get('newMessage') != null){
      this.chatService.sendMessage( this.messageForm.value );
    }
    this.messageForm = new FormGroup({
      newMessage: new FormControl('', Validators.required)
  });

	// feat/chat <---- Nico, ce que j'ai fais hier et ça marche, mais Aimee a rajouter ça au dessus depuis
  // onChange(event: Event) {
	//   console.debug(event.target);
  // }
  //
  // sendMessage() {
	//   console.debug(this);

	  // let test = this.chatService.sendMessage(this.newMessage);
    // this.newMessage = '';

	// return false;
  // }

}
