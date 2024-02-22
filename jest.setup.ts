import '@testing-library/jest-native/extend-expect';
import 'fast-text-encoding';

import {server} from './__mocks__/server';

jest.mock('react-native-webview', () => ({WebView: 'WebView'}));

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
