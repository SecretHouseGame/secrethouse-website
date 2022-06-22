import {Room} from "./room";
import {Game} from "./game";

export interface RoomGame {
    id: number,
    room: Room,
    game: Game,
    isLocked: boolean,
    socketId ?: string,
}
