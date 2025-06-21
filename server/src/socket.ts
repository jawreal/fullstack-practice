import { Server, Socket } from "socket.io";

interface Message {
  to: string;
  from: string;
  message: string;
};

const users: Record<string, string> = {};

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Connected")
    socket.on("register", (username: string) => {
      if (!username) {
        console.log("Warning: username is empty or undefined");
        return;
      }
      users[username] = socket.id; //a property will get created, its key is string using userId and its value is socket.id 
      console.log(`Registered user ${username}`)
    });
    
    socket.on("private_message", ({ to, from, message }: Message) => {
      const receiverSocketId = users[to];
      const senderSocketId = users[from]; // Get sender's socket ID
      const messageData = { from, message };
      // Send to receiver
      if(receiverSocketId){
        io.to(receiverSocketId).emit("private_message", messageData);
      }
  
  // Send back to sender
      if(senderSocketId){
        io.to(senderSocketId).emit("private_message", messageData);
       }
   });
  });
};


