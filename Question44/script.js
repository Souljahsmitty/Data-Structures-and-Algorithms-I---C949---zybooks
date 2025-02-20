document.addEventListener("DOMContentLoaded", function() {
    let timer = 7200; // 2 hours in seconds
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
            setTimeout(updateTimer, 1000);
        }
    }
    updateTimer();

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

			if (selectedAnswer.value === "B") {
				feedback.textContent = "✔ Correct! A linked list uses pointers to connect nodes, while an array uses a contiguous memory block.";
				feedback.className = "correct";
			} else {
				feedback.textContent = "✘ Incorrect. The correct answer is B: A linked list uses pointers to connect nodes, while an array uses a contiguous memory block.";
				feedback.className = "wrong";
			}
        });
    } else {
        console.error("submitAnswer button not found!");
    }

    const resetButton = document.getElementById("resetQuiz");
    if (resetButton) {
        resetButton.addEventListener("click", function() {
            window.location.href = "../index.html";
        });
    } else {
        console.error("resetQuiz button not found!");
    }
	const backButton = document.getElementById("backQuestion");
    if (backButton) {
        backButton.addEventListener("click", function() {
            window.location.href = "../Question4/index.html";
        });
    } else {
        console.error("nextQuestion button not found!");
    }
    const nextButton = document.getElementById("nextQuestion");
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            window.location.href = "../Question6/index.html";
        });
    } else {
        console.error("nextQuestion button not found!");
    }
});