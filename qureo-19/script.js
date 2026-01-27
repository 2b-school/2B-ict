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
    const quizContainer = document.getElementById('quiz');
    
    let studentName = '';
    let answeredQuestions = 0;
    let totalQuestions = 0;

    // ==========================================
    // دالة مساعدة لمنع اختفاء أكواد HTML
    // ==========================================
    function escapeHtml(text) {
        if (!text) return text;
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // ==========================================
    // مصفوفة الأسئلة
    // ==========================================
    const questions = {
    multipleChoice: [
        {
            id: 1,
            question: '1. أي خاصية في CSS تُستخدم لتغيير لون النص؟',
            options: [
                { value: "0", text: 'text-color' },
                { value: "1", text: 'font-color' },
                { value: "2", text: 'color' }, 
                { value: "3", text: 'background' }
            ],
            correctAnswer: "2",
            note: "في CSS، نستخدم الخاصية color فقط لتغيير لون النص."
        },
        {
            id: 2,
            question: '2. أي كود صحيح لتلوين النص باللون الأحمر؟',
            options: [
                { value: "0", text: 'color = red;' },
                { value: "1", text: 'color: red;' }, 
                { value: "2", text: 'text-color: red;' },
                { value: "3", text: 'font-color: red;' }
            ],
            correctAnswer: "1",
            note: "تُكتب الخصائص في CSS باستخدام النقطتين الرأسيتين (:) وليس علامة (=)."
        },
        {
            id: 3,
            question: '3. أي خاصية تُستخدم لتغيير لون خلفية العنصر؟',
            options: [
                { value: "0", text: 'bg-color' },
                { value: "1", text: 'color' },
                { value: "2", text: 'background' },
                { value: "3", text: 'background-color' } 
            ],
            correctAnswer: "3",
            note: "الخاصية background-color مخصصة لتحديد لون الخلفية."
        },
        {
            id: 4,
            question: '4. أي كود صحيح لجعل خلفية العنصر باللون الأصفر؟',
            options: [
                { value: "0", text: 'background: yellow;' }, 
                { value: "1", text: 'color: yellow;' },
                { value: "2", text: 'background-color: yellow;' },
                { value: "3", text: 'bg-color: yellow;' }
            ],
            correctAnswer: "2", // ملاحظة: الخيار A صحيح أيضاً كـ Shorthand لكن الأفضل تخصصاً هو C
            note: "background-color هي الطريقة المباشرة والأكثر وضوحاً لتغيير لون الخلفية."
        },
        {
            id: 5,
            question: '5. أي خاصية تتحكم في سمك الخط؟',
            options: [
                { value: "0", text: 'font-style' },
                { value: "1", text: 'font-size' },
                { value: "2", text: 'font-weight' }, 
                { value: "3", text: 'text-align' }
            ],
            correctAnswer: "2",
            note: "الخاصية font-weight تحدد مدى سمك (ثقل) الأحرف."
        },
        {
            id: 6,
            question: '6. أي قيمة تجعل الخط عادي (غير سميك)؟',
            options: [
                { value: "0", text: 'bold' },
                { value: "1", text: 'heavy' },
                { value: "2", text: 'normal' }, 
                { value: "3", text: 'strong' }
            ],
            correctAnswer: "2",
            note: "القيمة normal هي القيمة الافتراضية للخطوط العادية."
        },
        {
            id: 7,
            question: '7. أي قيمة تجعل الخط سميكًا؟',
            options: [
                { value: "0", text: 'normal' },
                { value: "1", text: 'bold' }, 
                { value: "2", text: 'large' },
                { value: "3", text: 'huge' }
            ],
            correctAnswer: "1",
            note: "نستخدم القيمة bold لجعل النص عريضاً أو سميكاً."
        },
        {
            id: 8,
            question: '8. أي خاصية تُستخدم لتغيير حجم الخط؟',
            options: [
                { value: "0", text: 'text-size' },
                { value: "1", text: 'font-weight' },
                { value: "2", text: 'font-size' }, 
                { value: "3", text: 'size' }
            ],
            correctAnswer: "2",
            note: "الخاصية font-size هي المسؤولة عن تحديد حجم الخط."
        },
        {
            id: 9,
            question: '9. أي كود صحيح لجعل حجم الخط 50 بكسل؟',
            options: [
                { value: "0", text: 'font-size = 50px;' },
                { value: "1", text: 'font-size: 50;' },
                { value: "2", text: 'text-size: 50px;' },
                { value: "3", text: 'font-size: 50px;' } 
            ],
            correctAnswer: "3",
            note: "يجب دائماً كتابة وحدة القياس مثل (px) بعد الرقم مباشرة في CSS."
        },
        {
            id: 10,
            question: '10. أي وحدة قياس مستخدمة لتحديد حجم الخط في الكود السابق؟',
            options: [
                { value: "0", text: '%' },
                { value: "1", text: 'em' },
                { value: "2", text: 'px' }, 
                { value: "3", text: 'rem' }
            ],
            correctAnswer: "2",
            note: "px تعني بكسل وهي وحدة قياس ثابتة وشائعة جداً."
        },
        {
            id: 11,
            question: '11. أي رمز يُستخدم لكتابة تعليق (Comment) في CSS؟',
            options: [
                { value: "0", text: '//' },
                { value: "1", text: '' },
                { value: "2", text: '##' },
                { value: "3", text: '/* */' } 
            ],
            correctAnswer: "3",
            note: "تعليقات CSS تبدأ بـ /* وتنتهي بـ */ وتختلف عن تعليقات HTML."
        },
        {
            id: 12,
            question: '12. ما فائدة التعليق (Comment) في CSS؟',
            options: [
                { value: "0", text: 'تشغيل الكود' },
                { value: "1", text: 'إيقاف المتصفح' },
                { value: "2", text: 'كتابة ملاحظة لا يقرأها المتصفح' }, 
                { value: "3", text: 'تغيير لون الصفحة' }
            ],
            correctAnswer: "2",
            note: "التعليقات تساعد المبرمجين على فهم الكود ولا تؤثر على شكل الصفحة."
        },
        {
            id: 13,
            question: '13. أي Selector يختار جميع عناصر الفقرة (p)؟',
            options: [
                { value: "0", text: '.p' },
                { value: "1", text: '#p' },
                { value: "2", text: 'p' }, 
                { value: "3", text: '*p' }
            ],
            correctAnswer: "2",
            note: "لاختيار Tag معين نكتب اسمه مباشرة بدون أي رموز إضافية."
        },
        {
            id: 14,
            question: '14. أي Selector يختار العناصر التي تحمل class باسم box؟',
            options: [
                { value: "0", text: 'box' },
                { value: "1", text: '#box' },
                { value: "2", text: '*box' },
                { value: "3", text: '.box' } 
            ],
            correctAnswer: "3",
            note: "يتم استهداف الـ Class دائماً بوضع نقطة (.) قبل الاسم."
        },
        {
            id: 15,
            question: '15. الفرق الأساسي بين Tag Selector و Class Selector هو أن:',
            options: [
                { value: "0", text: 'الاتنين نفس الشيء' },
                { value: "1", text: 'Tag Selector يختار عنصرًا واحدًا فقط' },
                { value: "2", text: 'Class Selector يختار كل عناصر الصفحة' },
                { value: "3", text: ' يختار كل العناصر من نفس النوع، و Tag Selector    يختار العناصر التي تحمل نفس الكلاسClass Selector' } 
            ],
            correctAnswer: "3",
            note: "الـ Tag Selector عام جداً، بينما الـ Class يسمح بتنسيق عناصر محددة بدقة أكبر."
        }
    ],
    trueFalse: [] 
};
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
        
        createQuiz();
        
        totalQuestions = questions.multipleChoice.length + questions.trueFalse.length;
        
        updateProgress();
        
        submitButton.disabled = false;
    }

    // إنشاء الأسئلة ديناميكياً
    function createQuiz() {
        let quizHTML = '';
        
        if (questions.trueFalse.length > 0) {
            quizHTML += `<h2><i class="fas fa-check-circle"></i> أولاً: ضع علامة (✓) أو (✗) (${questions.trueFalse.length} سؤالاً)</h2>`; 
            questions.trueFalse.forEach(q => {
                quizHTML += `
                    <div class="question" data-answer="${q.correctAnswer}">
                        <div class="question-number">${q.id}</div>
                        <p>${q.question}</p>
                        <div class="options">
                            <label class="option">
                                <input type="radio" name="q${q.id}" value="✔️">
                                <span class="option-label">(✓) صحيح</span>
                            </label>
                            <label class="option">
                                <input type="radio" name="q${q.id}" value="❌">
                                <span class="option-label">(✗) خطأ</span>
                            </label>
                        </div>
                        <div class="correct-answer" style="display: none;">
                            <i class="fas fa-check-circle"></i> الإجابة الصحيحة: (${q.correctAnswer}) ${q.correctAnswer === '✔️' ? 'صحيح' : 'خطأ'}
                        </div>
                    </div>
                `;
            });
        }

        if (questions.multipleChoice.length > 0) {
            quizHTML += `<h2><i class="fas fa-code"></i> أسئلة CSS (${questions.multipleChoice.length} سؤالاً)</h2>`; 
            questions.multipleChoice.forEach(q => {
                quizHTML += `
                    <div class="question" data-answer="${q.correctAnswer}">
                        <div class="question-number">${q.id}</div>
                        <p style="font-weight:bold;">${q.question}</p>
                        <div class="options">
                `;
                
                const noteText = q.note ? `<br><small style="color:#28a745; display:block; margin-top:5px;">💡 الشرح: ${q.note}</small>` : '';

                q.options.forEach(option => {
                    // هنا يتم استخدام دالة escapeHtml لتحويل الرموز
                    // ثم تحويل الأسطر الجديدة إلى <br>
                    const safeText = escapeHtml(option.text);
                    const formattedText = safeText.replace(/\n/g, '<br>');
                    
                    quizHTML += `
                        <label class="option" style="align-items: flex-start;">
                            <input type="radio" name="q${q.id}" value="${option.value}" style="margin-top: 5px;">
                            <span class="option-label" style="font-family: monospace; direction: ltr; text-align: left; white-space: pre-wrap;">${formattedText}</span>
                        </label>
                    `;
                });
                
                quizHTML += `
                        </div>
                        <div class="correct-answer" style="display: none;">
                            <i class="fas fa-check-circle"></i> الإجابة الصحيحة هي الخيار رقم (${parseInt(q.correctAnswer) + 1})
                            ${noteText}
                        </div>
                    </div>
                `;
            });
        }
        
        quizContainer.innerHTML = quizHTML;
    }
    
    // Check All Questions Answered
    function checkAllAnswered() {
        let allAnswered = true;
        let newAnsweredCount = 0;
        
        const choiceQuestions = document.querySelectorAll('.question[data-answer]');
        choiceQuestions.forEach((question, index) => {
            const questionNumber = question.querySelector('.question-number').textContent;
            const inputName = `q${questionNumber}`;
            const inputs = document.getElementsByName(inputName);
            let answered = false;
            
            for (let input of inputs) {
                if (input.checked) {
                    answered = true;
                    break;
                }
            }
            
            if (answered) newAnsweredCount++;
            else allAnswered = false;
        });
        
        answeredQuestions = newAnsweredCount;
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
        if (!checkAllAnswered()) {
           alert('من فضلك، أجب على كل الأسئلة أولاً!'); 
           return;
        }

        let score = 0;
        let wrongAnswers = [];

        const choiceQuestions = document.querySelectorAll('.question[data-answer]');
        choiceQuestions.forEach((question, index) => {
            const correctAnswer = question.getAttribute('data-answer');
            const questionNumberElement = question.querySelector('.question-number');
            
            const qId = questionNumberElement ? questionNumberElement.textContent : null;
            const inputName = `q${qId}`;
            const inputs = document.getElementsByName(inputName);
            let selectedValue = null;

            for (let input of inputs) {
                if (input.checked) {
                    selectedValue = input.value;
                    break;
                }
            }

            // تلوين الإجابات
            const allOptions = question.querySelectorAll('.option');
            allOptions.forEach(option => {
                const optionInput = option.querySelector('input[type="radio"]');
                option.classList.remove('selected', 'correct', 'incorrect'); 

                if (optionInput && optionInput.value === correctAnswer) {
                    option.classList.add('correct');
                }
                
                if (optionInput && optionInput.checked && optionInput.value !== correctAnswer) {
                    option.classList.add('incorrect');
                }
            });

            if (selectedValue === correctAnswer) {
                score++;
            } else {
                wrongAnswers.push({
                    question: question.querySelector('p').textContent,
                    selected: formatAnswer(selectedValue, qId),
                    correct: formatAnswer(correctAnswer, qId)
                });
            }

            const correctDiv = question.querySelector('.correct-answer');
            if (correctDiv) correctDiv.style.display = 'block';
        });

        showResults(score, totalQuestions, wrongAnswers);
        answeredQuestions = totalQuestions; 
        updateProgress();
    }

    // Format Answer
    function formatAnswer(answer, qId) {
        if (answer === "True" || answer === '✔️') return "صحيح (✓)";
        if (answer === "False" || answer === '❌') return "خطأ (✗)";
        
        if (!qId) return answer || 'لم يجب';

        const allQuestions = [...questions.multipleChoice, ...questions.trueFalse];
        const questionMatch = allQuestions.find(q => q.id == qId);

        if (questionMatch && questionMatch.options) {
            const option = questionMatch.options.find(o => o.value === answer);
            // نحتاج هنا أيضاً إلى عرض النص بشكل آمن في نافذة التصحيح
            return option ? escapeHtml(option.text) : answer;
        }

        return answer || 'لم يجب';
    }


    // Show Results
    function showResults(score, totalQuestions, wrongAnswers) {
        resultDiv.style.display = 'block';
        
        if (score === totalQuestions) {
            resultDiv.className = 'success animate__animated animate__bounceIn';
            resultDiv.innerHTML = `
                <h2><i class="fas fa-trophy"></i> تهانينا ${studentName}!</h2>
                <p>🎉 لقد حصلت على الدرجة النهائية: ${score}/${totalQuestions}</p>
                <p>أحسنت! مستوى رائع في البرمجة.</p>
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
                <p>أداء جيد، راجع الأخطاء وحاول مجدداً.</p>
                <button id="tryAgain" class="btn btn-success">
                    <i class="fas fa-redo"></i> حاول مرة أخرى
                </button>
            `;
            showCorrection(wrongAnswers);
        } else {
            resultDiv.className = 'fail animate__animated animate__fadeIn';
            resultDiv.innerHTML = `
                <h2><i class="fas fa-lightbulb"></i> ${studentName}، تحتاج للمراجعة</h2>
                <p>📊 درجتك: ${score}/${totalQuestions}</p>
                <p>راجع مفاهيم HTML وحاول مرة أخرى.</p>
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
            <p>راجع هذه الأجوبة:</p>
        `;
        
        wrongAnswers.forEach((item, index) => {
            correctionHTML += `
                <div class="correction-item" style="direction: ltr; text-align: right;">
                    <p style="direction: rtl;"><strong>السؤال:</strong> ${item.question}</p>
                    <p><strong>إجابتك:</strong> <span style="font-family: monospace;">${item.selected}</span></p>
                    <p><strong>الإجابة الصحيحة:</strong> <span style="font-family: monospace;">${item.correct}</span></p>
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

    function getRandomColor() {
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Reset Quiz
    function resetQuiz() {
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
            input.closest('.option').classList.remove('correct', 'incorrect', 'selected');
        });
        studentNameInput.value = '';
        
        resultDiv.style.display = 'none';
        correctionDiv.style.display = 'none';
        resultDiv.className = '';
        
        celebrationDiv.style.display = 'none';
        celebrationDiv.innerHTML = '';
        
        document.querySelectorAll('.correct-answer').forEach(el => el.style.display = 'none');
        
        answeredQuestions = 0;
        updateProgress();
        
        namePage.classList.add('active');
        quizPage.classList.remove('active');
        
        window.scrollTo(0, 0);
        
        submitButton.disabled = false;
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