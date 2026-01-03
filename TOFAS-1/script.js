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
            question: '1. اختر البرنامج الذي يطبع الناتج <b>"Banana"</b>.',
            options: [
                { value: "0", text: 'let fruit = "Banana";\nconsole.log(fruit);' },
                { value: "1", text: 'let fruit > "Banana";\nconsole(fruit);' },
                { value: "2", text: 'console.log("Apple");' },
                { value: "3", text: 'fruit = "Banana";\nlog.console("fruit");' }
            ],
            correctAnswer: "0",
            note: "يجب تعريف المتغير وتعيين القيمة له، ثم طباعته باستخدام console.log."
        },
        {
            id: 2,
            question: '2. اختر البرنامج الذي يطبع:<br><b>Train<br>Bus</b>',
            options: [
                { value: "0", text: 'let vehicle = "Train";\nconsole.log(vehicle);' },
                { value: "1", text: 'console.log("Train Bus");' },
                { value: "2", text: 'let vehicle = "Train";\nconsole.log(vehicle);\nvehicle = "Bus";\nconsole.log(vehicle);' },
                { value: "3", text: 'let vehicle = "Train";\nvehicle = "Bus";\nconsole.log(vehicle);' }
            ],
            correctAnswer: "2",
            note: "يجب طباعة القيمة الأولى، ثم إعادة تعيين المتغير وطباعته مرة أخرى."
        },
        {
            id: 3,
            question: '3. اختر البرنامج الذي يطبع:<br><b>This is a current menu.<br>Curry rice<br>The menu will change.<br>Ramen</b>',
            options: [
                { value: "0", text: 'let menu = "Curry rice";\nconsole.log(menu);\nmenu = "Ramen";' },
                { value: "1", text: 'let menu = "Curry rice";\nconsole.log("This is a current menu.");\nconsole.log(menu);\nmenu = "Ramen";\nconsole.log("The menu will change.");\nconsole.log(menu);' },
                { value: "2", text: 'let menu = "Ramen";\nconsole.log("This is a current menu.");\nconsole.log(menu);' },
                { value: "3", text: 'console.log("Curry rice");\nconsole.log("Ramen");' }
            ],
            correctAnswer: "1",
            note: "الترتيب الصحيح هو تعريف القائمة، طباعتها، تغيير قيمتها، ثم طباعتها مجدداً."
        },
        {
            id: 4,
            question: '4. اختر البرنامج الذي يطبع الناتج <b>"Well done!"</b>.',
            options: [
                { value: "0", text: 'let score = 5;\nif (score == 10) {\n console.log("Well done!");\n}' },
                { value: "1", text: 'let score = 10;\nconsole.log(score);' },
                { value: "2", text: 'let score = 10;\nif (score > 20) {\n console.log("Well done!");\n}' },
                { value: "3", text: 'let score = 10;\nif (score == 10) {\n console.log("Well done!");\n}' }
            ],
            correctAnswer: "3",
            note: "المتغير score يساوي 10، والشرط يتحقق من المساواة بـ 10."
        },
        {
            id: 5,
            question: '5. اختر البرنامج الذي يطبع:<br><b>After 7 p.m., time sale discounts will apply.<br>400</b>',
            options: [
                { value: "0", text: 'let price = 500;\nlet time = 18;\nif(time > 19) {\n price = 400;\n}\nconsole.log(price);' },
                { value: "1", text: 'let price = 500;\nlet time = 21;\nif(time > 19) {\n console.log("After 7 p.m., time sale discounts will apply.");\n price = price - 100;\n}\nconsole.log(price);' },
                { value: "2", text: 'let price = 500;\nconsole.log(400);' },
                { value: "3", text: 'let price = 400;\nif(price == 500) {\n console.log("Discount");\n}' }
            ],
            correctAnswer: "1",
            note: "الوقت 21 أكبر من 19، لذا يتم تنفيذ الخصم وطباعة السعر الجديد."
        },
        {
            id: 6,
            question: '6. اختر البرنامج الذي يطبع:<br><b>You passed because the average score exceeded 80.</b>',
            options: [
                { value: "0", text: 'let jp = 90; let math = 100;\nlet avg = (jp+math)/2;\nif(avg > 80) {\n console.log("You passed because the average score exceeded 80.");\n}' },
                { value: "1", text: 'let avg = 70;\nif(avg > 80) {\n console.log("You passed...");\n}' },
                { value: "2", text: 'let avg = 95;\nconsole.log("You failed.");' },
                { value: "3", text: 'let jp = 50; let math = 50;\nif(jp+math > 80) {\n console.log("You passed...");\n}' }
            ],
            correctAnswer: "0",
            note: "متوسط 90 و 100 هو 95، وهو أكبر من 80 لذا يتحقق الشرط."
        },
        {
            id: 7,
            question: '7. اختر البرنامج الذي يطبع الناتج <b>"Good evening."</b>.',
            options: [
                { value: "0", text: 'let time = "Morning";\nif(time == "Morning"){\n console.log("Good morning.");\n} else {\n console.log("Good evening.");\n}' },
                { value: "1", text: 'console.log("Good" + " " + "morning.");' },
                { value: "2", text: 'let time = "Evening";\nif(time == "Morning"){\n console.log("Good morning.");\n} else if(time == "Afternoon"){\n console.log("Hello.");\n} else {\n console.log("Good evening.");\n}' },
                { value: "3", text: 'let time = "Evening";\nif(time == "Evening"){\n console.log("Hello.");\n}' }
            ],
            correctAnswer: "2",
            note: "قيمة المتغير لا تساوي Morning ولا Afternoon، لذا يتم تنفيذ جملة else."
        },
        {
            id: 8,
            question: '8. اختر البرنامج الذي يطبع الناتج <b>"Please stop."</b>.',
            options: [
                { value: "0", text: 'let signal = "Red";\nif(signal == "Red") {\n console.log("Please stop.");\n}' },
                { value: "1", text: 'let signal = "Blue";\nif(signal == "Red") {\n console.log("Please stop.");\n}' },
                { value: "2", text: 'let signal = "Red";\nif(signal != "Red") {\n console.log("Please stop.");\n}' },
                { value: "3", text: 'console.log("Please go.");' }
            ],
            correctAnswer: "0",
            note: "المتغير يساوي Red، والشرط يفحص المساواة بـ Red."
        },
        {
            id: 9,
            question: '9. اختر البرنامج الذي يطبع الناتج <b>"Different answer"</b>.',
            options: [
                { value: "0", text: 'let n1 = 1+2; let n2 = 3;\nif(n1 == n2) {\n console.log("Same answer");\n} else {\n console.log("Different answer");\n}' },
                { value: "1", text: 'console.log("Same answer");' },
                { value: "2", text: 'let n1 = 5; let n2 = 5;\nif(n1 == n2) {\n console.log("Different answer");\n}' },
                { value: "3", text: 'let n1 = 1+2; let n2 = 4-2;\nif(n1 == n2) {\n console.log("Same answer");\n} else {\n console.log("Different answer");\n}' }
            ],
            correctAnswer: "3",
            note: "العملية الأولى ناتجها 3 والثانية ناتجها 2، لذا الشرط خاطئ وينفذ else."
        },
        {
            id: 10,
            question: '10. اختر البرنامج الذي يطبع الناتج <b>"That will be 200 yen."</b>.',
            options: [
                { value: "0", text: 'let order = "Apple";\nif(order == "Apple") {\n console.log("That will be 250 yen.");\n}' },
                { value: "1", text: 'let order = "Orange";\nif(order == "Apple") {\n console.log("250");\n} else if(order == "Orange") {\n console.log("That will be 200 yen.");\n}' },
                { value: "2", text: 'console.log("That will be 100 yen.");' },
                { value: "3", text: 'let order = "Grape";\nif(order == "Orange") {\n console.log("That will be 200 yen.");\n}' }
            ],
            correctAnswer: "1",
            note: "قيمة الطلب Orange، لذا يتحقق الشرط الثاني else if."
        },
        {
            id: 11,
            question: '11. اختر البرنامج الذي يطبع:<br><b>Remaining quantity...<br>4</b>',
            options: [
                { value: "0", text: 'let sold = 4; let target = 8;\nif(sold < target) {\n console.log("Remaining quantity...");\n console.log(target - sold);\n}' },
                { value: "1", text: 'let sold = 8; let target = 8;\nif(sold == target) {\n console.log("Goal achieved");\n}' },
                { value: "2", text: 'let sold = 4;\nconsole.log(sold);' },
                { value: "3", text: 'let sold = 10; let target = 8;\nif(sold > target) {\n console.log(4);\n}' }
            ],
            correctAnswer: "0",
            note: "المباع أقل من المستهدف، والعملية الحسابية هي 8 - 4 = 4."
        },
        {
            id: 12,
            question: '12. اختر البرنامج الذي يطبع الناتج <b>"Shipping is 2,000 yen."</b>.',
            options: [
                { value: "0", text: 'let w = 5;\nif(w < 10) {\n console.log("Shipping is 1,000 yen.");\n}' },
                { value: "1", text: 'let w = 25;\nif(w < 20) {\n console.log("Shipping is 2,000 yen.");\n}' },
                { value: "2", text: 'let w = 13;\nif(w < 10) {\n console.log("1000");\n} else if(w < 20) {\n console.log("Shipping is 2,000 yen.");\n}' },
                { value: "3", text: 'let w = 13;\nconsole.log("Shipping is 500 yen.");' }
            ],
            correctAnswer: "2",
            note: "الوزن 13 ليس أقل من 10، لكنه أقل من 20 فيتحقق الشرط الثاني."
        },
        {
            id: 13,
            question: '13. اختر البرنامج الذي يطبع الناتج <b>"Total: 150"</b>.',
            options: [
                { value: "0", text: 'let x = 100; let y = 50;\nconsole.log("Total: " + x);' },
                { value: "1", text: 'let x = 100; let y = 50;\nconsole.log("Total: " + (x + y));' },
                { value: "2", text: 'let x = 100; let y = 50;\nconsole.log("Total: 150");' },
                { value: "3", text: 'console.log(150);' }
            ],
            correctAnswer: "1",
            note: "يجب جمع المتغيرين x و y داخل الأقواس قبل دمجهما مع النص."
        },
        {
            id: 14,
            question: '14. اختر البرنامج الذي يطبع الناتج <b>"You can vote."</b>.',
            options: [
                { value: "0", text: 'let age = 16;\nif(age >= 18) {\n console.log("You can vote.");\n}' },
                { value: "1", text: 'let age = 10;\nconsole.log("You can vote.");' },
                { value: "2", text: 'let age = 18;\nif(age < 18) {\n console.log("You can vote.");\n}' },
                { value: "3", text: 'let age = 20;\nif(age >= 18) {\n console.log("You can vote.");\n}' }
            ],
            correctAnswer: "3",
            note: "العمر 20 أكبر من أو يساوي 18، لذا يتحقق شرط التصويت."
        },
        {
            id: 15,
            question: '15. اختر البرنامج الذي يطبع الناتج <b>"1020"</b> (كنص وليس جمع حسابي).',
            options: [
                { value: "0", text: 'let a = "10"; let b = "20";\nconsole.log(a + b);' },
                { value: "1", text: 'let a = 10; let b = 20;\nconsole.log(a + b);' },
                { value: "2", text: 'console.log(10 + 20);' },
                { value: "3", text: 'let a = 10; let b = 20;\nconsole.log(b - a);' }
            ],
            correctAnswer: "0",
            note: "عند جمع النصوص (String) يتم دمجها بجانب بعضها بدلاً من جمعها رياضياً."
        },
        {
            id: 16,
            question: '16. اختر البرنامج الذي يطبع الناتج <b>"Access Granted"</b>.',
            options: [
                { value: "0", text: 'let pass = "1234";\nif(pass == "0000") {\n console.log("Access Granted");\n}' },
                { value: "1", text: 'let pass = "admin";\nif(pass == "admin") {\n console.log("Access Granted");\n}' },
                { value: "2", text: 'let pass = "user";\nconsole.log("Access Denied");' },
                { value: "3", text: 'if(false) {\n console.log("Access Granted");\n}' }
            ],
            correctAnswer: "1",
            note: "قيمة كلمة المرور مطابقة للشرط المطلوب."
        },
        {
            id: 17,
            question: '17. اختر البرنامج الذي يطبع الناتج <b>"Final value: 0"</b>.',
            options: [
                { value: "0", text: 'let x = 0;\nx = x + 10;\nconsole.log("Final value: " + x);' },
                { value: "1", text: 'let x = 10;\nconsole.log(0);' },
                { value: "2", text: 'let x = 10;\nx = x - 10;\nconsole.log("Final value: " + x);' },
                { value: "3", text: 'console.log("Final value: 10");' }
            ],
            correctAnswer: "2",
            note: "بدأ المتغير بـ 10 ثم طرحنا منه 10 فأصبح الناتج 0."
        },
        {
            id: 18,
            question: '18. اختر البرنامج الذي يطبع الناتج <b>"Positive Number"</b>.',
            options: [
                { value: "0", text: 'let num = -5;\nif(num > 0) {\n console.log("Positive Number");\n}' },
                { value: "1", text: 'let num = 0;\nif(num > 0) {\n console.log("Positive Number");\n}' },
                { value: "2", text: 'let num = 10;\nif(num < 0) {\n console.log("Positive Number");\n}' },
                { value: "3", text: 'let num = 10;\nif(num > 0) {\n console.log("Positive Number");\n}' }
            ],
            correctAnswer: "3",
            note: "الرقم 10 أكبر من الصفر، لذا يتحقق الشرط."
        },
        {
            id: 19,
            question: '19. اختر البرنامج الذي يطبع الناتج <b>"Welcome Guest"</b>.',
            options: [
                { value: "0", text: 'let user = "Visitor";\nif(user == "Admin") {\n console.log("Welcome Admin");\n} else {\n console.log("Welcome Guest");\n}' },
                { value: "1", text: 'let user = "Admin";\nif(user == "Admin") {\n console.log("Welcome Admin");\n} else {\n console.log("Welcome Guest");\n}' },
                { value: "2", text: 'let user = "Guest";\nconsole.log("Welcome");' },
                { value: "3", text: 'console.log("Guest");' }
            ],
            correctAnswer: "0",
            note: "المستخدم ليس Admin، لذا يذهب البرنامج للخيار البديل else."
        },
        {
            id: 20,
            question: '20. اختر البرنامج الذي يطبع الناتج <b>"Level 2"</b>.',
            options: [
                { value: "0", text: 'let points = 40;\nif(points >= 50) {\n console.log("Level 2");\n} else {\n console.log("Level 1");\n}' },
                { value: "1", text: 'let points = 60;\nif(points >= 50) {\n console.log("Level 2");\n} else {\n console.log("Level 1");\n}' },
                { value: "2", text: 'let points = 60;\nif(points < 50) {\n console.log("Level 2");\n}' },
                { value: "3", text: 'console.log("Level 1");' }
            ],
            correctAnswer: "1",
            note: "النقاط 60 أكبر من 50، لذا يتحقق الشرط ويطبع Level 2."
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
