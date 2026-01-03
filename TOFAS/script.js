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
        trueFalse: [],
        multipleChoice: [
            {
                id: 1,
                question: '1. اختر البرنامج الذي يطبع الناتج "مرحباً بكم".',
                options: [
                    { value: "0", text: 'let msg = "مرحباً بكم";\n(msg);' }, // خطأ
                    { value: "1", text: 'let msg = "مرحباً بكم";\nconsole.log(msg);' }, // ✅ صحيح
                    { value: "2", text: 'let msg "مرحباً بكم";\nconsole.log(msg);' }, // خطأ
                    { value: "3", text: 'let msg = "مرحباً بكم";\nlog.console(msg);' } // خطأ
                ],
                correctAnswer: "1",
                note: "يجب استخدام console.log() للطباعة وتعريف المتغير بـ =."
            },
            {
                id: 2,
                question: '2. اختر البرنامج الذي يطبع "العدد زوجي" إذا كان الرقم 10.',
                options: [
                    { value: "0", text: 'let num = 10;\nif (num % 2 = 0) {\n  console.log("العدد زوجي");\n}' }, // خطأ
                    { value: "1", text: 'let num 10;\nif (num % 2 == 0) {\n  console.log("العدد زوجي");\n}' }, // خطأ
                    { value: "2", text: 'let num = 10;\nif (num % 2 == 0) {\n  console.log("العدد زوجي");\n}' }, // ✅ صحيح
                    { value: "3", text: 'let num = 10;\nif (num % 2 == 0) {\n  "العدد زوجي";\n}' } // خطأ
                ],
                correctAnswer: "2",
                note: "الشرط الصحيح للمقارنة هو ==، و = للتعيين."
            },
            {
                id: 3,
                question: '3. اختر البرنامج الذي يطبع "نجاح" إذا كانت الدرجة 50 أو أكثر.',
                options: [
                    { value: "0", text: 'let score = 50;\nif (score >= 50) {\n  console.log("نجاح");\n}' }, // ✅ صحيح
                    { value: "1", text: 'let score = 50;\nif (score > 50) {\n  console.log("نجاح");\n}' }, // خطأ
                    { value: "2", text: 'let score = 50;\nif score >= 50 {\n  console.log("نجاح");\n}' }, // خطأ
                    { value: "3", text: 'let score = 50;\nif (score >= 50)\n  console.log("نجاح");\n}' } // خطأ
                ],
                correctAnswer: "0",
                note: "يجب استخدام >= لتشمل الرقم 50، والتأكد من الأقواس."
            },
            {
                id: 4,
                question: '4. المطلوب طباعة: "السعر مرتفع". السعر الحالي 100.',
                options: [
                    { value: "0", text: 'let price 100;\nif (price == 100) {\n  console.log("السعر مرتفع");\n}' }, // خطأ
                    { value: "1", text: 'let price = 100;\nif (price = 100) {\n  console.log("السعر مرتفع");\n}' }, // خطأ
                    { value: "2", text: 'let price = 100;\nif (price == 100) {\n  "السعر مرتفع";\n}' }, // خطأ
                    { value: "3", text: 'let price = 100;\nif (price == 100) {\n  console.log("السعر مرتفع");\n}' } // ✅ صحيح
                ],
                correctAnswer: "3",
                note: "انتبه للفرق بين = (تعيين) و == (مقارنة) في الشرط."
            },
            {
                id: 5,
                question: '5. اختر الكود الذي يطبع "مرحباً أحمد".',
                options: [
                    { value: "0", text: 'let name "أحمد";\nconsole.log("مرحباً " + name);' }, // خطأ
                    { value: "1", text: 'let name = "أحمد";\nconsole.log("مرحباً " + name);' }, // ✅ صحيح
                    { value: "2", text: 'let name = "أحمد";\n("مرحباً " + name);' }, // خطأ
                    { value: "3", text: 'let name = "أحمد";\nconsole.log "مرحباً " + name;' } // خطأ
                ],
                correctAnswer: "1",
                note: "دمج النصوص يتطلب علامة + وأمر الطباعة الصحيح."
            },
            {
                id: 6,
                question: '6. رصيدك 5 جنيهات. المطلوب طباعة "شراء حلوى" إذا كان الرصيد يكفي (السعر 3).',
                options: [
                    { value: "0", text: 'let bal = 5;\nif (bal < 3) {\n  console.log("شراء حلوى");\n}' }, // خطأ
                    { value: "1", text: 'let bal 5;\nif (bal > 3) {\n  console.log("شراء حلوى");\n}' }, // خطأ
                    { value: "2", text: 'let bal = 5;\nif (bal > 3) {\n  console.log("شراء حلوى");\n}' }, // ✅ صحيح
                    { value: "3", text: 'let bal = 5;\nif (bal > 3)\n  console.log("شراء حلوى");\n}' } // خطأ
                ],
                correctAnswer: "2",
                note: "5 أكبر من 3، لذا نستخدم >."
            },
            {
                id: 7,
                question: '7. اختر البرنامج الذي يطبع "توقف" للإشارة الحمراء.',
                options: [
                    { value: "0", text: 'let light = "أحمر";\nif (light = "أحمر") {\n  console.log("توقف");\n}' }, // خطأ
                    { value: "1", text: 'let light = "أحمر";\nif (light == "أحمر") {\n  "توقف";\n}' }, // خطأ
                    { value: "2", text: 'let light "أحمر";\nif (light == "أحمر") {\n  console.log("توقف");\n}' }, // خطأ
                    { value: "3", text: 'let light = "أحمر";\nif (light == "أحمر") {\n  console.log("توقف");\n}' } // ✅ صحيح
                ],
                correctAnswer: "3",
                note: "المقارنة الصحيحة بـ ==، ويجب وجود أمر الطباعة."
            },
            {
                id: 8,
                question: '8. المطلوب طباعة "الرقم 5". لديك x=2 و y=3.',
                options: [
                    { value: "0", text: '("الرقم " + (x + y));' }, // خطأ
                    { value: "1", text: 'console.log("الرقم " + (x + y));' }, // ✅ صحيح
                    { value: "2", text: 'let x 2; let y 3;\nconsole.log(...);' }, // خطأ
                    { value: "3", text: 'console.log("الرقم " + x * y);' } // خطأ
                ],
                correctAnswer: "1",
                note: "يجب جمع الأرقام (x+y) داخل أقواس ثم دمجها مع النص."
            },
            {
                id: 9,
                question: '9. اختر الكود الذي يطبع "صباح الخير" فقط إذا كانت الساعة 9.',
                options: [
                    { value: "0", text: 'let hour = 9;\nif (hour = 9) {\n  console.log("صباح الخير");\n}' }, // خطأ
                    { value: "1", text: 'let hour 9;\nif (hour == 9) {\n  console.log("صباح الخير");\n}' }, // خطأ
                    { value: "2", text: 'let hour = 9;\nif (hour == 9) {\n  "صباح الخير";\n}' }, // خطأ
                    { value: "3", text: 'let hour = 9;\nif (hour == 9) {\n  console.log("صباح الخير");\n}' } // ✅ صحيح
                ],
                correctAnswer: "3",
                note: "الخطأ الشائع هو نسيان == في الشرط."
            },
            {
                id: 10,
                question: '10. اختر البرنامج الذي يطبع "غير مسموح" (العمر 15، السن المطلوب 18).',
                options: [
                    { value: "0", text: 'let age = 15;\nif (age < 18) {\n  console.log("غير مسموح");\n}' }, // ✅ صحيح
                    { value: "1", text: 'let age = 15;\nif (age > 18) {\n  console.log("غير مسموح");\n}' }, // خطأ
                    { value: "2", text: 'let age 15;\nif (age < 18) {\n  console.log("غير مسموح");\n}' }, // خطأ
                    { value: "3", text: 'let age = 15;\nif (age < 18)\n  console.log("غير مسموح");\n}' } // خطأ
                ],
                correctAnswer: "0",
                note: "15 أقل من 18، لذا نستخدم <."
            },
            {
                id: 11,
                question: '11. المطلوب طباعة "اللون أزرق".',
                options: [
                    { value: "0", text: 'let c = "أزرق";\nif (c == "أزرق") {\n  "اللون أزرق";\n}' }, // خطأ
                    { value: "1", text: 'let c = "أزرق";\nif (c = "أزرق") {\n  console.log("اللون أزرق");\n}' }, // خطأ
                    { value: "2", text: 'let c = "أزرق";\nif (c == "أزرق") {\n  console.log("اللون أزرق");\n}' }, // ✅ صحيح
                    { value: "3", text: 'let c "أزرق";\nif (c == "أزرق") {\n  console.log("اللون أزرق");\n}' } // خطأ
                ],
                correctAnswer: "2",
                note: "تأكد من تعريف المتغير بشكل صحيح ومقارنته بـ ==."
            },
            {
                id: 12,
                question: '12. اختر الكود الذي يطبع "نهاية الأسبوع" إذا كان اليوم الجمعة.',
                options: [
                    { value: "0", text: 'let d = "الجمعة";\nif (d == "الجمعة") (\n  console.log("نهاية الأسبوع");\n)' }, // خطأ
                    { value: "1", text: 'let d = "الجمعة";\nif (d == "الجمعة") {\n  console.log("نهاية الأسبوع");\n}' }, // ✅ صحيح
                    { value: "2", text: 'let d 5;\nif (d == "الجمعة") { ... }' }, // خطأ
                    { value: "3", text: 'let d = "الجمعة";\nif (d == "الجمعة") {\n  "نهاية الأسبوع";\n}' } // خطأ
                ],
                correctAnswer: "1",
                note: "يجب استخدام الأقواس {} لتغليف كود الطباعة."
            },
            {
                id: 13,
                question: '13. اختر البرنامج الذي يطبع "تم التحميل" (النسبة 100).',
                options: [
                    { value: "0", text: 'let load = 100;\nif (load > 100) {\n  console.log("تم التحميل");\n}' }, // خطأ
                    { value: "1", text: 'let load = 100;\nif (load = 100) {\n  console.log("تم التحميل");\n}' }, // خطأ
                    { value: "2", text: 'let load 100;\nif (load == 100) {\n  console.log("تم التحميل");\n}' }, // خطأ
                    { value: "3", text: 'let load = 100;\nif (load == 100) {\n  console.log("تم التحميل");\n}' } // ✅ صحيح
                ],
                correctAnswer: "3",
                note: "100 تساوي 100، لذا == هي الصحيحة."
            },
            {
                id: 14,
                question: '14. المطلوب طباعة "الفائز هو: علي".',
                options: [
                    { value: "0", text: 'let w = "علي";\nconsole.log("الفائز هو: " - w);' }, // خطأ
                    { value: "1", text: 'let w = "علي";\n("الفائز هو: " + w);' }, // خطأ
                    { value: "2", text: 'let w "علي";\nconsole.log("الفائز هو: " + w);' }, // خطأ
                    { value: "3", text: 'let w = "علي";\nconsole.log("الفائز هو: " + w);' } // ✅ صحيح
                ],
                correctAnswer: "3",
                note: "دمج النصوص يتم بعلامة +."
            },
            {
                id: 15,
                question: '15. اختر الكود الذي يطبع "درجة كاملة" (10/10).',
                options: [
                    { value: "0", text: 'let g = 10;\nif (g == 10) {\n  "درجة كاملة";\n}' }, // خطأ
                    { value: "1", text: 'let g = 10;\nif (g = 10) {\n  console.log("درجة كاملة");\n}' }, // خطأ
                    { value: "2", text: 'let g = 10;\nif (g == 10) {\n  console.log("درجة كاملة");\n}' }, // ✅ صحيح
                    { value: "3", text: 'let g 10;\nif (g == 10) {\n  console.log("درجة كاملة");\n}' } // خطأ
                ],
                correctAnswer: "2",
                note: "انتبه لعلامة المساواة == في الشرط."
            },
            {
                id: 16,
                question: '16. اختر البرنامج الذي يطبع "السرعة عالية" (السرعة 120، الحد 100).',
                options: [
                    { value: "0", text: 'let s = 120;\nif (s > 100) {\n  console.log("السرعة عالية");\n}' }, // ✅ صحيح
                    { value: "1", text: 'let s = 120;\nif (s < 100) {\n  console.log("السرعة عالية");\n}' }, // خطأ
                    { value: "2", text: 'let s = 120;\nif (s > 100) {\n  "السرعة عالية";\n}' }, // خطأ
                    { value: "3", text: 'let s 120;\nif (s > 100) {\n  console.log("السرعة عالية");\n}' } // خطأ
                ],
                correctAnswer: "0",
                note: "120 أكبر من 100."
            },
            {
                id: 17,
                question: '17. المطلوب طباعة "مرحباً".',
                options: [
                    { value: "0", text: '("مرحباً");' }, // خطأ
                    { value: "1", text: 'log.console("مرحباً");' }, // خطأ
                    { value: "2", text: 'console.log("مرحباً");' }, // ✅ صحيح
                    { value: "3", text: 'print("مرحباً");' } // خطأ
                ],
                correctAnswer: "2",
                note: "الأمر الصحيح هو console.log()."
            },
            {
                id: 18,
                question: '18. اختر البرنامج الذي يطبع "يمكنك التصويت" (العمر 20، الحد 18).',
                options: [
                    { value: "0", text: 'let age = 20;\nif (age = 18) {\n  console.log("يمكنك التصويت");\n}' }, // خطأ
                    { value: "1", text: 'let age = 20;\nif (age >= 18) {\n  "يمكنك التصويت";\n}' }, // خطأ
                    { value: "2", text: 'let age 20;\nif (age >= 18) { ... }' }, // خطأ
                    { value: "3", text: 'let age = 20;\nif (age >= 18) {\n  console.log("يمكنك التصويت");\n}' } // ✅ صحيح
                ],
                correctAnswer: "3",
                note: "استخدام >= لأن العمر أكبر من الحد."
            },
            {
                id: 19,
                question: '19. المطلوب طباعة "حساب جديد".',
                options: [
                    { value: "0", text: 'console.log("حساب جديد");' }, // ✅ صحيح
                    { value: "1", text: '"حساب جديد";' }, // خطأ
                    { value: "2", text: 'console("حساب جديد");' }, // خطأ
                    { value: "3", text: 'let msg "حساب جديد";\nconsole.log(msg);' } // خطأ
                ],
                correctAnswer: "0",
                note: "يجب كتابة console.log كاملة."
            },
            {
                id: 20,
                question: '20. اختر الكود الذي يطبع "فشل" إذا كانت الدرجة أقل من 50.',
                options: [
                    { value: "0", text: 'let m = 40;\nif (m > 50) {\n  console.log("فشل");\n}' }, // خطأ
                    { value: "1", text: 'let m = 40;\nif (m < 50) {\n  console.log("فشل");\n}' }, // ✅ صحيح
                    { value: "2", text: 'let m = 40;\nif (m < 50) {\n  "فشل";\n}' }, // خطأ
                    { value: "3", text: 'let m = 40;\nif (m < 50)\n  console.log("فشل");\n}' } // خطأ
                ],
                correctAnswer: "1",
                note: "40 أقل من 50، لذا نستخدم <."
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
