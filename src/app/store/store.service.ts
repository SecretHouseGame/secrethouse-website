import { Injectable } from '@angular/core';
import { Player } from "../interfaces/player";
import { Room } from "../interfaces/room";
import {User} from "../interfaces/user";
import {BehaviorSubject} from "rxjs";
import {ChatMessage} from "../interfaces/chat-message";

@Injectable({
	providedIn: 'root'
})
export class StoreService {

	playersSource : BehaviorSubject<Array<Player>> = new BehaviorSubject<Array<Player>>([]);
	playersInRoomSource : BehaviorSubject<Array<Player>> = new BehaviorSubject<Array<Player>>([]);
	connected : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	players: Player[] = []
	rooms: Room[] = [
		<Room>{id:1,name:"terrasse"},
		<Room>{id:1,name:"cuisine"},
		<Room>{id:1,name:"balcon"},
		<Room>{id:1,name:"salle de bain"},
		<Room>{id:1,name:"salon"},
		<Room>{id:1,name:"chambre"},
		<Room>{id:1,name:"piscine"},
	];
	user: User = {} as User;
	gameId:number = 0;
	gameCode: string = "";
	token: string = "";
	currentPlayer: Player = {} as Player;
	currentRoom: string ="";

	incomingMessageSource:BehaviorSubject<ChatMessage> = new BehaviorSubject({} as ChatMessage);

	constructor () {
	}

	isConnected (){
		return this.connected.asObservable();
	}

	saveToken(token:string){
		this.token = token;
		this.connected.next(true);
	}

	savePlayers = (players: Player[]) => {
		this.players = players
	}

	addPlayer(player:Player) {
		const currentValue = this.playersSource.getValue();
		const updatedValue = [...currentValue, player];
		this.playersSource.next(updatedValue);
		this.savePlayers(this.playersSource.getValue());
	}

	addPlayers(players:Player[]) {
		const currentValue = this.playersSource.getValue();
		const updatedValue = [...currentValue, ...players];
		this.playersSource.next(updatedValue);
		this.savePlayers(this.playersSource.getValue());
	}

	getPlayers(){
		return this.playersSource.asObservable();
	}

	getPlayersInRoom(){
		return this.playersInRoomSource.asObservable();
	}

	addPlayerInRoom(player:Player) {
		const currentValue = this.playersInRoomSource.getValue();
		const updatedValue = [...currentValue, player];
		this.playersInRoomSource.next(updatedValue);
	}

	findPlayer(playerId:number){
		return this.players.find(player => player.id === playerId);
	}

	getIncomingMessage(){
		return this.incomingMessageSource.asObservable();
	}

	cleanIncomingMessage(){
		this.incomingMessageSource.next({} as ChatMessage);
	}

	setIncomingMessage(message:string, owner:boolean, name:string){
		let chatMessage = <ChatMessage>{
			channel:"tab-general",
			gameId: this.gameId.toString(),
			roomId:this.currentRoom,
			username: name,
			isCurrentUser: owner,
			message:message
		};
		this.incomingMessageSource.next(chatMessage);
	}

	saveRooms = (rooms: Room[]) => {
		this.rooms = rooms
	}

	saveCurrentRoom = (room:string) =>{
		this.currentRoom = room;
	}

	saveCurrentPlayer = (player:Player) =>{
		this.currentPlayer = player;
	}

	saveGameId = (gameId:number) =>{
		this.gameId = gameId;
	}

	saveGameCode(code: string) {
		this.gameCode = code;
	}

	removePlayerInRoom(playerId: number) {
		const players: Player[] = this.playersInRoomSource.getValue();

		players.forEach((item, index) => {
			if (item.id=== playerId) { players.splice(index, 1); }
		});

		this.playersInRoomSource.next(players);
	}

	removePlayersInRoom() {
		this.playersInRoomSource.next([]);
	}
}
