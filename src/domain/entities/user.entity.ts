export interface IUser {
    password: string;
    email: string;
    userId: string;
}

class UserEntity implements IUser {
    password: string;
    email: string;
    userId: string;

    constructor(userEntity: UserEntity) {
        this.password = userEntity.password;
        this.email = userEntity.email;
        this.userId = userEntity.userId;
    }

    static create(user: IUser) {
        return new UserEntity(user);
    }
}

export default UserEntity;

