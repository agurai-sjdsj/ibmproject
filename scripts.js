document.addEventListener("DOMContentLoaded", () => {
    const timeDisplay = document.getElementById("time-display");
    const timerDisplay = document.getElementById("timer-display");
    const timerMinutesInput = document.getElementById("timer-minutes");
    const timerSecondsInput = document.getElementById("timer-seconds");
    const startTimerButton = document.getElementById("start-timer");
    const alarmTimeInput = document.getElementById("alarm-time");
    const alarmToneSelect = document.getElementById("alarm-tone");
    const setAlarmButton = document.getElementById("set-alarm");
    const themeToggle = document.getElementById("theme-toggle");

    let timerInterval;
    let alarmTimeout;

    // Update Clock
    function updateClock() {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);

    // Start Timer
    startTimerButton.addEventListener("click", () => {
        clearInterval(timerInterval);

        let minutes = parseInt(timerMinutesInput.value) || 0;
        let seconds = parseInt(timerSecondsInput.value) || 0;
        let totalTime = minutes * 60 + seconds;

        timerInterval = setInterval(() => {
            if (totalTime <= 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                return;
            }

            totalTime--;
            const displayMinutes = Math.floor(totalTime / 60);
            const displaySeconds = totalTime % 60;
            timerDisplay.textContent = `${displayMinutes}:${displaySeconds < 10 ? '0' : ''}${displaySeconds}`;
        }, 1000);
    });

    // Set Alarm
    setAlarmButton.addEventListener("click", () => {
        clearTimeout(alarmTimeout);

        const alarmTime = new Date();
        const [hours, minutes] = alarmTimeInput.value.split(":").map(Number);
        alarmTime.setHours(hours, minutes, 0, 0);

        if (alarmTime < new Date()) {
            alert("Please choose a future time.");
            return;
        }

        const tone = new Audio(alarmToneSelect.value);

        alarmTimeout = setTimeout(() => {
            tone.play();
            //alert("Alarm ringing!");
        }, alarmTime - new Date());
    });

    // Theme Toggle
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        themeToggle.textContent = document.body.classList.contains("dark-theme") ? "☀️" : "🌙";
    });

    // Initialize Clock
    updateClock();
});
