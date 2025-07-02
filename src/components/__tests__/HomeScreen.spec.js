import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useRouter } from 'vue-router';
import HomeScreen from '../HomeScreen.vue'

// Mock the Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: () => {}
  }))
}));

describe('HomeScreen', () => {
  it('Includes the title', () => {
    // Render the HomeScreen
    const wrapper = mount(HomeScreen);

    // Expect it to contain the title
    const title = 'Welcome to the Web Shell Generator!';
    expect(wrapper.text()).toContain(title);
  });

  it('Navigates to the Shell Technology selection page', () => {
    // Mock the router to return a stub
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({ push }));

    // Render the HomeScreen
    const wrapper = mount(HomeScreen);

    // Find and click the navigation button
    wrapper.find('button').trigger('click');

    expect(push).toHaveBeenCalledExactlyOnceWith('/shell');
  });
});
