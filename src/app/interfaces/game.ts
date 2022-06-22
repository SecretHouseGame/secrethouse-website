import { DatePipe } from "@angular/common";
import {User} from './user';

export interface Game {
    id : number,
    maxPlayers : number,
    startDate : DatePipe,
    endDate : DatePipe,
	eventIntervalQty : number,
	eventIntervalUnity: string,
	eliminationDelayQty: number,
	eliminationDelayUnity: string,
    ownerId : User
}
