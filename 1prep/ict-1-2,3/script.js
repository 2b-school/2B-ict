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
    const questions = {
        
        // 1. مصفوفة أسئلة الاختيار من متعدد (40 سؤالاً: ID 1-40)
        multipleChoice: [
            // ----------------------------------------------------
            // 🔸 أولًا: التحول الرقمي (ID 1 - 10)
            // ----------------------------------------------------
            {
                id: 1,
                type: "multiple_choice",
                question: "المقصود بالتحول الرقمي هو:",
                options: [
                    { value: "أ", text: "استبدال الأجهزة القديمة فقط" },
                    { value: "ب", text: "دمج التكنولوجيا الرقمية في جميع جوانب العمل لتحسين الكفاءة" },
                    { value: "ج", text: "استخدام الإنترنت في الترفيه فقط" },
                    { value: "د", text: "تقليل عدد العاملين في المؤسسات" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 2,
                type: "multiple_choice",
                question: "من أهم فوائد التحول الرقمي:",
                options: [
                    { value: "أ", text: "زيادة الأخطاء في سير العمل" },
                    { value: "ب", text: "تقليل الكفاءة والإنتاج" },
                    { value: "ج", text: "زيادة الكفاءة والإنتاج وتقليل التكاليف" },
                    { value: "د", text: "تعطيل الخدمات" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 3,
                type: "multiple_choice",
                question: "من نتائج التحول الرقمي على الخدمات والمنتجات:",
                options: [
                    { value: "أ", text: "تقليل الجودة" },
                    { value: "ب", text: "رفع مستوى الخدمات والمنتجات المقدمة للعملاء" },
                    { value: "ج", text: "زيادة وقت إنجاز الخدمات" },
                    { value: "د", text: "صعوبة الحصول على الخدمات" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 4,
                type: "multiple_choice",
                question: "يساعد التحول الرقمي في تحسين اتخاذ القرار من خلال:",
                options: [
                    { value: "أ", text: "الاعتماد على التخمين" },
                    { value: "ب", text: "تجاهل البيانات" },
                    { value: "ج", text: "توفير البيانات والتحليلات في الوقت المناسب" },
                    { value: "د", text: "إخفاء المعلومات" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 5,
                type: "multiple_choice",
                question: "يساهم التحول الرقمي في:",
                options: [
                    { value: "أ", text: "فقدان القدرة التنافسية" },
                    { value: "ب", text: "الحفاظ على القدرة التنافسية" },
                    { value: "ج", text: "تجاهل التطورات التكنولوجية" },
                    { value: "د", text: "إلغاء الابتكار والإبداع" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 6,
                type: "multiple_choice",
                question: "منصة مصر الرقمية تعتبر مثالًا على:",
                options: [
                    { value: "أ", text: "أدوات التواصل الاجتماعي" },
                    { value: "ب", text: "أدوات إدارة سير العمل" },
                    { value: "ج", text: "أدوات الأمن السيبراني" },
                    { value: "د", text: "أدوات الذكاء الاصطناعي" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 7,
                type: "multiple_choice",
                question: "بطاقة 'ميزة' تُعد من:",
                options: [
                    { value: "أ", text: "أدوات الدفع الإلكتروني" },
                    { value: "ب", text: "أدوات التعلم الإلكتروني" },
                    { value: "ج", text: "أدوات الذكاء الاصطناعي" },
                    { value: "د", text: "أدوات التعاون والتواصل" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 8,
                type: "multiple_choice",
                question: "تطبيق 'إنستاباي' (Instapay) يُستخدم في:",
                options: [
                    { value: "أ", text: "إنشاء العروض التقديمية" },
                    { value: "ب", text: "إرسال واستقبال الأموال إلكترونيًا" },
                    { value: "ج", text: "عقد الاجتماعات عبر الإنترنت" },
                    { value: "د", text: "إنشاء البريد الإلكتروني" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 9,
                type: "multiple_choice",
                question: "من أمثلة أدوات التعاون والتواصل في التحول الرقمي:",
                options: [
                    { value: "أ", text: "Google Meet و Zoom" },
                    { value: "ب", text: "Instapay و Meeza" },
                    { value: "ج", text: "منصة مصر الرقمية" },
                    { value: "د", text: "تطبيق واتساب فقط" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 10,
                type: "multiple_choice",
                question: "لكي تتمكن من استخدام الخدمات الرقمية، يجب أن يكون لديك:",
                options: [
                    { value: "أ", text: "بطاقة هوية فقط" },
                    { value: "ب", text: "جهاز كمبيوتر حديث" },
                    { value: "ج", text: "بريد إلكتروني" },
                    { value: "د", text: "حساب فيس بوك" }
                ],
                correctAnswer: "ج"
            },
            
            // ----------------------------------------------------
            // 🔹 ثانيًا: أنظمة التشغيل - الاختيار من متعدد (ID 11 - 40)
            // ----------------------------------------------------
            {
                id: 11,
                type: "multiple_choice",
                question: "نظام التشغيل هو:",
                options: [
                    { value: "أ", text: "برنامج لتصميم الصور" },
                    { value: "ب", text: "واجهة بين المستخدم والأجهزة والبرمجيات" },
                    { value: "ج", text: "جهاز تخزين خارجي" },
                    { value: "د", text: "متصفح للإنترنت" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 12,
                type: "multiple_choice",
                question: "من وظائف نظام التشغيل:",
                options: [
                    { value: "أ", text: "إدارة الملفات فقط" },
                    { value: "ب", text: "تشغيل الألعاب" },
                    { value: "ج", text: "إدارة المكونات المادية وتشغيل البرمجيات" },
                    { value: "د", text: "تصميم واجهات المستخدم" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 13,
                type: "multiple_choice",
                question: "أي من التالي يُعد من وظائف نظام التشغيل؟",
                options: [
                    { value: "أ", text: "إدارة نظام الملفات" },
                    { value: "ب", text: "تصميم البرامج" },
                    { value: "ج", text: "كتابة الأكواد" },
                    { value: "د", text: "تصفح الإنترنت" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 14,
                type: "multiple_choice",
                question: "نظام التشغيل مسؤول عن:",
                options: [
                    { value: "أ", text: "إنتاج الطاقة" },
                    { value: "ب", text: "إدارة الذاكرة والمكونات المادية" },
                    { value: "ج", text: "إدارة البريد الإلكتروني" },
                    { value: "د", text: "تشغيل الطابعة فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 15,
                type: "multiple_choice",
                question: "أي من الأنظمة التالية يستخدم في أجهزة الكمبيوتر الشخصية؟",
                options: [
                    { value: "أ", text: "iOS" },
                    { value: "ب", text: "Android" },
                    { value: "ج", text: "macOS" },
                    { value: "د", text: "HarmonyOS" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 16,
                type: "multiple_choice",
                question: "نظام Android يُستخدم في:",
                options: [
                    { value: "أ", text: "الخوادم" },
                    { value: "ب", text: "الأجهزة المحمولة" },
                    { value: "ج", text: "أجهزة الكمبيوتر المكتبية" },
                    { value: "د", text: "أنظمة السيارات فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 17,
                type: "multiple_choice",
                question: "نظام iOS من تطوير شركة:",
                options: [
                    { value: "أ", text: "Google" },
                    { value: "ب", text: "Microsoft" },
                    { value: "ج", text: "Apple" },
                    { value: "د", text: "Samsung" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 18,
                type: "multiple_choice",
                question: "أي من الأنظمة التالية يُستخدم في الخوادم؟",
                options: [
                    { value: "أ", text: "Windows 10" },
                    { value: "ب", text: "Linux و Windows Server" },
                    { value: "ج", text: "Android و iOS" },
                    { value: "د", text: "macOS فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 19,
                type: "multiple_choice",
                question: "نظام Tizen يُستخدم في:",
                options: [
                    { value: "أ", text: "الهواتف المحمولة" },
                    { value: "ب", text: "أجهزة التلفزيون الذكية" },
                    { value: "ج", text: "أجهزة الخوادم" },
                    { value: "د", text: "الأجهزة القابلة للارتداء" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 20,
                type: "multiple_choice",
                question: "أي من الأنظمة التالية يُستخدم في أجهزة التلفزيون الذكية؟",
                options: [
                    { value: "أ", text: "Android TV" },
                    { value: "ب", text: "macOS" },
                    { value: "ج", text: "ChromeOS" },
                    { value: "د", text: "iOS" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 21,
                type: "multiple_choice",
                question: "أي من الأجهزة التالية تستخدم أنظمة تشغيل محسنة للألعاب؟",
                options: [
                    { value: "أ", text: "أجهزة الصراف الآلي" },
                    { value: "ب", text: "Xbox و PlayStation" },
                    { value: "ج", text: "أجهزة الحاسب المحمول" },
                    { value: "د", text: "محطات البيع POS" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 22,
                type: "multiple_choice",
                question: "الأجهزة القابلة للارتداء مثل الساعات الذكية تستخدم أنظمة تشغيل:",
                options: [
                    { value: "أ", text: "متخصصة حسب وظائفها" },
                    { value: "ب", text: "عامة لجميع الأجهزة" },
                    { value: "ج", text: "لأنظمة الخوادم" },
                    { value: "د", text: "غير قابلة للتحديث" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 23,
                type: "multiple_choice",
                question: "نظام تشغيل أجهزة الشبكات مسؤول عن:",
                options: [
                    { value: "أ", text: "تشغيل الفيديوهات" },
                    { value: "ب", text: "إدارة الشبكة والإعدادات" },
                    { value: "ج", text: "إدارة الرسومات" },
                    { value: "د", text: "تشغيل الألعاب" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 24,
                type: "multiple_choice",
                question: "أجهزة التوجيه (Routers) تعمل بأنظمة تشغيل خاصة بـ:",
                options: [
                    { value: "أ", text: "تحرير الصور" },
                    { value: "ب", text: "إدارة إعدادات الشبكة" },
                    { value: "ج", text: "تشغيل الأفلام" },
                    { value: "د", text: "معالجة النصوص" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 25,
                type: "multiple_choice",
                question: "أنظمة تشغيل السيارات تتحكم في:",
                options: [
                    { value: "أ", text: "سرعة الإنترنت فقط" },
                    { value: "ب", text: "نظام الصوت فقط" },
                    { value: "ج", text: "المعلومات والترفيه والملاحة" },
                    { value: "د", text: "لا تتحكم في أي وظائف" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 26,
                type: "multiple_choice",
                question: "الأنظمة المدمجة تستخدم في:",
                options: [
                    { value: "أ", text: "الهواتف الذكية" },
                    { value: "ب", text: "أجهزة الصراف الآلي ومحطات البيع" },
                    { value: "ج", text: "الخوادم" },
                    { value: "د", text: "الحواسيب المحمولة" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 27,
                type: "multiple_choice",
                question: "نظام تشغيل أجهزة الـATM هو مثال على:",
                options: [
                    { value: "أ", text: "نظام تشغيل مفتوح المصدر" },
                    { value: "ب", text: "نظام تشغيل مدمج" },
                    { value: "ج", text: "نظام تشغيل للألعاب" },
                    { value: "د", text: "نظام تشغيل للشبكات" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 28,
                type: "multiple_choice",
                question: "من أمثلة الأنظمة المدمجة أيضًا:",
                options: [
                    { value: "أ", text: "الحواسيب المحمولة" },
                    { value: "ب", text: "محطات نقاط البيع POS" },
                    { value: "ج", text: "السيرفرات" },
                    { value: "د", text: "أجهزة التلفزيون" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 29,
                type: "multiple_choice",
                question: "أنظمة التحكم الصناعية تُستخدم في:",
                options: [
                    { value: "أ", text: "المدارس والمكتبات" },
                    { value: "ب", text: "المنشآت الصناعية" },
                    { value: "ج", text: "الهواتف المحمولة" },
                    { value: "د", text: "أجهزة الترفيه" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 30,
                type: "multiple_choice",
                question: "الهدف من أنظمة التحكم الصناعية هو:",
                options: [
                    { value: "أ", text: "إبطاء الإنتاج" },
                    { value: "ب", text: "مراقبة وضبط العمليات لزيادة الإنتاجية" },
                    { value: "ج", text: "زيادة استهلاك الطاقة" },
                    { value: "د", text: "الترفيه" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 31,
                type: "multiple_choice",
                question: "تساعد أنظمة التحكم الصناعية على:",
                options: [
                    { value: "أ", text: "زيادة التعرض للمواد الخطرة" },
                    { value: "ب", text: "تقليل التعرض للمواد الخطرة" },
                    { value: "ج", text: "تعطيل الأجهزة" },
                    { value: "د", text: "زيادة الأخطاء" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 32,
                type: "multiple_choice",
                question: "من المجالات التي تستخدم فيها أنظمة التحكم الصناعية:",
                options: [
                    { value: "أ", text: "التعليم فقط" },
                    { value: "ب", text: "الطاقة والنقل والإنتاج الغذائي" },
                    { value: "ج", text: "البرمجة" },
                    { value: "د", text: "الفنون" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 33,
                type: "multiple_choice",
                question: "سطح المكتب في نظام التشغيل يتكون من:",
                options: [
                    { value: "أ", text: "البرامج فقط" },
                    { value: "ب", text: "الخلفية والأيقونات والأشرطة" },
                    { value: "ج", text: "الملفات فقط" },
                    { value: "د", text: "التطبيقات فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 34,
                type: "multiple_choice",
                question: "الأيقونات في سطح المكتب هي:",
                options: [
                    { value: "أ", text: "صور عشوائية" },
                    { value: "ب", text: "رموز لبرامج أو ملفات" },
                    { value: "ج", text: "ملفات صوتية" },
                    { value: "د", text: "أدوات للكتابة فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 35,
                type: "multiple_choice",
                question: "الخلفية في سطح المكتب يمكن أن تكون:",
                options: [
                    { value: "أ", text: "فيديو فقط" },
                    { value: "ب", text: "صورة أو لون يختاره المستخدم" },
                    { value: "ج", text: "أيقونات فقط" },
                    { value: "د", text: "نصوص متحركة" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 36,
                type: "multiple_choice",
                question: "الأشرطة في سطح المكتب تحتوي على:",
                options: [
                    { value: "أ", text: "أيقونات لبرامج مثبتة" },
                    { value: "ب", text: "صور المستخدم" },
                    { value: "ج", text: "خلفيات الشاشة" },
                    { value: "د", text: "ملفات صوتية" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 37,
                type: "multiple_choice",
                question: "تختلف الشاشة الافتتاحية:",
                options: [
                    { value: "أ", text: "بين المستخدمين فقط" },
                    { value: "ب", text: "حسب إصدار نظام التشغيل" },
                    { value: "ج", text: "لا تختلف أبدًا" },
                    { value: "د", text: "في الألوان فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 38,
                type: "multiple_choice",
                question: "من أمثلة أنظمة تشغيل الكمبيوتر:",
                options: [
                    { value: "أ", text: "Android و iOS" },
                    { value: "ب", text: "macOS و Windows و Linux" },
                    { value: "ج", text: "HarmonyOS و webOS" },
                    { value: "د", text: "ChromeOS فقط" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 39,
                type: "multiple_choice",
                question: "من وظائف نظام التشغيل المهمة:",
                options: [
                    { value: "أ", text: "حماية الجهاز" },
                    { value: "ب", text: "تصميم الألعاب" },
                    { value: "ج", text: "تشغيل الفيديوهات" },
                    { value: "د", text: "إعداد الرسومات" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 40,
                type: "multiple_choice",
                question: "أي من التالي ليس من وظائف نظام التشغيل؟",
                options: [
                    { value: "أ", text: "إدارة الذاكرة" },
                    { value: "ب", text: "إدارة الملفات" },
                    { value: "ج", text: "تصميم الإعلانات" },
                    { value: "د", text: "حماية الجهاز" }
                ],
                correctAnswer: "ج"
            }
        ],

        // 2. مصفوفة أسئلة الصح والخطأ (20 سؤالاً: ID 41 - 60)
        trueFalse: [ 
            // ----------------------------------------------------
            // 🔸 التحول الرقمي - صح وخطأ (ID 41 - 50)
            // ----------------------------------------------------
            {
                id: 41, 
                type: "true_false",
                question: "التحول الرقمي يهدف إلى تحسين الكفاءة وخفض التكاليف.",
                correctAnswer: "✔️"
            },
            {
                id: 42,
                type: "true_false",
                question: "لا علاقة للتحول الرقمي بزيادة الإيرادات أو المبيعات.",
                correctAnswer: "❌"
            },
            {
                id: 43,
                type: "true_false",
                question: "من أهداف التحول الرقمي تحسين اتخاذ القرار عبر البيانات والتحليل.",
                correctAnswer: "✔️"
            },
            {
                id: 44,
                type: "true_false",
                question: "مشروع التحول الرقمي في مصر يهدف إلى ربط الجهات الحكومية ببعضها إلكترونيًا.",
                correctAnswer: "✔️"
            },
            {
                id: 45,
                type: "true_false",
                question: "منصة مصر الرقمية تقدم خدمات حكومية عبر الإنترنت.",
                correctAnswer: "✔️"
            },
            {
                id: 46,
                type: "true_false",
                question: "تطبيق إنستاباي غير معتمد من البنك المركزي المصري.",
                correctAnswer: "❌"
            },
            {
                id: 47,
                type: "true_false",
                question: "بطاقة 'ميزة' توفر وسيلة دفع إلكترونية آمنة وسريعة.",
                correctAnswer: "✔️"
            },
            {
                id: 48,
                type: "true_false",
                question: "برامج Google Meet و Zoom تُستخدم في الاجتماعات عبر الإنترنت.",
                correctAnswer: "✔️"
            },
            {
                id: 49,
                type: "true_false",
                question: "لا حاجة إلى بريد إلكتروني للحصول على الخدمات الرقمية.",
                correctAnswer: "❌"
            },
            {
                id: 50,
                type: "true_false",
                question: "التحول الرقمي يساعد على الابتكار وخلق فرص عمل جديدة.",
                correctAnswer: "✔️"
            },
            
            // ----------------------------------------------------
            // 🔹 أنظمة التشغيل - صح وخطأ (ID 51 - 60)
            // ----------------------------------------------------
            {
                id: 51,
                type: "true_false",
                question: "نظام التشغيل هو برنامج يربط بين المستخدم ومكونات الحاسوب.",
                correctAnswer: "✔️"
            },
            {
                id: 52,
                type: "true_false",
                question: "لا يقوم نظام التشغيل بإدارة الذاكرة.",
                correctAnswer: "❌"
            },
            {
                id: 53,
                type: "true_false",
                question: "تستخدم الهواتف الذكية نظام تشغيل macOS.",
                correctAnswer: "❌"
            },
            {
                id: 54,
                type: "true_false",
                question: "نظام Android من تطوير شركة Google.",
                correctAnswer: "✔️"
            },
            {
                id: 55,
                type: "true_false",
                question: "أنظمة تشغيل الخوادم تستخدم فقط في الألعاب.",
                correctAnswer: "❌"
            },
            {
                id: 56,
                type: "true_false",
                question: "أجهزة التلفزيون الذكية يمكن أن تعمل بنظام webOS.",
                correctAnswer: "✔️"
            },
            {
                id: 57,
                type: "true_false",
                question: "الأجهزة القابلة للارتداء لا تحتاج إلى نظام تشغيل.",
                correctAnswer: "❌"
            },
            {
                id: 58,
                type: "true_false",
                question: "الأنظمة المدمجة تستخدم في أجهزة الصراف الآلي.",
                correctAnswer: "✔️"
            },
            {
                id: 59,
                type: "true_false",
                question: "أنظمة التحكم الصناعية تزيد من الأخطاء في العمل.",
                correctAnswer: "❌"
            },
            {
                id: 60,
                type: "true_false",
                question: "تختلف الشاشة الافتتاحية لأنظمة التشغيل باختلاف الإصدارات.",
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