export interface IUser {
    password: string | null;
    email: string;
    userId: string;
    isPassword: boolean;
}

class UserEntity implements IUser {
    password: string | null;
    email: string;
    userId: string;
    isPassword: boolean;

    constructor(userEntity: UserEntity) {
        this.password = userEntity.password;
        this.email = userEntity.email;
        this.userId = userEntity.userId;
        this.isPassword = userEntity.isPassword;
    }

    static create(user: IUser) {
        return new UserEntity(user);
    }
}

export default UserEntity;

