import AddNewTaskDTO from "../../src/application/task/dto/addNewTask.dto";
import DeleteTaskDTO from "../../src/application/task/dto/deleteTask.dto";
import EditTaskDTO from "../../src/application/task/dto/editTask.dto";
import GetSingleTaskDTO from "../../src/application/task/dto/getSingleTask.dto";
import TaskService from "../../src/application/task/task.service";
import container from "../../src/infrastructure/dependancyInjection/containers";

const taskService = container.resolve(TaskService);

class TaskController {
    static async addNewTask(request: any, respone: any) {
        const {body} = request;
        const addNewTaskDto = new AddNewTaskDTO(body);
        const newTask = await taskService.addNewTask(request, addNewTaskDto);

        if (newTask) {
            respone.status(200).json({status: "success", body: newTask});
        } else {
            respone.status(500).json({status: "error", message: "Could not add new task"});
        }
    }

    static async editTask(request: any, respone: any) {
        const {body} = request;
        const editTaskDto = new EditTaskDTO(body);

        const editedTask = await taskService.editTask(request, editTaskDto);

        if (editTaskDto) {
            respone.status(200).json({status: "success", body: editedTask});
        } else {
            respone.status(500).json({status: "error", message: "Could not  edit task"});
        }
    }

    static async deleteTask(request: any, respone: any) {
        const {body} = request;
        const deleteTaskDto = new DeleteTaskDTO(body);

        const deletedTask = await taskService.deleteTask(request, deleteTaskDto);

        if (deletedTask) {
            respone.status(200).json({status: "success", body: deletedTask});
        } else {
            respone.status(500).json({status: "error", message: "Could not delete task"});
        }
    }

    private static async getSingleTask(request: any) {
        const {query} = request;
        const getSingleTaskDto = new GetSingleTaskDTO(query);

        const task = await taskService.getSingleTask(request, getSingleTaskDto);
        return task;
    }

    static async getAllTasks(request: any, respone: any) {
        const {query} = request.query;

        if (query) {
            const singleTask = await this.getSingleTask(request);

            if (singleTask) {
                respone.status(200).json({status: "success", body: singleTask});
            } else {
                respone.status(404).json({status: "error", message: "No task found"});
            }
        } else {
            const tasksList = await taskService.getAllTasks(request);

            if (tasksList) {
                respone.status(200).json({status: "success", body: tasksList});
            } else {
                respone.status(404).json({status: "error", message: "No task found"});
            }
        }
    }
}

export default TaskController;

4;

