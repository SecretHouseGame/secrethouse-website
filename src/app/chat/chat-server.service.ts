import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { ChatMessage } from '../interfaces/chat-message';

@Injectable({
  providedIn: 'root',
})

export class ChatServerService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message : string) {
    // Tab-general : dédié à la room
    // Fake-username : pseudo de l'utilisateur qui envoie le message
    // Fake useridto : peut être vide, mais envoyé à un user en particulier
    // userIdFrom : id de l'user qui envoie le message
    // Message : contenu du message envoyé
    // Identifiant de la game
    this.socket.emit('tab-general', 'fake-username', 'fake-userIdTo', 'fake-userIdfrom', message, '123');
  }

  public getNewMessage = () => {
    this.socket.on('message_123', (data) => {
      console.log(data);
		  this.message$.next(data.message);
    });

    return this.message$.asObservable();
  };
}
