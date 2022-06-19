import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Buzz } from '../../../interfaces/buzz';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {
	private getPlayersURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb/players';
	private getCurrentPlayersURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb/currentPlayer';
	private getBuzzURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb/buzz';
	private postBuzzURL = 'https://my-json-server.typicode.com/SecretHouseGame/secrethouse-fakedb/buzz';

	constructor(private httpClient: HttpClient) { }

	/** Récupérer tous les habitants */
	public getPlayers(): Observable<Player[]> {
		return this.httpClient.get<Player[]>(this.getPlayersURL);
	}

	/** Récupérer UN habitant */
	public getCurrentPlayer(): Observable<Player> {
		return this.httpClient.get<Player>(this.getCurrentPlayersURL);
	}

	/** Vérifie si un buzz est en cours */
	public getOngoingBuzz(): Observable<Buzz> {
		return this.httpClient.get<Buzz>(this.getBuzzURL);
	}

	/** Sauvegarde le buzz */
	public sendBuzz(formValues: any) {
		// TODO Back : doit retirer cagnotte et bloquer autres buzz

		console.log(formValues);
		// formValues contient ces valeurs : 
		// - currentplayer : number (celui qui buzz)
		// - selectedplayer : number (celui qui est buzzé)
		// - selectedplayersecret : string

		return this.httpClient.post<Buzz>(this.postBuzzURL, {formValues : formValues});
	}

	public respondBuzz(confirmState : string, buzzId : number): Observable<any> {
		// TODO Back : Ajouter notif aux autres utilisateurs !
		// TODO Back : Clore le buzz pour permettre de buzzer à nouveau

		// renvoit une string : "true", "false", "almost"
		return this.httpClient.post<string>(this.postBuzzURL, {confirmState : confirmState, buzzId : buzzId});
	}
}
