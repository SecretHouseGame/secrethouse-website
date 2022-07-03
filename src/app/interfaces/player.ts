import {User} from './user';
import {Game} from './game';

export interface Player {
	id: number,
	name: string,
	// todo : age?: string,
	jackpot: number,
	// todo : bio?: string,
	secret: string,
	// todo : handle avatar?: string,
	gender: string,
	user : number,
	game : number,

	isReady?: boolean,
	isBuzzed?: boolean,
	canBuzz?: boolean,
	canBeBuzzed?: boolean,
	isNominated?: boolean,
	isEliminated?: boolean,
	secretDiscovered: boolean
}
