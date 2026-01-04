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

    // **********************************************
    // تعريف الأسئلة
    // **********************************************
const questions = {
  // =========================
  // القسم الأول: الاختيار من متعدد
  // =========================
  multipleChoice: [
    {
      id: 1,
      question: "ما هو المصطلح الذي يعبر عن الحقائق الخام الممثلة بأرقام أو حروف أو رموز؟",
      options: [
        { value: "0", text: "المعلومات" },
        { value: "1", text: "البيانات" },
        { value: "2", text: "المعرفة" },
        { value: "3", text: "البرمجيات" }
      ],
      correctAnswer: "1",
      note: "البيانات هي المادة الخام التي لم تتم معالجتها بعد."
    },
    {
      id: 2,
      question: "أي من البرمجيات الخبيثة التالية يتميز بقدرته على تكرار نفسه والانتشار عبر الإنترنت؟",
      options: [
        { value: "0", text: "حصان طروادة" },
        { value: "1", text: "الدودة (Worm)" },
        { value: "2", text: "برامج التجسس" },
        { value: "3", text: "برامج الفدية" }
      ],
      correctAnswer: "1",
      note: "ديدان الحاسوب (Worms) تصمم لتنسخ نفسها وتنتشر تلقائياً عبر الشبكات."
    },
    {
      id: 3,
      question: "تُقاس درجة دقة ووضوح الصورة عند رقمنتها بوحدة:",
      options: [
        { value: "0", text: "Pixel" },
        { value: "1", text: "Bit" },
        { value: "2", text: "dpi" },
        { value: "3", text: "Byte" }
      ],
      correctAnswer: "2",
      note: "وحدة dpi تعني (نقطة في البوصة) وتستخدم لقياس دقة الصور."
    },
    {
      id: 4,
      question: "تُعرف الخبرة أو التأثير العاطفي الذي يكتسبه المستخدم عند التعامل مع منتج ما بـ:",
      options: [
        { value: "0", text: "واجهة المستخدم (UI)" },
        { value: "1", text: "الإمكانية (Affordance)" },
        { value: "2", text: "تجربة المستخدم (UX)" },
        { value: "3", text: "التصميم الشامل" }
      ],
      correctAnswer: "2",
      note: "تجربة المستخدم (UX) تركز على شعور المستخدم وسهولة الاستخدام."
    },
    {
      id: 5,
      question: "عند تحويل الرقم الثنائي (1011) إلى النظام العشري، تكون النتيجة:",
      options: [
        { value: "0", text: "10" },
        { value: "1", text: "11" },
        { value: "2", text: "12" },
        { value: "3", text: "13" }
      ],
      correctAnswer: "1",
      note: "الحساب: (1×1) + (1×2) + (0×4) + (1×8) = 1 + 2 + 0 + 8 = 11."
    },
    {
      id: 6,
      question: "وحدة المعالجة المركزية (CPU) هي دمج لكل من:",
      options: [
        { value: "0", text: "وحدة الذاكرة ووحدة الإدخال" },
        { value: "1", text: "وحدة التحكم ووحدة الحساب والمنطق" },
        { value: "2", text: "وحدة الإدخال ووحدة الإخراج" },
        { value: "3", text: "القرص الصلب والمعالج" }
      ],
      correctAnswer: "1",
      note: "المعالج يتكون أساساً من وحدة التحكم (CU) ووحدة الحساب والمنطق (ALU)."
    },
    {
      id: 7,
      question: "أي مما يلي يُعد مثالاً على البرمجيات التطبيقية؟",
      options: [
        { value: "0", text: "برنامج Word" },
        { value: "1", text: "نظام Windows" },
        { value: "2", text: "نظام Linux" },
        { value: "3", text: "نظام BIOS" }
      ],
      correctAnswer: "0",
      note: "Word هو برنامج تطبيقي للمستخدم، بينما البقية أنظمة تشغيل أو برامج نظام."
    },
    {
      id: 8,
      question: "البوابة المنطقية التي تخرج القيمة (1) فقط عندما تكون جميع المدخلات (1) هي:",
      options: [
        { value: "0", text: "OR" },
        { value: "1", text: "AND" },
        { value: "2", text: "NOT" },
        { value: "3", text: "XOR" }
      ],
      correctAnswer: "1",
      note: "بوابة AND تتطلب أن يكون كلا المدخلين صحيحين (1) لتعطي نتيجة صحيحة."
    },
    {
      id: 9,
      question: "يسمى النظام الذي يتطلب موافقة صريحة من المستخدم قبل تقديم الخدمة بـ:",
      options: [
        { value: "0", text: "نظام الاعتراض" },
        { value: "1", text: "سياسة الخصوصية" },
        { value: "2", text: "نظام الموافقة المسبقة" },
        { value: "3", text: "ترخيص المشاع الإبداعي" }
      ],
      correctAnswer: "2",
      note: "الموافقة المسبقة (Opt-in) تعني أخذ إذن المستخدم أولاً."
    },
    {
      id: 10,
      question: "ما هي وظيفة دائرة الجمع النصفي (Half Adder)؟",
      options: [
        { value: "0", text: "طرح رقمين ثنائيين" },
        { value: "1", text: "جمع رقمين ثنائيين من خانة واحدة" },
        { value: "2", text: "ضرب الأرقام الثنائية" },
        { value: "3", text: "تحويل البيانات" }
      ],
      correctAnswer: "1",
      note: "الجامع النصفي يجمع خانتين (Bits) وينتج المجموع (Sum) والمحمول (Carry)."
    }
  ],

  // =========================
  // القسم الثاني: صح أو خطأ
  // =========================
  trueFalse: [
    {
      id: 11,
      question: "المعلومات الثانوية هي التي يتم الحصول عليها من طرف ثالث مثل الكتب والصحف.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "صحيح، لأن المصادر الأولية هي التي يجمعها الباحث بنفسه."
    },
    {
      id: 12,
      question: "صُمم معيار Unicode ليجمع رموز الأحرف من لغات العالم المختلفة في نظام واحد.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "Unicode هو المعيار العالمي لتوحيد تشفير النصوص."
    },
    {
      id: 13,
      question: "يمكن للبت (Bit) أن يمثل أكثر من حالتين في نفس الوقت.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "خطأ، البت يمثل حالة واحدة فقط في اللحظة إما 0 أو 1."
    },
    {
      id: 14,
      question: "تستخدم الذاكرة الثانوية من أجل التخزين طويل الأمد للبيانات والبرامج.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "مثل القرص الصلب والفلاش ميموري، فهي تحتفظ بالبيانات دون كهرباء."
    },
    {
      id: 15,
      question: "تظهر التعرجات (Jaggies) في صور المتجهات (Vector) عند تكبيرها بشكل كبير.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "خطأ، التعرجات تظهر في الصور النقطية (Raster)، أما المتجهات تحتفظ بدقتها."
    },
    {
      id: 16,
      question: "يعتبر الهارد ديسك (Hard Disk) من وحدات الإخراج فقط.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "خطأ، هو وحدة تخزين (تعتبر إدخال وإخراج)."
    },
    {
      id: 17,
      question: "نظام العد الست عشري يستخدم الأرقام من 0 إلى 9 والحروف من A إلى F.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "صحيح، حيث A=10 و F=15."
    },
    {
      id: 18,
      question: "تعتبر الخصوصية (Confidentiality) من العناصر الأساسية لأمن المعلومات.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "عناصر أمن المعلومات الأساسية هي (CIA): السرية، السلامة، والتوافر."
    },
    {
      id: 19,
      question: "كلمة المرور القوية يجب أن تكون قصيرة ليسهل تذكرها.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "خطأ، كلما كانت الكلمة أطول ومعقدة، كانت أصعب في الاختراق."
    },
    {
      id: 20,
      question: "ناتج جمع الرقمين الثنائيين 1 + 1 هو 10 في النظام الثنائي.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "صحيح، لأن 1+1=2، والرقم 2 يكتب في الثنائي على هيئة 10."
    }
  ]
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
        
        // إنشاء الأسئلة ديناميكياً
        createQuiz();
        
        // حساب العدد الإجمالي للأسئلة
        totalQuestions = questions.multipleChoice.length + questions.trueFalse.length;
        
        updateProgress();
        
        submitButton.disabled = false;
    }

    // إنشاء الأسئلة ديناميكياً
    function createQuiz() {
        let quizHTML = '';
        
        // عرض أسئلة الصح والخطأ (فقط إذا وجدت)
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

        // عرض أسئلة الاختيار من متعدد
        if (questions.multipleChoice.length > 0) {
            quizHTML += `<h2><i class="fas fa-code"></i> أسئلة البرمجة (${questions.multipleChoice.length} سؤالاً)</h2>`; 
            questions.multipleChoice.forEach(q => {
                quizHTML += `
                    <div class="question" data-answer="${q.correctAnswer}">
                        <div class="question-number">${q.id}</div>
                        <p style="font-weight:bold;">${q.question}</p>
                        <div class="options">
                `;
                
                // البحث عن النص "ملاحظة" من البيانات إذا وجد
                const noteText = q.note ? `<br><small style="color:#28a745; display:block; margin-top:5px;">💡 الشرح: ${q.note}</small>` : '';

                q.options.forEach(option => {
                    // تحويل السلاسل النصية التي تحتوي على \n إلى أسطر HTML <br>
                    const formattedText = option.text.replace(/\n/g, '<br>');
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
            // تحسين عرض الإجابة في نافذة التصحيح لتكون مختصرة
            return option ? `الخيار رقم ${parseInt(option.value) + 1}` : answer;
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
                <p>أداء جيد، راجع الأخطاء البرمجية وحاول مجدداً.</p>
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
                <p>راجع مفاهيم المتغيرات والشروط وحاول مرة أخرى.</p>
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
                <div class="correction-item">
                    <p><strong>السؤال:</strong> ${item.question}</p>
                    <p><strong>إجابتك:</strong> ${item.selected}</p>
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
