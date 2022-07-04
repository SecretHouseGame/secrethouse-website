import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {StoreService} from "../store/store.service";
import {HttpService} from "./http.service";
import {Player} from "../interfaces/player";
import {Router} from "@angular/router";
import {GameService} from "./game.service";

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	socket:any;

	constructor (private storeService:StoreService, private gameService:GameService, private router:Router, private httpService:HttpService) {
		this.init();
	}

	init(){
		this.socket = io('http://localhost:4000');

		this.socket.on("game-joined",(players:string)=>{
			console.log("gameJoined");
		})

		this.socket.on("game-started",()=>{
			console.log("gameStarted");
			this.gameService.isPlaying = true;
			this.router.navigate(['/game/play/1/residents']);
		})

		this.socket.on("room-joined",(players:number[])=>{
			console.log("room-joined");
			console.log(players);
			for(let playerId of players){
				let player = this.storeService.findPlayer(playerId);
				if(player){
					this.storeService.addPlayerInRoom(player);
				}
			}
		})

		this.socket.on("player-join-room",(playerId:number)=>{
			console.log("player-join-room");
			console.log(playerId);
			let player = this.storeService.findPlayer(playerId);
			if(player){
				this.storeService.addPlayerInRoom(player);
			}
		})

		this.socket.on("player-leave-room",(playerId:number)=>{
			console.log("player-left-room");
			console.log(playerId);
			this.storeService.removePlayerInRoom(playerId);
		})

		this.socket.on("player-join",(playerId:number)=>{
			console.log(playerId);
			this.httpService.getPlayer(playerId).subscribe();
		})

		this.socket.on("receive-msg", (data: any) => {
			const player = this.storeService.findPlayer(data.from);
			if(player)this.storeService.setIncomingMessage(data.msg, false, player.name);
		});
	}

	joinRoom(roomId:string){
		this.socket.emit("join-room",roomId);
		this.storeService.saveCurrentRoom(roomId);
	}

	leaveRoom(roomId:string){
		this.socket.emit("leave-room",roomId);
		this.storeService.removePlayersInRoom();
	}

	joinGame(){
		this.socket.emit("join-game",this.storeService.currentPlayer.id,this.storeService.gameId);
	}

	startGame(){
		this.gameService.isPlaying = true
		this.socket.emit("start-game");
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
