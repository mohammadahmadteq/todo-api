import {inject} from "tsyringe";
import AuthService from "../../src/application/auth/auth.service";
import LoginDTO from "../../src/application/auth/dto/login.dto";
import container from "../../src/infrastructure/dependancyInjection/containers";
import {LoginValidtion} from "../../src/domain/validations/auth.validation";
const authService = container.resolve(AuthService);

class AuthController {
    static async login(request: any, response: any) {
        try {
            LoginValidtion.parse(request.body);
        } catch (error) {
            response.status(400).json({
                status: "error",
                message: error
            });

            return;
        }
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

    static async oAuth2Login(request: any, response: any) {
        const token = await authService.oAuth2Login();

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

    static async oAuth2Callback(request: any, response: any) {
        const params = request.query;
        const token = await authService.oAuth2Callback(params.code);

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

