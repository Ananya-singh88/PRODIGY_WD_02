let timer;
let startTime;
let elapsedTime = 0;
let running = false;
const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
    let totalMilliseconds = Date.now() - startTime + elapsedTime;
    let seconds = Math.floor((totalMilliseconds / 1000) % 60);
    let minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);

    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startPauseBtn.addEventListener("click", function () {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startPauseBtn.textContent = "Start";
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 1000);
        startPauseBtn.textContent = "Pause";
    }
    running = !running;
});

resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    display.textContent = "00:00:00";
    startPauseBtn.textContent = "Start";
    lapsContainer.innerHTML = "";
});

lapBtn.addEventListener("click", function () {
    if (running) {
        const lapTime = document.createElement("li");
        lapTime.textContent = display.textContent;
        lapsContainer.appendChild(lapTime);
    }
});
