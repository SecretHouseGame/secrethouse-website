import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Player } from "../interfaces/player";

@Injectable({
	providedIn: 'root'
})

export class HttpService {
	private fakeDbUrl = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb'

	constructor (public httpClient: HttpClient) {
	}

	/** Récupérer le personnage du joueur **/
	public getCurrentPlayer(): Observable<Player> {
		return this.httpClient.get<Player>(`${this.fakeDbUrl}/currentPlayer`)
	}
	public updateCurrentPlayer(body: object): Observable<Player> {
		return this.httpClient.put<Player>(`${this.fakeDbUrl}/currentPlayer`, body);
	}

	/** Récupérer tous les habitants */
	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(`${this.fakeDbUrl}/players`);
	}
	// todo : update players when updated currentPlayer

}
