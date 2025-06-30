import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BasicOptionComponent from '../BasicOptionComponent.vue'

describe('BasicOptionComponent', () => {
  // Props for the component
  const props = {
    label: 'Test',
    id: 'test',
    description: 'Test description'    
  };

  it('Displays the label', () => {
    // Render the Component
    const wrapper = mount(BasicOptionComponent, { props });

    // Expect it to contain the title
    expect(wrapper.text()).toContain(props.label);
  });

  it('Displays description when hovered', () => {
    // Render the Component
    const wrapper = mount(BasicOptionComponent, { props });

    // Expect the button to have title attribute set
    expect(wrapper.find('button').attributes('title')).toEqual(props.description);
  });

  it('Emits a "selected" envent when selected', () => {
    // Render the Component
    const wrapper = mount(BasicOptionComponent, { props });

    // Find and click on the button
    wrapper.find('button').trigger('click')

    // Expect the event to be emitted
    expect(wrapper.emitted()).toHaveProperty('selected')
  });

  it('Passes its id as an argument when emitting the "selected" envent', () => {
    // Render the Component
    const wrapper = mount(BasicOptionComponent, { props });

    // Find and click on the button
    wrapper.find('button').trigger('click')

    // Expect the event to be emitted with its key
    expect(wrapper.emitted('selected')[0]).toEqual([
      {
        key: props.id
      }
    ])
  });

  it('Emits a "deselected" envent when clicked twice', () => {
    // Render the Component
    const wrapper = mount(BasicOptionComponent, { props });

    // Find and click on the button twice
    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')

    // Expect the event to be emitted
    expect(wrapper.emitted()).toHaveProperty('deselected')
  });

  it('Passes its id as an argument when emitting the "deselected" envent', () => {
    // Render the Component
    const wrapper = mount(BasicOptionComponent, { props });

    // Find and click on the button twice
    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')

    // Expect the event to be emitted with its key
    expect(wrapper.emitted('deselected')[0]).toEqual([
      {
        key: props.id
      }
    ])
  });
});
