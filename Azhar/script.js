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
    let totalQuestions = 15;
const questions = {
  // =========================
  // السؤال الأول: اختر الإجابة الصحيحة
  // =========================

    multipleChoice: [
        {
            id: 1,
            question: '﴿وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً﴾ وردت في سورة:',
            options: [
                { value: "0", text: 'البقرة' }, // ✅
                { value: "1", text: 'آل عمران' },
                { value: "2", text: 'النساء' },
                { value: "3", text: 'الأعراف' }
            ],
            correctAnswer: "0",
            note: "وردت هذه الآية في سورة البقرة (الآية 30)."
        },
        {
            id: 2,
            question: 'الآية: ﴿إِنَّ اللَّهَ مَعَ الصَّابِرِينَ﴾ جاءت في سورة:',
            options: [
                { value: "0", text: 'الأنفال' },
                { value: "1", text: 'البقرة' }, // ✅
                { value: "2", text: 'آل عمران' },
                { value: "3", text: 'التوبة' }
            ],
            correctAnswer: "1",
            note: "وردت في سورة البقرة آية رقم 153."
        },
        {
            id: 3,
            question: 'قوله تعالى: ﴿وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا﴾ وردت في سورة:',
            options: [
                { value: "0", text: 'الكهف' },
                { value: "1", text: 'الإسراء' }, // ✅
                { value: "2", text: 'طه' },
                { value: "3", text: 'مريم' }
            ],
            correctAnswer: "1",
            note: "وردت في سورة الإسراء (الآية 85)."
        },
        {
            id: 4,
            question: 'أيّ الآيات الآتية خُتمت بقوله تعالى: (وَاللَّهُ غَفُورٌ رَّحِيمٌ)؟',
            options: [
                { value: "0", text: 'آية الصيام' },
                { value: "1", text: 'آية الدين' },
                { value: "2", text: 'آية الكرسي' },
                { value: "3", text: 'آية البر' } // ✅
            ],
            correctAnswer: "3",
            note: "آية البر في سورة البقرة خُتمت بأسماء الله الحسنى."
        },
        {
            id: 5,
            question: 'قوله تعالى: ﴿وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ﴾ في سورة:',
            options: [
                { value: "0", text: 'النحل' }, // ✅
                { value: "1", text: 'هود' },
                { value: "2", text: 'الشورى' },
                { value: "3", text: 'الفرقان' }
            ],
            correctAnswer: "0",
            note: "وردت في أواخر سورة النحل."
        },
        {
            id: 6,
            question: 'أي العبارتين أصح في قوله تعالى؟',
            options: [
                { value: "0", text: '(وَاللَّهُ سَمِيعٌ عَلِيمٌ)' },
                { value: "1", text: '(وَاللَّهُ عَلِيمٌ سَمِيعٌ)' },
                { value: "2", text: 'الاثنتان وردتا في القرآن' }, // ✅
                { value: "3", text: 'لم ترد أيٌّ منهما' }
            ],
            correctAnswer: "2",
            note: "كلا الصيغتين وردتا في مواضع مختلفة من القرآن الكريم."
        },
        {
            id: 7,
            question: 'قوله تعالى: ﴿قُلْ هُوَ اللَّهُ أَحَدٌ﴾ تدل على:',
            options: [
                { value: "0", text: 'توحيد الربوبية' },
                { value: "1", text: 'توحيد الألوهية' },
                { value: "2", text: 'توحيد الأسماء والصفات' },
                { value: "3", text: 'جميع ما سبق' } // ✅
            ],
            correctAnswer: "3",
            note: "سورة الإخلاص جامعة لأنواع التوحيد."
        },
        {
            id: 8,
            question: 'أي السور الآتية تبدأ بالحروف المقطعة؟',
            options: [
                { value: "0", text: 'مريم' }, // ✅ (كهيعص)
                { value: "1", text: 'يوسف' },
                { value: "2", text: 'الفرقان' },
                { value: "3", text: 'النور' }
            ],
            correctAnswer: "0",
            note: "سورة مريم تبدأ بـ (كهيعص)."
        },
        {
            id: 9,
            question: 'قوله تعالى: ﴿إِنَّ الْإِنسَانَ لَفِي خُسْرٍ﴾ وردت في سورة:',
            options: [
                { value: "0", text: 'الهمزة' },
                { value: "1", text: 'العصر' }, // ✅
                { value: "2", text: 'البلد' },
                { value: "3", text: 'الشرح' }
            ],
            correctAnswer: "1",
            note: "هذه هي الآية الثانية من سورة العصر."
        },
        {
            id: 10,
            question: 'أيّ الآيتين أصح؟',
            options: [
                { value: "0", text: '(وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ)' },
                { value: "1", text: '(وَاللَّهُ بَصِيرٌ بِمَا تَعْمَلُونَ)' },
                { value: "2", text: 'الاثنتان صحيحتان' }, // ✅
                { value: "3", text: 'لم تردا' }
            ],
            correctAnswer: "2",
            note: "وردت الصيغتان في مواضع مختلفة (مثل البقرة وآل عمران)."
        },
        {
        id: 21,
        question: '﴿وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ﴾ وردت في سورة:',
        options: [
            { value: "0", text: 'البقرة' }, // ✅
            { value: "1", text: 'آل عمران' },
            { value: "2", text: 'النساء' },
            { value: "3", text: 'التوبة' }
        ],
        correctAnswer: "0",
        note: "وردت في عدة مواضع منها سورة البقرة آية 216."
    },
    {
        id: 22,
        question: 'أيّ اللفظين ورد في قوله تعالى (يَعْمَلُونَ / تَعْمَلُونَ)؟',
        options: [
            { value: "0", text: '(يَعْمَلُونَ)' },
            { value: "1", text: '(تَعْمَلُونَ)' },
            { value: "2", text: 'كلاهما ورد' }, // ✅
            { value: "3", text: 'لم يرد أيٌّ منهما' }
        ],
        correctAnswer: "2"
    },
    {
        id: 23,
        question: 'قوله تعالى: ﴿وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ﴾ تكررت في:',
        options: [
            { value: "0", text: 'سورة واحدة' },
            { value: "1", text: 'سورتين' },
            { value: "2", text: 'عدة سور' }, // ✅
            { value: "3", text: 'لم تتكرر' }
        ],
        correctAnswer: "2"
    },
    {
        id: 24,
        question: 'أيّ الآيتين أصح؟',
        options: [
            { value: "0", text: '(إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ)' },
            { value: "1", text: '(إِنَّ اللَّهَ لَطِيفٌ خَبِيرٌ)' },
            { value: "2", text: 'الاثنتان صحيحتان' }, // ✅
            { value: "3", text: 'واحدة فقط صحيحة' }
        ],
        correctAnswer: "2"
    },
    {
        id: 25,
        question: 'قوله تعالى: ﴿فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ﴾ في سورة:',
        options: [
            { value: "0", text: 'المؤمنون' }, // ✅
            { value: "1", text: 'السجدة' },
            { value: "2", text: 'الفرقان' },
            { value: "3", text: 'النحل' }
        ],
        correctAnswer: "0"
    },
    {
        id: 26,
        question: 'أيّ السور الآتية مدنية؟',
        options: [
            { value: "0", text: 'العلق' },
            { value: "1", text: 'الكوثر' },
            { value: "2", text: 'البقرة' }, // ✅
            { value: "3", text: 'الفلق' }
        ],
        correctAnswer: "2"
    },
    {
        id: 27,
        question: 'قوله تعالى: ﴿وَاللَّهُ سَرِيعُ الْحِسَابِ﴾ ورد في:',
        options: [
            { value: "0", text: 'سورة واحدة' },
            { value: "1", text: 'سورتين' },
            { value: "2", text: 'عدة سور' }, // ✅
            { value: "3", text: 'لم يرد' }
        ],
        correctAnswer: "2"
    },
    {
        id: 28,
        question: 'أيّ اللفظين أصح؟',
        options: [
            { value: "0", text: '(بِمَا كَانُوا يَعْمَلُونَ)' },
            { value: "1", text: '(بِمَا كَانُوا يَفْعَلُونَ)' },
            { value: "2", text: 'الاثنتان وردتا' }, // ✅
            { value: "3", text: 'واحدة فقط وردت' }
        ],
        correctAnswer: "2"
    },
    {
        id: 29,
        question: 'قوله تعالى: ﴿إِنَّ اللَّهَ عَلِيمٌ حَكِيمٌ﴾ يدل على:',
        options: [
            { value: "0", text: 'توحيد الأسماء والصفات' }, // ✅ (الأدق هنا)
            { value: "1", text: 'توحيد الربوبية' },
            { value: "2", text: 'توحيد الألوهية' },
            { value: "3", text: 'جميع ما سبق' }
        ],
        correctAnswer: "0"
    },
    {
        id: 30,
        question: 'أيّ الآيات أصح ختمًا؟',
        options: [
            { value: "0", text: '(وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ)' },
            { value: "1", text: '(وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ)' },
            { value: "2", text: 'الاثنتان صحيحتان' }, // ✅
            { value: "3", text: 'واحدة فقط صحيحة' }
        ],
        correctAnswer: "2"
    },
    {
        id: 31,
        question: 'قوله تعالى: ﴿لَعَلَّكُمْ تَعْقِلُونَ﴾ وردت في:',
        options: [
            { value: "0", text: 'موضع واحد' },
            { value: "1", text: 'موضعين' },
            { value: "2", text: 'مواضع متعددة' }, // ✅
            { value: "3", text: 'لم ترد' }
        ],
        correctAnswer: "2"
    },
    {
        id: 32,
        question: 'أيّهما أصح؟',
        options: [
            { value: "0", text: '(إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ)' },
            { value: "1", text: '(إِنَّ اللَّهَ كَانَ غَفُورًا رَّحِيمًا)' },
            { value: "2", text: 'الاثنتان وردتا' }, // ✅
            { value: "3", text: 'واحدة فقط وردت' }
        ],
        correctAnswer: "2"
    },
    {
        id: 33,
        question: 'قوله تعالى: ﴿وَاللَّهُ لَا يُحِبُّ الْفَسَادَ﴾ في سورة:',
        options: [
            { value: "0", text: 'البقرة' }, // ✅
            { value: "1", text: 'المائدة' },
            { value: "2", text: 'القصص' },
            { value: "3", text: 'هود' }
        ],
        correctAnswer: "0"
    },
    {
        id: 34,
        question: 'أيّ الحروف المقطعة وردت في أول سورة مريم؟',
        options: [
            { value: "0", text: 'طه' },
            { value: "1", text: 'كهيعص' }, // ✅
            { value: "2", text: 'يس' },
            { value: "3", text: 'حم' }
        ],
        correctAnswer: "1"
    },
    {
        id: 35,
        question: 'قوله تعالى: ﴿وَمَا رَبُّكَ بِغَافِلٍ﴾ يتمم بـ:',
        options: [
            { value: "0", text: '(عَمَّا تَعْمَلُونَ)' },
            { value: "1", text: '(عَمَّا يَعْمَلُونَ)' },
            { value: "2", text: 'الاثنتان' }, // ✅
            { value: "3", text: 'لا شيء' }
        ],
        correctAnswer: "2"
    }
    ],

    // =========================
    // ثانياً: صح أم خطأ (10 أسئلة)
    // =========================
    trueFalse: [
        { id: 11, question: 'قوله تعالى: ﴿وَكَانَ اللَّهُ غَفُورًا رَّحِيمًا﴾ وردت كثيرًا في القرآن.', correctAnswer: "✔️" },
        { id: 12, question: 'لفظ (السميع البصير) ورد دائمًا بنفس الترتيب في القرآن.', correctAnswer: "✔️" },
        { id: 13, question: 'متشابهات القرآن تعتمد على اختلاف الألفاظ مع اتحاد المعنى.', correctAnswer: "✔️" },
        { id: 14, question: 'قوله تعالى: ﴿فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ﴾ وردت في سورة الرحمن فقط.', correctAnswer: "✔️" },
        { id: 15, question: 'آيات الصبر وردت في القرآن بصيغ متعددة.', correctAnswer: "✔️" },
        { id: 16, question: 'سورة البقرة هي أطول سورة في القرآن الكريم.', correctAnswer: "✔️" },
        { id: 17, question: 'جميع آيات الرحمة ختمت بـ (غفور رحيم).', correctAnswer: "❌" },
        { id: 18, question: 'معرفة المتشابهات تساعد الحافظ على ضبط الحفظ.', correctAnswer: "✔️" },
        { id: 19, question: 'لفظ (يعلمون) و(تعلمون) من أمثلة المتشابهات.', correctAnswer: "✔️" },
        { id: 20, question: 'القرآن الكريم نزل بلسان عربي مبين.', correctAnswer: "✔️" },
        { id: 36, question: 'لفظ (عليم حكيم) من أكثر الألفاظ المتشابهة في القرآن.', correctAnswer: "✔️" },
        { id: 37, question: 'جميع السور المكية قصيرة.', correctAnswer: "❌" }, // خطأ، سورة الأنعام مكية وطويلة
        { id: 38, question: 'معرفة أسباب النزول تساعد في فهم المتشابهات.', correctAnswer: "✔️" },
        { id: 39, question: 'لفظ (يؤمنون) و(يوقنون) من المتشابهات اللفظية.', correctAnswer: "✔️" },
        { id: 40, question: 'قوله تعالى: (وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ) وردت كثيرًا.', correctAnswer: "✔️" },
        { id: 41, question: 'سورة الرحمن مدنية.', correctAnswer: "❌" }, // مكية عند الجمهور (وقيل مدنية) لكن الراجح في المسابقات أنها مكية
        { id: 42, question: 'اختلاف الخواتيم من أهم أبواب المتشابهات.', correctAnswer: "✔️" },
        { id: 43, question: 'لفظ (غفور رحيم) ورد أكثر من (عزيز حكيم).', correctAnswer: "✔️" },
        { id: 44, question: 'القرآن الكريم محفوظ من التحريف.', correctAnswer: "✔️" },
        { id: 45, question: 'لفظ (السميع العليم) لم يأتِ إلا مرة واحدة.', correctAnswer: "❌" }, // ورد كثيراً
        { id: 46, question: 'المتشابهات نوع واحد فقط.', correctAnswer: "❌" },
        { id: 47, question: 'سورة البقرة مدنية بالإجماع.', correctAnswer: "✔️" },
        { id: 48, question: 'اختلاف الضمائر من صور المتشابهات.', correctAnswer: "✔️" },
        { id: 49, question: 'الحفظ بدون فهم يصعّب ضبط المتشابهات.', correctAnswer: "✔️" },
        { id: 50, question: 'القرآن نزل منجمًا على النبي ﷺ.', correctAnswer: "✔️" }
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
