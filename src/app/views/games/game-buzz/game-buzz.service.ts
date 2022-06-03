import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {
	private url = 'https://mocki.io/v1/0f5fda6c-e156-4d4f-9b9f-de7bc5c8791d';

	constructor(private httpClient: HttpClient) { }

	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.url);
	}
}
