import { io } from "..";

io.on("connection", (socket : any) => {
  console.log("A user connected:", socket.id);

  //send notification to receptionist
  socket.on('book-appointment', (data : any) => {
    socket.emit('book-appointment', data);
  })

  // **Queue Management**: Handle patient queue system
  socket.on('queue-update', (data : any) => {
    console.log('Queue Updated:', data);
    io.emit('queue-update', data); // Broadcast to all connected clients
  });

  // **Bed Management**: Handle real-time updates for bed availability
  socket.on('bed-status', (data: any) => {
    console.log('Bed Status Updated:', data);
    io.emit('bed-status', data); // Broadcast to all connected clients
  });

  // **OPD Management**: Handle OPD (Outpatient Department) updates
  socket.on('opd-update', (data: any) => {
    console.log('OPD Updated:', data);
    io.emit('opd-update', data);
  });

  // **Inventory Management**: Handle inventory system events
  socket.on('inventory-update', (data: any) => {
    console.log('Inventory Updated:', data);
    io.emit('inventory-update', data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
