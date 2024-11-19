// Sample quiz questions
const allQuizQuestions = [
    {
        question: "Care este viteza maximă admisă în localitate pentru autovehiculele din categoria B?",
        options: [
            "40 km/h",
            "50 km/h",
            "60 km/h",
            "70 km/h"
        ],
        correct: 1,
        difficulty: "ușor"
    },
    {
        question: "Ce semnifică acest indicator?",
        image: "images/quiz/stop.jpg",
        options: [
            "Oprire la intersecție",
            "Cedează trecerea",
            "Drum cu prioritate",
            "Intersecție cu sens giratoriu"
        ],
        correct: 0,
        difficulty: "ușor"
    },
    {
        question: "În ce situație este interzisă depășirea?",
        options: [
            "Pe drumurile cu sens unic",
            "În intersecții",
            "Pe autostrăzi",
            "Pe drumurile naționale"
        ],
        correct: 1,
        difficulty: "mediu"
    },
    {
        question: "Care este distanța minimă legală de urmărire între două vehicule care circulă cu viteza de 50 km/h?",
        options: [
            "10 metri",
            "25 metri",
            "50 metri",
            "100 metri"
        ],
        correct: 1,
        difficulty: "mediu"
    },
    {
        question: "Ce trebuie să faceți în această situație?",
        image: "images/quiz/intersection.jpg",
        options: [
            "Acordați prioritate vehiculelor din dreapta",
            "Aveți prioritate de trecere",
            "Opriți și acordați prioritate tuturor vehiculelor",
            "Reduceți viteza și traversați cu atenție"
        ],
        correct: 2,
        difficulty: "mediu"
    },
    {
        question: "Care este limita maximă de viteză pe autostradă pentru un începător?",
        options: [
            "90 km/h",
            "110 km/h",
            "120 km/h",
            "130 km/h"
        ],
        correct: 2,
        difficulty: "ușor"
    }
];

// Funcție pentru a selecta aleatoriu întrebări din pool-ul total
function getRandomQuestions(count) {
    const shuffled = [...allQuizQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Variabile globale pentru quiz
let currentQuestion = 0;
let score = 0;
let quizQuestions = [];

// Event listener pentru încărcarea paginii
document.addEventListener('DOMContentLoaded', () => {
    // Verifică dacă suntem pe pagina de teste
    if (window.location.pathname.includes('teste.html')) {
        initializeQuiz();
    }
});

function initializeQuiz() {
    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    quizQuestions = getRandomQuestions(15);
    
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = `
        <div class="quiz-content">
            <div id="questionContainer" class="quiz-question"></div>
            <div id="optionsContainer" class="quiz-options"></div>
            <div class="quiz-controls mt-4">
                <button id="submitAnswer" class="btn btn-primary">Verifică Răspunsul</button>
                <button id="nextQuestion" class="btn btn-secondary d-none">Următoarea Întrebare</button>
            </div>
            <div id="result" class="mt-3"></div>
            <div id="finalScore" class="mt-4 d-none">
                <h4>Test Finalizat!</h4>
                <p>Scorul tău: <span id="score"></span></p>
                <button id="restartQuiz" class="btn btn-primary">Începe din nou</button>
            </div>
        </div>
    `;

    displayQuestion();
    setupEventListeners();
}

function displayQuestion() {
    const question = quizQuestions[currentQuestion];
    const questionContainer = document.getElementById('questionContainer');
    const optionsContainer = document.getElementById('optionsContainer');

    let questionHTML = `
        <div class="question-header">
            <h4>Întrebarea ${currentQuestion + 1} din ${quizQuestions.length}</h4>
            <span class="badge bg-${question.difficulty === 'ușor' ? 'success' : question.difficulty === 'mediu' ? 'warning' : 'danger'} mb-3">
                ${question.difficulty}
            </span>
        </div>
        <p class="question-text">${question.question}</p>
    `;

    if (question.image) {
        questionHTML += `
            <div class="question-image-container">
                <img src="${question.image}" 
                     alt="Imagine pentru întrebare" 
                     class="question-image img-fluid"
                     onerror="this.onerror=null; this.src='images/quiz/placeholder.jpg';">
            </div>`;
    }

    questionContainer.innerHTML = questionHTML;

    optionsContainer.innerHTML = question.options.map((option, index) => `
        <div class="form-check question-option mb-3">
            <input class="form-check-input" type="radio" name="quizOption" id="option${index}" value="${index}">
            <label class="form-check-label" for="option${index}">
                ${option}
            </label>
        </div>
    `).join('');
}

function setupEventListeners() {
    const submitButton = document.getElementById('submitAnswer');
    const nextButton = document.getElementById('nextQuestion');
    const restartButton = document.getElementById('restartQuiz');

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (!selectedOption) {
        alert('Te rugăm să selectezi un răspuns!');
        return;
    }

    const answer = parseInt(selectedOption.value);
    const correct = quizQuestions[currentQuestion].correct;
    const result = document.getElementById('result');
    const submitButton = document.getElementById('submitAnswer');
    const nextButton = document.getElementById('nextQuestion');

    if (answer === correct) {
        result.innerHTML = '<div class="alert alert-success">Răspuns corect!</div>';
        score++;
    } else {
        result.innerHTML = `<div class="alert alert-danger">Răspuns greșit! Răspunsul corect era: ${quizQuestions[currentQuestion].options[correct]}</div>`;
    }

    // Dezactivează toate opțiunile
    document.querySelectorAll('input[name="quizOption"]').forEach(option => {
        option.disabled = true;
    });

    submitButton.classList.add('d-none');
    nextButton.classList.remove('d-none');
}

function nextQuestion() {
    currentQuestion++;
    const submitButton = document.getElementById('submitAnswer');
    const nextButton = document.getElementById('nextQuestion');
    const result = document.getElementById('result');

    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
        submitButton.classList.remove('d-none');
        nextButton.classList.add('d-none');
        result.innerHTML = '';
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    const quizContainer = document.getElementById('quizContainer');
    const finalScore = document.getElementById('finalScore');
    const scoreSpan = document.getElementById('score');
    const percentage = (score / quizQuestions.length) * 100;

    scoreSpan.textContent = `${score} din ${quizQuestions.length} (${percentage.toFixed(1)}%)`;
    
    document.querySelector('.quiz-content').innerHTML = `
        <div class="text-center">
            <h4>Test Finalizat!</h4>
            <p class="lead">Scorul tău: ${score} din ${quizQuestions.length} (${percentage.toFixed(1)}%)</p>
            <div class="mt-4">
                <button id="restartQuiz" class="btn btn-primary btn-lg">Începe un nou test</button>
                <a href="index.html" class="btn btn-outline-secondary btn-lg ms-3">Înapoi la pagina principală</a>
            </div>
        </div>
    `;

    const restartButton = document.getElementById('restartQuiz');
    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
    }
}

function restartQuiz() {
    initializeQuiz();
}
