// Get elements
const celebrationPage = document.getElementById("celebrationPage");
const playAgainButton = document.getElementById("play-again");
const rulesButton = document.getElementById("rulesButton");
const ruleChart = document.getElementById("ruleChart");
const closeButton = document.getElementById("closeButton");
document.getElementById("userPickImage").src = "/Rock_Paper_Scissors_Play-Game/figmaimages/stone.png";

document.getElementById("computerPickImage").src = "/Rock_Paper_Scissors_Play-Game/figmaimages/scissors.png";


// Show the rules chart when RULES button is clicked
rulesButton.addEventListener("click", () => {
  ruleChart.classList.remove("hidden");
});

// Hide the rules chart when Close button is clicked
closeButton.addEventListener("click", () => {
  ruleChart.classList.add("hidden");
});

const handOptions = {
  "rock": "./figmaimages/stone.png",
  "paper": "./figmaimages/paper.png",
  "scissors": "./figmaimages/scissor.png"
};

let userScore = parseInt(localStorage.getItem("userScore")) || 0; // Get user score from localStorage
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0; // Get computer score from localStorage


// Function to show the celebration page
const showCelebrationPage = () => {
  if (userScore > computerScore) {
    setTimeout(() => {  
    celebrationPage.style.display = "flex"; // Show celebration page
  }, 1000);
}
};

// Function to hide the celebration page
const hideCelebrationPage = () => {
  celebrationPage.style.display = "none"; // Hide celebration page
};

// Function to handle "Play Again" button click
playAgainButton.addEventListener("click", () => {
  updateUserScore(userScore);
  updateComputerScore(computerScore);

  // Hide celebration page and resume the game
  hideCelebrationPage();
  restartGame(); // Restart the game
});

const hideLines = () => {
  document.querySelectorAll(".line").forEach((line) => {
    line.style.visibility = "hidden";
  });
};

// Function to show lines
const showLines = () => {
  document.querySelectorAll(".line").forEach((line) => {
    line.style.visibility = "visible";
  });
};

// Function to handle user's hand selection
const pickUserHand = (hand) => {
  hideLines(); // Hide lines

  let hands = document.querySelector(".hands");
  hands.style.display = "none";

  let contest = document.querySelector(".contest");
  contest.style.display = "flex";

  // Set user image
  document.getElementById("userPickImage").src = handOptions[hand];

  pickComputerHand(hand);
};

// Function to handle computer's hand selection
const pickComputerHand = (hand) => {
  let hands = ["rock", "paper", "scissors"];
  let cpHand = hands[Math.floor(Math.random() * hands.length)];

  // Set computer image
  document.getElementById("computerPickImage").src = handOptions[cpHand];

  referee(hand, cpHand);
};

// Function to determine the result
const referee = (userHand, cpHand) => {
  console.log("User Hand:", userHand, "Computer Hand:", cpHand);

  // Check for a tie first
  if (userHand === cpHand) {
    showDecisionMessage("tie-message");
    hideAgainstPcMessage();
    return; // Exit early to prevent triggering animation
  }
  

  // Continue only if there's no tie
  if (userHand === "paper" && cpHand === "scissors") {
    showDecisionMessage("lose-message");
    showAgainstPcMessage();
    updateComputerScore(computerScore + 1);
    triggerWinEffect("computer");
  } else if (userHand === "paper" && cpHand === "rock") {
    showDecisionMessage("win-message", "against-pc-message");
    showAgainstPcMessage();
    updateUserScore(userScore + 1);
    triggerWinEffect("user");
  } else if (userHand === "rock" && cpHand === "scissors") {
    showDecisionMessage("win-message");
    showAgainstPcMessage();
    updateUserScore(userScore + 1);
    triggerWinEffect("user");
  } else if (userHand === "rock" && cpHand === "paper") {
    showDecisionMessage("lose-message");
    showAgainstPcMessage();
    updateComputerScore(computerScore + 1);
    triggerWinEffect("computer");
  } else if (userHand === "scissors" && cpHand === "rock") {
    showDecisionMessage("lose-message");
    showAgainstPcMessage();
    updateComputerScore(computerScore + 1);
    triggerWinEffect("computer");
  } else if (userHand === "scissors" && cpHand === "paper") {
    showDecisionMessage("win-message");
    showAgainstPcMessage();
    updateUserScore(userScore + 1);
    triggerWinEffect("user");
  }

    // Call showCelebrationPage if the user wins
    if (userScore > computerScore) {
      showCelebrationPage();
    }
};


