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
const questions = {
  // =========================
  // السؤال الأول: اختر الإجابة الصحيحة
  // =========================
  multipleChoice: [
    {
      id: 1,
      question: "معلومات تتضمن خطوط الطول والعرض المضمنة في الصور ومقاطع الفيديو تسمى:",
      options: [
        { value: "0", text: "العلامة الجغرافية (Geo-tagging)" },
        { value: "1", text: "الخصوصية" },
        { value: "2", text: "المعلومات المضللة" },
        { value: "3", text: "الشائعات" }
      ],
      correctAnswer: "0",
      note: "العلامة الجغرافية هي بيانات وصفية تحدد الموقع الجغرافي للملف."
    },
    {
      id: 2,
      question: "البيانات التي تستخدم لتحديد الهوية مثل الرقم القومي تسمى:",
      options: [
        { value: "0", text: "بيانات أساسية" },
        { value: "1", text: "بيانات عامة" },
        { value: "2", text: "أرقام الهوية الشخصية (PII)" },
        { value: "3", text: "بيانات تجارية" }
      ],
      correctAnswer: "2",
      note: "معلومات تحديد الهوية الشخصية (PII) هي أي بيانات يمكن استخدامها لتمييز شخص محدد."
    },
    {
      id: 3,
      question: "العلامة التجارية هي كل إشارة تُستخدم لتمييز ..... عن غيرها.",
      options: [
        { value: "0", text: "الأسماء" },
        { value: "1", text: "الأفراد" },
        { value: "2", text: "المؤسسات" },
        { value: "3", text: "المنتجات والخدمات" }
      ],
      correctAnswer: "3",
      note: "العلامة التجارية تميز سلع أو خدمات مؤسسة عن سلع أو خدمات المؤسسات الأخرى."
    },
    {
      id: 4,
      question: "الاستخراج غير القانوني للبيانات من بطاقة ائتمان أو بطاقة بنكية لشخص آخر واستخدامها يُعرف بـ:",
      options: [
        { value: "0", text: "التصيد" },
        { value: "1", text: "الاحتيال" },
        { value: "2", text: "التزوير" },
        { value: "3", text: "انتحال الشخصية" }
      ],
      correctAnswer: "1",
      note: "يُعرف هذا تقنياً بـ 'Skimming' (الكشط) وهو نوع من أنواع الاحتيال المالي."
    },
    {
      id: 5,
      question: "طريقة تمثيل الأرقام باستخدام الأرقام من 0 إلى 9 وأحرف أبجدية من A إلى F تعرف بـ:",
      options: [
        { value: "0", text: "النظام العشري" },
        { value: "1", text: "النظام الثنائي" },
        { value: "2", text: "النظام السادس عشر (Hexadecimal)" },
        { value: "3", text: "النظام الثماني" }
      ],
      correctAnswer: "2",
      note: "النظام السادس عشر أساسه 16، ويستخدم الحروف A-F لتمثيل القيم من 10 إلى 15."
    },
    {
      id: 6,
      question: "من أمثلة المكونات المادية (Hardware) في الكمبيوتر:",
      options: [
        { value: "0", text: "برمجيات تشغيل الجهاز" },
        { value: "1", text: "وحدة المعالجة المركزية (CPU)" },
        { value: "2", text: "برنامج التطبيق" },
        { value: "3", text: "برنامج النظام" }
      ],
      correctAnswer: "1",
      note: "وحدة المعالجة المركزية هي قطعة ملموسة، بينما البقية برمجيات."
    },
    {
      id: 7,
      question: "يعتبر منفذ ....... معيار اتصال يسمح بنقل الفيديو والصوت والبيانات الأخرى عبر كابل واحد.",
      options: [
        { value: "0", text: "USB" },
        { value: "1", text: "HDMI" },
        { value: "2", text: "LPT" },
        { value: "3", text: "Ethernet" }
      ],
      correctAnswer: "1",
      note: "HDMI (High-Definition Multimedia Interface) مخصص لنقل الوسائط عالية الدقة."
    },
    {
      id: 8,
      question: "تُعرف عملية تقليل حجم البيانات بقدر ممكن مع الحفاظ على محتوى البيانات بـ:",
      options: [
        { value: "0", text: "النسخ" },
        { value: "1", text: "القص" },
        { value: "2", text: "الضغط (Compression)" },
        { value: "3", text: "الحذف" }
      ],
      correctAnswer: "2",
      note: "ضغط الملفات يقلل مساحتها التخزينية لتسهيل تخزينها ومشاركتها."
    },
    {
      id: 9,
      question: "تسمى أصغر وحدة تشكل صورة:",
      options: [
        { value: "0", text: "بايت" },
        { value: "1", text: "بت" },
        { value: "2", text: "بكسل (Pixel)" },
        { value: "3", text: "هرتز" }
      ],
      correctAnswer: "2",
      note: "البكسل هو نقطة واحدة في الصورة النقطية (Raster Image)."
    },
    {
      id: 10,
      question: "في دائرة الجمع الكامل (Full Adder)، الرمز C يشير إلى:",
      options: [
        { value: "0", text: "الحمل (Carry)" },
        { value: "1", text: "المجموع (Sum)" },
        { value: "2", text: "مدخل ثالث" },
        { value: "3", text: "خط التغذية" }
      ],
      correctAnswer: "0",
      note: "الحمل (Carry) هو القيمة التي ترحل للخانة التالية عند الجمع."
    }
  ],

  // =========================
  // السؤال الثاني: صح أو خطأ
  // =========================
  trueFalse: [
    {
      id: 11,
      question: "تحدث ظاهرة فساد الأحرف (Character Corruption) بسبب عدم تطابق أساليب التشفير وفك التشفير.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "عندما يحاول النظام قراءة نص بتشفير (مثل UTF-8) وهو محفوظ بتشفير آخر، تظهر رموز غريبة."
    },
    {
      id: 12,
      question: "يمكن مشاركة صور الآخرين عبر الإنترنت دون إذن منهم.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "هذا يعد انتهاكاً للخصوصية وقد يعرض الشخص للمساءلة القانونية."
    },
    {
      id: 13,
      question: "تتم إجراء عمليتي الجمع والطرح في الأرقام الثنائية تماماً كما في الأرقام العشرية.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "نفس المبدأ الرياضي يطبق، ولكن باستخدام الأساس 2 (0 و 1) بدلاً من 10."
    },
    {
      id: 14,
      question: "كلما ارتفعت قيم الدقة والتدرج كلما أصبحت الصورة التي يتم الحصول عليها أكثر سلاسة وتحسنت الجودة ولكن زاد حجم البيانات.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "هناك علاقة طردية بين جودة الصورة (الدقة) وحجم الملف."
    },
    {
      id: 15,
      question: "الاقتباس يعني نسخ العمل بالكامل دون ذكر المصدر.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "نسخ العمل دون ذكر المصدر يسمى 'سرقة أدبية' (Plagiarism)، أما الاقتباس يتطلب ذكر المصدر."
    },
    {
      id: 16,
      question: "رمز ASCII يدعم جميع اللغات بما فيها اللغة العربية.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "ASCII يدعم الإنجليزية فقط (7 أو 8 بت)، أما Unicode هو الذي يدعم جميع اللغات."
    },
    {
      id: 17,
      question: "المصادقة البيومترية تعتمد على خصائص مثل بصمة الإصبع وقزحية العين.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "البيومترية تعني القياسات الحيوية لجسم الإنسان."
    },
    {
      id: 18,
      question: "من أمثلة وحدات الإدخال: الشاشة والطابعة.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "1",
      note: "الشاشة والطابعة من وحدات الإخراج (Output Units)."
    },
    {
      id: 19,
      question: "في أجهزة الكمبيوتر، تجرى عملية الطرح باستخدام 'الجمع بالمكملات'.",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "وحدة الحساب والمنطق (ALU) تحول الطرح إلى جمع باستخدام المكمل (Two's Complement)."
    },
    {
      id: 20,
      question: "رخصة المشاع الإبداعي (CC) تسمح باستخدام العمل بشرط ذكر اسم المؤلف (BY).",
      options: [
        { value: "0", text: "صح ✓" },
        { value: "1", text: "خطأ ✕" }
      ],
      correctAnswer: "0",
      note: "أحد شروط رخص المشاع الإبداعي هو 'Attribution' أي نسب العمل لصاحبه."
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
