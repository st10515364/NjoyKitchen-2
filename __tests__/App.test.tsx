/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { COLORS, FONT, SPACING } from '../src/theme';
import App from '../App';

test('exports the shared theme module', () => {
  expect(COLORS).toBeDefined();
  expect(SPACING).toBeDefined();
  expect(FONT).toBeDefined();
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
