import { DatePipe } from "@angular/common";

export interface Game {
    id : number,
    maxPlayers : number,
    startDate : DatePipe,
    endDate : DatePipe,
    eventIntervalUnity: string,
    eliminationDelayUnity: string,
    eventIntervalQty : number,
    eliminiationDelayQty: number,
    // ownerId : User
}
