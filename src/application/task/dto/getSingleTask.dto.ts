interface IGetSingleTaskDTO {
    taskId: string;
}

class GetSingleTaskDTO implements IGetSingleTaskDTO {
    taskId: string;

    constructor(getSingleTask: IGetSingleTaskDTO) {
        this.taskId = getSingleTask.taskId;
    }
}

export default GetSingleTaskDTO;
