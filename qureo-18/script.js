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
                question: '1. ما هو الوسم المستخدم لكتابة "أكبر عنوان" في الصفحة؟',
                options: [
                    { value: "0", text: '<h6>' },
                    { value: "1", text: '<head>' },
                    { value: "2", text: '<h1>' }, 
                    { value: "3", text: '<title>' }
                ],
                correctAnswer: "2",
                note: "الوسم <h1> هو الأكبر حجماً، بينما <h6> هو الأصغر."
            },
            {
                id: 2,
                question: '2. لكتابة "فقرة نصية" عادية (Paragraph)، نستخدم الوسم:',
                options: [
                    { value: "0", text: '<text>' },
                    { value: "1", text: '<p>' }, 
                    { value: "2", text: '<para>' },
                    { value: "3", text: '<section>' }
                ],
                correctAnswer: "1",
                note: "الحرف p هو اختصار لكلمة Paragraph."
            },
            {
                id: 3,
                question: '3. لإضافة صورة إلى صفحة الويب، نستخدم الوسم:',
                options: [
                    { value: "0", text: '<image>' },
                    { value: "1", text: '<pic>' },
                    { value: "2", text: '<img>' }, 
                    { value: "3", text: '<src>' }
                ],
                correctAnswer: "2",
                note: "الوسم <img> هو الوسم المخصص للصور في HTML."
            },
            {
                id: 4,
                question: '4. الخاصية المسؤولة عن تحديد "مسار الصورة" أو مكان الملف هي:',
                options: [
                    { value: "0", text: 'href' },
                    { value: "1", text: 'link' },
                    { value: "2", text: 'alt' },
                    { value: "3", text: 'src' } 
                ],
                correctAnswer: "3",
                note: "الخاصية src هي اختصار لـ Source وتعني المصدر."
            },
            {
                id: 5,
                question: '5. لكتابة "رسالة مخفية للمبرمج" (تعليق) لا تظهر في المتصفح، نستخدم:',
                options: [
                    { value: "0", text: '<!--  -->' }, 
                    { value: "1", text: '<comment> تعليق </comment>' },
                    { value: "2", text: '// تعليق' },
                    { value: "3", text: '/* تعليق */' }
                ],
                correctAnswer: "0",
                note: "التعليقات في HTML تبدأ بـ !-- وتنتهي بـ --."
            },
            {
                id: 6,
                question: '6. الرمز < ul    >يُستخدم لإنشاء قائمة:',
                options: [
                    { value: "0", text: 'مرتبة (أرقام)' },
                    { value: "1", text: 'غير مرتبة (نقطية)' }, 
                    { value: "2", text: 'صور' },
                    { value: "3", text: 'روابط' }
                ],
                correctAnswer: "1",
                note: "ul تعني Unordered List أي قائمة غير مرتبة."
            },
            {
                id: 7,
                question: '7. لإنشاء "سطر جديد" أو كسر السطر الحالي، نستخدم الوسم:',
                options: [
                    { value: "0", text: '<lb>' },
                    { value: "1", text: '<break>' },
                    { value: "2", text: '<br>' }, 
                    { value: "3", text: '<enter>' }
                ],
                correctAnswer: "2",
                note: "الوسم <br> يقوم بعمل Break line أي سطر جديد."
            },
            {
                id: 8,
                question: '8. الوسم <   li   > يستخدم لـ:',
                options: [
                    { value: "0", text: 'إنشاء رابط' },
                    { value: "1", text: 'إضافة عنصر داخل القائمة' }, 
                    { value: "2", text: 'عمل خط مائل' },
                    { value: "3", text: 'وضع خط تحت النص' }
                ],
                correctAnswer: "1",
                note: "li تعني List Item أي عنصر القائمة."
            },
            {
                id: 9,
                question: '9. ما هي وظيفة الخاصية alt داخل وسم الصورة؟',
                options: [
                    { value: "0", text: 'تحديد عرض الصورة' },
                    { value: "1", text: 'تحديد لون الحدود' },
                    { value: "2", text: 'عرض نص بديل للصورة' }, 
                    { value: "3", text: 'تكبير الصورة' }
                ],
                correctAnswer: "2",
                note: "يظهر النص البديل إذا لم يتم تحميل الصورة بشكل صحيح."
            },
            {
                id: 10,
                question: '10. أصغر حجم للعنوان في لغة HTML هو:',
                options: [
                    { value: "0", text: '<h1>' },
                    { value: "1", text: '<h3>' },
                    { value: "2", text: '<h6>' }, 
                    { value: "3", text: '<h10>' }
                ],
                correctAnswer: "2",
                note: "العناوين تتدرج من h1 (الأكبر) إلى h6 (الأصغر)."
            },
            {
                id: 11,
                question: '11. القائمة التي تظهر عناصرها مرقمة تلقائياً (1، 2، 3...) تبدأ بالوسم:',
                options: [
                    { value: "0", text: '<ol>' }, 
                    { value: "1", text: '<ul>' },
                    { value: "2", text: '<list>' },
                    { value: "3", text: '<dl>' }
                ],
                correctAnswer: "0",
                note: "ol تعني Ordered List أي قائمة مرتبة."
            },
            {
                id: 12,
                question: '12. عدد مستويات العناوين (Headings) المتاحة في HTML هو:',
                options: [
                    { value: "0", text: '3 مستويات' },
                    { value: "1", text: '5 مستويات' },
                    { value: "2", text: '6 مستويات' }, 
                    { value: "3", text: '8 مستويات' }
                ],
                correctAnswer: "2",
                note: "تبدأ من h1 وتنتهي عند h6."
            },
            {
                id: 13,
                question: '13. أي من الوسوم التالية لا يحتاج إلى وسم إغلاق؟',
                options: [
                    { value: "0", text: '<h1>' },
                    { value: "1", text: '<br>' }, 
                    { value: "2", text: '<p>' },
                    { value: "3", text: '<ul>' }
                ],
                correctAnswer: "1",
                note: "وسم <br> و <img> من الوسوم الفردية التي لا تحتاج لإغلاق."
            },
            {
                id: 14,
                question: '14. الشكل الافتراضي للنقاط في القائمة غير المرتبة <ul> هو:',
                options: [
                    { value: "0", text: 'أرقام (1, 2, 3)' },
                    { value: "1", text: 'حروف (A, B, C)' },
                    { value: "2", text: 'نقاط سوداء / دوائر' }, 
                    { value: "3", text: 'أرقام رومانية (I, II)' }
                ],
                correctAnswer: "2",
                note: "القوائم غير المرتبة تظهر عادة بنقاط سوداء."
            },
            {
                id: 15,
                question: '15. العبارة المكتوبة داخل وسم التعليق :',
                options: [
                    { value: "0", text: 'تظهر بخط عريض' },
                    { value: "1", text: 'تظهر باللون الأحمر' },
                    { value: "2", text: 'تظهر كرابط تشعبي' },
                    { value: "3", text: 'لا تظهر للمستخدم' } 
                ],
                correctAnswer: "3",
                note: "المتصفح يتجاهل التعليقات ولا يعرضها للزائر."
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
            quizHTML += `<h2><i class="fas fa-code"></i> أسئلة HTML (${questions.multipleChoice.length} سؤالاً)</h2>`; 
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