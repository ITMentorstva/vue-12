<template>
  <div class="task-card">
    <p class="task-title">{{ task.title }}</p>
    <p>{{ task.description }}</p>
    <p><strong>Deadline:</strong> {{ task.dueDate }}</p>
    <p><strong>Priority:</strong> {{ task.priority }}</p>
    <button class="delete-btn btn-blue" @click="handleShowPopup">Show task</button>
    <button class="delete-btn" @click="taskStore.deleteTask(task.id)">Delete task</button>
  </div>
</template>

<script setup lang="ts">

  import { defineProps, defineEmits } from 'vue';
  import TaskType from "@/Types/TaskType";
  import {useTaskStore} from "@/stores/useTaskStore";

  const taskStore = useTaskStore();

  const props = defineProps<{
    task: TaskType
  }>();

  const emit = defineEmits<{
    (e: 'show-popup', task: TaskType): void;
  }>();


  function handleShowPopup() {
    emit('show-popup', props.task);
  }

</script>

<style scoped>

.btn-blue {
  background-color: #409eff !important;
}

.task-card {
  background-color: white;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.task-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.delete-btn {
  background-color: #ff4d4f;
  border: none;
  color: white;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.delete-btn:hover {
  background-color: #ff7875;
}
</style>