// Function to show the decision message
const showDecisionMessage = (className) => {
  document.querySelectorAll('.decision-message').forEach(el => el.style.display = 'none');
  document.querySelector(`.${className}`).style.display = 'block';
};

// Function to show the "AGAINST PC" message
const showAgainstPcMessage = () => {
  const againstPcElement = document.querySelector(".against-pc-message");
  againstPcElement.style.display = "block"; // Show the element
};

// Function to hide the "AGAINST PC" message
const hideAgainstPcMessage = () => {
  const againstPcElement = document.querySelector(".against-pc-message");
  againstPcElement.style.display = "none"; // Hide the element
};



// Remove any existing glow effects before applying a new one
document.querySelectorAll(".winner-ring").forEach((ring) => ring.remove());


// Function to restart the game
const restartGame = () => {
  showLines(); // Show lines

  let contest = document.querySelector(".contest");
  contest.style.display = "none";

  let hands = document.querySelector(".hands");
  hands.style.display = "flex";
};

// Function to update user score
const updateUserScore = (newScore) => {
  userScore = newScore;
  console.log("User score updated:", userScore);
  document.querySelector(".your_score p").innerText = newScore;
  localStorage.setItem("userScore", newScore); // Save user score to localStorage
};

// Function to update computer score
const updateComputerScore = (newScore) => {
  computerScore = newScore;
  console.log("Computer score updated:", computerScore);
  document.querySelector(".computer_score p").innerText = newScore;
  localStorage.setItem("computerScore", newScore); // Save computer score to localStorage
};

// Initialize the scores on page load
document.querySelector(".your_score p").innerText = userScore;
document.querySelector(".computer_score p").innerText = computerScore;

// Function to trigger the winning animation
const triggerWinEffect = (winner) => {
  console.log(`Triggering win effect for: ${winner}`);

  // Exit if the winner is neither 'user' nor 'computer' (to prevent tie animation)
  if (winner !== "user" && winner !== "computer") {
    console.log("No winner, skipping animation.");
    return;
  }

  let winnerElement;

  // Get the user's pick container if the user won
  if (winner === "user") {
    winnerElement = document.querySelector("#userPickImage").parentNode;
  }
  // Get the computer's pick container if the computer won
  else if (winner === "computer") {
    winnerElement = document.querySelector("#computerPickImage").parentNode;
  }

  // Remove any existing winner rings (to prevent overlapping animations)
  document.querySelectorAll(".winner-ring").forEach((ring) => ring.remove());

  // Apply the winner ring effect if we have the correct element
  if (winnerElement) {
    highlightWinner(winnerElement);
  }
};

// Function to highlight the winner's element
const highlightWinner = (winnerElement) => {
  const winnerRing = document.createElement("div");
  winnerRing.className = "winner-ring";

  // Ensure parent has relative positioning for correct alignment
  if (getComputedStyle(winnerElement).position === "static") {
    winnerElement.style.position = "relative";
  }

  // Set the size of the ring relative to the image size
  const ringSize = 185;
  winnerRing.style.width = `${ringSize}px`;
  winnerRing.style.height = `${ringSize}px`;

  
  winnerRing.style.top = `${-(ringSize - 185) / 2 + 5.5}px`; // Center the ring
  winnerRing.style.left = `${-(ringSize - 185) / 2 + 8}px`; // Center the ring
  winnerElement.appendChild(winnerRing);

  // Remove the ring after a delay
  setTimeout(() => {
    winnerRing.remove();
  }, 1000); //  seconds
};