import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { Player } from "../interfaces/player";
import { Room } from "../interfaces/room";
import { StoreService } from "../store/store.service";

@Injectable({
	providedIn: 'root'
})

export class HttpService {
	public fakeDbUrl = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb'

	constructor (public httpClient: HttpClient, public storeService: StoreService) {
	}

	/** Récupérer tous les habitants */
	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(`${this.fakeDbUrl}/players`)
			.pipe(
				tap((players) => {
					this.storeService.savePlayers(players)
				})
			);
	}

	/** Récupérer toutes les salles de la maison */
	public getRooms(): Observable<Room[]> {
		return this.httpClient.get<Room[]>(`${this.fakeDbUrl}/rooms`)
			.pipe(
				tap((rooms) => {
					this.storeService.saveRooms(rooms)
				})
			)
	}

}
