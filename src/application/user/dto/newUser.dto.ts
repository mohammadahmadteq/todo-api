interface IAddNewUserDTO {
    email: string;
    password: string;
}

class AddNewUserDTO implements IAddNewUserDTO {
    email: string;
    password: string;

    constructor(newUser: IAddNewUserDTO) {
        this.email = newUser.email;
        this.password = newUser.password;
    }
}

export default AddNewUserDTO;

