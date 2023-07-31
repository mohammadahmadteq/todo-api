import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {secret} from "../../config/envrionmentVariables";
class AuthInfraService {
    static async createPassword(password: string) {
        return await bcrypt.hash(password, 5);
    }

    static async verifyPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    static createJwtToken(payload: any) {
        return jwt.sign(payload, `${secret}`, {expiresIn: "8h"});
    }

    static veryifyJWTToken(token: string) {
        return jwt.verify(token, `${secret}`);
    }
}

export default AuthInfraService;

