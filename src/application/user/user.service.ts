import {inject, injectable} from "tsyringe";
import {IUserRepository} from "../../domain/ports/userRepository.port";
import UserEntity from "../../domain/entities/user.entity";
import {v4 as uuidv4} from "uuid";
import AddNewUserDTO from "./dto/newUser.dto";
import {IAuthInfra} from "../../domain/ports/authInfra.port";
@injectable()
class UserService {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        @inject("IAuthInfra") private authInfra: IAuthInfra
    ) {}

    async createNewUser(newUserDto: AddNewUserDTO) {
        const {email} = newUserDto;
        const userFromDb = await this.userRepository.getUserByEmail(email);
        if (userFromDb) {
            return undefined;
        }

        const userId = uuidv4();
        const hashPassword = await this.authInfra.createPassword(newUserDto.password);
        const userEntity = UserEntity.create({...newUserDto, userId, password: hashPassword, isPassword: true});
        const createdUser = await this.userRepository.createNewUser(userEntity);

        if (createdUser) {
            return hashPassword
                ? {
                      status: "success"
                  }
                : createdUser;
        }
        return undefined;
    }
}

export default UserService;

