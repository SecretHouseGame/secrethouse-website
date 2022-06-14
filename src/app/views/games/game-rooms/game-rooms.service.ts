import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../../interfaces/room';
import { RoomGame } from '../../../interfaces/room_game';
import { Player } from '../../../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class GameRoomsService {
	private getRoomsURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb/rooms';
	private getRoomPlayersURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb/players';

	constructor(private httpClient: HttpClient) { }

	/** Récupérer tous les pièces */
	public getRooms(): Observable<Room[]> {
		return this.httpClient.get<Room[]>(this.getRoomsURL);
	}

  /** Récupérer tous les pièces */
  public getRoomPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.getRoomPlayersURL);
	}

}
