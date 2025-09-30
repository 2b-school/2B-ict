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

    // تعريف الأسئلة باستخدام arrays
    const questions = {
        // أسئلة الاختيار من متعدد
        multipleChoice: [
            {
                id: 1,
                question: "تكنولوجيا الطاقة الشمسية تعتمد على استخدام الألواح الضوئية وتحويلها إلى ........",
                options: [
                    { value: "أ", text: "طاقة ضوئية" },
                    { value: "ب", text: "طاقة حرارية" },
                    { value: "ج", text: "طاقة كهربائية" },
                    { value: "د", text: "طاقة ميكانيكية" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 2,
                question: "يمكن معالجة المياه من خلال ........",
                options: [
                    { value: "أ", text: "تقليل كمية النفايات" },
                    { value: "ب", text: "استخدام أنظمة ري ذكية" },
                    { value: "ج", text: "استخدام أجهزة كهربائية موفرة" },
                    { value: "د", text: "استخدام مباني جيدة العزل والتهوية" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 3,
                question: "أجهزة الاستشعار للأجسام تستخدم ........ للتحكم في إيقاف وتشغيل صنابير المياه.",
                options: [
                    { value: "أ", text: "حساسات (Sensors)" },
                    { value: "ب", text: "مؤقتات (Timers)" },
                    { value: "ج", text: "مصابيح" },
                    { value: "د", text: "صمامات إلكترونية أو وحدات تحكم" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 4,
                question: "........ تحسن كفاءة العمليات والمهام وتهدف إلى تحسين كفاءة العمليات الحكومية.",
                options: [
                    { value: "أ", text: "أدوات الأمن السيبراني" },
                    { value: "ب", text: "أدوات التعلم الإلكتروني" },
                    { value: "ج", text: "أدوات إدارة سير العمل" },
                    { value: "د", text: "منصات التعاون والتواصل" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 5,
                question: "التحول الرقمي يهدف إلى ........",
                options: [
                    { value: "أ", text: "زيادة الاعتماد على الخامات" },
                    { value: "ب", text: "تقليل الاعتماد على الخامات" },
                    { value: "ج", text: "استهلاك مصادر الطاقة" },
                    { value: "د", text: "خفض الانبعاثات الضارة" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 6,
                question: "بطاقة دفع توفر طرق دفع إلكترونية سهلة وبسيطة للمواطنين ........",
                options: [
                    { value: "أ", text: "Meeza" },
                    { value: "ب", text: "INSTAPAY" },
                    { value: "ج", text: "منصة مصر الرقمية" },
                    { value: "د", text: "المحافظ الإلكترونية (مثل محافظ الهاتف المحمول)" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 7,
                question: "تعتمد ........ على الأدوات التكنولوجية التي تساهم في الحفاظ على البيئة وعدم الإضرار بها.",
                options: [
                    { value: "أ", text: "التكنولوجيا التقليدية" },
                    { value: "ب", text: "التكنولوجيا الخضراء" },
                    { value: "ج", text: "الاحتباس الحراري" },
                    { value: "د", text: "التكنولوجيا المتجددة" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 8,
                question: "الطاقة الشمسية تستخدم ........ لتحويل ضوء الشمس إلى كهرباء.",
                options: [
                    { value: "أ", text: "توربينات الرياح" },
                    { value: "ب", text: "المواد العضوية" },
                    { value: "ج", text: "الألواح الشمسية" },
                    { value: "د", text: "المحولات/العاكسات الكهربائية" }
                ],
                correctAnswer: "ج"
            },
            {
                id: 9,
                question: "........ تطبيق معتمد من البنك المركزي يسمح بإرسال واستقبال النقود عبر المحافظ الإلكترونية.",
                options: [
                    { value: "أ", text: "ميزة (Meeza)" },
                    { value: "ب", text: "انستاباي (INSTAPAY)" },
                    { value: "ج", text: "Google Meet" },
                    { value: "د", text: "فودافون كاش" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 10,
                question: "التحول الرقمي يعمل على دعم الاستدامة من خلال ........",
                options: [
                    { value: "أ", text: "تحسين كفاءة استخدام الموارد" },
                    { value: "ب", text: "استخدام مصادر طاقة متجددة" },
                    { value: "ج", text: "زيادة استهلاك الموارد" },
                    { value: "د", text: "خفض الانبعاثات الضارة" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 11,
                question: "........ من مزايا استخدام السيارات الكهربائية.",
                options: [
                    { value: "أ", text: "تقليل التلوث" },
                    { value: "ب", text: "ترشيد استهلاك الطاقة" },
                    { value: "ج", text: "الحد من الاعتماد على الوقود الأحفوري" },
                    { value: "د", text: "جميع ما سبق" }
                ],
                correctAnswer: "د"
            },
            {
                id: 12,
                question: "........ هي بوابة إلكترونية حكومية توفر العديد من الخدمات الإلكترونية.",
                options: [
                    { value: "أ", text: "منصة مصر الرقمية" },
                    { value: "ب", text: "INSTAPAY" },
                    { value: "ج", text: "Zoom" },
                    { value: "د", text: "مواقع التواصل الاجتماعي" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 13,
                question: "من أهم المحاور المشتركة بين التكنولوجيا الخضراء والتحول الرقمي ........",
                options: [
                    { value: "أ", text: "خفض الانبعاثات الضارة" },
                    { value: "ب", text: "زيادة استخدام الطاقة" },
                    { value: "ج", text: "الاعتماد على الطاقة البترولية" },
                    { value: "د", text: "تحسين كفاءة سير العمل" }
                ],
                correctAnswer: "أ"
            },
            {
                id: 14,
                question: "تُستخدم بطاقات الدفع الإلكترونية ميزة في ........",
                options: [
                    { value: "أ", text: "الوصول إلى الخدمات الحكومية" },
                    { value: "ب", text: "توفير طرق دفع سهلة وسريعة" },
                    { value: "ج", text: "إرسال المعلومات" },
                    { value: "د", text: "المحافظة على البيئة من التلوث" }
                ],
                correctAnswer: "ب"
            },
            {
                id: 15,
                question: "........ هي أجهزة تعمل على ترشيد الاستهلاك وتعتمد على فكرة وجود الأجسام تحتها.",
                options: [
                    { value: "أ", text: "أجهزة الاستشعار" },
                    { value: "ب", text: "أجهزة الكمبيوتر" },
                    { value: "ج", text: "السيارات الكهربائية" },
                    { value: "د", text: "مؤقتات زمنية" }
                ],
                correctAnswer: "أ"
            }
        ],
        
        // أسئلة الصح والخطأ
        trueFalse: [
            {
                id: 16, // يبدأ من 16
                question: "يطلق مفهوم المباني الخضراء على المؤسسات التي تستطيع ترشيد استهلاك موادها.",
                correctAnswer: "✓"
            },
            {
                id: 17,
                question: "يمكن إعادة تدوير مخلفات الورق والبلاستيك إلى منتجات جديدة.",
                correctAnswer: "✓"
            },
            {
                id: 18,
                question: "من المحاور المشتركة بين التكنولوجيا الخضراء والتحول الرقمي دعم الاستدامة.",
                correctAnswer: "✓"
            },
            {
                id: 19,
                question: "يهدف التحول الرقمي إلى زيادة الاعتماد على الخامات مثل الأقلام والأوراق.",
                correctAnswer: "✗"
            },
            {
                id: 20,
                question: "التحول الرقمي بيئة معلوماتية تربط كل الجهات الحكومية ببعضها البعض.",
                correctAnswer: "✓"
            },
            {
                id: 21,
                question: "يمكن إعادة معالجة وتنقية المياه الملوثة لإعادة استخدامها.",
                correctAnswer: "✓"
            },
            {
                id: 22,
                question: "تطبيق Google Meet معتمد من البنك المركزي ويسهل إرسال واستقبال النقود.",
                correctAnswer: "✗"
            },
            {
                id: 23,
                question: "من عيوب ربط التكنولوجيا الخضراء بالتحول الرقمي بطء عملية التحول الرقمي.",
                correctAnswer: "✗"
            },
            {
                id: 24,
                question: "التحول الرقمي يعمل على تطوير المنتجات والخدمات مما أدى إلى زيادة التكاليف.",
                correctAnswer: "✗"
            },
            {
                id: 25,
                question: "لا يمكن الاستفادة من أجهزة الاستشعار في توفير وترشيد الكهرباء.",
                correctAnswer: "✗"
            },
            {
                id: 26,
                question: "التكنولوجيا الخضراء تسعى إلى تقليل انبعاثات الكربون.",
                correctAnswer: "✓"
            },
            {
                id: 27,
                question: "السيارات الكهربائية تساهم في زيادة التلوث.",
                correctAnswer: "✗"
            },
            {
                id: 28,
                question: "إعادة تدوير المواد القابلة لإعادة التدوير تساعد في الحفاظ على البيئة.",
                correctAnswer: "✓"
            },
            {
                id: 29,
                question: "التحول الرقمي هو دمج التكنولوجيا في جميع جوانب العمل.",
                correctAnswer: "✓"
            },
            {
                id: 30,
                question: "التحول الرقمي يساعد على زيادة الكفاءة والإنتاجية.",
                correctAnswer: "✓"
            }
        ],
        
        // أسئلة المطابقة (المجموعة الأولى + الثانية مدمجة)
        matching: [
            {
                id: 31,
                item: "Google Meet",
                correctMatch: "ب"
            },
            {
                id: 32,
                item: "الألواح الشمسية",
                correctMatch: "د"
            },
            {
                id: 33,
                item: "التكنولوجيا الخضراء",
                correctMatch: "أ"
            },
            {
                id: 34,
                item: "التحول الرقمي",
                correctMatch: "هـ"
            },
            {
                id: 35,
                item: "منصة مصر الرقمية",
                correctMatch: "ج"
            },
            {
                id: 36,
                item: "INSTAPAY",
                correctMatch: "و" // يتم تعيين قيمة فريدة
            },
            {
                id: 37,
                item: "أجهزة الاستشعار (Sensors)",
                correctMatch: "ز"
            },
            {
                id: 38,
                item: "إعادة التدوير",
                correctMatch: "ح"
            },
            {
                id: 39,
                item: "أدوات الدفع الإلكترونية",
                correctMatch: "ط"
            },
            {
                id: 40,
                item: "البطاريات",
                correctMatch: "ي"
            }
        ],
        
        // أسئلة القوائم المنسدلة (تبدأ من q41 لتجنب التداخل)
        dropdown: [
            {
                id: 41,
                question: "لتقليل نسبة الانبعاثات الضارة، تعمل السيارات الكهربائية بـ ........",
                options: ["-- اختر --",  "الوقود الأحفوري", "الديزل", "الطاقة الشمسية", "الغاز الطبيعي","البطاريات"],
                correctAnswer: "البطاريات"
            },
            {
                id: 42,
                question: "يُستخدم ........ في المركبات الكهربائية لتحسين كفاءة الطاقة في قطاع النقل.",
                options: ["-- اختر --", "الوقود التقليدي", "الاحتباس الحراري", "التلوث السمعي", "الزيوت المعدنية", "النقل الذكي"],
                correctAnswer: "النقل الذكي"
            },
            {
                id: 43,
                question: "يتم استخدام أجهزة ........ لاكتشاف دخان الحرائق أو وجود الأجسام.",
                options: ["-- اختر --", "الكمبيوتر", "البريد الإلكتروني", "المصابيح", "المؤقتات","الاستشعار" ],
                correctAnswer: "الاستشعار"
            },
            {
                id: 44,
                question: "تُعتبر أدوات ........ من أهم مكونات التحول الرقمي لتسهيل المعاملات المالية.",
                options: ["-- اختر --", "الكتابة اليدوية", "البريد الورقي", "الاجتماعات الشخصية", "الأرشيف الورقي","الدفع الإلكتروني"],
                correctAnswer: "الدفع الإلكتروني"
            },
            {
                id: 45,
                question: "........ هو المفهوم الذي يطلق على المؤسسات التي ترشد استهلاك مواردها.",
                options: ["-- اختر --",  "المباني التقليدية", "الاحتباس الحراري", "زيادة التلوث", "استهلاك الطاقة","المباني الخضراء"],
                correctAnswer: "المباني الخضراء"
            },
            {
                id: 46,
                question: "الهدف الرئيسي للتكنولوجيا الخضراء هو ........",
                options: ["-- اختر --", "تقليل التلوث", "زيادة التكاليف", "استهلاك الموارد", "إبطاء العمليات", "زيادة الانبعاثات"],
                correctAnswer: "تقليل التلوث"
            },
            {
                id: 47,
                question: "تطبيق يسمح بإرسال واستقبال النقود عبر المحافظ الإلكترونية ومعتمد من البنك المركزي.",
                options: ["-- اختر --", "INSTAPAY", "Zoom", "Google Meet", "Meeza", "Timers"],
                correctAnswer: "INSTAPAY"
            },
            {
                id: 48,
                question: "تُستخدم ........ في أنظمة الري الذكية للحفاظ على المياه.",
                options: ["-- اختر --","توربينات الرياح", "الألواح الشمسية",  "أجهزة الاستشعار", "البطاريات", "المصابيح العادية"],
                correctAnswer: "أجهزة الاستشعار"
            },
            {
                id: 49,
                question: "........ هو عملية دمج التكنولوجيا الرقمية في جميع جوانب العمل.",
                options: ["-- اختر --", "الأمن السيبراني", "التعلم الإلكتروني", "التحول الرقمي", "إدارة المشاريع"],
                correctAnswer: "التحول الرقمي"
            },
            {
                id: 50,
                question: "تساهم ........ في تقليل الاعتماد على الوقود الأحفوري.",
                options: ["-- اختر --","زيادة الاستهلاك" , "المصانع القديمة", "الطاقة البترولية", "السيارات الكهربائية", "قطع الأشجار"],
                correctAnswer: "السيارات الكهربائية"
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
        quizHTML += `
            <h2><i class="fas fa-link"></i> ثالثًا : صِل العمود (أ) بما يناسبه من العمود (ب) (10 درجات)</h2>
            <div class="matching-question"> 
                <div class="question-instruction"> 
                    <p>اسحب كل عنصر من العمود (أ) وضعه بجوار العنصر المناسب له في العمود (ب):</p> 
                </div> 
                
                <div class="matching-container"> 
                    <div class="column column-a"> 
                        <h3>العمود (أ)</h3> 
        `;
        
        questions.matching.forEach(q => {
            quizHTML += `<div class="draggable-item" data-correct="${q.correctMatch}" draggable="true" id="item${q.id}">${q.item}</div>`;
        });
        
        quizHTML += `
                    </div> 
                        
                    <div class="column column-b"> 
                        <h3>العمود (ب)</h3> 
                        <!-- تم عكس الترتيب هنا لتجنب الترتيب المتطابق -->
                        <div class="drop-target" data-value="ي">(ي) تستخدمها المركبات الكهربائية لتقليل الانبعاثات.</div>
                        <div class="drop-target" data-value="ط">(ط) تعتبر من أدوات التحول الرقمي.</div>
                        <div class="drop-target" data-value="ح">(ح) تساعد في الحفاظ على البيئة عن طريق معالجة المخلفات.</div>
                        <div class="drop-target" data-value="ز">(ز) أجهزة لاكتشاف وجود الأجسام والتحكم في تشغيل الأجهزة.</div>
                        <div class="drop-target" data-value="و">(و) تطبيق دفع معتمد من البنك المركزي.</div>
                        <div class="drop-target" data-value="ج">(ج) بوابة إلكترونية للخدمات الحكومية.</div>
                        <div class="drop-target" data-value="هـ">(هـ) دمج التكنولوجيا لتحسين كفاءة سير العمل.</div>
                        <div class="drop-target" data-value="أ">(أ) تساهم في الحفاظ على البيئة وترشيد الموارد.</div> 
                        <div class="drop-target" data-value="د">(د) تستخدم لتحويل ضوء الشمس إلى كهرباء.</div> 
                        <div class="drop-target" data-value="ب">(ب) تطبيق للمكالمات يمكن استخدامه للتواصل وجهًا لوجه.</div> 
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
