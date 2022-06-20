import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Buzz } from '../../../interfaces/buzz';
import { Observable } from 'rxjs';
import { HttpService } from "../../../services/http.service";

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {

	constructor(private httpClient: HttpClient, public httpService: HttpService) { }

	/** Récupérer UN habitant */
	public getCurrentPlayer(): Observable<Player> {
		return this.httpClient.get<Player>(`${this.httpService.fakeDbUrl}/currentPlayer`);
	}

	/** Vérifie si un buzz est en cours */
	public getOngoingBuzz(): Observable<Buzz> {
		return this.httpClient.get<Buzz>(`${this.httpService.fakeDbUrl}/buzz`);
	}

	/** Sauvegarde le buzz */
	public sendBuzz(formValues: any) {
		// TODO Back : doit retirer cagnotte et bloquer autres buzz

		console.log(formValues);
		// formValues contient ces valeurs :
		// - currentplayer : number (celui qui buzz)
		// - selectedplayer : number (celui qui est buzzé)
		// - selectedplayersecret : string

		return this.httpClient.post<Buzz>(`${this.httpService.fakeDbUrl}/buzz`, {
			formValues : formValues
		});
	}

	public respondBuzz(confirmState : string, buzzId : number): Observable<any> {
		// TODO Back : Ajouter notif aux autres utilisateurs !
		// TODO Back : Clore le buzz pour permettre de buzzer à nouveau

		// renvoit une string : "true", "false", "almost"
		return this.httpClient.post<string>(`${this.httpService.fakeDbUrl}/buzz`, {
			confirmState : confirmState,
			buzzId : buzzId
		});
	}
}
