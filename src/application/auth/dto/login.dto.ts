interface ILoginDTO {
    email: string;
    password: string;
}

class LoginDTO implements ILoginDTO {
    email: string;
    password: string;

    constructor(loginDetails: ILoginDTO) {
        this.email = loginDetails.email;
        this.password = loginDetails.password;
    }
}
export default LoginDTO;
