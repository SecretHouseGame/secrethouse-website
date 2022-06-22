import {Player} from "./player";
import {Event} from "./event";

export interface Buzz {
	id: number,
	buzzer: Player,
	event: Event,
	target: Player,
	secret: string,
	status: string
}
