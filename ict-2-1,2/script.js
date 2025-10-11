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
    // تعريف الأسئلة باستخدام arrays
    const questions = {
        // 1. مصفوفة أسئلة الاختيار من متعدد (30 سؤالاً)
        multipleChoice: [
            {
                id: 1,
                type: "multiple_choice",
                question: "ما المقصود بالبيانات الضخمة (Big Data)؟",
                options: [
                    { value: "أ", text: "مجموعة صغيرة من البيانات السهلة المعالجة" },
                    { value: "ب", text: "مجموعة من البيانات الضخمة والمعقدة لا يمكن معالجتها بكفاءة بالتقنيات التقليدية" },
                    { value: "ج", text: "بيانات محفوظة في ملفات Excel فقط" },
                    { value: "د", text: "بيانات لا تحتاج إلى تحليل" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 2,
                type: "multiple_choice",
                question: "ما الهدف من تحليل البيانات الضخمة؟",
                options: [
                    { value: "أ", text: "إضاعة الوقت" },
                    { value: "ب", text: "تخزين المعلومات فقط" },
                    { value: "ج", text: "اتخاذ قرارات أفضل وأسرع" },
                    { value: "د", text: "إخفاء البيانات" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 3,
                type: "multiple_choice",
                question: "أي مما يلي يُعد من مصادر البيانات الضخمة؟",
                options: [
                    { value: "أ", text: "الأوراق المطبوعة فقط" },
                    { value: "ب", text: "الأجهزة المتصلة بالإنترنت (IoT)" },
                    { value: "ج", text: "الأجهزة غير المتصلة" },
                    { value: "د", text: "الملفات الورقية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 4,
                type: "multiple_choice",
                question: "من الأمثلة على الأجهزة المتصلة بالإنترنت:",
                options: [
                    { value: "أ", text: "المراوح والمصابيح العادية" },
                    { value: "ب", text: "الثلاجات الذكية والساعات الذكية والسيارات" },
                    { value: "ج", text: "الكتب الورقية" },
                    { value: "د", text: "الدفاتر المدرسية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 5,
                type: "multiple_choice",
                question: "أي مما يلي يعد مثالًا على توليد بيانات من الأجهزة الذكية؟",
                options: [
                    { value: "أ", text: "كتاب مطبوع" },
                    { value: "ب", text: "الهاتف المحمول يتتبع موقعك الجغرافي" },
                    { value: "ج", text: "جدول مكتوب باليد" },
                    { value: "د", text: "رسم يدوي" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 6,
                type: "multiple_choice",
                question: "وسائل التواصل الاجتماعي تولد بيانات عن:",
                options: [
                    { value: "أ", text: "المكالمات الهاتفية فقط" },
                    { value: "ب", text: "الأنشطة اليومية للمستخدمين مثل المنشورات والتعليقات" },
                    { value: "ج", text: "درجات الحرارة فقط" },
                    { value: "د", text: "الكهرباء والمياه" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 7,
                type: "multiple_choice",
                question: "من أمثلة البيانات الناتجة من وسائل التواصل الاجتماعي:",
                options: [
                    { value: "أ", text: "موقع المستخدم وردود الفعل والهاشتاجات" },
                    { value: "ب", text: "بيانات الطقس" },
                    { value: "ج", text: "إحصائيات حكومية" },
                    { value: "د", text: "معاملات مالية" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 8,
                type: "multiple_choice",
                question: "البيانات المالية تشمل:",
                options: [
                    { value: "أ", text: "ألعاب الفيديو" },
                    { value: "ب", text: "عمليات الدفع الإلكتروني والمعاملات البنكية" },
                    { value: "ج", text: "منشورات وسائل التواصل" },
                    { value: "د", text: "الفيديوهات على يوتيوب" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 9,
                type: "multiple_choice",
                question: "عند شراء منتج عبر الإنترنت، يتم تسجيل بيانات عن:",
                options: [
                    { value: "أ", text: "المبلغ والمتجر والموقع الجغرافي" },
                    { value: "ب", text: "الطقس ودرجة الحرارة" },
                    { value: "ج", text: "الصور والفيديوهات" },
                    { value: "د", text: "الحالة المزاجية" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 10,
                type: "multiple_choice",
                question: "المحتوى الرقمي يولد بيانات مثل:",
                options: [
                    { value: "أ", text: "عدد المشاهدات والتفاعلات والتعليقات" },
                    { value: "ب", text: "عدد الأوراق المطبوعة" },
                    { value: "ج", text: "درجة حرارة الجهاز" },
                    { value: "د", text: "سرعة الإنترنت فقط" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 11,
                type: "multiple_choice",
                question: "البيانات الحكومية تشمل:",
                options: [
                    { value: "أ", text: "الألعاب الإلكترونية" },
                    { value: "ب", text: "سجلات الإسكان والإحصائيات وتعداد السكان" },
                    { value: "ج", text: "منشورات وسائل التواصل" },
                    { value: "د", text: "صور الأقمار الصناعية فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 12,
                type: "multiple_choice",
                question: "من أمثلة البيانات الجغرافية والمكانية:",
                options: [
                    { value: "أ", text: "بيانات الكتب" },
                    { value: "ب", text: "بيانات الأقمار الصناعية وGPS" },
                    { value: "ج", text: "بيانات الطهي" },
                    { value: "د", text: "بيانات صوتية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 13,
                type: "multiple_choice",
                question: "خاصية الحجم (Volume) تعني:",
                options: [
                    { value: "أ", text: "سرعة توليد البيانات" },
                    { value: "ب", text: "حجم وكميات البيانات التي يتم جمعها" },
                    { value: "ج", text: "نوع البيانات" },
                    { value: "د", text: "موثوقية البيانات" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 14,
                type: "multiple_choice",
                question: "خاصية السرعة (Velocity) تشير إلى:",
                options: [
                    { value: "أ", text: "بطء البيانات" },
                    { value: "ب", text: "سرعة إنتاج وتدفق البيانات" },
                    { value: "ج", text: "نوع مصدر البيانات" },
                    { value: "د", text: "جودة البيانات" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 15,
                type: "multiple_choice",
                question: "خاصية التنوع (Variety) تعني:",
                options: [
                    { value: "أ", text: "أن البيانات من نوع واحد فقط" },
                    { value: "ب", text: "تنوع أنواع البيانات الهيكلية وغير الهيكلية" },
                    { value: "ج", text: "سرعة البيانات" },
                    { value: "د", text: "عدم وجود اختلافات في البيانات" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 16,
                type: "multiple_choice",
                question: "خاصية الصحة (Veracity) تعني:",
                options: [
                    { value: "أ", text: "حجم البيانات" },
                    { value: "ب", text: "موثوقية وجودة البيانات" },
                    { value: "ج", text: "تنوعها" },
                    { value: "د", text: "سرعة معالجتها" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 17,
                type: "multiple_choice",
                question: "خاصية القيمة (Value) تشير إلى:",
                options: [
                    { value: "أ", text: "فائدة البيانات بعد تحليلها" },
                    { value: "ب", text: "عدد مرات جمعها" },
                    { value: "ج", text: "عدد الصفوف في قاعدة البيانات" },
                    { value: "د", text: "تاريخ إنشائها" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 18,
                type: "multiple_choice",
                question: "البيانات الهيكلية هي:",
                options: [
                    { value: "أ", text: "بيانات عشوائية غير منظمة" },
                    { value: "ب", text: "بيانات منظمة في جداول ذات صفوف وأعمدة" },
                    { value: "ج", text: "صور وفيديوهات فقط" },
                    { value: "د", text: "بيانات نصية فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 19,
                type: "multiple_choice",
                question: "البيانات غير الهيكلية هي:",
                options: [
                    { value: "أ", text: "بيانات منظمة في قواعد بيانات" },
                    { value: "ب", text: "بيانات تأتي بشكل غير منظم مثل النصوص والصور والفيديوهات" },
                    { value: "ج", text: "بيانات مالية" },
                    { value: "د", text: "جداول إكسل فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 20,
                type: "multiple_choice",
                question: "البيانات شبه الهيكلية مثل:",
                options: [
                    { value: "أ", text: "الفيديوهات التعليمية" },
                    { value: "ب", text: "رسائل البريد الإلكتروني" },
                    { value: "ج", text: "صور الأقمار الصناعية" },
                    { value: "د", text: "تغريدات تويتر فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 21,
                type: "multiple_choice",
                question: "ما المقصود بالتهديدات السيبرانية المتقدمة؟",
                options: [
                    { value: "أ", text: "فيروسات بسيطة تنتقل بين الأجهزة فقط" },
                    { value: "ب", text: "أساليب تقليدية لا تسبب ضررًا كبيرًا" },
                    { value: "ج", text: "أساليب متطورة يستخدمها المخترقون للإضرار أو سرقة المعلومات" },
                    { value: "د", text: "برامج مفيدة لتحسين أداء النظام" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 22,
                type: "multiple_choice",
                question: "في المثال الوارد في الدرس، شُبّه المخترق في الهجمات المتقدمة بـ:",
                options: [
                    { value: "أ", text: "عامل صيانة صادق" },
                    { value: "ب", text: "لص يراقب ويجمع معلومات قبل الدخول" },
                    { value: "ج", text: "تلميذ يحاول التعلم" },
                    { value: "د", text: "برنامج حماية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 23,
                type: "multiple_choice",
                question: "برنامج الفدية (Ransomware) يقوم بـ:",
                options: [
                    { value: "أ", text: "حذف الملفات نهائيًا دون استعادة" },
                    { value: "ب", text: "تشفير الملفات والمطالبة بفدية لفكها" },
                    { value: "ج", text: "تحسين أداء الجهاز" },
                    { value: "د", text: "إرسال التحديثات الأمنية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 24,
                type: "multiple_choice",
                question: "الهندسة الاجتماعية المتقدمة تعتمد على:",
                options: [
                    { value: "أ", text: "اختراق الأجهزة مباشرة" },
                    { value: "ب", text: "اختراق العقول وخداع الأشخاص" },
                    { value: "ج", text: "حذف الملفات" },
                    { value: "د", text: "تشفير الشبكات فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 25,
                type: "multiple_choice",
                question: "في أسلوب التصيد الاحتيالي الموجه (Spear Phishing):",
                options: [
                    { value: "أ", text: "تُرسل الرسائل بشكل عشوائي" },
                    { value: "ب", text: "يُستهدف أشخاص أو مؤسسات محددة بمعلومات شخصية دقيقة" },
                    { value: "ج", text: "تُستخدم الأقراص المدمجة فقط" },
                    { value: "د", text: "لا تعتمد على الإنترنت" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 26,
                type: "multiple_choice",
                question: "في أسلوب انتحال الشخصية (Pretexting):",
                options: [
                    { value: "أ", text: "يخترق المهاجم الأنظمة مباشرة" },
                    { value: "ب", text: "يخلق المهاجم قصة وهمية لإقناع الضحية" },
                    { value: "ج", text: "يستخدم برامج فدية" },
                    { value: "د", text: "يهاجم المواقع الإلكترونية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 27,
                type: "multiple_choice",
                question: "من أمثلة الاستدراج (Baiting):",
                options: [
                    { value: "أ", text: "إرسال بريد إلكتروني مزيف" },
                    { value: "ب", text: "تقديم قرص USB مجاني يحتوي على برنامج ضار" },
                    { value: "ج", text: "سؤال شخص عن كلمة المرور مباشرة" },
                    { value: "د", text: "التظاهر بأنه مدير البنك عبر الهاتف" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 28,
                type: "multiple_choice",
                question: "هجمات الحرمان من الخدمة الموزعة (DDOS) تهدف إلى:",
                options: [
                    { value: "أ", text: "تسريع المواقع الإلكترونية" },
                    { value: "ب", text: "تعطيل المواقع عن طريق إرسال عدد ضخم من الطلبات" },
                    { value: "ج", text: "إصلاح الأعطال في السيرفرات" },
                    { value: "د", text: "تأمين الاتصال بالشبكة" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 29,
                type: "multiple_choice",
                question: "ما اسم الأجهزة التي يستخدمها المهاجم في تنفيذ هجمات DDOS؟",
                options: [
                    { value: "أ", text: "روبوتات ذكية" },
                    { value: "ب", text: "الشبكة الروبوتية (Botnets)" },
                    { value: "ج", text: "خوادم حكومية" },
                    { value: "د", text: "جدران نارية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 30,
                type: "multiple_choice",
                question: "ينشر برنامج الفدية عادة من خلال:",
                options: [
                    { value: "أ", text: "الألعاب المجانية فقط" },
                    { value: "ب", text: "روابط أو رسائل بريد إلكتروني مشبوهة" },
                    { value: "ج", text: "برامج مكافحة الفيروسات" },
                    { value: "د", text: "التحديثات الرسمية للنظام" }
                ],
                correctAnswer: "ب"
            }
        ],

        // 2. مصفوفة أسئلة الصح والخطأ (20 سؤالاً)
        trueFalse: [ 
            {
                id: 31, 
                type: "true_false",
                question: "البيانات الضخمة يمكن معالجتها بسهولة باستخدام Excel.",
                correctAnswer: "❌"
            },
            {
                id: 32,
                type: "true_false",
                question: "تحليل البيانات الضخمة يساعد على اتخاذ قرارات أسرع.",
                correctAnswer: "✔️"
            },
            {
                id: 33,
                type: "true_false",
                question: "الأجهزة الذكية لا تنتج أي بيانات.",
                correctAnswer: "❌"
            },
            {
                id: 34,
                type: "true_false",
                question: "من أمثلة البيانات الضخمة: بيانات وسائل التواصل الاجتماعي.",
                correctAnswer: "✔️"
            },
            {
                id: 35,
                type: "true_false",
                question: "خاصية السرعة (Velocity) تعني موثوقية البيانات.",
                correctAnswer: "❌"
            },
            {
                id: 36,
                type: "true_false",
                question: "البيانات الحكومية تعتبر مصدرًا مهمًا للبيانات الضخمة.",
                correctAnswer: "✔️"
            },
            {
                id: 37,
                type: "true_false",
                question: "البيانات الهيكلية منظمة في جداول.",
                correctAnswer: "✔️"
            },
            {
                id: 38,
                type: "true_false",
                question: "البيانات غير الهيكلية يسهل تحليلها بالأدوات التقليدية.",
                correctAnswer: "❌"
            },
            {
                id: 39,
                type: "true_false",
                question: "القيمة (Value) تعني تحقيق فائدة حقيقية من البيانات بعد تحليلها.",
                correctAnswer: "✔️"
            },
            {
                id: 40,
                type: "true_false",
                question: "رسائل البريد الإلكتروني تُعد مثالًا على البيانات شبه الهيكلية.",
                correctAnswer: "✔️"
            },
            {
                id: 41,
                type: "true_false",
                question: "التهديدات السيبرانية المتقدمة تعتمد على التخمين العشوائي وليس على التخطيط.",
                correctAnswer: "❌"
            },
            {
                id: 42,
                type: "true_false",
                question: "برامج الفدية تقوم بتشفير ملفات المستخدم حتى يدفع فدية لفكها.",
                correctAnswer: "✔️"
            },
            {
                id: 43,
                type: "true_false",
                question: "الهندسة الاجتماعية المتقدمة تستهدف الأشخاص وليس الأنظمة.",
                correctAnswer: "✔️"
            },
            {
                id: 44,
                type: "true_false",
                question: "التصيد الاحتيالي الموجه يرسل رسائل عامة دون تخصيص.",
                correctAnswer: "❌"
            },
            {
                id: 45,
                type: "true_false",
                question: "انتحال الشخصية يعني أن المهاجم يخلق قصة مزيفة لخداع الضحية.",
                correctAnswer: "✔️"
            },
            {
                id: 46,
                type: "true_false",
                question: "الاستدراج يتم من خلال تقديم شيء مغرٍ يحتوي على خطر خفي.",
                correctAnswer: "✔️"
            },
            {
                id: 47,
                type: "true_false",
                question: "هجمات DDOS تهدف إلى إصلاح المواقع البطيئة.",
                correctAnswer: "❌"
            },
            {
                id: 48,
                type: "true_false",
                question: "الشبكة الروبوتية (Botnets) تُستخدم لتنفيذ هجمات ضخمة على المواقع.",
                correctAnswer: "✔️"
            },
            {
                id: 49,
                type: "true_false",
                question: "تحديث برامج مكافحة الفيروسات لا يفيد في مواجهة التهديدات الحديثة.",
                correctAnswer: "❌"
            },
            {
                id: 50,
                type: "true_false",
                question: "في المثال في الدرس، شبهت الهجمات السيبرانية المتقدمة بشخص يراقب الضحية قبل اقتحام المنزل.",
                correctAnswer: "✔️"
            }
        ],

        // تم إبقاء المصفوفة فارغة لمنع ظهورها في الاختبار حالياً
        matching: [], 
        // تم إبقاء المصفوفة فارغة لمنع ظهورها في الاختبار حالياً
        dropdown: [] 
    };

    // **********************************************

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
        totalQuestions = questions.multipleChoice.length + questions.trueFalse.length;
        
        updateProgress();
        
        // 🚀 التعديل 1: تفعيل زر التسليم عند بدء الاختبار
        submitButton.disabled = false;
    }

    // إنشاء الأسئلة ديناميكياً
    function createQuiz() {
        let quizHTML = '';
        
        // 1. أسئلة الاختيار من متعدد
        quizHTML += '<h2><i class="fas fa-check-circle"></i> أولاً: اختر الإجابة الصحيحة (30 درجات)</h2>'; 
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