function socketHandler(io, prisma) {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("add_task", async (taskData, callbackData) => {
      try {
        const newTask = await prisma.task.create({
          data: {
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            priority: taskData.priority,
            createdById: taskData.createdById,
            assignedTo: taskData.assignedTo,
            dueDate: taskData.dueDate,
            freelencerId: taskData.freelencerId,
            taskManagerOfferId: taskData.taskManagerOfferId || null,
          },
        });
        callbackData(newTask);
        io.emit("add_task", newTask);
      } catch (error) {
        console.log(error);
        callbackData({ error: error.message });
      }
    });
  });
}

module.exports = socketHandler;

