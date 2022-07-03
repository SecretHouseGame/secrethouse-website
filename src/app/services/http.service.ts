import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Player} from "../interfaces/player";
import {Room} from "../interfaces/room";
import {StoreService} from "../store/store.service";
import {User} from "../interfaces/user";
import {SocketService} from "./socket.service";

@Injectable({
	providedIn: 'root'
})

export class HttpService {
	// fixme : edit
	// public dbUrl = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb'
	public dbUrl = 'http://localhost:3000';

	constructor(public httpClient: HttpClient, public storeService: StoreService, public socketService:SocketService) {
	}

	public login(email: string, password: string): Observable<any> {
		return this.httpClient.post<any>(`${this.dbUrl}/auth/login`, {
			"email": email,
			"password": password
		}).pipe(
			tap((token) => {
				this.storeService.token= token
			})
		);
	}

	public register(username: string, email: string, password: string): Observable<any> {
		return this.httpClient.post<string>(`${this.dbUrl}/auth/register`, {
			"username": username,
			"email": email,
			"password": password
		}).pipe(
			tap((token) => {
				this.storeService.token= token
			})
		);
	}

	// FIXME !
	public createGame(maxPlayers : number, eventIntervalQty: number, eliminationDelayQty : number):Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}

		return this.httpClient.post<string>(`${this.dbUrl}/games`, {
			"maxPlayers": maxPlayers,
			"eventIntervalQty": eventIntervalQty,
			"eliminationDelayQty": eliminationDelayQty
		}, options).pipe(
			tap((code) => {
				console.log(code);
				this.storeService.gameCode= code
			})
		);
	}

	public createPlayer(name: string, secret: string, gender: string) : Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}

		return this.httpClient.post<Player>(`${this.dbUrl}/players`, {
			"name": name,
			"secret": secret,
			"gender": gender,
			"gameCode": this.storeService.gameCode
		}, options).pipe(
			tap((player) => {
				console.log(player);
				this.storeService.currentPlayer= player;
				this.storeService.gameId= player.game;
				this.socketService.joinGame();
			})
		);
	}

	// todo : get currently waiting for a game to start

	// todo : game id dans l'url ?
	public getGameResidents(gameId: number) : Observable<Player[]> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}

		return this.httpClient.get<Player[]>(`${this.dbUrl}/games/${gameId}/players`, options);
	}

	public getSecrets(gameId: number) : Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}

		return this.httpClient.get<any>(`${this.dbUrl}/games/${gameId}/secrets`, options);
	}

	/** Récupérer le personnage du joueur **/
	public getCurrentPlayer(): Observable<Player> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}
		return this.httpClient.get<Player>(`${this.dbUrl}/currentPlayer`, options)
	}

	public updateCurrentPlayer(body: object): Observable<Player> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}
		return this.httpClient.put<Player>(`${this.dbUrl}/currentPlayer`, body, options);
	}

	/** Récupérer tous les habitants */
	public getPlayers(): Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}
		return this.httpClient.get<any>(`${this.dbUrl}/players`, options)
			.pipe(
				tap((players) => {
					this.storeService.savePlayers(players)
				})
			);
	}

	/** Récupérer toutes les salles de la maison */
	public getRooms(): Observable<Room[]> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}
		return this.httpClient.get<Room[]>(`${this.dbUrl}/rooms`, options)
			.pipe(
				tap((rooms) => {
					this.storeService.saveRooms(rooms)
				})
			)
	}

	// todo : update players when updated currentPlayer
}
