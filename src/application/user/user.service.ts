import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../domain/ports/userRepository.port";

@injectable()
class UserService {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

    async createNewUser() {}
}

export default UserService;

