import { debuggerIsAttached } from 'debugger-is-attached';
import 'cross-fetch/polyfill';
import 'global-agent/bootstrap';

beforeEach(async () => {
    const debugging = await debuggerIsAttached(),
        timeout = debugging ? 300000 : 5000;
    jest.setTimeout(timeout);
});
