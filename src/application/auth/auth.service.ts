import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../domain/ports/userRepository.port";
import LoginDTO from "./dto/login.dto";
import AuthInfraService from "../../infrastructure/services/auth/auth.infra";
import UserEntity from "../../domain/entities/user.entity";

@injectable()
class AuthService {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

    async login(loginDto: LoginDTO) {
        const {email, password} = loginDto;
        const userDetails = await this.userRepository.getUserByEmail(email);
        const isPassword = await AuthInfraService.verifyPassword(password, userDetails.password);
        const userEntity = UserEntity.create(userDetails);
        if (isPassword) {
            return AuthInfraService.createJwtToken({...userEntity});
        }
        return undefined;
    }
}

export default AuthService;

