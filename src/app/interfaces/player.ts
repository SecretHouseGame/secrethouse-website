export interface Player {
    id : number,
    name ?: string,
	age ?: string,
    cagnotte ?: number,
	bio ?: string,
    secret ?: string,
    avatar ?: string,
    genre ?: string,
    // userId : User,
    // gameId : Game,

    isReady ?: boolean,
    isBuzzed ?: boolean,
    canBuzz ?: boolean,
    canBeBuzzed ?: boolean,
    isNominated ?: boolean,
    isEliminated ?: boolean,
}
