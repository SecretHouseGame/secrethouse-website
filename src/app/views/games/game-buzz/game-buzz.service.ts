import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Buzz } from '../../../interfaces/buzz';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {
	private getPlayersURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-website/players';
	private getBuzzURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-website/buzz';
	private postBuzzURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-website/buzz';
	private error = '';

	constructor(private httpClient: HttpClient) { }

	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.getPlayersURL);
	}

	public getOngoingBuzz(): Observable<Buzz> {
		// TODO call api pour vérifier s'il y a un buzz en cours
		return this.httpClient.get<Buzz>(this.getBuzzURL);
	}

	public sendBuzz(formValues: any) {
		// TODO call api pour save le buzz et définir le player 1 comme buzzeur et l'autre comme buzz

		// doit retirer cagnotte et bloquer autres buzz

		console.log(formValues);
		// doit contenir : 
		// - currentplayer
		// - selectedplayer
		// - selectedplayersecret

		return this.httpClient.post<Buzz>(this.postBuzzURL, {formValues : formValues});
	}

	public respondBuzz(confirmState : string, buzzId : number){
		// string "true", "false", "almost"
		return this.httpClient.post<string>(this.postBuzzURL, {confirmState : confirmState, buzzId : buzzId}).subscribe(data => {
			console.log(data);
		});
	}
}
