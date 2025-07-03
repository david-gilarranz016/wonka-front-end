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

  // When clicked emit the appropriate event
  function onClick() {
    // Get the event and emit it
    const event = props.selected ? 'deselected' : 'selected';
    emit(event, { key: props.id });
  };
</script>

<template>
  <div class="relative group flex p-5">
    <button :class="{selected: props.selected, deselected: !props.selected}" data-tootlip-target="tooltipId" @click=onClick>{{label}}</button>
    <div class="description-tooltip">
      {{ description }}
    </div>
  </div>
</template>
