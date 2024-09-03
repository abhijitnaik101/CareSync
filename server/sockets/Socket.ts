import { Server } from "socket.io";
import { Server as HTTPServer } from "http";


export const initializeSockets = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust this to match your client origin
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket : any) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};
