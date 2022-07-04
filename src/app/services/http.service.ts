import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Player} from "../interfaces/player";
import {Room} from "../interfaces/room";
import {StoreService} from "../store/store.service";
import {Game} from "../interfaces/game";

@Injectable({
	providedIn: 'root'
})

export class HttpService {
	// fixme : edit
	// public dbUrl = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb'
	public dbUrl = 'http://localhost:3000';

	constructor(public httpClient: HttpClient, public storeService: StoreService) {
	}

	public login(email: string, password: string): Observable<any> {
		return this.httpClient.post<any>(`${this.dbUrl}/auth/login`, {
			"email": email,
			"password": password
		}).pipe(
			tap((token) => {
				console.log(token);
				this.storeService.saveToken(token);
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
				console.log(token);
				this.storeService.saveToken(token);
			})
		);
	}

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
				this.storeService.saveGameCode(code);
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
				this.storeService.saveCurrentPlayer(player);
				this.storeService.saveGameId(player.game.id);
			})
		);
	}

	public getGame(gameCode:string) : Observable<Game> {
		gameCode = gameCode.replace("#","");
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}

		return this.httpClient.get<Game>(`${this.dbUrl}/games/${gameCode}`, options).pipe(
			tap((game) => {
				console.log(game.id);
				this.storeService.saveGameId(game.id);
				this.storeService.saveGameCode(game.code);
			})
		);
	}

	public getSecrets() : Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}
		const gameId = this.storeService.gameId;
		return this.httpClient.get<any>(`${this.dbUrl}/games/${gameId}/secrets`, options);
	}

	/** Récupérer tous les habitants */
	public getPlayers(): Observable<Player[]> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}
		const gameId = this.storeService.gameId;
		return this.httpClient.get<Player[]>(`${this.dbUrl}/games/${gameId}/players`, options)
			.pipe(
				tap((players) => {
					console.log(players);
					this.storeService.playersSource.next(players)
				})
			);
	}

	public getPlayer(id:number): Observable<Player> {
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}
		return this.httpClient.get<Player>(`${this.dbUrl}/players/${id}`, options)
			.pipe(
				tap((player) => {
					this.storeService.addPlayer(player)
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
}
