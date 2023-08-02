import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {secret} from "../../config/envrionmentVariables";
import AuthInfraPort from "../../../domain/ports/authInfra.port";
class AuthInfraService extends AuthInfraPort {
    async createPassword(password: string) {
        return await bcrypt.hash(password, 5);
    }

    async verifyPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    createJwtToken(payload: any) {
        return jwt.sign(payload, `${secret}`, {expiresIn: "8h"});
    }

    verifyJwtToken(token: string) {
        return jwt.verify(token, `${secret}`);
    }
}

export default AuthInfraService;

