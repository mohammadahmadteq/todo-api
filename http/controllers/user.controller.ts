import UserService from "../../src/application/user/user.service";
import container from "../../src/infrastructure/dependancyInjection/containers";

const userService = container.resolve(UserService);
class UserController {
    static async addNewUser(request: any, response: any) {
        const addNewUserDto = 
    }
}

export default UserController;

