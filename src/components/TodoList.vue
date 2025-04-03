<template>

  <CreateTask
      @add-task="addTask"
      @close-create-task="closeCreateTaskPopup"
      v-if="showCreatePopup"
  ></CreateTask>
  <SortTask
    :prioritySort="prioritySort"
    @update:priority-sort="prioritySort = $event"
    @change-sort="changeSort"
  ></SortTask>

  <AllTasks
      :groupedTasks="groupedTasks"
      @delete-task="deleteTask"
      @showCreatePopup="openCreatePopup"
  ></AllTasks>

</template>


<script lang="ts">


import { defineComponent } from "vue";
import {generateRandomId, getAllTasks, updateAllTasks } from "@/models/tasksModel";
import TaskType from "@/Types/TaskType";
import {priorityOrder} from "@/Types/PriorityOrder";
import { isIdUsed } from "@/helpers/idHelper";
import { BoardType } from "@/Types/boards/BoardType";
import CreateTask from "@/components/tasks/createTask.vue";
import SortTask from "@/components/tasks/sortTask.vue";
import AllTasks from "@/components/tasks/allTasks.vue";
import {prepareTask, sortTasks } from "@/services/taskService";

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
        showCreatePopup: false,
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

      openCreatePopup() {
        this.showCreatePopup = true;
      },

      closeCreateTaskPopup() {
          this.showCreatePopup = false;
      },

      changeSort() {
        this.tasks = sortTasks(this.tasks, this.prioritySort);
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

      deleteTask(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
      }
    }
  });

</script>