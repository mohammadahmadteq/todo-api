import {container} from "tsyringe";
import UserRepository from "../user.repository";

container.register("IUserRepository", {useClass: UserRepository});
