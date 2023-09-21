import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../domain/ports/userRepository.port";
import LoginDTO from "./dto/login.dto";
import UserEntity from "../../domain/entities/user.entity";
import {IAuthInfra} from "../../domain/ports/authInfra.port";
import {IOAuth2Infra} from "../../domain/ports/oAuth2Infra.port";
import UserService from "../user/user.service";
import container from "../../infrastructure/dependancyInjection/containers";
import {v4 as uuidv4} from "uuid";

@injectable()
class AuthService {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        @inject("IAuthInfra") private authInfra: IAuthInfra,
        @inject("IOAuth2Infra") private oAuth2Infra: IOAuth2Infra
    ) {}

    async login(loginDto: LoginDTO) {
        const {email, password} = loginDto;
        const userDetails = await this.userRepository.getUserByEmail(email);
        if (userDetails) {
            const isPassword = await this.authInfra.verifyPassword(
                password,
                userDetails.password ? userDetails.password : ""
            );
            const userEntity = UserEntity.create(userDetails);
            if (isPassword) {
                return this.authInfra.createJwtToken({...userEntity});
            }
            return undefined;
        }
        return undefined;
    }

    async oAuth2Login() {
        const authUrl = this.oAuth2Infra.getUrl();
        return authUrl;
    }

    async oAuth2Callback(code: string) {
        const token = await this.oAuth2Infra.getToken(code);
        const tokenInfo = await this.oAuth2Infra.getTokenInfo(token.access_token);
        const userDetails = await this.userRepository.getUserByEmail(tokenInfo.email);

        if (userDetails) {
            const jwtToken = this.authInfra.createJwtToken({
                oAuthRefreshToken: token.refresh_token,
                email: userDetails.email,
                userId: userDetails.userId
            });

            return jwtToken;
        } else {
            const userEntity = UserEntity.create({
                email: tokenInfo.email,
                userId: uuidv4(),
                password: null,
                isPassword: false
            });

            await this.userRepository.createNewUser(userEntity);

            const jwtToken = this.authInfra.createJwtToken({
                oAuthRefreshToken: token.refresh_token,
                email: userEntity.email,
                userId: userEntity.userId
            });

            return jwtToken;
        }
    }
}

export default AuthService;

