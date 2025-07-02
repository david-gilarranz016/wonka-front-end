import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InputOptionComponent from '../InputOptionComponent.vue'

describe('InputOptionComponent', () => {
  // Options for the component
  const props = {
    label: 'Test',
    id: 'test',
    description: 'Test description',
    placeholder: 'test placeholder',
    argumentName: 'Argument Name'
  };

  it('Displays the label', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Expect it to contain the title
    expect(wrapper.text()).toContain(props.label);
  });

  it('Displays description when hovered', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Expect the button to have title attribute set
    expect(wrapper.find('div').attributes('title')).toEqual(props.description);
  });

  it('Displays the correct placeholder', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Expect the button to have title attribute set
    expect(wrapper.find('input').attributes('placeholder')).toEqual(props.placeholder);
  });

  it('Displays the correct label', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Expect the button to have title attribute set
    expect(wrapper.find('label').text()).toEqual(props.label);
  });

  it('Emits a "selected" envent when input changes', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Find and click on the button
    wrapper.find('input').setValue('Test value');

    // Expect the event to be emitted
    expect(wrapper.emitted()).toHaveProperty('selected');
  });

  it('Passes its key and value as an argument when emitting the "selected" envent', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Input a test value into the component
    const testInput = 'Test';
    wrapper.find('input').setValue(testInput);

    // Expect the event to be emitted with its key
    expect(wrapper.emitted('selected')[0]).toEqual([
      {
        key: props.id,
        arguments: [
          {
            name: props.argumentName,
            value: testInput
          }
        ]
      }
    ]);
  });

  it('Emits a "deselected" envent when the input is cleared', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Input a test value into the component and clear it
    wrapper.find('input').setValue('test input');
    wrapper.find('input').setValue('');

    // Expect the event to be emitted
    expect(wrapper.emitted()).toHaveProperty('deselected')
  });

  it('Passes its id as an argument when emitting the "deselected" envent', () => {
    // Render the Component
    const wrapper = mount(InputOptionComponent, { props });

    // Input a test value into the component and clear it
    wrapper.find('input').setValue('test input');
    wrapper.find('input').setValue('');

    // Expect the event to be emitted with its key
    expect(wrapper.emitted('deselected')[0]).toEqual([
      {
        key: props.id
      }
    ]);
  });
});
