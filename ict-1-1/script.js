window.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const namePage = document.getElementById('name-page');
    const quizPage = document.getElementById('quiz-page');
    const studentNameInput = document.getElementById('studentName');
    const displayName = document.getElementById('displayName');
    const startQuizButton = document.getElementById('startQuiz');
    const submitButton = document.getElementById('submit');
    const resultDiv = document.getElementById('result');
    const correctionDiv = document.getElementById('correction');
    const celebrationDiv = document.getElementById('celebration');
    const victorySound = document.getElementById('victorySound');
    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');
    
    let studentName = '';
    let answeredQuestions = 0;
    const totalQuestions = 30;

    // Start Quiz Function
    function startQuiz() {
        studentName = studentNameInput.value.trim();
        if (!studentName) {
            alert('من فضلك، اكتب اسمك أولاً!');
            studentNameInput.focus();
            return;
        }
        
        displayName.textContent = studentName;
        namePage.classList.remove('active');
        quizPage.classList.add('active');
        window.scrollTo(0, 0);
        updateProgress();
    }
    document.addEventListener('DOMContentLoaded', function() {
    // تفعيل السحب والإفلات
    const draggableItems = document.querySelectorAll('.draggable-item');
    const dropTargets = document.querySelectorAll('.drop-target');
    const matchingFeedback = document.querySelector('.matching-feedback');
    const checkAnswersBtn = document.getElementById('checkAnswers');
    
    let draggedItem = null;
    let userMatches = {};
    
    // إضافة事件 السحب
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', function() {
            draggedItem = this;
            setTimeout(() => this.classList.add('dragging'), 0);
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedItem = null;
        });
    });
    
    // إضافة事件 الإفلات
    dropTargets.forEach(target => {
        target.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('hover');
        });
        
        target.addEventListener('dragleave', function() {
            this.classList.remove('hover');
        });
        
        target.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('hover');
            
            if (draggedItem) {
                // حفظ إجابة المستخدم
                const itemText = draggedItem.textContent;
                const targetValue = this.getAttribute('data-value');
                
                userMatches[targetValue] = {
                    text: itemText,
                    correct: draggedItem.getAttribute('data-correct')
                };
                
                this.innerHTML = `${this.innerHTML} <span class="match-result">${itemText}</span>`;
                draggedItem.style.display = 'none';
            }
        });
    });
    
    // تفعيل أسئلة الإكمال
    const completionDropdowns = document.querySelectorAll('.completion-dropdown');
    const completionFeedback = document.querySelector('.completion-feedback');
    
    // الإجابات الصحيحة لأسئلة الإكمال
    const correctAnswers = {
        'q21': 'التكنولوجيا الخضراء',
        'q22': 'الكهربائية',
        'q23': 'الألواح الشمسية',
        'q24': 'المواد العضوية',
        'q25': 'إعادة التدوير'
    };
    
    // زر التحقق من الإجابات
    checkAnswersBtn.addEventListener('click', function() {
        let matchingScore = 0;
        let completionScore = 0;
        
        // التحقق من أسئلة المطابقة
        dropTargets.forEach(target => {
            const targetValue = target.getAttribute('data-value');
            const userMatch = userMatches[targetValue];
            
            if (userMatch && userMatch.correct === targetValue) {
                target.classList.add('correct');
                matchingScore++;
            } else if (userMatch) {
                target.classList.add('incorrect');
                // إظهار الإجابة الصحيحة
                const correctItem = Array.from(draggableItems).find(item => 
                    item.getAttribute('data-correct') === targetValue
                );
                if (correctItem) {
                    target.innerHTML += ` <span style="color: #16a34a; font-weight: bold;">(الإجابة الصحيحة: ${correctItem.textContent})</span>`;
                }
            }
        });
        
        // التحقق من أسئلة الإكمال
        completionDropdowns.forEach(dropdown => {
            const isCorrect = dropdown.value === correctAnswers[dropdown.name];
            
            if (isCorrect) {
                dropdown.classList.add('correct');
                completionScore++;
            } else {
                dropdown.classList.add('incorrect');
                // إظهار الإجابة الصحيحة
                const correctAnswer = correctAnswers[dropdown.name];
                dropdown.insertAdjacentHTML('afterend', 
                    ` <span style="color: #16a34a; font-weight: bold;">(الإجابة الصحيحة: ${correctAnswer})</span>`
                );
            }
        });
        
        // عرض النتائج
        const totalScore = matchingScore + completionScore;
        const maxScore = dropTargets.length + completionDropdowns.length;
        
        matchingFeedback.style.display = 'block';
        matchingFeedback.textContent = `نتيجة المطابقة: ${matchingScore}/${dropTargets.length}`;
        
        completionFeedback.style.display = 'block';
        completionFeedback.textContent = `نتيجة الإكمال: ${completionScore}/${completionDropdowns.length}`;
        
        // إظهار النتيجة النهائية
        const finalResult = document.createElement('div');
        finalResult.className = 'final-result';
        finalResult.style.marginTop = '20px';
        finalResult.style.padding = '15px';
        finalResult.style.backgroundColor = totalScore === maxScore ? '#f0fdf4' : '#fef3f2';
        finalResult.style.color = totalScore === maxScore ? '#166534' : '#dc2626';
        finalResult.style.borderRadius = '8px';
        finalResult.style.textAlign = 'center';
        finalResult.style.fontWeight = 'bold';
        finalResult.innerHTML = `
            <i class="fas ${totalScore === maxScore ? 'fa-trophy' : 'fa-star'}"></i>
            النتيجة النهائية: ${totalScore}/${maxScore}
            ${totalScore === maxScore ? ' - تهانٍ! لقد أجبت على جميع الأسئلة correctly.' : ''}
        `;
        
        checkAnswersBtn.parentNode.insertBefore(finalResult, checkAnswersBtn.nextSibling);
        
        // تعطيل الزر بعد الضغط عليه
        checkAnswersBtn.disabled = true;
        checkAnswersBtn.style.opacity = '0.7';
        checkAnswersBtn.style.cursor = 'not-allowed';
    });
});

    // Check All Questions Answered
    function checkAllAnswered() {
        const questions = document.querySelectorAll('.question');
        let allAnswered = true;
        let newAnsweredCount = 0;
        
        questions.forEach((question, index) => {
            const inputName = `q${index + 1}`;
            const inputs = document.getElementsByName(inputName);
            let answered = false;
            
            for (let input of inputs) {
                if (input.checked) {
                    answered = true;
                    break;
                }
            }
            
            if (!answered) allAnswered = false;
            else newAnsweredCount++;
        });
        
        answeredQuestions = newAnsweredCount;
        submitButton.disabled = !allAnswered;
        updateProgress();
        
        return allAnswered;
    }

    // Update Progress
    function updateProgress() {
        progressText.textContent = `${answeredQuestions}/${totalQuestions}`;
        progressBar.style.width = `${(answeredQuestions / totalQuestions) * 100}%`;
    }

    // Submit Quiz
