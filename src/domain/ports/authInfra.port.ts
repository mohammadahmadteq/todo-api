export interface IAuthInfra {
    createPassword: (password: string) => Promise<string>;
    verifyPassword: (password: string, hash: string) => Promise<boolean>;
    createJwtToken: (payload: any) => string;
    verifyJwtToken: (token: string) => any;
}

abstract class AuthInfraPort implements IAuthInfra {
    abstract createPassword(password: string): Promise<string>;
    abstract verifyPassword(password: string, hash: string): Promise<boolean>;
    abstract createJwtToken(payload: any): string;
    abstract verifyJwtToken(token: string): any;
}

export default AuthInfraPort;

