import AuthInfraService from "../../src/infrastructure/services/auth/auth.infra";
import {GoogleOAuth2Infra} from "../../src/infrastructure/services/thirdparty/googleOAuth2.infra";

const jwtAuthMiddleWare = (request: any, response: any, next: any) => {
    const authInfra = new AuthInfraService();
    const oAuth2Infra = new GoogleOAuth2Infra();
    const jwtToken = request.get("Authorization")?.slice(7);
    try {
        const tokenContents: any = authInfra.verifyJwtToken(jwtToken);
        if (tokenContents.oAuthRefreshToken) {
            console.log();
        }

        next();
    } catch (error) {
        response.status(401).json({status: "error", message: "Unauthorized"});
    }
};

export default jwtAuthMiddleWare;

