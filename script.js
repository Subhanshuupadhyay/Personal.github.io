// Get user input for focus and break times and font color
const focusTime = prompt("Enter focus time (in minutes):");
const breakTime = prompt("Enter break time (in minutes):");
const fontColor = prompt("Enter font color for the Pomodoro timer:");

// Update the Pomodoro timer's font color
document.getElementById("pomodoro-timer").style.color = fontColor;

let sessionNumber = 1;

function updateSessionNumber() {
    document.getElementById("session-number").textContent = sessionNumber;
}

function startPomodoroTimer() {
    const pomodoroTimer = document.getElementById("pomodoro-timer");
    let totalTime = focusTime * 60; // Convert focus time to seconds
    let minutes, seconds;

    const interval = setInterval(function () {
        minutes = Math.floor(totalTime / 60);
        seconds = totalTime % 60;

        pomodoroTimer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (totalTime <= 0) {
            clearInterval(interval);
            sessionNumber++;
            updateSessionNumber();
            if (sessionNumber <= 7) {
                setTimeout(startBreakTimer, 1000);
            }
        } else {
            totalTime--;
        }
    }, 1000);
}

function startBreakTimer() {
    const pomodoroTimer = document.getElementById("pomodoro-timer");
    let totalTime = breakTime * 60; // Convert break time to seconds
    let minutes, seconds;

    const interval = setInterval(function () {
        minutes = Math.floor(totalTime / 60);
        seconds = totalTime % 60;

        pomodoroTimer.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (totalTime <= 0) {
            clearInterval(interval);
            if (sessionNumber <= 7) {
                setTimeout(startPomodoroTimer, 1000);
            }
        } else {
            totalTime--;
        }
    }, 1000);
}

// Initialize the Pomodoro timer
updateSessionNumber();
startPomodoroTimer();

// Function to update the Indian time
function updateIndianTime() {
    const indianTime = document.getElementById("indian-time");
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short", timeZone: "Asia/Kolkata" };
    indianTime.textContent = now.toLocaleDateString("en-IN", options);
}

// Update Indian time every second
setInterval(updateIndianTime, 1000);
