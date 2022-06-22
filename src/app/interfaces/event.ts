import {User} from './user';
import {Player} from "./player";
import {Game} from "./game";

export interface Event {
	id: number,
	content: string,
	user: User,
	player: Player,
	game: Game,
	type: string,
	status: string
}
