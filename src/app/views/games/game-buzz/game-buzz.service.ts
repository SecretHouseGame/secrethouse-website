import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {
	private url = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-website/players';

	constructor(private httpClient: HttpClient) { }

	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.url);
	}

	public sendBuzz(formValues: any) {
		// TODO
		console.log(formValues);
	}


}
