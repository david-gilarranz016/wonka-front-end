import { createMemoryHistory, createRouter } from 'vue-router';

import HomeScreen from './HomeScreen.vue';
import ShellSelectionScreen from './ShellSelectionScreen.vue';
import FeatureSelectionScreen from './FeatureSelectionScreen.vue';
import OutputSelectionScreen from './OutputSelectionScreen.vue';
import ClientSelectionScreen from './ClientSelectionScreen.vue';
import ResultScreen from './ResultScreen.vue';

const routes = [
  { path: '/', component: HomeScreen },
  { path: '/shell', component: ShellSelectionScreen },
  { path: '/features', component: FeatureSelectionScreen },
  { path: '/output', component: OutputSelectionScreen },
  { path: '/client', component: ClientSelectionScreen },
  { path: '/result', component: ResultScreen },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes
});
