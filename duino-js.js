const userThreads = navigator.hardwareConcurrency;

function startMiner(username = `Hoiboy19`, rigid = `Duino-JS`, threads = 1, miningkey = null) {
    if (threads < 1) threads = 1;
    if (threads > 8) threads = 8;
    if (threads > userThreads) threads = userThreads;

    for (let workerVer = 0; workerVer < threads; workerVer++) {
        const worker = new Worker(`worker.js`);
        worker.postMessage([username, rigid, workerVer, miningkey]);
    }
}
