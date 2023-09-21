import {container} from "tsyringe";
import UserRepository from "../mySqlPrismaRepository/user.repository";
import AuthInfraService from "../services/auth/auth.infra";
import TaskRepository from "../mySqlPrismaRepository/task.repository";
import {GoogleOAuth2Infra} from "../services/thirdparty/googleOAuth2.infra";

container.register("IUserRepository", {useClass: UserRepository});
container.register("ITaskRepository", {useClass: TaskRepository});
container.register("IAuthInfra", {useClass: AuthInfraService});
container.register("IOAuth2Infra", {useClass: GoogleOAuth2Infra});

export default container;

