import NodeCache from 'node-cache';

const cache =
    global.cache ||
    (global.cache = new NodeCache({
        stdTTL: 120,
        checkperiod: 30,
    }));

export default cache;
