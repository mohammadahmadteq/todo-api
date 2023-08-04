import AddNewUserDTO from "../../src/application/user/dto/newUser.dto";
import UserService from "../../src/application/user/user.service";
import {AddNewUserValidation} from "../../src/domain/validations/user.validation";
import container from "../../src/infrastructure/dependancyInjection/containers";

const userService = container.resolve(UserService);
class UserController {
    static async addNewUser(request: any, response: any) {
        const {body} = request;
        try {
            AddNewUserValidation.parse(body);
        } catch (error) {
            response.status(400).json({
                status: "error",
                message: error
            });

            return;
        }
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

