import {inject, injectable} from "tsyringe";
import {ITaskRepository} from "../../domain/ports/taskRepository.port";
import TaskEntity from "../../domain/entities/task.entity";
import {v4 as uuidv4} from "uuid";
import {IAuthInfra} from "../../domain/ports/authInfra.port";
import AddNewTaskDTO from "./dto/addNewTask.dto";
import EditTaskDTO from "./dto/editTask.dto";
import DeleteTaskDTO from "./dto/deleteTask.dto";
import GetSingleTaskDTO from "./dto/getSingleTask.dto";

@injectable()
class TaskService {
    constructor(
        @inject("ITaskRepository") private taskRepository: ITaskRepository,
        @inject("IAuthInfra") private auhtInfra: IAuthInfra
    ) {}

    async addNewTask(request: any, newTask: AddNewTaskDTO) {
        const userDetails = this.auhtInfra.verifyJwtToken(request.get("Authorization")?.slice(7));

        const taskEntity = TaskEntity.create({...newTask, taskId: uuidv4(), userId: userDetails.userId});

        const taskFromDb = await this.taskRepository.addNewTask(taskEntity);

        if (taskFromDb) {
            return taskFromDb;
        } else {
            return undefined;
        }
    }

    async getAllTasks(request: any) {
        const userDetails = this.auhtInfra.verifyJwtToken(request.get("Authorization")?.slice(7));

        const tasksList = await this.taskRepository.getAllTasksByUserId(userDetails.userId);

        const taskEntities: TaskEntity[] = tasksList.map((task) => {
            return TaskEntity.create(task);
        });
        if (taskEntities.length > 0) {
            return taskEntities;
        } else {
            return undefined;
        }
    }

    async editTask(request: any, editTask: EditTaskDTO) {
        const userDetails = this.auhtInfra.verifyJwtToken(request.get("Authorization")?.slice(7));
        const taskFromDb = await this.taskRepository.editTask(editTask.taskId, userDetails.userId, editTask);
        const taskEntity = TaskEntity.create(taskFromDb);
        if (taskFromDb) {
            return taskEntity;
        } else {
            return undefined;
        }
    }

    async deleteTask(request: any, deleteTask: DeleteTaskDTO) {
        const userDetails = this.auhtInfra.verifyJwtToken(request.get("Authorization")?.slice(7));

        const deletedTaskFromDb = await this.taskRepository.deleteTask(deleteTask.taskId, userDetails.userId);
        const taskEntity = TaskEntity.create(deletedTaskFromDb);

        if (deletedTaskFromDb) {
            return taskEntity;
        } else {
            return undefined;
        }
    }

    async getSingleTask(request: any, getSingleTask: GetSingleTaskDTO) {
        const userDetails = this.auhtInfra.verifyJwtToken(request.get("Authorization")?.slice(7));

        const taskFromDb = await this.taskRepository.getSingleTask(getSingleTask.taskId, userDetails.userId);

        if (taskFromDb) {
            const taskEntity = TaskEntity.create(taskFromDb);
            return taskEntity;
        } else {
            return undefined;
        }
    }
}

export default TaskService;

