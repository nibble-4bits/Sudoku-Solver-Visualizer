'use strict';

const Util = {
    /**
     * Sleeps for a certain number of milliseconds
     * @param {Number} ms Number of milliseconds to sleep
     * @throws Will throw if the argument is null or undefined
     */
    sleep: async function (ms) {
        if (ms === 0) return;
        if (!ms) throw new Error('Parameter ms not defined!');

        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }
}

export { Util };