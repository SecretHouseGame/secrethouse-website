import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GameService } from "../../../../../services/game.service";
import { HttpService } from "../../../../../services/http.service";
import { StoreService } from "../../../../../store/store.service";
import { GameLobbyService } from "../../game-lobby.service";
import {SocketService} from "../../../../../services/socket.service";
import {Player} from "../../../../../interfaces/player";

@Component({
	selector: 'app-lobby-step-lobby',
	templateUrl: './lobby-step-lobby.component.html',
	styleUrls: ['./lobby-step-lobby.component.scss']
})
export class LobbyStepLobbyComponent implements OnInit {

	isAdmin: boolean = true;
	players: Player[]= [];

	constructor (
		public lobbyService: GameLobbyService,
		public httpService: HttpService,
		public storeService: StoreService,
		public socketService: SocketService,
		private router: Router
	) {}

	ngOnInit (): void {
		this.httpService.getPlayers().subscribe()
		this.socketService.joinGame();
		this.storeService.getPlayers().subscribe((players)=>{
			this.players = players;
		})
	}

	get character () {
		return this.lobbyService.character
	}

	get gameCode (){
		return this.storeService.gameCode
	}

	characterGender () {
		return this.character.gender === 'male' ? 'Homme' : (this.character.gender === 'female' ? 'Femme' : 'Autre')
	}


	startGame () {
		this.socketService.startGame();
		this.router.navigate(['/game/play/1/residents'])
	}

}
