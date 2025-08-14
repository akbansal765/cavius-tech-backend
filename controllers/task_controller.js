import UserModel from "../Models/User_Model.js";

export async function getAllTasks(req, res){
    try{
        //finding a user
        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        //getting tasks from user
        const tasks = user.tasks;
        if(tasks.length == 0){
            return res.status(404).json({message: 'Empty Cart'});
        }
        return res.status(200).json(user.tasks);
    }catch(err){
        return res.status(500).json({message: "Unable to fetch tasks! Kindly try again later",
                                     error: err.message
                                    });
    }
}

export async function createTask(req, res){
    try{
        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const {taskId, title, description, status, priority, taskDate} = req.body;
        user.tasks.push({taskId, title, description, status, priority, taskDate});
        await user.save();

        return res.status(201).json({message: "Task has been added!!"})
    }catch(err){
        return res.status(500).json({message: "Unable to add task! Kindly try again later",
                                     error: err.message
                                    });
    }
}

export async function updateTask(req, res){
    try{
        const taskId = req.params.id;

        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const index = user.tasks.findIndex(task => task.taskId == taskId);
        if(index == -1){
            return res.status(404).json({messsage: "Task not found!!"})
        }
        user.tasks[index] = req.body;

        await user.save();

        return res.status(200).json({message: "Task has been updated!!"})
    }catch(err){
        return res.status(500).json({message: "Unable to update the task! Kindly try again later",
                                     error: err.message
                                    });
    }
}

export async function deleteTask(req, res){
    try{
        //getting task id from request params
        const taskId = req.params.id;

        const email = req.query.email;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const index = user.tasks.findIndex(task => task.taskId == taskId);
        if(index == -1){
            return res.status(404).json({messsage: "Task not found!!"})
        }
        user.tasks.splice(index, 1);
        await user.save();

        return res.status(200).json({message: "Task has been deleted!!"})
    }catch(err){
        return res.status(500).json({message: "Unable to delete the task! Kindly try again later",
                                     error: err.message
                                    });
    }
}