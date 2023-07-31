import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthInfraService {
    async createPassword(password: string) {
        return await bcrypt.hash(password, 5);
    }

    async verifyPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    createJwtToken(payload: any) {
        return jwt.sign(payload, "secret", {expiresIn: "8h"});
    }

    veryifyJWTToken(token: string) {
        return jwt.verify(token, "secret");
    }
}

export default AuthInfraService;

