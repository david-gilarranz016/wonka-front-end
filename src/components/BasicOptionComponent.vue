<script setup>
  import { ref } from 'vue';

  // Component props and emitted events
  const props = defineProps({
    label: String,
    description: String,
    id: String,
    selected: Boolean
  });
  const emit = defineEmits(['selected', 'deselected']);

  // State variables
  const selected = ref(false);

  // When clicked emit the appropriate event
  function onClick() {
    // Get the event and emit it
    const event = props.selected ? 'deselected' : 'selected';
    emit(event, { key: props.id })  
  };
</script>

<template>
  <button @click=onClick :title="props.description">{{label}}</button> 
</template>
