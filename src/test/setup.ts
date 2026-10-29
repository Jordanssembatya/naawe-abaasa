import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

// jsdom does not implement scrolling; the router's scroll restoration calls these.
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};

afterEach(() => {
  window.localStorage.clear();
});
