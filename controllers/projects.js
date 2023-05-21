// import {v4 as uuidv4} from 'uuid';
import Project from '../models/project.js';
import jwt from "jsonwebtoken";
const secretKey="secretkey";
export const getProjects = async (req,res) =>{
  const projects = await Project.find()
  res.send(projects);
}

export const getSingleProject = async (req,res) =>{
  const name= req.params.name;
  const projects = await Project.find({name: name})
  res.send(projects);
}

export const createProject = async (req,res) =>{
  const name= req.body.name;
  const description = req.body.description;
  const members = req.body.members;
  const project = new Project({
    name: name,
    description: description,
    members: members
  })
  const newProjects=await project.save()
  const projects = await Project.find()
  res.send(projects);
}

export const createBug = async (req,res) =>{
  const projectName= req.body.projectName;
  const project = await Project.findOne({name: projectName})
  project.bugs.push({checked: false, description: req.body.description, members: req.body.members})
  project.save()
  res.send(project.expenses)
}

export const updateBug = async (req,res) =>{
  const body= req.body;
  const query = { description: req.body.description };
  const updates = {
    $set: { checked: req.body.checked }
  };
  let collection = await Project.findOne({name: req.body.projectName})
  // console.log(collection.bugs.findOne({description: req.body.description}))
  let bugs = collection.bugs.map((item) => {
    if(item.description === req.body.description) {
      item.checked = req.body.checked
    }
    return item
  })
  console.log(bugs)
  let doc = await Project.findOneAndUpdate({name: req.body.projectName}, {bugs:bugs});
  // await collection.save()
  const projects = await Project.find({name: req.body.projectName})
  res.send(projects);

  // let result = await collection.bugs.updateOne(query, updates);

  // console.log(collection)
  // console.log(result)
  // const project = await Project.findOne({name: projectName})
  // project.bugs.push({checked: false, description: req.body.description, members: req.body.members})
  // project.save()
  // res.send(project.expenses)
}
export const createTask = async (req,res) =>{
  const projectName= req.body.projectName;
  const project = await Project.findOne({name: projectName})
  project.tasks.push({checked: false, description: req.body.description, members: req.body.members})
  project.save()
  res.send(project.expenses)
}

export const updateTask = async (req,res) =>{
  const body= req.body;
  const query = { description: req.body.description };
  const updates = {
    $set: { checked: req.body.checked }
  };
  let collection = await Project.findOne({name: req.body.projectName})
  // console.log(collection.bugs.findOne({description: req.body.description}))
  let tasks = collection.tasks.map((item) => {
    if(item.description === req.body.description) {
      item.checked = req.body.checked
    }
    return item
  })
  console.log(tasks)
  let doc = await Project.findOneAndUpdate({name: req.body.projectName}, {tasks:tasks});
  // await collection.save()
  const projects = await Project.find({name: req.body.projectName})
  res.send(projects);
}


export const createDocuments = async (req,res) =>{
  const projectName= req.body.projectName;
  const project = await Project.findOne({name: projectName})
  project.documents.push({type: req.body.type, baseString: req.body.baseString, name: req.body.name})
  project.save()
  res.send(project)
}