function submitQuiz() {
    // 1️⃣ تحقق إن كل الأسئلة تمت الإجابة عليها
    if (!checkAllAnswered()) {
        alert('من فضلك، أجب على كل الأسئلة أولاً!');
        return;
    }

    let score = 0;
    let wrongAnswers = [];

    // 2️⃣ أسئلة الاختيار (صح/خطأ و اختيار من متعدد)
    const choiceQuestions = document.querySelectorAll('.question[data-answer]');
    choiceQuestions.forEach((question, index) => {
        const correctAnswer = question.getAttribute('data-answer');
        const inputName = `q${index + 1}`;
        const inputs = document.getElementsByName(inputName);
        let selectedValue = null;

        for (let input of inputs) {
            if (input.checked) {
                selectedValue = input.value;
                break;
            }
        }

        if (selectedValue === correctAnswer) {
            score++;
        } else {
            wrongAnswers.push({
                question: question.querySelector('p').textContent,
                selected: formatAnswer(selectedValue),
                correct: formatAnswer(correctAnswer)
            });
        }

        // عرض الإجابة الصحيحة
        const correctDiv = question.querySelector('.correct-answer');
        if (correctDiv) correctDiv.style.display = 'block';
    });

    // 3️⃣ أسئلة المطابقة (Drag & Drop)
    const dropTargets = document.querySelectorAll('.drop-target');
    dropTargets.forEach(target => {
        const targetValue = target.getAttribute('data-value');
        const item = target.querySelector('.draggable-item');

        if (item && item.getAttribute('data-correct') === targetValue) {
            score++;
        } else {
            if (item) {
                wrongAnswers.push({
                    question: target.textContent.trim(),
                    selected: item.textContent.trim(),
                    correct: 'المطابقة الصحيحة غير محققة'
                });
            }
        }
    });

    // 4️⃣ أسئلة الإكمال (Completion)
    const completionDropdowns = document.querySelectorAll('.completion-dropdown');
    const correctAnswers = {
        'q21': 'التكنولوجيا الخضراء',
        'q22': 'الكهربائية',
        'q23': 'الألواح الشمسية',
        'q24': 'المواد العضوية',
        'q25': 'إعادة التدوير'
    };

    completionDropdowns.forEach(dropdown => {
        if (dropdown.value === correctAnswers[dropdown.name]) {
            score++;
        } else {
            wrongAnswers.push({
                question: `إكمال ${dropdown.name}`,
                selected: dropdown.value || 'لم يجب',
                correct: correctAnswers[dropdown.name]
            });
        }
    });

    // 5️⃣ حساب العدد الكلي للأسئلة
    let totalQuestions = choiceQuestions.length + dropTargets.length + completionDropdowns.length;

    // 6️⃣ إظهار النتيجة النهائية
    showResults(score, wrongAnswers);

    // تحديث التقدم
    answeredQuestions = totalQuestions; 
    updateProgress();
}

    // Format Answer
    function formatAnswer(answer) {
        if (answer === "True") return "نعم";
        if (answer === "False") return "لا";
        return answer;
    }
    // 🔹 تفعيل السحب والإفلات لأسئلة التوصيل (المطابقة)
