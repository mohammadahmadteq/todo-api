import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../domain/ports/userRepository.port";
import LoginDTO from "./dto/login.dto";

@injectable()
class AuthService {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

    async login(loginDetails: LoginDTO) {
        return await [];
    }
}

export default AuthService;

