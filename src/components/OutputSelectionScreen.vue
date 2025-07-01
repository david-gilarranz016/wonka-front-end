<script setup>
  import { computed, onMounted } from 'vue';
  import OptionGroup from './OptionGroup.vue';
  import BasicOptionComponent from './BasicOptionComponent.vue';
  import { APIResponse } from './APIResponse.js';
  import { GenerationRequest } from './GenerationRequest.js';

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

  // Handler for format selection events
  const onFormatSelected = (format) => {
    // Add the format to the GenerationRequest
    GenerationRequest.setOutputFormat(format.key);

    // Unselect all other formats
    formats.value.forEach(f => {
      if (f.key === format.key) {
        f.selected = true;
      } else {
        f.selected = false;
      }
    });
  };

  const onFormatDeselected = (format) => {
    // Reset the output format
    GenerationRequest.setOutputFormat('');

    // Unselect the component
    formats.value.forEach(f => {
      if (f.key === format.key) {
        f.selected = false;
      }
    });
  };

  const onOptionSelected = (option) => {
    // Set the option as true
    GenerationRequest.setOutputOption(option.key, true);

    // Select the component
    options.value.forEach(o => {
      if (o.key === option.key) {
        o.selected = true;
      }
    });
  }
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
                            @selected="onFormatSelected"
                            @deselected="onFormatDeselected"
      />
    </OptionGroup>
    <OptionGroup title="Additional Options">
      <BasicOptionComponent v-for="o in options"
                            :key="o.key"
                            :id="o.key"
                            :label="o.name"
                            :description="o.description"
                            :selected="o.selected"
                            @selected="onOptionSelected"
      />
    </OptionGroup>
  </div>
</template>
