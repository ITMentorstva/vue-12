<template>

  <div class="mainDiv">

    <div class="header">
      <button class="create-btn" @click="emit('show-create-popup')">Create task</button>
    </div>

    <div class="allTasks">
      <div class="task-column" v-for="(tasksInGroup, index) in groupedTasks" :key="index">
        <h3 class="column-title">{{ index }}</h3>
        <SingleTask
            v-for="task in tasksInGroup" :key="task.id" :task="task"
            @show-popup="openPopup"
        ></SingleTask>
      </div>
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

  const emit = defineEmits<{
    (e: 'show-create-popup'): void;
  }>();

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

.create-btn {
  background-color: #315194;
  border: none;
  color: white;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.mainDiv {
  background: #f4f5f7;
}

.header {
  display: flex;
  margin-left: 15px;
}

.allTasks {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;
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