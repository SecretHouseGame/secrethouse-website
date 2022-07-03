import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {StoreService} from "../store/store.service";

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	socket:any;

	constructor (private storeService:StoreService) {
		this.init();
	}

	init(){
		this.socket = io('http://localhost:4000');
		this.socket.on("player-join",(playerId:string)=>{
			console.log(playerId);
		})

		this.socket.on("game-joined",(players:string)=>{
			console.log(players);
		})
	}

	joinRoom(roomId:string){
		this.socket.emit("join-room",roomId);
		this.storeService.currentRoom = roomId;
	}

	leaveRoom(roomId:string){
		this.socket.emit("leave-room",roomId);
	}

	joinGame(){
		this.socket.emit("join-game",this.storeService.currentPlayer.id,this.storeService.gameId);
	}

	sendMessage(message:string){
		this.socket.emit("msg",this.storeService.currentRoom,message);
	}

	/* onNewMessage (){
		this.socket.on("receive-msg", (data: object) => {
			this.message$.next(JSON.stringify(data));
		});

		return this.message$.asObservable();
	};*/
}
