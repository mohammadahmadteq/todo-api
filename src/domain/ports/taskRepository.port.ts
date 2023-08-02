import TaskEntity, {ITask} from "../entities/task.entity";

export interface ITaskRepository {
    getAllTasksByUserId: (userId: string) => Promise<ITask[]>;
    editTask: (taskId: string, taskDetails: Omit<ITask, "userId" | "taskId">) => Promise<ITask>;
    deleteTask: (taskId: string) => Promise<ITask>;
    addNewTask: (taskEntity: TaskEntity) => Promise<ITask>;
    getSingleTask: (taskId: string) => Promise<ITask | null>;
}

abstract class TaskRepositoryPort implements ITaskRepository {
    abstract getAllTasksByUserId(userId: string): Promise<ITask[]>;
    abstract editTask(taskId: string, taskDetails: Omit<ITask, "userId" | "taskId">): Promise<ITask>;
    abstract deleteTask(taskId: string): Promise<ITask>;
    abstract addNewTask(taskEntity: TaskEntity): Promise<ITask>;
    abstract getSingleTask(taskId: string): Promise<ITask | null>;
}

export default TaskRepositoryPort;

