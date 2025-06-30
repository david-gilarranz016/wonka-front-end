<script setup>
  import { ref } from 'vue';

  // Component props and emitted events
  const props = defineProps({
    label: String,
    description: String,
    id: String
  });
  const emit = defineEmits(['selected', 'deselected']);

  // State variables
  const selected = ref(false);

  // When clicked emit the appropriate event
  function onClick() {
    // Get the event and emit it
    const event = selected.value ? 'deselected' : 'selected';
    emit(event, { key: props.id })  

    // Toggle the value of selected
    selected.value = !selected.value
  };
</script>

<template>
  <button @click=onClick :title="props.description">{{label}}</button> 
</template>
