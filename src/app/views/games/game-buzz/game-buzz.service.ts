import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {
	private url = 'https://mocki.io/v1/7da6a7b5-2422-4feb-b5e8-9bb8d71b3e26';

	constructor(private httpClient: HttpClient) { }

	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.url);
	}
}
