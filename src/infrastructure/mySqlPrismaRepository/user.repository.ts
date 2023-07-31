import {PrismaClient} from "@prisma/client";
import UserEntity from "../../domain/entities/user.entity";
import UserRepositoryPort from "../../domain/ports/userRepository.port";
import {injectable} from "tsyringe";

@injectable()
class UserRepository extends UserRepositoryPort {
    model = new PrismaClient().users;

    async getUserByEmail(email: string) {
        const userFromDb = await this.model.findUniqueOrThrow({
            where: {
                email: email
            },
            select: {
                email: true,
                password: true,
                userId: true
            }
        });

        return userFromDb;
    }
    async createNewUser(user: UserEntity) {
        const newUserFromDb = await this.model.create({
            data: {...user}
        });

        return newUserFromDb;
    }
}

export default UserRepository;

