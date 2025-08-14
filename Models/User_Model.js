import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    taskDate: {
        type: String,
        required: true
    }
}, {timestamps: true});


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [taskSchema],
        default: []
    }
}, {timestamps: true});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;