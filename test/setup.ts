import 'cross-fetch/polyfill';
import 'global-agent/bootstrap';

beforeEach(async () => {
    const timeout = 300000;
    jest.setTimeout(timeout);
});
