
<template>
  <Form class="sort-form">
    <h2>Sortiranje</h2>
    <Field name="prioritySort" as="select" v-model="prioritySort" class="form-input">
      <option value="important">Po bitnosti</option>
      <option value="notimportant">Po nebitnosti</option>
    </Field>
  </Form>
</template>


<script setup lang="ts">

  import { ref, watch, defineEmits } from 'vue';
  import { Field, Form } from "vee-validate";

  const emit = defineEmits<{
    (e: 'update:prioritySort', value: string): void;
    (e: 'change-sort'): void;
  }>();

  const prioritySort = ref<'important' | 'notImportant'>('important');

  watch(prioritySort, (value) => {
    emit('update:prioritySort', value);
    emit('change-sort');
  });

</script>

<style scoped>
  .sort-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem 0;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
  }
</style>