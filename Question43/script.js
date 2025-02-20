document.addEventListener("DOMContentLoaded", function() {
    // Retrieve or initialize timer from localStorage
    let timer = localStorage.getItem("quiz_timer") ? parseInt(localStorage.getItem("quiz_timer"), 10) : 7200;
    const countdownElement = document.getElementById("countdown");

    function updateTimer() {
        if (!countdownElement) {
            console.error("Countdown element not found!");
            return;
        }

        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timer > 0) {
            timer--;
            localStorage.setItem("quiz_timer", timer); // Save updated time
            setTimeout(updateTimer, 1000);
        }
    }
    updateTimer();

    // Get current question number dynamically
    let currentQuestion = document.body.getAttribute("data-question");

    // Function to save selected answer for the current question
    function saveAnswer() {
        let selectedAnswer = document.querySelector("input[name='answer']:checked");
        if (selectedAnswer) {
            localStorage.setItem(`question${currentQuestion}_answer`, selectedAnswer.value);
        }
    }

    // Function to restore previously selected answer
    function restoreAnswer() {
        let savedAnswer = localStorage.getItem(`question${currentQuestion}_answer`);
        if (savedAnswer) {
            let answerElement = document.querySelector(`input[name='answer'][value='${savedAnswer}']`);
            if (answerElement) {
                answerElement.checked = true;
            }
        }
    }

    restoreAnswer(); // Restore answer selection on page load

    const submitButton = document.getElementById("submitAnswer");
    if (submitButton) {
        submitButton.addEventListener("click", function() {
            let selectedAnswer = document.querySelector("input[name='answer']:checked");
            let feedback = document.getElementById("feedback");

            if (!selectedAnswer) {
                feedback.textContent = "Please select an answer.";
                feedback.className = "wrong";
                return;
            }

            if (selectedAnswer.value === "C") {
                feedback.textContent = "✔ Correct! Appending elements to a list adds them in the given order, so the output is 11, 4, 7.";
                feedback.className = "correct";
            } else {
                feedback.textContent = "✘ Incorrect. The correct answer is C: Appending elements stores them in sequence, so printing the list outputs 11, 4, 7.";
                feedback.className = "wrong";
            }
        });
    } else {
        console.error("submitAnswer button not found!");
    }
	const resetButton = document.getElementById("resetQuiz");
    if (resetButton) {
        resetButton.addEventListener("click", function() {
            localStorage.clear(); // Clears all stored answers and resets timer
            window.location.href = "../index.html";
        });
    } else {
        console.error("resetQuiz button not found!");
    }
    const backButton = document.getElementById("backQuestion");
    if (backButton) {
        backButton.addEventListener("click", function() {
            saveAnswer(); // ✅ Save before going back
            window.location.href = "../Question42/index.html";
        });
    } else {
        console.error("backQuestion button not found!");
    }

    const nextButton = document.getElementById("nextQuestion");
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            saveAnswer(); // ✅ Save before going forward
            window.location.href = "../Question44/index.html";
        });
    } else {
        console.error("nextQuestion button not found!");
    }
});