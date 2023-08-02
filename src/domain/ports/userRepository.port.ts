import UserEntity, {IUser} from "../entities/user.entity";

export interface IUserRepository {
    getUserByEmail(email: string): Promise<IUser | null>;
    createNewUser(user: UserEntity): Promise<UserEntity>;
}

abstract class UserRepositoryPort implements IUserRepository {
    abstract getUserByEmail(email: string): Promise<IUser | null>;
    abstract createNewUser(user: UserEntity): Promise<IUser>;
}

export default UserRepositoryPort;

