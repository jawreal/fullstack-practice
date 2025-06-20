import { Server, Socket } from "socket.io";

const users: Record<string, string> = {};

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Connected")
    socket.on("register", (userId: string) => {
      if (!userId) {
        console.log("Warning: userId is empty or undefined");
        return;
      }
      users[userId] = socket.id; //a property will get created, its key is string using userId and its value is socket.id 
      console.log(`Registered user ${userId}`)
    });
  });
};


