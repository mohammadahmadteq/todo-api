export interface IOAuth2Infra {
    getUrl: () => string;
    getToken: (code: string) => Promise<any>;
    getTokenInfo: (token: string) => Promise<any>;
}

abstract class OAuth2InfraPort implements IOAuth2Infra {
    abstract getUrl(): any;
    abstract getToken(code: string): Promise<any>;
    abstract getTokenInfo(token: string): Promise<any>;
}

export default OAuth2InfraPort;

