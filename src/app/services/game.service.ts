import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	isPlaying: boolean = false

	constructor () {
	}
}
