import {container} from "tsyringe";
import UserRepository from "../mySqlPrismaRepository/user.repository";
import AuthInfraService from "../services/auth/auth.infra";
import TaskRepository from "../mySqlPrismaRepository/task.repository";

container.register("IUserRepository", {useClass: UserRepository});
container.register("ITaskRepository", {useClass: TaskRepository});
container.register("IAuthInfra", {useClass: AuthInfraService});
export default container;

