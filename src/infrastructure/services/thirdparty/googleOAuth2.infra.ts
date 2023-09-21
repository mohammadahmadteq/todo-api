import {OAuth2Client} from "google-auth-library";
import keys from "./credentials/googleOAuthKeys.json";
import OAuth2InfraPort from "../../../domain/ports/oAuth2Infra.port";

const PROFILESCOPE = "https://www.googleapis.com/auth/userinfo.profile";
export class GoogleOAuth2Infra extends OAuth2InfraPort {
    oAuth2Client: OAuth2Client;

    constructor() {
        super();
        this.oAuth2Client = new OAuth2Client(keys.web.client_id, keys.web.client_secret, keys.web.redirect_uris[0]);
    }

    getUrl() {
        return this.oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: "https://www.googleapis.com/auth/userinfo.email"
        });
    }

    async getToken(code: string) {
        const response = await this.oAuth2Client.getToken(code);
        this.oAuth2Client.setCredentials(response.tokens);
        return response.tokens;
    }

    async getTokenInfo(token: string) {
        return await this.oAuth2Client.getTokenInfo(token);
    }
}

