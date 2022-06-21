export interface ChatMessage {
	channel : string,
	gameId : string,
	roomId : string,
	username : string,
	avatar : string | undefined,
	message : string,
	fromUserId : number,
	targetUserId : number | null,
	isCurrentUser : boolean
}
