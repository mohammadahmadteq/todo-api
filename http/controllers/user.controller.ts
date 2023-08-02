import AddNewUserDTO from "../../src/application/user/dto/newUser.dto";
import UserService from "../../src/application/user/user.service";
import container from "../../src/infrastructure/dependancyInjection/containers";

const userService = container.resolve(UserService);
class UserController {
    static async addNewUser(request: any, response: any) {
        const {body} = request;
        const addNewUserDto = new AddNewUserDTO(body);
        const newUser = await userService.createNewUser(addNewUserDto);

        if (newUser) {
            response.status(200).json(newUser);
        } else {
            response.status(400).json({status: "error", message: "User already exists"});
        }
    }
}

export default UserController;

