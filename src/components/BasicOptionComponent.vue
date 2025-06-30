<script setup>
  // Component props and emitted events
  const props = defineProps({
    label: String,
    description: String,
    id: String
  });
  const emit = defineEmits(['selected']);

  // When clicked emit the appropriate event
  function handleClick() {
    console.log(props)
    emit('selected', { key: props.id })  
  };
</script>

<template>
  <button @click=handleClick>{{label}}</button> 
</template>
