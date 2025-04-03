import TaskType from "@/Types/TaskType";
import {priorityOrder} from "@/Types/PriorityOrder";
import {generateRandomId} from "@/models/tasksModel";
import {isIdUsed} from "@/helpers/idHelper";

export function sortTasks(tasks: TaskType[], importance: string): TaskType[] {

    const direction = importance == 'important' ? 1 : -1;

    tasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority ?? 'nebitan'];
        const bPriority = priorityOrder[b.priority ?? 'nebitan'];
        return (aPriority - bPriority) * direction;
    });

    return tasks;

}


export function prepareTask(newTask: TaskType, tasks: TaskType[]): TaskType {

    let tempId = generateRandomId();

    if(isIdUsed(tempId, tasks)) {
        tempId = generateRandomId();
    }

    return {
        id: tempId,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        board: newTask.board,
    };
}