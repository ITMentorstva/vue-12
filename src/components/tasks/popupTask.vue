
<template>

  <div class="task-popup" @click.self="emit('close')">
    <div class="popup-content">
      <h2>{{ task?.title }}</h2>
      <p>{{ task?.description }}</p>
      <p>{{ task?.dueDate }}</p>
      <button @click="emit('close')">Close</button>
    </div>
  </div>

</template>

<script setup lang="ts">
  import { defineEmits, defineProps } from 'vue';
  import TaskType from "@/Types/TaskType";

  const props = defineProps<{ task: TaskType | null }>();

  const emit = defineEmits(['close']);
</script>

<style>

  .task-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .popup-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }
</style>