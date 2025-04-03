<template>

  <div class="allTasks">
    <div class="task-column" v-for="(tasksInGroup, index) in groupedTasks" :key="index">
      <h3 class="column-title">{{ index }}</h3>
      <SingleTask
          v-for="task in tasksInGroup" :key="task.id" :task="task"
          @delete-task="emit('delete-task', $event)"
          @show-popup="openPopup"
      ></SingleTask>
    </div>
  </div>

  <PopupTask
      v-if="showPopup"
      @close="closePopup"
      :task="selectedTask"
  ></PopupTask>

</template>

<script setup lang="ts">

import {defineEmits, defineProps, ref} from 'vue';
  import {BoardType} from "@/Types/boards/BoardType";
  import TaskType from "@/Types/TaskType";
  import SingleTask from "@/components/tasks/singleTask.vue";
  import PopupTask from "@/components/tasks/popupTask.vue";

  const showPopup = ref(false);

  const selectedTask = ref<TaskType | null>(null);

  function openPopup(task: TaskType) {
    showPopup.value = true;
    selectedTask.value = task;
  }

  const props = defineProps<{
    groupedTasks: Record<BoardType, TaskType[]>
  }>();

  const emit = defineEmits<{(e: 'delete-task', id: string): void;}>();

  function closePopup() {
    showPopup.value = false;
    selectedTask.value = null;
  }

</script>

<style scoped>

.column-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.allTasks {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;
  background: #f4f5f7;
}

.task-column {
  flex-shrink: 0;
  width: 300px;
  background-color: #ebecf0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>