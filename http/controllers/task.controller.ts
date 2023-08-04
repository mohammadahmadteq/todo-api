import AddNewTaskDTO from "../../src/application/task/dto/addNewTask.dto";
import DeleteTaskDTO from "../../src/application/task/dto/deleteTask.dto";
import EditTaskDTO from "../../src/application/task/dto/editTask.dto";
import GetSingleTaskDTO from "../../src/application/task/dto/getSingleTask.dto";
import TaskService from "../../src/application/task/task.service";
import {
    AddNewTaskValidation,
    DeleteTaskValidation,
    EditTaskValidation
} from "../../src/domain/validations/task.validation";
import container from "../../src/infrastructure/dependancyInjection/containers";

const taskService = container.resolve(TaskService);

class TaskController {
    static async addNewTask(request: any, response: any) {
        const {body} = request;
        try {
            AddNewTaskValidation.parse(body);
        } catch (error) {
            response.status(400).json({
                status: "error",
                message: error
            });

            return;
        }
        const addNewTaskDto = new AddNewTaskDTO(body);
        const newTask = await taskService.addNewTask(request, addNewTaskDto);

        if (newTask) {
            response.status(200).json({status: "success", body: newTask});
        } else {
            response.status(500).json({status: "error", message: "Could not add new task"});
        }
    }

    static async editTask(request: any, response: any) {
        const {body} = request;
        try {
            EditTaskValidation.parse(body);
        } catch (error) {
            response.status(400).json({
                status: "error",
                message: error
            });

            return;
        }
        const editTaskDto = new EditTaskDTO(body);

        const editedTask = await taskService.editTask(request, editTaskDto);

        if (editTaskDto) {
            response.status(200).json({status: "success", body: editedTask});
        } else {
            response.status(500).json({status: "error", message: "Could not  edit task"});
        }
    }

    static async deleteTask(request: any, response: any) {
        const {body} = request;
        try {
            DeleteTaskValidation.parse(body);
        } catch (error) {
            response.status(400).json({
                status: "error",
                message: error
            });

            return;
        }
        const deleteTaskDto = new DeleteTaskDTO(body);

        const deletedTask = await taskService.deleteTask(request, deleteTaskDto);

        if (deletedTask) {
            response.status(200).json({status: "success", body: deletedTask});
        } else {
            response.status(500).json({status: "error", message: "Could not delete task"});
        }
    }

    static async getTasks(request: any, response: any) {
        const {query} = request;

        if (query?.taskId) {
            const getSingleTaskDto = new GetSingleTaskDTO(query);

            const singleTask = await taskService.getSingleTask(request, getSingleTaskDto);

            if (singleTask) {
                response.status(200).json({status: "success", body: singleTask});
            } else {
                response.status(404).json({status: "error", message: "No task found"});
            }
        } else {
            const tasksList = await taskService.getAllTasks(request);

            if (tasksList) {
                response.status(200).json({status: "success", body: tasksList});
            } else {
                response.status(404).json({status: "error", message: "No task found"});
            }
        }
    }
}

export default TaskController;

4;

