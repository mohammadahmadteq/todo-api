import {ITask} from "../../../domain/entities/task.entity";

type AddNewTaskDTOType = Omit<ITask, "finishedAt" | "taskId" | "userId">;

interface IAddNewTaskDTO extends AddNewTaskDTOType {}

class AddNewTaskDTO implements IAddNewTaskDTO {
    title: string;
    description: string;
    deadline: string;

    constructor(newTask: IAddNewTaskDTO) {
        this.title = newTask.title;
        this.description = newTask.description;
        this.deadline = newTask.deadline;
    }
}

export default AddNewTaskDTO;

