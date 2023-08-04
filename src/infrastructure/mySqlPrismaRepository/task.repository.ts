import {PrismaClient} from "@prisma/client";
import TaskRepositoryPort from "../../domain/ports/taskRepository.port";
import TaskEntity, {ITask} from "../../domain/entities/task.entity";

class TaskRepository extends TaskRepositoryPort {
    model = new PrismaClient().tasks;

    async getAllTasksByUserId(userId: string) {
        return await this.model.findMany({
            where: {
                userId: userId
            },
            select: {
                taskId: true,
                userId: true,
                deadline: true,
                description: true,
                title: true,
                finishedAt: true
            }
        });
    }

    async editTask(taskId: string, userId: string, taskDetails: Omit<ITask, "userId" | "taskId">) {
        return await this.model.update({
            where: {
                taskId: taskId,
                userId: userId
            },
            data: {
                ...taskDetails
            },
            select: {
                taskId: true,
                userId: true,
                deadline: true,
                description: true,
                title: true,
                finishedAt: true
            }
        });
    }

    async deleteTask(taskId: string, userId: string) {
        return await this.model.delete({
            where: {taskId: taskId, userId: userId},
            select: {
                taskId: true,
                userId: true,
                deadline: true,
                description: true,
                title: true,
                finishedAt: true
            }
        });
    }

    async addNewTask(taskEntity: TaskEntity) {
        return await this.model.create({
            data: taskEntity,
            select: {taskId: true, userId: true, deadline: true, description: true, title: true, finishedAt: true}
        });
    }

    async getSingleTask(taskId: string, userId: string) {
        return await this.model.findUnique({
            where: {taskId: taskId, userId},
            select: {
                taskId: true,
                userId: true,
                deadline: true,
                description: true,
                title: true,
                finishedAt: true
            }
        });
    }
}

export default TaskRepository;

