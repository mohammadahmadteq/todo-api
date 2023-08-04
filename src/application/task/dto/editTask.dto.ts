import {ITask} from "../../../domain/entities/task.entity";

type EditTaskDTOType = Omit<ITask, "userId">;

interface IEditTaskDTO extends EditTaskDTOType {}

class EditTaskDTO implements IEditTaskDTO {
    taskId: string;
    title: string;
    description: string;
    deadline: string;

    constructor(newTask: IEditTaskDTO) {
        this.taskId = newTask.taskId;
        this.title = newTask.title;
        this.description = newTask.description;
        this.deadline = newTask.deadline;
    }
}

export default EditTaskDTO;

