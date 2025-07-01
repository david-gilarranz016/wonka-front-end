<script setup>
  import { computed, onMounted } from 'vue';
  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import { APIResponse } from './APIResponse.js';

  // Create computed properties for both output formats and options
  const formats = computed(() => APIResponse.features.filter(f => f.type === 'output,format'));
  const options = computed(() => APIResponse.features.filter(f => f.type === 'output,option'));

  // When the component is mounted, unselect all options
  onMounted(() => {
    // Set all formats and options to unselected
    APIResponse.features.filter(f => f.type.startsWith('output')).forEach(format => {
      format.selected = false; 
    });
  });

</script>

<template>
  <div>
    <OptionGroup title="Output Formats">
      <BasicOptionComponent v-for="f in formats"
                            :key="f.key"
                            :id="f.key"
                            :label="f.name"
                            :description="f.description"
                            :selected="f.selected"
      />
    </OptionGroup>
    <OptionGroup title="Additional Options">
      <BasicOptionComponent v-for="o in options"
                            :key="o.key"
                            :id="o.key"
                            :label="o.name"
                            :description="o.description"
                            :selected="o.selected"
      />
    </OptionGroup>
  </div>
</template>
