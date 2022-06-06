import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {
	private url = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-website/players';
	private error = '';

	constructor(private httpClient: HttpClient) { }

	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.url);
	}

	public sendBuzz(formValues: any) {
		// TODO call api pour save le buzz et définir le player 1 comme buzzeur et l'autre comme buzzéconsole.log(formValues);
		// Currentplayer
		// selectedplayer
		// selectedplayersecret
		if(1){
			return true;
		} else {
			this.error = "test";
			return this.error;
		}
	}


}
