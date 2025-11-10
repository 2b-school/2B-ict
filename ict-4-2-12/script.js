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
    // تعريف الأسئلة باستخدام arrays - النموذج الجديد (60 سؤال)
    // 💡 ملاحظة: تم تحديث عدد الأسئلة ليناسب النموذج الجديد
    // **********************************************
    const questions = {
  // 1. مصفوفة أسئلة الاختيار من متعدد (10 أسئلة: ID 1-10)
  multipleChoice: [
    {
      id: 1, // (كان 21)
      type: "multiple_choice",
      question: "أولي خطوات البحث عبر شبكة الإنترنت هي:",
      options: [
        { value: "أ", text: "حذف المعلومات" },
        { value: "ب", text: "تحديد المعلومات" },
        { value: "ج", text: "مراجعة المعلومات" },
        { value: "د", text: "الرسم البياني" },
      ],
      correctAnswer: "ب",
    },
    {
      id: 2, // (كان 22)
      type: "multiple_choice",
      question: "يمكن إيجاد المعلومات عبر شبكة الإنترنت بطريقة:",
      options: [
        { value: "أ", text: "صعبة" },
        { value: "ب", text: "مستحيلة" },
        { value: "ج", text: "معقدة" },
        { value: "د", text: "سهلة" },
      ],
      correctAnswer: "د",
    },
    {
      id: 3, // (كان 23)
      type: "multiple_choice",
      question: "نستخدم شبكة الإنترنت في:",
      options: [
        { value: "أ", text: "التنمر" },
        { value: "ب", text: "التحدث بسلبية" },
        { value: "ج", text: "التواصل بين الأفراد" },
        { value: "د", text: "البحث على العنف" },
      ],
      correctAnswer: "ج",
    },
    {
      id: 4, // (كان 24)
      type: "multiple_choice",
      question: "شبكة الإنترنت مهمة لأنها تُمكّننا من الوصول إلى:",
      options: [
        { value: "أ", text: "الألعاب" },
        { value: "ب", text: "البيانات" },
        { value: "ج", text: "الأرقام" },
        { value: "د", text: "كافة المعلومات" },
      ],
      correctAnswer: "د",
    },
    {
      id: 5, // (كان 25)
      type: "multiple_choice",
      question: "يُعتبر محرك البحث ... من أشهر محركات البحث.",
      options: [
        { value: "أ", text: "Excel" },
        { value: "ب", text: "Word" },
        { value: "ج", text: "Google" },
        { value: "د", text: "Facebook" },
      ],
      correctAnswer: "ج",
    },
    {
      id: 6, // (كان 26)
      type: "multiple_choice",
      question:
        "تحميل أو حفظ ملف من على الإنترنت إلى جهاز الكمبيوتر الخاص بك يُعرف بـ:",
      options: [
        { value: "أ", text: "الإشارة Tag" },
        { value: "ب", text: "تنزيل الملف Download" },
        { value: "ج", text: "رسائل مزعجة Spam" },
        { value: "د", text: "الحجب Block" },
      ],
      correctAnswer: "ب",
    },
    {
      id: 7, // (كان 27)
      type: "multiple_choice",
      question: "من أمثلة المعلومات الشخصية التي يجب الحفاظ عليها:",
      options: [
        { value: "أ", text: "اللون المفضل" },
        { value: "ب", text: "مقطع الفيديو" },
        { value: "ج", text: "الاسم المستعار" },
        { value: "د", text: "العنوان" },
      ],
      correctAnswer: "د",
    },
    {
      id: 8, // (كان 28)
      type: "multiple_choice",
      question: "قد يتسبب الضغط على روابط غير معروفة المصدر في:",
      options: [
        { value: "أ", text: "وجود معلومات مهمة" },
        { value: "ب", text: "تنزيل الفيروسات على جهازك" },
        { value: "ج", text: "لا شيء" },
        { value: "د", text: "غلق الجهاز" },
      ],
      correctAnswer: "ب",
    },
    {
      id: 9, // (كان 29)
      type: "multiple_choice",
      question:
        "الرسائل التي تدعو لإعلانات زائفة وغير حقيقية وتصل إلى بريدك الإلكتروني هي:",
      options: [
        { value: "أ", text: "الرسائل الشخصية" },
        { value: "ب", text: "الرسائل المزعجة Spam" },
        { value: "ج", text: "تحميل الملفات" },
        { value: "د", text: "مواقع التواصل" },
      ],
      correctAnswer: "ب",
    },
    {
      id: 10, // (كان 30)
      type: "multiple_choice",
      question: "يجب أن تفعل خاصية الحجب (Block) مع:",
      options: [
        { value: "أ", text: "أفراد أسرتك" },
        { value: "ب", text: "صديقك" },
        { value: "ج", text: "شخص يسيئ لك" },
        { value: "د", text: "زميلك" },
      ],
      correctAnswer: "ج",
    },
  ],

  // 2. مصفوفة أسئلة الصح والخطأ (20 سؤالاً: ID 11 - 30)
  trueFalse: [
    {
      id: 11, // (كان 1)
      type: "true_false",
      question: "جميع المواقع على الإنترنت موثوق بها.",
      correctAnswer: "❌",
    },
    {
      id: 12, // (كان 2)
      type: "true_false",
      question:
        "اختيار الكلمات الدقيقة والمفتاحية لا يساعد في الحصول على نتائج بحث أفضل.",
      correctAnswer: "❌",
    },
    {
      id: 13, // (كان 3)
      type: "true_false",
      question: "مصدر واحد للمعلومات كافٍ دائمًا لتكوين فكرة أو رأي.",
      correctAnswer: "❌",
    },
    {
      id: 14, // (كان 4)
      type: "true_false",
      question: "يمكنك البحث عن ملفات داخل جهازك دون الحاجة للاتصال بالإنترنت.",
      correctAnswer: "✔️",
    },
    {
      id: 15, // (كان 5)
      type: "true_false",
      question: "شبكة الإنترنت لا تُستخدم للتواصل بين الأفراد.",
      correctAnswer: "❌",
    },
    {
      id: 16, // (كان 6)
      type: "true_false",
      question:
        "عند البحث، يجب أن نحدد بوضوح نوع المعلومات التي نرغب في الحصول عليها.",
      correctAnswer: "✔️",
    },
    {
      id: 17, // (كان 7)
      type: "true_false",
      question: "كل المعلومات التي يتم نشرها على شبكة الإنترنت تكون صحيحة ومدققة.",
      correctAnswer: "❌",
    },
    {
      id: 18, // (كان 8)
      type: "true_false",
      question: "يمكن كتابة السؤال كاملاً في محرك البحث لتسهيل الحصول على الإجابة.",
      correctAnswer: "✔️",
    },
    {
      id: 19, // (كان 9)
      type: "true_false",
      question:
        "يجب التحقق من المعلومات من خلال محاولة إيجادها في أكثر من مصدر.",
      correctAnswer: "✔️",
    },
    {
      id: 20, // (كان 10)
      type: "true_false",
      question:
        "يجب أن تغادر أي موقع إلكتروني تشعر أنه غير آمن وتتوقف عن استخدامه.",
      correctAnswer: "✔️",
    },
    {
      id: 21, // (كان 11)
      type: "true_false",
      question: "يُنصح بالضغط على أي رابط يصلك ويعدك بالفوز بهدايا أو جوائز.",
      correctAnswer: "❌",
    },
    {
      id: 22, // (كان 12)
      type: "true_false",
      question:
        "التواصل عبر شبكة الإنترنت يمكن أن يتم من خلال الأجهزة اللوحية والهواتف الذكية أيضًا.",
      correctAnswer: "✔️",
    },
    {
      id: 23, // (كان 13)
      type: "true_false",
      question: "إذا قمت بحجب شخص فإنه لن يتمكن من رؤية منشوراتك أو التواصل معك.",
      correctAnswer: "✔️",
    },
    {
      id: 24, // (كان 14)
      type: "true_false",
      question:
        "من مخاطر الإنترنت قيام الآخرين باستخدام بياناتك الشخصية دون علمك.",
      correctAnswer: "✔️",
    },
    {
      id: 25, // (كان 15)
      type: "true_false",
      question: "لا يمكن لأي شخص أن يسرق بياناتك الشخصية عبر شبكة الإنترنت.",
      correctAnswer: "❌",
    },
    {
      id: 26, // (كان 16)
      type: "true_false",
      question: "شبكة الإنترنت تُستخدم لنشر الرسائل المهمة وتبادل المعلومات.",
      correctAnswer: "✔️",
    },
    {
      id: 27, // (كان 17)
      type: "true_false",
      question:
        "يجب نشر الصور ومقاطع الفيديو التي قد تؤذي مشاعر الآخرين لإظهار رأينا.",
      correctAnswer: "❌",
    },
    {
      id: 28, // (كان 18)
      type: "true_false",
      question:
        "يُفضل أن تقوم بالضغط على أي رابط تراه، حتى لو كنت تجهل محتواه ومصدره.",
      correctAnswer: "❌",
    },
    {
      id: 29, // (كان 19)
      type: "true_false",
      question: "الأجهزة اللوحية غير قادرة على تمكينك من التواصل عبر الإنترنت.",
      correctAnswer: "❌",
    },
    {
      id: 30, // (كان 20)
      type: "true_false",
      question:
        "تحديد المعلومات هو أولى خطوات البحث الفعال عبر شبكة الإنترنت.",
      correctAnswer: "✔️",
    },
  ],

  // أبقيت هذه المصفوفات فارغة كما في الهيكل الأصلي
  matching: [],
  dropdown: [],
};
    // Start Quiz Function
    function startQuiz() {
        studentName = studentNameInput.value.trim();
        // NOTE: Using a custom modal/message box instead of alert()
        if (!studentName) {
            alert('من فضلك، اكتب اسمك أولاً!'); // Kept alert for simplicity in this script but generally should use a custom modal
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
        // 💡 تم التحديث ليناسب العدد الجديد: 40 MC + 20 TF = 60 سؤال
        totalQuestions = questions.multipleChoice.length + questions.trueFalse.length;
        
        updateProgress();
        
        // 🚀 التعديل 1: تفعيل زر التسليم عند بدء الاختبار
        submitButton.disabled = false;
    }

    // إنشاء الأسئلة ديناميكياً
    function createQuiz() {
        let quizHTML = '';
        
        // 1. أسئلة الاختيار من متعدد
        // 💡 تم تحديث الدرجات لـ 40 سؤال
        quizHTML += '<h2><i class="fas fa-check-circle"></i> أولاً: اختر الإجابة الصحيحة (40 درجات)</h2>'; 
        questions.multipleChoice.forEach(q => {
            quizHTML += `
                <div class="question" data-answer="${q.correctAnswer}">
                    <div class="question-number">${q.id}</div>
                    <p>${q.question}</p>
                    <div class="options">
            `;
            
            // البحث عن النص الصحيح للخيار إذا كان 'أ' أو 'ب' أو ...
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
        
        // 2. أسئلة الصح والخطأ
        // 💡 تم تحديث الدرجات لـ 20 سؤال
        quizHTML += '<h2><i class="fas fa-check-circle"></i> ثانياً: ضع علامة (✓) أو (✗) (20 درجات)</h2>'; 
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
        
        // **ملاحظة هامة:** تم حذف أقسام أسئلة المطابقة والقوائم المنسدلة من createQuiz مؤقتاً
        
        quizContainer.innerHTML = quizHTML;
        
    }
    

    // Check All Questions Answered
    function checkAllAnswered() {
        let allAnswered = true;
        let newAnsweredCount = 0;
        
        // 1. التحقق من أسئلة الاختيار (صح/خطأ واختيار من متعدد)
        const choiceQuestions = document.querySelectorAll('.question[data-answer]');
        choiceQuestions.forEach((question, index) => {
            // استخدام رقم السؤال الفعلي من العنصر
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
        
        // **تم حذف التحقق من أسئلة المطابقة والقوائم المنسدلة مؤقتاً**
        
        answeredQuestions = newAnsweredCount;
        // submitButton.disabled = !allAnswered; // تم تعطيله مؤقتاً لتبسيط الاختبار
        updateProgress();
        
        return allAnswered;
    }

    // Update Progress
    function updateProgress() {
        // يتم حساب التقدم الآن بناءً على مجموع أسئلة multipleChoice و trueFalse
        progressText.textContent = `${answeredQuestions}/${totalQuestions}`;
        progressBar.style.width = `${(answeredQuestions / totalQuestions) * 100}%`;
    }

    // Submit Quiz
    function submitQuiz() {
        // 1️⃣ تحقق إن كل الأسئلة تمت الإجابة عليها
        if (!checkAllAnswered()) {
             // NOTE: Using a custom modal/message box instead of alert()
            alert('من فضلك، أجب على كل الأسئلة أولاً!'); 
            return;
        }

        let score = 0;
        let wrongAnswers = [];

        // 2️⃣ أسئلة الاختيار (صح/خطأ و اختيار من متعدد)
        const choiceQuestions = document.querySelectorAll('.question[data-answer]');
        choiceQuestions.forEach((question, index) => {
            const correctAnswer = question.getAttribute('data-answer');
            const questionNumberElement = question.querySelector('.question-number');
            const inputName = `q${questionNumberElement ? questionNumberElement.textContent : ''}`; // تأكد من وجود العنصر
            const inputs = document.getElementsByName(inputName);
            let selectedValue = null;

            // تحديد القيمة المختارة
            for (let input of inputs) {
                if (input.checked) {
                    selectedValue = input.value;
                    break;
                }
            }

            // تلوين الإجابات بعد التسليم
            const allOptions = question.querySelectorAll('.option');
            allOptions.forEach(option => {
                const optionInput = option.querySelector('input[type="radio"]');
                option.classList.remove('selected', 'correct', 'incorrect'); // إزالة أي تلوين سابق

                if (optionInput && optionInput.value === correctAnswer) {
                    // تلوين الإجابة الصحيحة باللون الأخضر
                    option.classList.add('correct');
                }
                
                if (optionInput && optionInput.checked && optionInput.value !== correctAnswer) {
                    // تلوين الإجابة الخاطئة المختارة باللون الأحمر
                    option.classList.add('incorrect');
                }
            });

            if (selectedValue === correctAnswer) {
                score++;
            } else {
                wrongAnswers.push({
                    question: question.querySelector('p').textContent,
                    selected: formatAnswer(selectedValue),
                    correct: formatAnswer(correctAnswer)
                });
            }

            // عرض الإجابة الصحيحة (مخفية مسبقاً)
            const correctDiv = question.querySelector('.correct-answer');
            if (correctDiv) correctDiv.style.display = 'block';
        });

        // 5️⃣ إظهار النتيجة النهائية
        showResults(score, totalQuestions, wrongAnswers);

        // تحديث التقدم
        answeredQuestions = totalQuestions; 
        updateProgress();
        
        // ❌ التعديل 2: تم حذف السطر الذي كان يعطل الزر نهائياً
        // submitButton.disabled = true; // تم حذفه لتمكين إعادة الاستخدام
    }

    // Format Answer
    function formatAnswer(answer) {
        // تم تحديث القيم النصية لـ True/False لتتوافق مع الرموز ✓/✗
        if (answer === "True" || answer === '✔️') return "صحيح (✓)";
        if (answer === "False" || answer === '❌') return "خطأ (✗)";
        
        // For multiple choice, try to find the full option text
        // البحث عن السؤال الصحيح من كلتا المصفوفتين
        const allQuestions = [...questions.multipleChoice, ...questions.trueFalse];
        const questionMatch = allQuestions.find(q => q.options && q.options.some(o => o.value === answer));

        if (questionMatch) {
            const option = questionMatch.options.find(o => o.value === answer);
            return option ? `${option.value}) ${option.text}` : answer;
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
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
            // إزالة جميع فئات التلوين من الخيارات
            input.closest('.option').classList.remove('correct', 'incorrect', 'selected');
        });
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
        
        // 🚀 التعديل 3: تفعيل زر التسليم عند إعادة تعيين الاختبار
        submitButton.disabled = false;
    }

    // Event Listeners
    startQuizButton.addEventListener('click', startQuiz);
    studentNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startQuiz();
    });
    
    submitButton.addEventListener('click', submitQuiz);
    
    // Use 'change' event on the document to capture all inputs/dropdowns/radios changes and update progress
    document.addEventListener('change', () => {
        checkAllAnswered();
    });
});