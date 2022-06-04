export interface Player {
    id : number,
    name : string,
    cagnotte : number,
    secret : string,
    avatar: string,
    genre: string,
    // userId : User,
    // gameId : Game,

    isReady ?: boolean,
    isBuzzed ?: boolean,
    canBuzz ?: boolean,
    isNominated ?: boolean,
    isEliminated ?: boolean,
}
