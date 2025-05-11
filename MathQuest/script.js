let gameStarted = false;
let screenTime = 0;
let breakTime = false;
let timer;
let currentLevel = 0;
let stars = 0;

const levels = [
  // Addition
  {
    question: "What is 3 + 5?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2,
    video: "https://www.youtube.com/watch?v=2B3sE4l2T2c"
  },
  {
    question: "What is 27 + 23 ?",
    options: ["61", "50", "60", "63"],
    correctAnswer: 1,
    video: "https://www.youtube.com/watch?v=2B3sE4l2T2c"
  },
  // Subtraction
  {
    question: "What is 10 - 4?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    video: "https://www.youtube.com/watch?v=U9jzFz6V_58"
  },
  {
    question: "What is 16 - 11?",
    options: ["6", "7", "5", "9"],
    correctAnswer: 2,
    video: "https://www.youtube.com/watch?v=U9jzFz6V_58"
  },
  // Multiplication
  {
    question: "What is 4 × 3?",
    options: ["11", "12", "13", "14"],
    correctAnswer: 1,
    video: "https://www.youtube.com/watch?v=9XzfQUXqiYY"
  },
  {
    question: "What is 7 × 6?",
    options: ["42", "44", "48", "40"],
    correctAnswer: 0,
    video: "https://www.youtube.com/watch?v=9XzfQUXqiYY"
  },
  // Division
  {
    question: "What is 20 ÷ 4?",
    options: ["4", "5", "6", "7"],
    correctAnswer: 1,
    video: "https://www.youtube.com/watch?v=MOe3J-uFHYQ"
  },
  {
    question: "What is 36 ÷ 6?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 1,
    video: "https://www.youtube.com/watch?v=MOe3J-uFHYQ"
  },
  // Algebraic Formulas
  {
    question: "What is the formula for (a + b)²?",
    options: [
      "a² + b² + 2ab",
      "a² - b²",
      "a² + b² - 2ab",
      "a² + b²"
    ],
    correctAnswer: 0,
    video: "https://www.youtube.com/watch?v=m-HUlq0Q6Qg"
  },
  {
    question: "What is the formula for (a - b)²?",
    options: [
      "a² + b² + 2ab",
      "a² - b² + 2ab",
      "a² + b² - 2ab",
      "a² - 2ab + b²"
    ],
    correctAnswer: 3,
    video: "https://www.youtube.com/watch?v=m-HUlq0Q6Qg"
  },
  // Theorems
  {
    question: "What does the Pythagorean Theorem state?",
    options: [
      "a² + b² = c²",
      "a + b = c",
      "a² - b² = c²",
      "2a + 2b = c"
    ],
    correctAnswer: 0,
    video: "https://www.youtube.com/watch?v=QyAaPbL9qvY"
  },
  {
    question: "Thales’ Theorem applies to?",
    options: [
      "Right angle in a semicircle",
      "Acute angle triangle",
      "Obtuse triangle",
      "Equilateral triangle"
    ],
    correctAnswer: 0,
    video: "https://www.youtube.com/watch?v=tXUmHXI-g0A"
  }
];

document.getElementById('startBtn').addEventListener('click', function () {
  gameStarted = true;
  document.getElementById('introModal').style.display = 'none';
  startGameTimer();
  displayQuestion();
});

window.onload = function () {
  document.getElementById('introModal').style.display = 'block';
};

function startGameTimer() {
  setInterval(() => {
    if (!breakTime && gameStarted) {
      screenTime++;
      checkForBreak();
    }
  }, 60000);
}

function checkForBreak() {
  if (screenTime >= 10 && !breakTime) {
    triggerBreak();
  }
}

function triggerBreak() {
  breakTime = true;
  document.getElementById('break-message').style.display = 'block';
  setTimeout(endBreak, 5 * 60 * 1000);
}

function endBreak() {
  breakTime = false;
  document.getElementById('break-message').style.display = 'none';
  alert("Break over! Let's get back to learning.");
  displayQuestion();
}

function displayQuestion() {
  if (currentLevel >= levels.length) {
    showCongratulations();
    return;
  }

  clearInterval(timer); // Clear any existing timer

  const level = levels[currentLevel];
  const quizElement = document.getElementById('quiz');
  let optionsHTML = "";

  level.options.forEach((option, index) => {
    optionsHTML += `<button onclick="checkAnswer(${index})">${option}</button>`;
  });

  quizElement.innerHTML = `
    <h2>Level ${currentLevel + 1}: ${level.question}</h2>
    <div class="options">${optionsHTML}</div>
    <div id="video-container"></div>
  `;

  startTimer();
  updateProgress();
}

function startTimer() {
  let timeLeft = 10;
  const timerElement = document.getElementById('timer');

  timerElement.textContent = timeLeft;

  clearInterval(timer); // Clear existing timer before starting new one

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft < 0) {
      clearInterval(timer);
      alert("Time's up! Moving to the next level.");
      nextLevel();
    }
  }, 1000);
}

function checkAnswer(selectedIndex) {
  const level = levels[currentLevel];
  clearInterval(timer);

  if (selectedIndex === level.correctAnswer) {
    stars++;
    document.getElementById('stars').textContent = stars;
    document.getElementById('video-container').innerHTML = "";
    showCelebration();
    setTimeout(nextLevel, 1000);
  } else {
    alert("Oops! Let's learn it together!");
    showHelpVideo(level.video);
  }
}

function showHelpVideo(url) {
  const container = document.getElementById('video-container');
  container.innerHTML = `
    <iframe width="300" height="200" src="${url}" frameborder="0" allowfullscreen></iframe>
  `;
}

function showCelebration() {
  document.getElementById('celebration').style.display = 'block';
}

function nextLevel() {
  currentLevel++;
  document.getElementById('celebration').style.display = 'none';
  displayQuestion();
}

function updateProgress() {
  const progressBar = document.getElementById('progress-bar');
  const progress = (currentLevel / levels.length) * 100;
  progressBar.style.width = progress + '%';
}

function showCongratulations() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('celebration').style.display = 'none';

  const progressBar = document.getElementById('progress-bar');
  
  // Smooth animation: trigger update after slight delay
  setTimeout(() => {
    progressBar.style.width = '100%';
  }, 200); // Delay ensures CSS transition is triggered

  const congratsElement = document.getElementById('congratulations');
  congratsElement.style.display = 'block';

  const medal = document.getElementById('medal');

  if (stars >= 10) {
    medal.innerHTML = '<div class="medal gold">🥇</div><p>You earned the Gold Medal!</p>';
  } else if (stars >= 6) {
    medal.innerHTML = '<div class="medal silver">🥈</div><p>You earned the Silver Medal!</p>';
  } else {
    medal.innerHTML = '<div class="medal bronze">🥉</div><p>You earned the Bronze Medal!</p>';
  }

  for (let i = 0; i < 5; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    document.getElementById('balloons').appendChild(balloon);
  }
}




