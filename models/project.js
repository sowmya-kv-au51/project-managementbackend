import mongoose from "mongoose";

const projectSchema= new mongoose.Schema({
    name: String,
    description: String,
    members: Array,
    bugs: Array,
    tasks: Array,
    documents: Array
});

const Project = mongoose.model("Project", projectSchema)

export default Project;