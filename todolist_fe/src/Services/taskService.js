import config from "../config.js"
import axios from "axios"
import { jwtDecode } from "jwt-decode";

const URL_API_TASK = config.API_BACKEND_URL + "/task"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjBjNGFlZTYwMWQzMTg5NmRmNzBkMSIsIm5hbWUiOiJqaG9uIiwiZW1haWwiOiJqaG9uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiIiwiaWF0IjoxNzc0NDA2MDk2LCJleHAiOjE3NzQ0MDk2OTZ9.FvvZ0OxlxAT6e6g7PWxmpSmjwdB6XbTE1zSKokHV1l4"
const userId = jwtDecode(token).id;

const createTask = async(body)=>{ 
  try {
    body.UserId = userId
    const response = await axios.post(URL_API_TASK, body,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return error.response.data
  }  
}

const getTasks = async()=>{
  try {
    const response = await axios.get(URL_API_TASK,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}


const updateTask = async()=>{
  
}
const deleteTask = async()=>{
  
}

export default {
  createTask,
  updateTask,
  deleteTask,
  getTasks
}