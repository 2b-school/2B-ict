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
    // تعريف الأسئلة - (30 سؤال)
    // **********************************************
  const questions = {
  // 1. مصفوفة أسئلة الصح والخطأ (16 سؤالاً: ID 1 - 16)
  trueFalse: [
    {
      id: 1,
      type: "true_false",
      question: "تحرص ديدى على اجراء نسخ احتياطي لبياناتها بانتظام.",
      correctAnswer: "✔️",
    },
    {
      id: 2,
      type: "true_false",
      question:
        "تستخدم ديدى البيجادى التعلم الآلي لتحديد المواقع الأثرية المجهولة.",
      correctAnswer: "✔️",
    },
    {
      id: 3,
      type: "true_false",
      question:
        "لا يمكن لأجهزة الاستشعار عن بعد اختراق الارض ومعرفة ما في باطنها.",
      correctAnswer: "❌",
    },
    {
      id: 4,
      type: "true_false",
      question: "تستخدم الرادارات في كشف حركة وسرعة السيارات.",
      correctAnswer: "✔️",
    },
    {
      id: 5,
      type: "true_false",
      question: "يمكن استخدام تقنية الاستشعار عن بعد في مجال الارصاد الجوية.",
      correctAnswer: "✔️",
    },
    {
      id: 6,
      type: "true_false",
      question:
        "لا يمكننا جمع البيانات من المواقع الخطرة التي يستحيل الوصول إليها.",
      correctAnswer: "❌",
    },
    {
      id: 7,
      type: "true_false",
      question: "يمكن استخدام أجهزة الكمبيوتر لتحليل البيانات.",
      correctAnswer: "✔️",
    },
    {
      id: 8,
      type: "true_false",
      question: "تستخدم برامج مكافحة الفيروسات في حماية المعلومات.",
      correctAnswer: "✔️",
    },
    {
      id: 9,
      type: "true_false",
      question:
        "كلمات المرور التي تتكون من ثمانية حروف على الأقل وارقام ورموز عشوائية او اكثر هى الاكثر اماناً.",
      correctAnswer: "✔️",
    },
    {
      id: 10,
      type: "true_false",
      question:
        "قانون حماية البيانات الشخصية يلزم الشركات ان تستخدم أسس ومعير أمنية صارمة.", // <-- تم تصحيح خطأ إملائي
      correctAnswer: "✔️",
    },
    {
      id: 11,
      type: "true_false",
      question: "تتطلب المصادقة متعددة العوامل طريقة واحدة فقط لتحديد هويتك.",
      correctAnswer: "❌",
    },
    {
      id: 12,
      type: "true_false",
      question:
        "التشفير الكامل يعمل على حماية معلوماتك بحيث تستطيع انت فقط الوصول إليها.",
      correctAnswer: "✔️",
    },
    {
      id: 13,
      type: "true_false",
      question:
        "المصادقة ببصمة الاصبع يتم بها إجراء مسحاً لوجهك باستخدام الكاميرا الخاصة بك.",
      correctAnswer: "❌",
    },
    {
      id: 14,
      type: "true_false",
      question:
        "اذا تعرضت بياناتك للخطر يجب إخبار أحد والديك او شخص بالغ موثوق به.",
      correctAnswer: "✔️",
    },
    {
      id: 15,
      type: "true_false",
      question: "يجب على الشركات حماية بيانات عملائها.",
      correctAnswer: "✔️",
    },
    {
      id: 16,
      type: "true_false",
      question: "يمكن استخدام طريقة المصادقة ببصمة الإصبع لتأكيد الهوية.",
      correctAnswer: "✔️",
    },
  ],

  // 2. مصفوفة أسئلة الاختيار من متعدد (14 سؤالاً: ID 17-30)
  multipleChoice: [
    {
      id: 17,
      type: "multiple_choice",
      question:
        "استخدمت ديدى البيجادى ........... في العثور على مستوطنات جديدة لم تكتشف من قبل.",
      options: [
        { value: "أ", text: "الأيباد iPad" },
        { value: "ب", text: "تطبيق SOAP" },
        { value: "ج", text: "أجهزة الاستشعار عن بعد" },
      ],
      correctAnswer: "ج",
    },
    {
      id: 18,
      type: "multiple_choice",
      question: "يمكن حماية المعلومات عن طريق استخدام ...........",
      options: [
        { value: "أ", text: "كلمات مرور قوية" },
        { value: "ب", text: "برامج مكافحة الفيروسات" },
        { value: "ج", text: "كل ما سبق" },
      ],
      correctAnswer: "ج",
    },
    {
      id: 19,
      type: "multiple_choice",
      question:
        "........... تقنية تقوم فيها أجهزة الكمبيوتر بتحليل البيانات وعرض نتائج مماثلة.",
      options: [
        { value: "أ", text: "التعلم الآلي" },
        { value: "ب", text: "أجهزة الاستشعار عن بعد" },
        { value: "ج", text: "نظام تحديد المواقع العالمي" },
      ],
      correctAnswer: "أ",
    },
    {
      id: 20,
      type: "multiple_choice",
      question:
        "استخدمت ديدى ........... لكتابة النصوص وإنشاء الرسوم البيانية والتعديل على الصور.",
      options: [
        { value: "أ", text: "الأيباد iPad" },
        { value: "ب", text: "أجهزة الاستشعار عن بعد" },
        { value: "ج", text: "نظام المعلومات الجغرافية" },
      ],
      correctAnswer: "أ",
    },
    {
      id: 21,
      type: "multiple_choice",
      question: "يمكن تثبيت أجهزة الاستشعار عن بعد على ...........",
      options: [
        { value: "أ", text: "الأقمار الصناعية" },
        { value: "ب", text: "الابراج" },
        { value: "ج", text: "كل ما سبق" },
      ],
      correctAnswer: "ج",
    },
    {
      id: 22,
      type: "multiple_choice",
      question: "تقيس ........... سرعة الأجسام وتراقب سرعة السيارات.",
      options: [
        { value: "أ", text: "الابراج" },
        { value: "ب", text: "الرادار" },
        { value: "ج", text: "اجهزة الكمبيوتر" },
      ],
      correctAnswer: "ب",
    },
    {
      id: 23,
      type: "multiple_choice",
      question: "علم جمع المعلومات حول جسم ما دون لمسه.",
      options: [
        { value: "أ", text: "تقنية الاستشعار عن بعد" },
        { value: "ب", text: "التعلم الآلي" },
        { value: "ج", text: "نظام تحديد المواقع العالمي" },
      ],
      correctAnswer: "أ",
    },
    {
      id: 24,
      type: "multiple_choice",
      question: "تتطلب ........... طريقتين على الاقل لتحديد هويتك.",
      options: [
        { value: "أ", text: "كلمات المرور" },
        { value: "ب", text: "التشفير الكامل" },
        { value: "ج", text: "المصادقة متعددة العوامل" },
      ],
      correctAnswer: "ج",
    },
    {
      id: 25,
      type: "multiple_choice",
      question:
        "في التعرف على الوجه يجب استخدام ........... المستخدم دون سواه لفتح جهازه او التطبيقات الموجودة فيه.",
      options: [
        { value: "أ", text: "وجه" },
        { value: "ب", text: "إصبع" },
        { value: "ج", text: "كلمة مرور" },
        { value: "د", text: "صوت" },
      ],
      correctAnswer: "أ",
    },
    {
      id: 26,
      type: "multiple_choice",
      question:
        "........... هذا النوع من المصادقة سيجرى مسحاً لأصبعك كطريقة لتأكيد هويتك.",
      options: [
        { value: "أ", text: "التشفير الكامل" },
        { value: "ب", text: "المصادقة ببصمة الاصبع" },
        { value: "ج", text: "كلمات المرور" },
        { value: "د", text: "المصادقة متعددة العوامل" },
      ],
      correctAnswer: "ب",
    },
    {
      id: 27,
      type: "multiple_choice",
      question: "عند إنشاء كلمة المرور يجب عليك استخدام ...........",
      options: [
        { value: "أ", text: "حروف وارقام وعلامات خاصة" },
        { value: "ب", text: "حروف فقط" },
        { value: "ج", text: "ارقام فقط" },
        { value: "د", text: "حروف وعلامات خاصة" },
      ],
      correctAnswer: "أ",
    },
    {
      id: 28,
      type: "multiple_choice",
      question: "يعمل ........... على حماية بياناتك حتى لا يستطيع أحد الوصول إليها.",
      options: [
        { value: "أ", text: "التشفير الكامل" },
        { value: "ب", text: "القرصنة" },
        { value: "ج", text: "التواصل" },
        { value: "د", text: "الاختراق" },
      ],
      correctAnswer: "أ",
    },
    {
      id: 29,
      type: "multiple_choice",
      question:
        "كلمات المرور التي تتكون من 8 حروف وارقام ورموز عشوائية او اكثر هى ...........",
      options: [
        { value: "أ", text: "الاكثر اماناً" },
        { value: "ب", text: "الاقل اماناً" },
        { value: "ج", text: "مخترقة" },
        { value: "د", text: "الاكثر توقعاً" },
      ],
      correctAnswer: "أ",
    },
    {
      id: 30,
      type: "multiple_choice",
      question: "عادة ما تتم المصادقة متعددة العوامل من خلال ...........",
      options: [
        { value: "أ", text: "كلمة المرور" },
        { value: "ب", text: "ارقام التعريف الشخصية" },
        { value: "ج", text: "الاسئلة الشخصية" },
        { value: "د", text: "كل ما سبق" },
      ],
      correctAnswer: "د",
    },
  ],

  // أبقيت هذه المصفوفات فارغة كما في الهيكل الأصلي
  matching: [],
  dropdown: [],
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
        // <-- تم تحديث التعليق: 14 MC + 16 TF = 30 سؤال
        totalQuestions = questions.multipleChoice.length + questions.trueFalse.length;
        
        updateProgress();
        
        submitButton.disabled = false;
    }

    // إنشاء الأسئلة ديناميكياً
    function createQuiz() {
        let quizHTML = '';
        
        // <-- 1. تم التعديل: عرض أسئلة الصح والخطأ أولاً (1-16)
        // <-- تم تحديث العنوان وعدد الأسئلة
        quizHTML += '<h2><i class="fas fa-check-circle"></i> أولاً: ضع علامة (✓) أو (✗) (16 سؤالاً)</h2>'; 
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

        // <-- 2. تم التعديل: عرض أسئلة الاختيار من متعدد ثانياً (17-30)
        // <-- تم تحديث العنوان وعدد الأسئلة
        quizHTML += '<h2><i class="fas fa-check-circle"></i> ثانياً: اختر الإجابة الصحيحة (14 سؤالاً)</h2>'; 
        questions.multipleChoice.forEach(q => {
            quizHTML += `
                <div class="question" data-answer="${q.correctAnswer}">
                    <div class="question-number">${q.id}</div>
                    <p>${q.question}</p>
                    <div class="options">
            `;
            
            // البحث عن النص الصحيح للخيار
            const correctAnswerText = q.options.find(o => o.value === q.correctAnswer).text;

            q.options.forEach(option => {
                quizHTML += `
                    <label class="option">
                        <input type="radio" name="q${q.id}" value="${option.value}">
                        <span class="option-label">${option.value}) ${option.text}</span>
                    </label>
                `;
            });
            
            quizHTML += `
                    </div>
                    <div class="correct-answer" style="display: none;">
                        <i class="fas fa-check-circle"></i> الإجابة الصحيحة: ${q.correctAnswer}) ${correctAnswerText}
                    </div>
                </div>
            `;
        });
        
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
            
            // <-- تحسين: الحصول على رقم السؤال لتمريره لدالة formatAnswer
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
                // <-- تحسين: تمرير رقم السؤال (qId) لضمان الحصول على نص الإجابة الصحيح
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

    // <-- تحسين: تم إضافة qId لإصلاح خطأ منطقي
    // Format Answer
    function formatAnswer(answer, qId) {
        // 1. التعامل مع الصح والخطأ (لا تحتاج qId)
        if (answer === "True" || answer === '✔️') return "صحيح (✓)";
        if (answer === "False" || answer === '❌') return "خطأ (✗)";
        
        // 2. التعامل مع الاختيار من متعدد (تحتاج qId)
        if (!qId) return answer || 'لم يجب'; // حماية

        // البحث عن السؤال المحدد بناءً على qId
        const allQuestions = [...questions.multipleChoice, ...questions.trueFalse];
        // نستخدم == لأن qId قادم كنص من DOM
        const questionMatch = allQuestions.find(q => q.id == qId);

        // إذا وجدنا السؤال وكان له خيارات
        if (questionMatch && questionMatch.options) {
            const option = questionMatch.options.find(o => o.value === answer);
            return option ? `${option.value}) ${option.text}` : answer;
        }

        // إذا لم يتم العثور على أي شيء (كإجابة فارغة)
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
                <p>أحسنت! لقد أظهرت فهمًا ممتازًا لمادة تكنولوجيا المعلومات والاتصالات.</p>
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