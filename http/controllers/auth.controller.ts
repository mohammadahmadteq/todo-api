import {inject} from "tsyringe";
import AuthService from "../../src/application/auth/auth.service";
import LoginDTO from "../../src/application/auth/dto/login.dto";
import container from "../../src/infrastructure/mySqlPrismaRepository/dependancyInjection/containers";
const authService = container.resolve(AuthService);

class AuthController {
    static async login(request: any, response: any) {
        console.log(request.body);
        const loginDto = new LoginDTO(request.body);
        const token = await authService.login(loginDto);

        if (token) {
            response.status(200).json({
                status: "success",
                token: token
            });
        } else {
            response.status(400).json({
                status: "error",
                message: "Not Found"
            });
        }
    }
}

export default AuthController;

