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

	/** Récupérer tous les habitants */
	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(`${this.fakeDbUrl}/players`);
	}

}
