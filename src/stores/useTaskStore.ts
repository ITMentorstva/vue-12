import {defineStore} from "pinia";
import {getAllTasks, updateAllTasks} from "@/models/tasksModel";
import TaskType from "@/Types/TaskType";
import {BoardType} from "@/Types/boards/BoardType";
import {prepareTask, sortTasks} from "@/services/taskService";


export const useTaskStore = defineStore('taskStore', {

    state: () => ({
        tasks: getAllTasks() ?? [] as TaskType[],
        prioritySort: '' as '' | 'important' | 'notimportant',
        lastSortedAt: Date.now()
    }),

    getters: {
        groupedTasks(state): Record<BoardType, TaskType[]> {
            return {
                todo: state.tasks.filter(t => t.board === 'todo'),
                doing: state.tasks.filter(t => t.board === 'doing'),
                done: state.tasks.filter(t => t.board === 'done'),
            }
        }
    },

    actions: {

        deleteTask(id: string) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        },

        changeSort() {
            this.tasks = sortTasks(this.tasks, this.prioritySort);
            this.lastSortedAt = Date.now()
        },

        addTask(newTask: TaskType) {

            const taskExists = this.tasks.some(task => task.title === newTask.title.trim());

            if(taskExists) {
                alert("Zadatak sa ovim imenom vec postoji");
                return;
            }

            const preparedTask = prepareTask(newTask, this.tasks);

            this.tasks.push(preparedTask);

        },

        saveTasks() {
            updateAllTasks(this.tasks);
        }
    }

});