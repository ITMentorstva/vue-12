<template>

  <CreateTask @add-task="addTask"></CreateTask>
  <SortTask
    :prioritySort="prioritySort"
    @update:priority-sort="prioritySort = $event"
    @change-sort="changeSort"
  ></SortTask>

  <AllTasks :groupedTasks="groupedTasks" @delete-task="deleteTask"></AllTasks>

</template>


<script lang="ts">


import { defineComponent } from "vue";
import {Form, Field, ErrorMessage} from "vee-validate";
import {generateRandomId, getAllTasks, updateAllTasks } from "@/models/tasksModel";
import TaskType from "@/Types/TaskType";
import {priorityOrder} from "@/Types/PriorityOrder";
import { isIdUsed } from "@/helpers/idHelper";
import { BoardType } from "@/Types/boards/BoardType";
import CreateTask from "@/components/tasks/createTask.vue";
import SortTask from "@/components/tasks/sortTask.vue";
import AllTasks from "@/components/tasks/allTasks.vue";

export default defineComponent({
    name: "TodoList",
    components: {
      AllTasks,
      SortTask,
      CreateTask,
    },
    data() {
      return {
        id: '',
        tasks: [] as TaskType[],
        prioritySort: '',
      }
    },

    beforeMount() {
      this.tasks = getAllTasks() ?? [];
    },

    computed: {

      groupedTasks(): Record<BoardType, TaskType[]> {

        const groups: Record<BoardType, TaskType[]> = {
          todo: [],
          doing: [],
          done: [],
        };

        for(const task of this.tasks) {
          groups[task.board].push(task);
        }

        return groups;
      }
    },

    watch: {
      tasks: {
        handler(tasks: TaskType[]): void {
          updateAllTasks(tasks);
        },
        deep: true
      },
    },

    methods: {

      changeSort() {

        const direction = this.prioritySort == 'important' ? 1 : -1;

        this.tasks.sort((a, b) => {
          const aPriority = priorityOrder[a.priority ?? 'nebitan'];
          const bPriority = priorityOrder[b.priority ?? 'nebitan'];
          return (aPriority - bPriority) * direction;
        });

      },

      addTask(newTask: TaskType) {

        const taskExists = this.tasks.some(task => task.title === newTask.title.trim());

        if(taskExists) {
          alert("Zadatak sa ovim imenom vec postoji");
          return;
        }

        let tempId = generateRandomId();

        if(isIdUsed(tempId, this.tasks)) {
          tempId = generateRandomId();
        }

        const task = {
          id: generateRandomId(),
          title: newTask.title,
          description: newTask.description,
          dueDate: newTask.dueDate,
          priority: newTask.priority,
          board: newTask.board,
        };

        this.tasks.push(task);

      },

      deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    }
  });

</script>