const draggableItems = document.querySelectorAll('.draggable-item');
const dropTargets = document.querySelectorAll('.drop-target');
const columnA = document.querySelector('.column-a');

draggableItems.forEach(item => {
    item.setAttribute('draggable', true); // مهم: يخليها قابلة للسحب

    item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text', e.target.textContent.trim());
        e.dataTransfer.setData('id', e.target.getAttribute('data-correct'));
        e.dataTransfer.setData('itemId', e.target.id || Math.random().toString(36).substr(2, 9));
        e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', e => {
        e.target.classList.remove('dragging');
    });
});

dropTargets.forEach(target => {
    target.addEventListener('dragover', e => {
        e.preventDefault();
        target.classList.add('hover');
    });

    target.addEventListener('dragleave', e => {
        target.classList.remove('hover');
    });

    target.addEventListener('drop', e => {
        e.preventDefault();
        target.classList.remove('hover');

        // لو فيه عنصر قديم في المكان يرجع للعمود (أ)
        const oldItem = target.querySelector('.draggable-item');
        if (oldItem) columnA.appendChild(oldItem);

        // جلب العنصر اللي بتسحبه
        const draggedId = e.dataTransfer.getData('itemId');
        const draggedItem = document.querySelector(`[id="${draggedId}"]`);

        if (draggedItem) {
            target.appendChild(draggedItem);
        }
    });
});

