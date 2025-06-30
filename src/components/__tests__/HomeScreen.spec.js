import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeScreen from '../HomeScreen.vue'

describe('HomeScreen', () => {
  it('Includes the title', () => {
    // Render the HomeScreen
    const wrapper = mount(HomeScreen);

    // Expect it to contain the title
    const title = 'Welcome to the Web Shell Generator!';
    expect(wrapper.text()).toContain(title);
  });
});
