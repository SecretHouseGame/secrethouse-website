import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../../interfaces/player';
import { HttpService } from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class GameRoomsService {

	constructor(private httpClient: HttpClient, public httpService: HttpService) { }

  	/** Récupérer tous les pièces */
 	public getRoomPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(`${this.httpService.fakeDbUrl}/players`);
	}

}
