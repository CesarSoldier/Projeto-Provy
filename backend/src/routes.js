import {Router} from "express";
import { getUsers, createUser, deleteUser } from "./controllers/UserControllers.js";


const routes = Router()

routes.get('/users', getUsers)
routes.post('/users', createUser)
routes.delete('/users/:id', deleteUser)
export default routes
