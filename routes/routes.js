import { registerUser, loginUser } from "../controllers/user_controller.js";
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/task_controller.js";
import verifyToken from "../middlewares/verifyToken.js";

export function userRoutes(app){
   app.post("/register", registerUser); // api for registering the new user
   app.post("/login", loginUser); // api for handling login
}

export function taskRoutes(app){
   app.get("/tasks", verifyToken, getAllTasks); // api to fetch all the existing tasks per user
   app.post("/task", createTask); // api to create a task
   app.put("/task/:id", updateTask); // api to update the existing task
   app.delete("/task/:id", deleteTask); // api to delete the task
}