// السماح بإرجاع العناصر للعمود (أ)
columnA.addEventListener('dragover', e => e.preventDefault());
columnA.addEventListener('drop', e => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('itemId');
    const draggedItem = document.querySelector(`[id="${draggedId}"]`);
    if (draggedItem) {
        columnA.appendChild(draggedItem);
    }
});

    // Show Results
    function showResults(score, wrongAnswers) {
        resultDiv.style.display = 'block';
        
        if (score === totalQuestions) {
            resultDiv.className = 'success animate__animated animate__bounceIn';
            resultDiv.innerHTML = `
                <h2><i class="fas fa-trophy"></i> تهانينا ${studentName}!</h2>
                <p>🎉 لقد حصلت على الدرجة النهائية: ${score}/${totalQuestions}</p>
                <p>أحسنت! لقد أظهرت فهمًا ممتازًا  لمادة تكنولوجيا المعلومات والاتصالات.</p>
                <p>هذا الإنجاز هو بداية رحلتك في عالم التكنولوجيا، استمر في التعلم والتطور.</p>
                <button id="tryAgain" class="btn btn-success">
                    <i class="fas fa-redo"></i> حاول مرة أخرى
                </button>
            `;
            startCelebration();
        } else if (score >= totalQuestions * 0.7) {
            resultDiv.className = 'success animate__animated animate__fadeIn';
            resultDiv.innerHTML = `
                <h2><i class="fas fa-thumbs-up"></i> جيد جدًا ${studentName}!</h2>
                <p>🎯 درجتك: ${score}/${totalQuestions}</p>
                <p>أداء جيد، لكن هناك بعض النقاط التي تحتاج إلى مراجعة.</p>
                <p>راجع الأخطاء وحاول مرة أخرى لتحقيق نتيجة أفضل.</p>
                <button id="tryAgain" class="btn btn-success">
                    <i class="fas fa-redo"></i> حاول مرة أخرى
                </button>
            `;
            showCorrection(wrongAnswers);
        } else {
            resultDiv.className = 'fail animate__animated animate__fadeIn';
            resultDiv.innerHTML = `
                <h2><i class="fas fa-lightbulb"></i> ${studentName}، تحتاج إلى مزيد من الممارسة</h2>
                <p>📊 درجتك: ${score}/${totalQuestions}</p>
                <p>لا تقلق، التعلم عملية مستمرة. راجع الدروس وحاول مرة أخرى.</p>
                <p>التركيز على الأخطاء يساعدك على التحسن.</p>
                <button id="tryAgain" class="btn btn-success">
                    <i class="fas fa-redo"></i> حاول مرة أخرى
                </button>
            `;
            showCorrection(wrongAnswers);
        }
        
        document.getElementById('tryAgain').addEventListener('click', resetQuiz);
    }

    // Show Correction
    function showCorrection(wrongAnswers) {
        if (wrongAnswers.length === 0) return;
        
        correctionDiv.style.display = 'block';
        let correctionHTML = `
            <h3><i class="fas fa-book"></i> تصحيح الأخطاء</h3>
            <p>راجع هذه الأجوبة لتحسن أدائك في المحاولة القادمة:</p>
        `;
        
        wrongAnswers.forEach((item, index) => {
            correctionHTML += `
                <div class="correction-item">
                    <p><strong>السؤال:</strong> ${item.question}</p>
                    <p><strong>إجابتك:</strong> ${item.selected || 'لم تجب'}</p>
                    <p><strong>الإجابة الصحيحة:</strong> ${item.correct}</p>
                </div>
            `;
        });
        
        correctionDiv.innerHTML = correctionHTML;
    }

    // Celebration Effects
    function startCelebration() {
        celebrationDiv.style.display = 'block';
        victorySound.muted = false;
        victorySound.play().catch(e => console.log('Auto-play prevented:', e));
        
        // Create confetti
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.backgroundColor = getRandomColor();
                celebrationDiv.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, Math.random() * 1000);
        }
        
        // Create balloons
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.style.left = Math.random() * 100 + 'vw';
                balloon.style.animationDelay = Math.random() * 0.5 + 's';
                balloon.style.backgroundColor = getRandomColor();
                celebrationDiv.appendChild(balloon);
                
                setTimeout(() => balloon.remove(), 6000);
            }, Math.random() * 2000);
        }
    }

    // Get Random Color
    function getRandomColor() {
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Reset Quiz
    function resetQuiz() {
        // Reset inputs
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
        studentNameInput.value = '';
        
        // Hide results and corrections
        resultDiv.style.display = 'none';
        correctionDiv.style.display = 'none';
        resultDiv.className = '';
        
        // Hide celebration
        celebrationDiv.style.display = 'none';
        celebrationDiv.innerHTML = '';
        
        // Hide correct answers
        document.querySelectorAll('.correct-answer').forEach(el => el.style.display = 'none');
        
        // Reset progress
        answeredQuestions = 0;
        updateProgress();
        
        // Switch pages
        namePage.classList.add('active');
        quizPage.classList.remove('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Event Listeners
    startQuizButton.addEventListener('click', startQuiz);
    studentNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startQuiz();
    });
    
    submitButton.addEventListener('click', submitQuiz);
    
    document.addEventListener('change', () => {
        checkAllAnswered();
    });
});