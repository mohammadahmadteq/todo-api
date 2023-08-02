import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../domain/ports/userRepository.port";
import LoginDTO from "./dto/login.dto";
import UserEntity from "../../domain/entities/user.entity";
import {IAuthInfra} from "../../domain/ports/authInfra.port";

@injectable()
class AuthService {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        @inject("IAuthInfra") private authInfra: IAuthInfra
    ) {}

    async login(loginDto: LoginDTO) {
        const {email, password} = loginDto;
        const userDetails = await this.userRepository.getUserByEmail(email);
        const isPassword = await this.authInfra.verifyPassword(password, userDetails.password);
        const userEntity = UserEntity.create(userDetails);
        if (isPassword) {
            return this.authInfra.createJwtToken({...userEntity});
        }
        return undefined;
    }
}

export default AuthService;

