export interface ITask {
    taskId: string;
    title: string;
    description: string;
    deadline: string;
    finishedAt?: string | null;
    userId: string;
}

class TaskEntity implements ITask {
    taskId: string;
    title: string;
    description: string;
    deadline: string;
    finishedAt?: string | null;
    userId: string;

    constructor(taskEntity: TaskEntity) {
        this.taskId = taskEntity.taskId;
        this.deadline = taskEntity.deadline;
        this.title = taskEntity.title;
        this.userId = taskEntity.userId;
        this.finishedAt = taskEntity.finishedAt;
        this.description = taskEntity.description;
    }

    static create(task: ITask) {
        return new TaskEntity(task);
    }
}

export default TaskEntity;

