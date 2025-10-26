class CuriositiesApp {
    constructor() {
        this.quizScore = 0;
        this.totalQuestions = 3;
        this.answeredQuestions = 0;
        this.init();
    }

    init() {
        this.setupQuiz();
        this.setupAnimations();
    }

    setupQuiz() {
        // Configurar eventos do quiz
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.handleAnswer(e.currentTarget);
            });
        });

        // Botão de tentar novamente
        document.getElementById('retryQuiz').addEventListener('click', () => {
            this.resetQuiz();
        });
    }

    handleAnswer(selectedOption) {
        const question = selectedOption.closest('.quiz-question');
        const options = question.querySelectorAll('.quiz-option');
        
        // Desabilitar todas as opções desta pergunta
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Marcar resposta correta/incorreta
        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
        
        options.forEach(option => {
            if (option.getAttribute('data-correct') === 'true') {
                option.classList.add('correct');
            } else if (option === selectedOption && !isCorrect) {
                option.classList.add('incorrect');
            }
        });

        // Atualizar pontuação
        if (isCorrect) {
            this.quizScore++;
        }
        this.answeredQuestions++;

        // Atualizar display
        this.updateQuizDisplay();

        // Verificar se quiz terminou
        if (this.answeredQuestions === this.totalQuestions) {
            this.showFinalResults();
        }
    }

    updateQuizDisplay() {
        const scoreElement = document.getElementById('quizScore');
        scoreElement.textContent = `${this.quizScore}/${this.totalQuestions}`;
    }

    showFinalResults() {
        const percentage = (this.quizScore / this.totalQuestions) * 100;
        const titleElement = document.getElementById('quizTitle');
        const descriptionElement = document.getElementById('quizDescription');

        if (percentage === 100) {
            titleElement.textContent = '🎉 Perfeito!';
            descriptionElement.textContent = 'Você é um verdadeiro expert em criptografia!';
        } else if (percentage >= 70) {
            titleElement.textContent = '👍 Muito Bom!';
            descriptionElement.textContent = 'Você conhece bem os fundamentos da criptografia!';
        } else {
            titleElement.textContent = '📚 Continue Aprendendo!';
            descriptionElement.textContent = 'Revise as curiosidades e tente novamente!';
        }
    }

    resetQuiz() {
        this.quizScore = 0;
        this.answeredQuestions = 0;

        // Resetar todas as questões
        document.querySelectorAll('.quiz-question').forEach(question => {
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.remove('correct', 'incorrect');
                option.style.pointerEvents = 'auto';
            });
        });

        // Resetar display
        this.updateQuizDisplay();
        document.getElementById('quizTitle').textContent = 'Responda todas as perguntas!';
        document.getElementById('quizDescription').textContent = 'Clique nas opções para verificar suas respostas';
    }

    setupAnimations() {
        // Animação de entrada para os itens da timeline
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// Inicializar app quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new CuriositiesApp();
});