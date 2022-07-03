import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Player } from '../../../interfaces/player';
import { Buzz } from '../../../interfaces/buzz';
import { Observable } from 'rxjs';
import { HttpService } from "../../../services/http.service";
import {FormControl, Validators} from "@angular/forms";
import {StoreService} from "../../../store/store.service";

@Injectable({
	providedIn: 'root'
})

export class GameBuzzService {

	constructor(private httpClient: HttpClient, public httpService: HttpService, public storeService:StoreService) { }

	/** Récupérer UN habitant */
	public getCurrentPlayer(): Observable<Player> {
		return this.httpClient.get<Player>(`${this.httpService.dbUrl}/currentPlayer`);
	}

	/** Vérifie si un buzz est en cours */
	public getOngoingBuzz(): Observable<Buzz> {
		return this.httpClient.get<Buzz>(`${this.httpService.dbUrl}/buzz`);

        // "buzz" : {
        //     "buzzId" : 4545,
        //     "targetPlayerId" : 15,
        //     "acterPlayerId" : 1,
        //     "secretGuessed" : "elle a fait le djihad"
        //  },
	}

	/** Sauvegarde le buzz */
	public createBuzz(currentPlayer: number, selectedPlayer: number, selectedPlayerSecret: string) {
		// TODO Back : doit retirer cagnotte et bloquer autres buzz

		const body = {
			"content": "",
			"gameId": localStorage.getItem("gameId"),
			"secret": selectedPlayerSecret,
			"targetId": selectedPlayer
		}
		const options = {
			headers: new HttpHeaders()
				.set('token',  `${this.storeService.token}`)
		}

		return this.httpClient.post<any>(`${this.httpService.dbUrl}/buzz`, body, options);
	}

	public respondBuzz(confirmState : string, buzzId : number): Observable<any> {
		// TODO Back : Ajouter notif aux autres utilisateurs !
		// TODO Back : Clore le buzz pour permettre de buzzer à nouveau

		let status: string = '';
		if (confirmState === "true") {
			status = "CORRECT";
		} else {
			status = "WRONG";
		}
		// renvoit une string : "true", "false", "almost"
		return this.httpClient.post<string>(`${this.httpService.dbUrl}/buzzs/${buzzId}`, {
			status : status,
			buzzId : buzzId
		});
	}
}
