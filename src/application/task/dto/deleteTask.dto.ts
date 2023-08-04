interface IDeleteTaskDTO {
    taskId: string;
}

class DeleteTaskDTO implements IDeleteTaskDTO {
    taskId: string;

    constructor(deleteTask: IDeleteTaskDTO) {
        this.taskId = deleteTask.taskId;
    }
}

export default DeleteTaskDTO;
