export interface ChatMessage {
	channel : string,
	gameId : string,
	roomId : string,
	username : string,
	message : string,
	isCurrentUser : boolean
}
