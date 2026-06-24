import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../api";

// export const ClientSocket: Socket = io(API_BASE_URL)
export const ClientSocket: Socket = io(API_BASE_URL, {
	autoConnect: false,
});