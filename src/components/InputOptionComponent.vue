<script setup>
  import { ref } from 'vue';

  // Component props and emitted events
  const props = defineProps({
    label: String,
    description: String,
    id: String,
    placeholder: String,
    argumentName: String,
    selected: Boolean
  });
  const emit = defineEmits(['selected', 'deselected']);

  // When clicked emit the appropriate event
  function onInput(e) {
    // Check if the input is empty to discern the event
    if (e.target.value !== '') {
      emit('selected', {
        key: props.id,
        arguments: [
          {
            name: props.argumentName,
            value: e.target.value
          }
        ]
      });
    } else {
      emit('deselected', { key: props.id });
    }
  };
</script>

<template>
  <div class="relative group flex items-center p-5" :class="{selected : props.selected}">
    <label :for="props.id" class="mr-3">{{props.label}}:</label>
    <input :id="props.id" class="textfield" type="text" @input=onInput :placeholder="props.placeholder" />
    <div class="description-tooltip">
      {{ description }}
    </div>
  </div>
</template>
