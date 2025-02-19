document.addEventListener("DOMContentLoaded", function() {
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
            localStorage.setItem("quiz_timer", timer); // Persist the timer
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

    restoreAnswer(); // 🔥 Fix: Now restores the last answer when the page loads

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

            saveAnswer(); // Save answer before checking correctness

            if (selectedAnswer.value === "B") {
                feedback.textContent = "✔ Correct! A graph is a structure consisting of vertices connected by edges, representing relationships among elements.";
                feedback.className = "correct";
            } else {
                feedback.textContent = "✘ Incorrect. The correct answer is B: A graph is a structure consisting of vertices connected by edges, representing relationships among elements.";
                feedback.className = "wrong";
            }
        });
    } else {
        console.error("submitAnswer button not found!");
    }

    const resetButton = document.getElementById("resetQuiz");
    if (resetButton) {
        resetButton.addEventListener("click", function() {
            localStorage.clear(); // 🔥 Fix: Now clears all stored answers and resets the timer
            window.location.href = "../index.html";
        });
    } else {
        console.error("resetQuiz button not found!");
    }

    const backButton = document.getElementById("backQuestion");
    if (backButton) {
        backButton.addEventListener("click", function() {
            saveAnswer(); // Save answer before navigating
            window.location.href = "../Question8/index.html";
        });
    } else {
        console.error("backQuestion button not found!");
    }

    const nextButton = document.getElementById("nextQuestion");
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            saveAnswer(); // Save answer before navigating
            window.location.href = "../Question10/index.html";
        });
    } else {
        console.error("nextQuestion button not found!");
    }
});
