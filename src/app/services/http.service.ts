import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Player} from "../interfaces/player";
import {Room} from "../interfaces/room";
import {StoreService} from "../store/store.service";

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
		return this.httpClient.post<any>(`${this.dbUrl}/login`, {
			"email": email,
			"password": password
		});
	}

	public register(username: string, email: string, password: string): Observable<any> {
		return this.httpClient.post<any>(`${this.dbUrl}/register`, {
			"username": username,
			"email": email,
			"password": password
		});
	}

	// FIXME !
	public createGame(maxPlayers : number, eventIntervalQty: number, eliminationDelayQty : number):Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
		}

		return this.httpClient.post<any>(`${this.dbUrl}/games`, {
			"maxPlayers": maxPlayers,
			"eventIntervalQty": eventIntervalQty,
			"eliminationDelayQty": eliminationDelayQty
		}, options)
	}

	public joinGame(): Observable<number> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
		}

		return this.httpClient.get<number>(`${this.dbUrl}/`, options);
	}

	public createPlayer(name: string, secret: string, gender: string, gameCode: string) : Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
		}

		return this.httpClient.post<any>(`${this.dbUrl}/players`, {
			"name": name,
			"secret": secret,
			"gender": gender,
			"gameCode": gameCode
		}, options);
	}

	// todo : get currently waiting for a game to start

	// todo : game id dans l'url ?
	public getGameResidents(gameId: number) : Observable<Player[]> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
		}

		return this.httpClient.get<Player[]>(`${this.dbUrl}/games/${gameId}/players`, options);
	}

	public getSecrets(gameId: number) : Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
		}

		return this.httpClient.get<any>(`${this.dbUrl}/games/${gameId}/secrets`, options);
	}

	/** Récupérer le personnage du joueur **/
	public getCurrentPlayer(): Observable<Player> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
		}
		return this.httpClient.get<Player>(`${this.dbUrl}/currentPlayer`, options)
	}

	public updateCurrentPlayer(body: object): Observable<Player> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
		}
		return this.httpClient.put<Player>(`${this.dbUrl}/currentPlayer`, body, options);
	}

	/** Récupérer tous les habitants */
	public getPlayers(): Observable<any> {
		const options = {
			headers: new HttpHeaders()
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
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
				.set('Authorization',  `Basic ${localStorage.getItem("accessToken")}`)
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
