import AuthInfraService from "../../src/infrastructure/services/auth/auth.infra";

const jwtAuthMiddleWare = (request: any, response: any, next: any) => {
    const authInfra = new AuthInfraService();
    const jwtToken = request.get("Authorization")?.slice(7);
    try {
        authInfra.verifyJwtToken(jwtToken);

        next();
    } catch (error) {
        response.status(401).json({status: "error", message: "Unauthorized"});
    }
};

export default jwtAuthMiddleWare;

