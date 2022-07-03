import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root',
})

export class ChatServerService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('https://websocket.secrethouse.online');

  public sendMessage(
	  channel : string,
	  gameId : string,
	  roomId : string,
	  senderUsername : string,
	  message : string,
	  senderUserId : number,
	  targetUserId : number | null
  ) {
	  console.debug(channel, gameId, roomId, senderUsername, message, senderUserId, targetUserId);
	  this.socket.emit(channel, gameId, roomId, senderUsername, message, senderUserId, targetUserId);
  }

  //partyId, roomId, username, avatar, message, fromUserId, toUserId, type
  public getNewMessage = (gameId : string, roomId : string) => {
    this.socket.on('message_'+ gameId + '_' + roomId, (data: object) => {
		  this.message$.next(JSON.stringify(data));
    });

    return this.message$.asObservable();
  };
}
