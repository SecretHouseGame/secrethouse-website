import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root',
})

export class ChatServerService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:3000');

  public sendMessage(message : string) {
    this.socket.emit('tab-general', 'fake-username', 'fake-userIdTo', 'fake-userIdfrom', message, '123');
  }

  public getNewMessage = () => {
    this.socket.on('message_123', (data) => {
		this.message$.next(data.message);
    });

    return this.message$.asObservable();
  };
}
