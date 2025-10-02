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
    // تعريف الأسئلة باستخدام arrays (تم دمج جميع الأنواع هنا)
    // ملاحظة: تم حذف أسئلة المطابقة والقائمة المنسدلة من النموذج القديم لتجنب التداخل
    const questions = {
        // 20 سؤال اختيار من متعدد
        multipleChoice: [
            {
                id: 1,
                question: "يربط ............... أجهزة الكمبيوتر ببعضها لتبادل المعلومات والبيانات المهمة.",
                options: [
                    { value: "أ", text: "البصمة الرقمية" },
                    { value: "ب", text: "شبكات الكمبيوتر" },
                    { value: "ج", text: "معالج الكلمات" },
                    { value: "د", text: "الجداول الحسابية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 2,
                question: "يعد محرك ............... مثل محرك القرص الثابت ولكنه يعمل بشكل أسرع.",
                options: [
                    { value: "أ", text: "القرص الصلب الخارجي" },
                    { value: "ب", text: "محرك الأقراص ذو الحالة الصلبة (SSD)" },
                    { value: "ج", text: "لوحة المفاتيح" },
                    { value: "د", text: "سلك الإيثرنت" }
                ],
                correctAnswer: "أ" 
            },
            {
                id: 3,
                question: "يقتصر استخدام شبكة ............... على الأشخاص الذين تربطهم علاقة عمل في مؤسسة معينة.",
                options: [
                    { value: "أ", text: "العنكبوتية WWW" },
                    { value: "ب", text: "الإنترنت Internet" },
                    { value: "ج", text: "تطبيقات الكمبيوتر" },
                    { value: "د", text: "الإنترانت Intranet" }
                ],
                correctAnswer: "د"
            },
            {
                id: 4,
                question: "لحل مشكلة عدم وجود مساحة تخزينية كافية للرسومات على جهاز الكمبيوتر ...............",
                options: [
                    { value: "أ", text: "إغلاق بعض البرامج" },
                    { value: "ب", text: "تحميل المزيد من البرامج" },
                    { value: "ج", text: "إغلاق جهاز الكمبيوتر" },
                    { value: "د", text: "تحميل برنامج الورد" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 5,
                question: "الخطوة الأخيرة من خطوات اكتشاف المشكلات وحلها ...............",
                options: [
                    { value: "أ", text: "تحديد المشكلة" },
                    { value: "ب", text: "دراسة الحلول المحتملة للمشكلة" },
                    { value: "ج", text: "التوصل إلى الحل المناسب للمشكلة" },
                    { value: "د", text: "الاستعانة بمعلمك أو بأحد أفراد أسرتك" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 6,
                question: "لربط جهاز الكمبيوتر الخاص بك بشبكة الإنترنت فإنك بحاجة إلى ...............",
                options: [
                    { value: "أ", text: "بوابة Gateway" },
                    { value: "ب", text: "شبكة عنكبوتية WWW" },
                    { value: "ج", text: "الطابعة" },
                    { value: "د", text: "لا شيء مما سبق (الراوتر هو المطلوب)" }
                ],
                correctAnswer: "د"
            },
            {
                id: 7,
                question: "عند توصيل جهاز كمبيوتر بجهاز كمبيوتر آخر في نفس المكان فقد أصبح لديك ............",
                options: [
                    { value: "أ", text: "ماسح ضوئي" },
                    { value: "ب", text: "شبكة محلية LAN" },
                    { value: "ج", text: "CPU" },
                    { value: "د", text: "ISP" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 8,
                question: "جهاز ............... يربط جهاز الكمبيوتر بمزود خدمة الإنترنت ISP.",
                options: [
                    { value: "أ", text: "البلوتوث" },
                    { value: "ب", text: "التوجيه (الراوتر)" },
                    { value: "ج", text: "الشبكة المفتوحة" },
                    { value: "د", text: "محرك الأقراص" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 9,
                question: "وحدة القياس ............ تستخدم لقياس عدد الدورات التي تنفذها وحدة المعالجة المركزية في الثانية.",
                options: [
                    { value: "أ", text: "الجيجا هرتز GHz" },
                    { value: "ب", text: "بت bit" },
                    { value: "ج", text: "ميجابايت في الثانية Mbps" },
                    { value: "د", text: "جيجا بايت GB" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 10,
                question: "لربط أجهزة الكمبيوتر بجهاز الراوتر يستخدم ...............",
                options: [
                    { value: "أ", text: "كبل إيثرنت" },
                    { value: "ب", text: "ذاكرة الفلاش" },
                    { value: "ج", text: "USB" },
                    { value: "د", text: "Wi-Fi" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 11,
                question: "أصغر وحدة قياس هي ............",
                options: [
                    { value: "أ", text: "البت" },
                    { value: "ب", text: "البايت" },
                    { value: "ج", text: "الكيلوبايت" },
                    { value: "د", text: "الميجابايت" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 12,
                question: "عند مواجهة بطء تشغيل أحد التطبيقات على الجهاز فإنك تلجأ الى ...............",
                options: [
                    { value: "أ", text: "التأكد من توصيل الفأرة" },
                    { value: "ب", text: "إعادة تشغيل الجهاز" },
                    { value: "ج", text: "التحقق من الواي فاي" },
                    { value: "د", text: "التحقق من سلك الإيثرنت" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 13,
                question: "يربط شبكة ............... أجهزة الكمبيوتر ومستخدميها حول أنحاء العالم.",
                options: [
                    { value: "أ", text: "الإنترنت" },
                    { value: "ب", text: "المحلية" },
                    { value: "ج", text: "المغلقة" },
                    { value: "د", text: "البصمة الرقمية" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 14,
                question: "الكيلو بايت يعادل 1024 ...............",
                options: [
                    { value: "أ", text: "بايت" },
                    { value: "ب", text: "ميجا بايت" },
                    { value: "ج", text: "جيجا بايت" },
                    { value: "د", text: "تيرا بايت" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 15,
                question: "تعد ............... جزء من شبكة الإنترنت.",
                options: [
                    { value: "أ", text: "شبكة الكمبيوتر المغلقة" },
                    { value: "ب", text: "الشبكة العنكبوتية WWW" },
                    { value: "ج", text: "الراوتر" },
                    { value: "د", text: "الرسائل المزعجة" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 16,
                question: "موقع بنك المعرفة المصري EKB متاح على ............. بالمجان لجميع المصريين.",
                options: [
                    { value: "أ", text: "التطبيقات المختلفة" },
                    { value: "ب", text: "الشبكة العنكبوتية العالمية" },
                    { value: "ج", text: "العروض التقديمية" },
                    { value: "د", text: "الجداول الحسابية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 17,
                question: "............... هي نقاط اتصال تتيح لك الاتصال بالإنترنت من خلال الهواتف الذكية وفي أي مكان.",
                options: [
                    { value: "أ", text: "Hotspots" },
                    { value: "ب", text: "www" },
                    { value: "ج", text: "Intranet" },
                    { value: "د", text: "Cables" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 18,
                question: "أحد الحلول المقترحة في حالة بطء محرك البحث ...............",
                options: [
                    { value: "أ", text: "التحقق من الاتصال بالـ Wi-Fi" },
                    { value: "ب", text: "شراء شاشة" },
                    { value: "ج", text: "تغيير لوحة المفاتيح" },
                    { value: "د", text: "شراء طابعة" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 19,
                question: "إذا لم تتمكن من حل المشكلة يجب أن تقوم بـ ...............",
                options: [
                    { value: "أ", text: "ترك المشكلة" },
                    { value: "ب", text: "قم بحل مشكلة أخرى" },
                    { value: "ج", text: "استعن بأحد أفراد أسرتك" },
                    { value: "د", text: "لا شيء مما سبق" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 20,
                question: "يتم التحقق من سرعة الإنترنت في حالة ...............",
                options: [
                    { value: "أ", text: "عدم وجود مساحة كافية" },
                    { value: "ب", text: "التحميل البطيء" },
                    { value: "ج", text: "بطء فتح التطبيقات" },
                    { value: "د", text: "كل ما سبق" }
                ],
                correctAnswer: "ب"
            }
        ],

        // 20 سؤال صح وخطأ
        trueFalse: [
            {
                id: 21,
                question: "في حالة عدم القدرة على تخزين الملفات يجب إغلاق بعض البرامج.",
                correctAnswer: "✗"
            },
            {
                id: 22,
                question: "الـ HDMI هو سلك ينقل الصوت والصورة من الأجهزة وإليها.",
                correctAnswer: "✓"
            },
            {
                id: 23,
                question: "يعتبر الاتصال بالإنترنت أسرع وأكثر استقراراً من الوصلات اللاسلكية.",
                correctAnswer: "✓"
            },
            {
                id: 24,
                question: "التيرا بايت = 1024 ميجا بايت.",
                correctAnswer: "✗"
            },
            {
                id: 25,
                question: "إذا كان الإنترنت المنزلي لديك لا يعمل يجب الاتصال بمزود خدمة الإنترنت.",
                correctAnswer: "✓"
            },
            {
                id: 26,
                question: "كلما زادت عدد الدورات زادت معها سرعة معالجة البيانات والتعليمات.",
                correctAnswer: "✓"
            },
            {
                id: 27,
                question: "يمكن تخزين المعلومات ومشاركتها باستخدام ذاكرة الفلاش Flash Memory.",
                correctAnswer: "✓"
            },
            {
                id: 28,
                question: "الاتصال ضعيف بالشبكة أثناء مؤتمر الفيديو قد يكون بسبب البطء في الاتصال اللاسلكي.",
                correctAnswer: "✓"
            },
            {
                id: 29,
                question: "لا تحتاج إلى راوتر للاتصال بالإنترنت عن طريق الـ Wi-Fi.",
                correctAnswer: "✗"
            },
            {
                id: 30,
                question: "تقاس عدد الدورات التي تنفذها وحدة المعالجة المركزية بالميجابايت في الثانية.",
                correctAnswer: "✗"
            },
            {
                id: 31,
                question: "يمكن أن يكون معمل الكمبيوتر في المدرسة شبكة كمبيوتر مغلقة.",
                correctAnswer: "✓"
            },
            {
                id: 32,
                question: "مزود خدمة الإنترنت ISP هو جهاز يربط الكمبيوتر بجهاز التوجيه (الراوتر).",
                correctAnswer: "✗"
            },
            {
                id: 33,
                question: "ظهرت أجهزة Wi-Fi في أواخر الثمانينات.",
                correctAnswer: "✗"
            },
            {
                id: 34,
                question: "أجهزة الكمبيوتر في الشبكة المغلقة تتصل ببعضها عن طريق أسلاك.",
                correctAnswer: "✓"
            },
            {
                id: 35,
                question: "يمكن أن تعمل شبكة الإنترنت دون الحاجة إلى مزود الخدمة ISP.",
                correctAnswer: "✗"
            },
            {
                id: 36,
                question: "تعتبر شبكة الإنترنت أحد أنواع الشبكات المغلقة.",
                correctAnswer: "✗"
            },
            {
                id: 37,
                question: "تعتبر تحديد المشكلة هي الخطوة الأولى من خطوات اكتشاف المشكلات وحلها.",
                correctAnswer: "✓"
            },
            {
                id: 38,
                question: "دراسة الحلول المقترحة هي الخطوة الثانية من خطوات اكتشاف المشكلات وحلها.",
                correctAnswer: "✗"
            },
            {
                id: 39,
                question: "التحقق من سرعة الإنترنت يعتبر من الحلول لمشكلة التحميل البطيء.",
                correctAnswer: "✓"
            },
            {
                id: 40,
                question: "لا يمكنك حل أي مشكلة قد تظهر لك أثناء استخدام الكمبيوتر.",
                correctAnswer: "✗"
            }
        ],

        // تم إبقاء المصفوفة فارغة لمنع ظهورها في الاختبار حالياً
        matching: [], 
        // تم إبقاء المصفوفة فارغة لمنع ظهورها في الاختبار حالياً
        dropdown: [] 
    };

    // **********************************************
    // تم حذف الكود الخاص بأسئلة المطابقة والقوائم المنسدلة من createQuiz
    // حتى تتطابق الأجزاء المتبقية من الكود مع البيانات الموجودة في questions
    // (لأنك لم ترسل بيانات جديدة لـ matching و dropdown)

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
        // الآن نعتمد فقط على أسئلة الاختيار والصح والخطأ التي تم إضافتها
        totalQuestions = questions.multipleChoice.length + questions.trueFalse.length;
        
        updateProgress();
        
        // تم إزالة استدعاء addAnswerStyling() - التلوين فقط بعد التسليم
    }

    // إنشاء الأسئلة ديناميكياً
    function createQuiz() {
        let quizHTML = '';
        
        // 1. أسئلة الاختيار من متعدد
        quizHTML += '<h2><i class="fas fa-check-circle"></i> أولاً: اختر الإجابة الصحيحة (20 درجات)</h2>'; // تم تحديث الدرجات
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
        quizHTML += '<h2><i class="fas fa-check-circle"></i> ثانياً: ضع علامة (✓) أو (✗) (20 درجات)</h2>'; // تم تحديث الدرجات
        questions.trueFalse.forEach(q => {
            quizHTML += `
                <div class="question" data-answer="${q.correctAnswer}">
                    <div class="question-number">${q.id}</div>
                    <p>${q.question}</p>
                    <div class="options">
                        <label class="option">
                            <input type="radio" name="q${q.id}" value="✓">
                            <span class="option-label">(✓) صحيح</span>
                        </label>
                        <label class="option">
                            <input type="radio" name="q${q.id}" value="✗">
                            <span class="option-label">(✗) خطأ</span>
                        </label>
                    </div>
                    <div class="correct-answer" style="display: none;">
                        <i class="fas fa-check-circle"></i> الإجابة الصحيحة: (${q.correctAnswer}) ${q.correctAnswer === '✓' ? 'صحيح' : 'خطأ'}
                    </div>
                </div>
            `;
        });
        
        // **ملاحظة هامة:** تم حذف أقسام أسئلة المطابقة والقوائم المنسدلة من createQuiz مؤقتاً
        // لأنك لم تدرج البيانات الخاصة بها في كائن الأسئلة الجديد، 
        // وهذا كان يسبب جزءًا من مشكلة عدم ظهور الأسئلة.
        
        quizContainer.innerHTML = quizHTML;
        
        // تفعيل السحب والإفلات بعد إنشاء الأسئلة - **تم حذفه لعدم وجود أسئلة مطابقة**
        // initDragAndDrop(); 
    }
    

    // **تم حذف دالة initDragAndDrop() بالكامل** لعدم وجود أسئلة مطابقة حالياً

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
        
        // **تم حذف التحقق من أسئلة المطابقة (Drag & Drop) مؤقتاً**
        // **تم حذف التحقق من أسئلة القوائم المنسدلة مؤقتاً**
        
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

        // **تم حذف التحقق من أسئلة المطابقة (Drag & Drop) مؤقتاً**
        // **تم حذف التحقق من أسئلة القوائم المنسدلة مؤقتاً**
        
        // 5️⃣ إظهار النتيجة النهائية
        showResults(score, totalQuestions, wrongAnswers);

        // تحديث التقدم
        answeredQuestions = totalQuestions; 
        updateProgress();
        
        // Disable submission after results are shown
        submitButton.disabled = true;
    }

    // Format Answer
    function formatAnswer(answer) {
        if (answer === "True" || answer === '✓') return "صحيح (✓)";
        if (answer === "False" || answer === '✗') return "خطأ (✗)";
        // For multiple choice, try to find the full option text
        const choiceQuestions = document.querySelectorAll('.question[data-answer]');
        // يجب أن نجد السؤال الصحيح أولاً بناءً على الإجابة
        // بما أن أسئلة الاختيار من متعدد هي من 1 إلى 20
        const questionMatch = questions.multipleChoice.find(q => q.options.some(o => o.value === answer));

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
        
        // **تم حذف إعادة تعيين قوائم منسدلة**
        
        // **تم حذف إعادة تعيين سحب وإفلات**
        
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
    
    // Use 'change' event on the document to capture all inputs/dropdowns/radios changes and update progress
    document.addEventListener('change', () => {
        checkAllAnswered();
    });
});