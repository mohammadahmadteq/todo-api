import UserEntity, {IUser} from "../entities/user.entity";

export interface IUserRepository {
    getUserByEmailPassword(email: string, passsword: string): Promise<IUser>;
    createNewUser(user: UserEntity): Promise<UserEntity>;
}

abstract class UserRepositoryPort implements IUserRepository {
    abstract getUserByEmailPassword(email: string, passsword: string): Promise<IUser>;
    abstract createNewUser(user: UserEntity): Promise<IUser>;
}

export default UserRepositoryPort;

