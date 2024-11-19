class QuizTimer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.timeLeft = duration;
        this.timerId = null;
    }

    start() {
        if (this.timerId) return;
        
        this.createTimerElement();
        
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.onTick) {
                this.onTick(this.timeLeft);
            }
            
            if (this.timeLeft <= 0) {
                this.stop();
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }, 1000);
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        this.removeTimerElement();
    }

    reset() {
        this.timeLeft = this.duration;
        this.stop();
        this.start();
    }

    createTimerElement() {
        if (!document.getElementById('quizTimer')) {
            const timerElement = document.createElement('div');
            timerElement.id = 'quizTimer';
            timerElement.className = 'quiz-timer';
            document.body.appendChild(timerElement);
        }
        this.updateDisplay();
    }

    removeTimerElement() {
        const timerElement = document.getElementById('quizTimer');
        if (timerElement) {
            timerElement.remove();
        }
    }

    updateDisplay() {
        const timerElement = document.getElementById('quizTimer');
        if (timerElement) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Adaugă efecte vizuale pentru ultimele 30 de secunde
            if (this.timeLeft <= 30) {
                timerElement.classList.add('warning');
            }
            if (this.timeLeft <= 10) {
                timerElement.classList.add('danger');
            }
        }
    }
}

// Funcție pentru a genera feedback personalizat bazat pe scor
function generateQuizFeedback(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
    let feedback = {
        message: '',
        tips: []
    };

    if (percentage >= 90) {
        feedback.message = 'Excelent! Ești foarte bine pregătit pentru examen!';
        feedback.tips = [
            'Continuă să exersezi pentru a-ți menține nivelul',
            'Poți ajuta și alți colegi cu sfaturi valoroase'
        ];
    } else if (percentage >= 70) {
        feedback.message = 'Bine! Ai cunoștințe solide, dar mai este loc de îmbunătățire.';
        feedback.tips = [
            'Concentrează-te pe întrebările la care ai greșit',
            'Recitește cu atenție legislația rutieră'
        ];
    } else if (percentage >= 50) {
        feedback.message = 'Acceptabil, dar ai nevoie de mai multă practică.';
        feedback.tips = [
            'Focusează-te pe întrebările cu dificultate medie și mare',
            'Încearcă să înțelegi logica din spatele fiecărei reguli',
            'Participă la mai multe sesiuni de pregătire teoretică'
        ];
    } else {
        feedback.message = 'Mai ai nevoie de pregătire pentru a promova examenul.';
        feedback.tips = [
            'Începe cu întrebările ușoare și progresează gradual',
            'Participă la cursurile teoretice suplimentare',
            'Cere ajutorul instructorului pentru clarificări',
            'Exersează zilnic cu teste similare'
        ];
    }

    return feedback;
}

// Funcție pentru a salva progresul în localStorage
function saveQuizProgress(quizData) {
    const progress = {
        timestamp: new Date().toISOString(),
        score: quizData.score,
        totalQuestions: quizData.totalQuestions,
        timeSpent: quizData.timeSpent,
        incorrectAnswers: quizData.incorrectAnswers
    };

    let history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push(progress);
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

// Funcție pentru a afișa statistici despre progres
function displayQuizStatistics() {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    if (history.length === 0) return null;

    const stats = {
        totalTests: history.length,
        averageScore: 0,
        bestScore: 0,
        totalTimeSpent: 0,
        mostCommonMistakes: {}
    };

    history.forEach(entry => {
        stats.averageScore += (entry.score / entry.totalQuestions) * 100;
        stats.bestScore = Math.max(stats.bestScore, (entry.score / entry.totalQuestions) * 100);
        stats.totalTimeSpent += entry.timeSpent;

        entry.incorrectAnswers.forEach(q => {
            stats.mostCommonMistakes[q] = (stats.mostCommonMistakes[q] || 0) + 1;
        });
    });

    stats.averageScore = Math.round(stats.averageScore / history.length);
    stats.totalTimeSpent = Math.round(stats.totalTimeSpent / 60); // convertire în minute

    return stats;
}
