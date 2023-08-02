import {container} from "tsyringe";
import UserRepository from "../mySqlPrismaRepository/user.repository";
import AuthInfraService from "../services/auth/auth.infra";

container.register("IUserRepository", {useClass: UserRepository});
container.register("IAuthInfra", {useClass: AuthInfraService});
export default container;

