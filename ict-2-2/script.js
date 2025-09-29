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

            // تعريف الأسئلة باستخدام arrays (الأسئلة الجديدة)
    const questions = {
        // أسئلة الاختيار من متعدد (15 سؤال)
        multipleChoice: [
            {
                id: 1,
                question: "ما هو المصطلح الذي يشير إلى قدرة الآلات على محاكاة الذكاء البشري واتخاذ القرارات؟",
                options: [
                    { value: "أ", text: "إنترنت الأشياء (IoT)" },
                    { value: "ب", text: "الذكاء الاصطناعي (AI)" },
                    { value: "ج", text: "الحوسبة السحابية" },
                    { value: "د", text: "قواعد البيانات" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 2,
                question: "تعتمد تقنية إنترنت الأشياء (IoT) بشكل أساسي على:",
                options: [
                    { value: "أ", text: "استخدام البرامج المعقدة" },
                    { value: "ب", text: "توصيل الأجهزة المادية بالإنترنت لتبادل البيانات" },
                    { value: "ج", text: "حل المعادلات الرياضية" },
                    { value: "د", text: "بناء الروبوتات الصناعية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 3,
                question: "أجهزة يمكنها أداء المهام بشكل مستقل وتشبه ما يقوم به الإنسان:",
                options: [
                    { value: "أ", text: "أجهزة الاستشعار" },
                    { value: "ب", text: "الروبوتات" },
                    { value: "ج", text: "الخوارزميات" },
                    { value: "د", text: "الشبكات العصبية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 4,
                question: "ما هو الهدف الأساسي من هجمات الحرمان من الخدمة الموزعة (DDoS):",
                options: [
                    { value: "أ", text: "سرقة البيانات الشخصية" },
                    { value: "ب", text: "تشفير الملفات والمطالبة بفدية" },
                    { value: "ج", text: "إغراق الخادم بكم هائل من الطلبات لجعله غير متاح" },
                    { value: "د", text: "زرع برامج التجسس" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 5,
                question: "تُستخدم أجهزة الاستشعار الحساسة في إنترنت الأشياء لـ:",
                options: [
                    { value: "أ", text: "تخزين المعلومات" },
                    { value: "ب", text: "معالجة البيانات" },
                    { value: "ج", text: "قياس وتجميع البيانات من البيئة المحيطة" },
                    { value: "د", text: "الاتصال الخارجي عبر الأقمار الصناعية" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 6,
                question: "التهديدات السيبرانية التي تقوم بتشفير ملفات الضحية وتطلب مبلغًا ماليًا لفك التشفير هي:",
                options: [
                    { value: "أ", text: "الهندسة الاجتماعية" },
                    { value: "ب", text: "التصيد الاحتيالي" },
                    { value: "ج", text: "برامج الفدية (Ransomware)" },
                    { value: "د", text: "انتحال الشخصية" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 7,
                question: "أي من الآتي يُعد مثالاً على البيانات الضخمة (Big Data)؟",
                options: [
                    { value: "أ", text: "قائمة أسماء 10 طلاب" },
                    { value: "ب", text: "ملف نصي بحجم 1 ميجابايت" },
                    { value: "ج", text: "جميع بيانات معاملات البيع والشراء على متجر إلكتروني ضخم لمدة 5 سنوات" },
                    { value: "د", text: "صورة شخصية واحدة" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 8,
                question: "ما هو المصطلح الذي يصف عملية خداع الأشخاص للكشف عن معلومات سرية (مثل كلمات المرور)؟",
                options: [
                    { value: "أ", text: "التشفير" },
                    { value: "ب", text: "الهندسة الاجتماعية" },
                    { value: "ج", text: "جدار الحماية" },
                    { value: "د", text: "التحقق بخطوتين" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 9,
                question: "تستخدم الزراعة الذكية الذكاء الاصطناعي لـ:",
                options: [
                    { value: "أ", text: "تزيين المزارع" },
                    { value: "ب", text: "تقليل جودة المحاصيل" },
                    { value: "ج", text: "تحديد كمية المياه والأسمدة اللازمة بدقة" },
                    { value: "د", text: "زراعة نوع واحد من النباتات" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 10,
                question: "يتميز التصيد الاحتيالي الموجه (Spear Phishing) عن التصيد الاحتيالي العادي بـ:",
                options: [
                    { value: "أ", text: "استهدافه للجميع" },
                    { value: "ب", text: "كونه أقل ضررًا" },
                    { value: "ج", text: "استهدافه شخصًا أو مؤسسة محددة بمعلومات شخصية" },
                    { value: "د", text: "عدم استخدام البريد الإلكتروني" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 11,
                question: "ما هي المرحلة الأولى في دورة حياة البيانات الضخمة؟",
                options: [
                    { value: "أ", text: "التحليل" },
                    { value: "ب", text: "التخزين" },
                    { value: "ج", text: "المعالجة" },
                    { value: "د", text: "التجميع (الاستحواذ)" }
                ],
                correctAnswer: "د"
            },
            {
                id: 12,
                question: "أي من الآتي يُعد مثالاً على الاستخدام الآمن لإنترنت الأشياء في المنزل؟",
                options: [
                    { value: "أ", text: "عدم استخدام كلمة مرور للأجهزة" },
                    { value: "ب", text: "إدارة الإضاءة والتحكم بدرجة الحرارة عن بُعد عبر تطبيق آمن" },
                    { value: "ج", text: "ترك الأجهزة متصلة بشبكة واي فاي عامة" },
                    { value: "د", text: "عدم تحديث برامج تشغيل الأجهزة" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 13,
                question: "عند اختيار كلمة مرور قوية، يجب أن تكون:",
                options: [
                    { value: "أ", text: "قصيرة وسهلة التذكر" },
                    { value: "ب", text: "هي اسمك وتاريخ ميلادك" },
                    { value: "ج", text: "مزيجًا من الأحرف الكبيرة والصغيرة والأرقام والرموز" },
                    { value: "د", text: "كلمة مرور موحدة لكل حساباتك" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 14,
                question: "الشبكات الروبوتية (Botnets) هي مجموعة من:",
                options: [
                    { value: "أ", text: "الروبوتات الصناعية فقط" },
                    { value: "ب", text: "المبرمجين المهرة" },
                    { value: "ج", text: "الحواسيب التي تم التحكم بها عن بُعد لتنفيذ هجوم" },
                    { value: "د", text: "أجهزة الراوتر" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 15,
                question: "واحدة من خصائص الذكاء الاصطناعي هي:",
                options: [
                    { value: "أ", text: "الاعتماد على التدخل البشري بشكل دائم" },
                    { value: "ب", text: "التعلم من البيانات والخبرات السابقة" },
                    { value: "ج", text: "عدم القدرة على معالجة اللغات الطبيعية" },
                    { value: "د", text: "ثبات القرارات وعدم تغييرها أبدًا" }
                ],
                correctAnswer: "ب"
            }
        ],

        // أسئلة الصح والخطأ (15 سؤال)
        trueFalse: [
            {
                id: 16, // يبدأ من 16
                question: "يُستخدم إنترنت الأشياء (IoT) في مجال الزراعة الذكية لتحديد كميات المياه اللازمة لتقليل هدرها.",
                correctAnswer: "✓"
            },
            {
                id: 17,
                question: "تعتبر الروبوتات أجهزة آلية لا يمكنها الحركة أو التفاعل مع البيئة المحيطة.",
                correctAnswer: "✗"
            },
            {
                id: 18,
                question: "يستطيع الذكاء الاصطناعي (AI) تحليل الصور الطبية للمساعدة في تشخيص الأمراض.",
                correctAnswer: "✓"
            },
            {
                id: 19,
                question: "تهدف هجمات التصيد الاحتيالي إلى سرقة بيانات تسجيل الدخول والمعلومات الشخصية.",
                correctAnswer: "✓"
            },
            {
                id: 20,
                question: "البيانات الضخمة (Big Data) تتميز بحجمها الهائل وتنوعها وسرعة إنتاجها.",
                correctAnswer: "✓"
            },
            {
                id: 21,
                question: "من طرق الحماية السيبرانية الفعالة عدم تحديث برامج مكافحة الفيروسات.",
                correctAnswer: "✗"
            },
            {
                id: 22,
                question: "يمكن استخدام أجهزة إنترنت الأشياء في المنزل لربط الإضاءة والتحكم فيها عن بعد.",
                correctAnswer: "✓"
            },
            {
                id: 23,
                question: "يُعد انتحال الشخصية نوعاً من هجمات الهندسة الاجتماعية التي تعتمد على الثقة.",
                correctAnswer: "✓"
            },
            {
                id: 24,
                question: "الهدف الأساسي لبرامج الفدية هو إغلاق الجهاز بشكل دائم وليس المطالبة بالمال.",
                correctAnswer: "✗"
            },
            {
                id: 25,
                question: "لا يمكن للروبوتات الذكية تجنب العوائق في طريقها بشكل تلقائي.",
                correctAnswer: "✗"
            },
            {
                id: 26,
                question: "في هجوم DDoS، يتم استخدام حاسوب واحد فقط لشن الهجوم.",
                correctAnswer: "✗"
            },
            {
                id: 27,
                question: "يُطلق على البيانات غير المهيكلة اسم 'البيانات الضخمة' فقط إذا كانت من نوع النصوص.",
                correctAnswer: "✗"
            },
            {
                id: 28,
                question: "المساعدات الافتراضية مثل Siri و Google Assistant هي تطبيقات للذكاء الاصطناعي.",
                correctAnswer: "✓"
            },
            {
                id: 29,
                question: "لغة الآلة هي اللغة الطبيعية التي يتحدث بها الإنسان.",
                correctAnswer: "✗"
            },
            {
                id: 30,
                question: "القرصنة الأخلاقية (Ethical Hacking) هي طريقة شرعية وآمنة لاختبار مدى قوة الأنظمة.",
                correctAnswer: "✓"
            }
        ],

        // أسئلة المطابقة (5 أسئلة)
        matching: [
            {
                id: 31,
                item: "الذكاء الاصطناعي التوليدي (Generative AI)",
                correctMatch: "ج"
            },
            {
                id: 32,
                item: "التصيد الاحتيالي (Phishing)",
                correctMatch: "أ"
            },
            {
                id: 33,
                item: "برامج ضارة (Malware)",
                correctMatch: "هـ"
            },
            {
                id: 34,
                item: "إنترنت الأشياء (IoT)",
                correctMatch: "ب"
            },
            {
                id: 35,
                item: "الرؤية الحاسوبية (Computer Vision)",
                correctMatch: "د"
            }
        ],

        // أسئلة القوائم المنسدلة (5 أسئلة - تبدأ من q36 لتجنب التداخل)
        dropdown: [
            {
                id: 36, // سؤال 1 من القائمة
                question: "........ هي إحدى الخصائص الرئيسية للبيانات الضخمة، وتشير إلى معدل تدفق البيانات وتغيرها.",
                options: ["-- اختر --", "AI", "الأمان السيبراني", "السرعة", "التخزين السحابي", "الاستدراج"],
                correctAnswer: "السرعة"
            },
            {
                id: 37, // سؤال 2 من القائمة
                question: "يُعد ........ حلاً مثالياً لتخزين الكم الهائل من البيانات الضخمة بتكلفة منخفضة.",
                options: ["-- اختر --", "AI", "الأمان السيبراني", "السرعة", "التخزين السحابي", "الاستدراج"],
                correctAnswer: "التخزين السحابي"
            },
            {
                id: 38, // سؤال 3 من القائمة
                question: "تقنية ........ تساعد الروبوتات على التعلم والتكيف مع بيئتها لأداء مهام أكثر تعقيداً.",
                options: ["-- اختر --", "AI", "الأمان السيبراني", "السرعة", "التخزين السحابي", "الاستدراج"],
                correctAnswer: "AI"
            },
            {
                id: 39, // سؤال 4 من القائمة
                question: "يهدف ........ إلى حماية الأجهزة والشبكات والبيانات من الوصول غير المصرح به أو التهديدات.",
                options: ["-- اختر --", "AI", "الأمان السيبراني", "السرعة", "التخزين السحابي", "الاستدراج"],
                correctAnswer: "الأمان السيبراني"
            },
            {
                id: 40, // سؤال 5 من القائمة
                question: "عملية ........ هي أسلوب من أساليب الهندسة الاجتماعية يعتمد على إغراء الضحية لجعله يكشف عن بياناته السرية.",
                options: ["-- اختر --", "AI", "الأمان السيبراني", "السرعة", "التخزين السحابي", "الاستدراج"],
                correctAnswer: "الاستدراج"
            }
        ]
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
        totalQuestions = document.querySelectorAll('.question[data-answer]').length +
                         document.querySelectorAll('.drop-target').length +
                         document.querySelectorAll('.answer-dropdown').length;
        
        updateProgress();
        
        // تم إزالة استدعاء addAnswerStyling() - التلوين فقط بعد التسليم
    }

    // إنشاء الأسئلة ديناميكياً
    function createQuiz() {
        let quizHTML = '';
        
        // 1. أسئلة الاختيار من متعدد
        quizHTML += '<h2><i class="fas fa-check-circle"></i> أولاً: اختر الإجابة الصحيحة (15 درجات)</h2>';
        questions.multipleChoice.forEach(q => {
            quizHTML += `
                <div class="question" data-answer="${q.correctAnswer}">
                    <div class="question-number">${q.id}</div>
                    <p>${q.question}</p>
                    <div class="options">
            `;
            
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
                        <i class="fas fa-check-circle"></i> الإجابة الصحيحة: ${q.correctAnswer}) ${questions.multipleChoice.find(item => item.id === q.id).options.find(o => o.value === q.correctAnswer).text}
                    </div>
                </div>
            `;
        });
        
        // 2. أسئلة الصح والخطأ
        quizHTML += '<h2><i class="fas fa-check-circle"></i> ثانياً: ضع علامة (✓) أو (✗) (15 درجات)</h2>';
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
        
        // 3. أسئلة المطابقة (تم عكس ترتيب عناصر العمود ب)
// 3. أسئلة المطابقة (تم عكس ترتيب عناصر العمود ب)
quizHTML += `
    <h2><i class="fas fa-link"></i> ثالثًا : صِل العمود (أ) بما يناسبه من العمود (ب) (5 درجات)</h2>
    <div class="matching-question"> 
        <div class="question-instruction"> 
            <p>اسحب كل عنصر من العمود (أ) وضعه بجوار العنصر المناسب له في العمود (ب):</p> 
        </div> 
        
        <div class="matching-container"> 
            <div class="column column-a"> 
                <h3>العمود (أ) - المصطلح</h3> 
`;

// **التكرار على العناصر الـ 5 الجديدة للعمود (أ) - المصطلح**
const newMatchingQuestions = [
    { id: 31, item: "الذكاء الاصطناعي التوليدي (Generative AI)", correctMatch: "ج" },
    { id: 32, item: "التصيد الاحتيالي (Phishing)", correctMatch: "أ" },
    { id: 33, item: "برامج ضارة (Malware)", correctMatch: "هـ" },
    { id: 34, item: "إنترنت الأشياء (IoT)", correctMatch: "ب" },
    { id: 35, item: "الرؤية الحاسوبية (Computer Vision)", correctMatch: "د" }
];

newMatchingQuestions.forEach(q => {
    quizHTML += `<div class="draggable-item" data-correct="${q.correctMatch}" draggable="true" id="item${q.id}">${q.item}</div>`;
});

quizHTML += `
            </div> 
                
            <div class="column column-b"> 
                <h3>العمود (ب) - التعريف</h3> 
                <div class="drop-target" data-value="د">(د) مجال يمكن الحاسوب من فهم وتفسير المعلومات البصرية (الصور والفيديو).</div>
                <div class="drop-target" data-value="ب">(ب) شبكة من الأجهزة المادية المتصلة لتبادل البيانات والتحكم بها.</div>
                <div class="drop-target" data-value="هـ">(هـ) أي برنامج مصمم خصيصاً لإلحاق الضرر بالجهاز أو سرقة البيانات.</div>
                <div class="drop-target" data-value="أ">(أ) إرسال رسائل احتيالية لخداع الضحية والحصول على بياناته.</div>
                <div class="drop-target" data-value="ج">(ج) أنظمة قادرة على إنشاء محتوى جديد (نصوص، صور، فيديو).</div>
            </div> 
        </div> 
    </div>
`;
        
        // 4. أسئلة القوائم المنسدلة
        quizHTML += '<h2><i class="fas fa-list-alt"></i> رابعًا: اختر من القائمة المنسدلة (10 درجات)</h2>';
        quizHTML += `
            <div class="dropdown-question">
                <div class="question-instruction">
                    <p>اختر الإجابة الصحيحة من القائمة المنسدلة لإكمال كل جملة:</p>
                </div>
        `;
        
        questions.dropdown.forEach(q => {
            quizHTML += `
                <div class="dropdown-item">
                    <p>${q.id - 40}. ${q.question} 
                        <select class="answer-dropdown" name="q${q.id}" data-correct="${q.correctAnswer}">
            `;
            
            q.options.forEach(option => {
                // التأكد من أن الخيار الافتراضي (-- اختر --) ليس هو الإجابة الصحيحة
                const selectedAttr = (option === '-- اختر --') ? 'selected' : '';
                quizHTML += `<option value="${option}" ${selectedAttr}>${option}</option>`;
            });
            
            quizHTML += `
                        </select>
                    </p>
                </div>
            `;
        });
        
        quizHTML += `
                <div class="dropdown-feedback" style="display: none;">
                    <i class="fas fa-check-circle"></i> <span class="feedback-text"></span>
                </div>
            </div>
        `;
        
        quizContainer.innerHTML = quizHTML;
        
        // تفعيل السحب والإفلات بعد إنشاء الأسئلة
        initDragAndDrop();
    }
    
    // تم إزالة دالة addAnswerStyling() لعدم تفعيل التلوين الفوري


    // تفعيل السحب والإفلات
    function initDragAndDrop() {
        const draggableItems = document.querySelectorAll('.draggable-item');
        const dropTargets = document.querySelectorAll('.drop-target');
        const columnA = document.querySelector('.column-a');

        draggableItems.forEach(item => {
            item.setAttribute('draggable', true);

            item.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text', e.target.textContent.trim());
                e.dataTransfer.setData('id', e.target.getAttribute('data-correct'));
                e.dataTransfer.setData('itemId', e.target.id || Math.random().toString(36).substr(2, 9));
                e.target.classList.add('dragging');
            });

            item.addEventListener('dragend', e => {
                e.target.classList.remove('dragging');
                checkAllAnswered();
            });
        });

        dropTargets.forEach(target => {
            target.addEventListener('dragover', e => {
                e.preventDefault();
                target.classList.add('hover');
            });

            target.addEventListener('dragleave', e => {
                target.classList.remove('hover');
            });

            target.addEventListener('drop', e => {
                e.preventDefault();
                target.classList.remove('hover');

                // لو فيه عنصر قديم في المكان يرجع للعمود (أ)
                const oldItem = target.querySelector('.draggable-item');
                if (oldItem) columnA.appendChild(oldItem);

                // جلب العنصر اللي بتسحبه
                const draggedId = e.dataTransfer.getData('itemId');
                const draggedItem = document.querySelector(`[id="${draggedId}"]`);

                if (draggedItem) {
                    target.appendChild(draggedItem);
                    checkAllAnswered();
                }
            });
        });

        // السماح بإرجاع العناصر للعمود (أ)
        columnA.addEventListener('dragover', e => e.preventDefault());
        columnA.addEventListener('drop', e => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('itemId');
            const draggedItem = document.querySelector(`[id="${draggedId}"]`);
            if (draggedItem) {
                columnA.appendChild(draggedItem);
                checkAllAnswered();
            }
        });
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
        
        // 2. التحقق من أسئلة المطابقة (Drag & Drop)
        const dropTargets = document.querySelectorAll('.drop-target');
        dropTargets.forEach(target => {
            const hasItem = target.querySelector('.draggable-item');
            if (hasItem) newAnsweredCount++;
            else allAnswered = false;
        });
        
        // 3. التحقق من أسئلة القوائم المنسدلة الجديدة
        const dropdownQuestions = document.querySelectorAll('.answer-dropdown');
        dropdownQuestions.forEach(dropdown => {
            // Check if a value other than the default "-- اختر --" is selected
            if (dropdown.value && dropdown.value !== '-- اختر --') newAnsweredCount++;
            else allAnswered = false;
        });
        
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
            const inputName = `q${question.querySelector('.question-number').textContent}`;
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

                if (optionInput.value === correctAnswer) {
                    // تلوين الإجابة الصحيحة باللون الأخضر
                    option.classList.add('correct');
                }
                
                if (optionInput.checked && optionInput.value !== correctAnswer) {
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

        // 3️⃣ أسئلة المطابقة (Drag & Drop)
        const dropTargets = document.querySelectorAll('.drop-target');
        dropTargets.forEach(target => {
            const targetValue = target.getAttribute('data-value');
            const item = target.querySelector('.draggable-item');
            
            target.classList.remove('correct', 'incorrect'); // Remove previous styling

            if (item && item.getAttribute('data-correct') === targetValue) {
                score++;
                target.classList.add('correct'); // Add final correct styling
            } else {
                target.classList.add('incorrect'); // Add final incorrect styling
                if (item) {
                    wrongAnswers.push({
                        question: target.textContent.trim(),
                        selected: item.textContent.trim(),
                        correct: 'المطابقة الصحيحة غير محققة'
                    });
                }
            }
        });

        // 4️⃣ أسئلة القوائم المنسدلة الجديدة (q41 إلى q50)
        const dropdownQuestions = document.querySelectorAll('.answer-dropdown');
        dropdownQuestions.forEach(dropdown => {
            const correctAnswer = dropdown.getAttribute('data-correct');
            dropdown.classList.remove('correct', 'incorrect'); // Remove previous styling
            
            // تلوين القوائم المنسدلة بعد التسليم
            if (dropdown.value === correctAnswer) {
                score++;
                dropdown.classList.add('correct');
            } else if (dropdown.value !== '-- اختر --') { // لا نحسب الإجابة الفارغة كإجابة خاطئة للتلوين
                dropdown.classList.add('incorrect');
                wrongAnswers.push({
                    question: dropdown.closest('.dropdown-item').textContent.trim(),
                    selected: dropdown.value || 'لم يجب',
                    correct: correctAnswer
                });
            }
            // إذا كانت الإجابة فارغة (مثل -- اختر --) نتركها بدون تلوين
        });

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
        for (const question of choiceQuestions) {
            const options = question.querySelectorAll('.option');
            for (const option of options) {
                const input = option.querySelector('input[type="radio"]');
                if (input && input.value === answer) {
                    return option.textContent.trim();
                }
            }
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
        
        // Reset dropdowns
        document.querySelectorAll('select').forEach(dropdown => {
            // تعيين القيمة إلى الخيار الافتراضي (-- اختر --)
            const defaultOption = dropdown.querySelector('option[value="-- اختر --"]');
            if (defaultOption) {
                dropdown.value = defaultOption.value; 
            }
            dropdown.classList.remove('correct', 'incorrect');
        });
        
        // Reset drag and drop
        const columnA = document.querySelector('.column-a');
        const draggableItems = document.querySelectorAll('.draggable-item');
        draggableItems.forEach(item => {
            item.style.display = 'block';
            columnA.appendChild(item);
        });
        
        document.querySelectorAll('.drop-target').forEach(target => {
            const matchResult = target.querySelector('.match-result');
            if (matchResult) matchResult.remove();
            // إزالة تلوين المطابقة وأي تأثير تظليل
            target.classList.remove('correct', 'incorrect', 'hover'); 
        });
        
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
