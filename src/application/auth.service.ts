import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../domain/ports/userRepository.port";

@injectable()
class AuthService {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

    async login() {
        return await [];
    }
}

export default AuthService;

