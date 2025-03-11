let userScore = 0;
let comScore = 0;

// Check for the highest score in local storage
let highestScore = localStorage.getItem("Highest") ? JSON.parse(localStorage.getItem("Highest")) : 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userpara = document.querySelector("#user-score");
const computerpara = document.querySelector("#computer-score");
const highestScoreDisplay = document.querySelector("#Highest");
const button = document.querySelector(".btn");
const wingAnimation = document.querySelector("#wing-animation");

// Update the highest score display on page load
highestScoreDisplay.innerText = highestScore;

const genComChoice = () => {
    const option = ["stone", "paper", "scissor"];
    const randmIdx = Math.floor(Math.random() * 3);
    return option[randmIdx];
}

const showWin = (userWin, comChoice, userChoice) => {
    if (userWin) {
        userScore++;
        msg.innerText = `You Win👏 Your ${userChoice} beats ${comChoice}`;
        msg.style.backgroundColor = "green";
        userpara.innerText = userScore;

        // Trigger wing animation
        wingAnimation.classList.add("animate-wing");
        setTimeout(() => {
            wingAnimation.classList.remove("animate-wing");
        }, 2000); // Duration of the animation

        // Update highest score if the current user score is greater
        if (userScore > highestScore) {
            highestScore = userScore;
            localStorage.setItem("Highest", JSON.stringify(highestScore));
            highestScoreDisplay.innerText = highestScore;
        }

    } else {
        comScore++;
        msg.innerText = `You Lost👎  ${comChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
        computerpara.innerText = comScore;
    }
}

const drawGame = () => {
    msg.innerText = "Tie! Try Again";
    msg.style.backgroundColor = "darkgray";
};

const result = (userChoice, comChoice) => {
    if (userChoice === comChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "stone") {
            userWin = comChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = comChoice === "stone" ? true : false;
        } else {
            userWin = comChoice === "stone" ? false : true;
        }

        showWin(userWin, comChoice, userChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        const comChoice = genComChoice();
        result(userChoice, comChoice);
    });
});

let theme = "default"; // Track the current theme

button.addEventListener("click", () => {
    choices.forEach((choice) => {
        const img = choice.querySelector("img");
        if (theme === "default") {
            if (choice.getAttribute("id") === "stone") {
                img.src = "rock.png";
            } else if (choice.getAttribute("id") === "paper") {
                img.src = "paper.png";
            } else if (choice.getAttribute("id") === "scissor") {
                img.src = "scissors.png";
            }
        } else {
            if (choice.getAttribute("id") === "stone") {
                img.src = "rock1.jpg";
            } else if (choice.getAttribute("id") === "paper") {
                img.src = "paper1.jpg";
            } else if (choice.getAttribute("id") === "scissor") {
                img.src = "scissor1.jpg";
            }
        }
    });
    theme = theme === "default" ? "new" : "default";
    console.log("Theme is changed");
});
