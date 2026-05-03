// Get the amount of threads available
const userThreads = navigator.hardwareConcurrency;

// Define function with default username, rigid, amount of threads and mining key
function startMiner(username = `Hoiboy19`, rigid = `Duino-JS`, threads = 1, miningkey = null) {
    // Validate the amount of threads
    if (threads < 1) {
        threads = 1;
    }
    if (threads > 8) {
        threads = 8;
    }
    if (threads > userThreads) {
        threads = userThreads;
    }

    // Loop through the amount of threads
    for (let workerVer = 0; workerVer < threads; workerVer++) {
        // Create the worker
        let worker = new Worker(`worker.js`); // let을 붙여서 독립적으로 생성

        // ★ 추가된 부분: 워커에서 오는 메시지를 받아서 메인 콘솔에 찍어줌
        worker.onmessage = function(event) {
            console.log(event.data); 
        };

        // Send the username, rigid and workerVer to the worker
        worker.postMessage([username, rigid, workerVer, miningkey]);
    }
}
