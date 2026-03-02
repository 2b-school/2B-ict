// 1. مصفوفة الأسئلة (20 سؤال VB.NET)
const globalQuizzes = [
    {
        id: 1,
        name: "اختبار أساسيات VB.NET 💻",
        questions: [
            { text: "ما وظيفة أداة Label في VB.NET؟", options: ["إدخال بيانات من المستخدم", "عرض نص فقط", "تنفيذ كود برمجي", "حفظ البيانات"], correctIndex: 1 },
            { text: "الأداة المستخدمة لإدخال البيانات من المستخدم هي:", options: ["Button", "Label", "TextBox", "PictureBox"], correctIndex: 2 },
            { text: "الحدث الذي يتم تنفيذه عند الضغط على زر هو:", options: ["TextChanged", "Click", "Load", "KeyPress"], correctIndex: 1 },
            { text: "لإعلان متغير رقمي صحيح نستخدم:", options: ["Dim x As String", "Dim x As Integer", "Dim x As Boolean", "Dim x As Char"], correctIndex: 1 },
            { text: "أي من التالي يمثل عملية جمع صحيحة في VB؟", options: ["x = 5 & 3", "x = 5 + 3", "x = 5 /", "x = + 5 3"], correctIndex: 1 },
            { text: "لتحويل النص داخل TextBox إلى رقم نستخدم:", options: ["ToString()", "Val()", "Print()", "Input()"], correctIndex: 1 },
            { text: "عند استخدام الجملة الشرطية If يجب أن تنتهي بـ:", options: ["End", "Finish", "End If", "Stop"], correctIndex: 2 },
            { text: "أي أداة تستخدم لعرض الصور؟", options: ["TextBox", "Label", "PictureBox", "GroupBox"], correctIndex: 2 },
            { text: "الخاصية المسؤولة عن تغيير نص الزر هي:", options: ["Name", "Text", "Size", "Location"], correctIndex: 1 },
            { text: "عند تشغيل البرنامج يتم تنفيذ حدث:", options: ["Form_Click", "Form_Load", "Form_Close", "Form_Run"], correctIndex: 1 },
            { text: "نوع البيانات المستخدم لتخزين القيم النصية هو:", options: ["Integer", "Double", "Boolean", "String"], correctIndex: 3 },
            { text: "الجملة التالية صحيحة للمقارنة:", options: ["If x = 5 Then", "If x == 5 Then", "If x := 5", "If x <>"], correctIndex: 0 },
            { text: "علامة أكبر من في VB هي:", options: ["=>", ">", ">=<", "<>"], correctIndex: 1 },
            { text: "لحذف النص من TextBox نكتب:", options: ["TextBox1.Text = \"\"", "Delete TextBox1", "Remove TextBox1", "TextBox1.ClearAll"], correctIndex: 0 },
            { text: "عند جمع رقمين داخل TextBox يجب أولًا:", options: ["تغيير لون الفورم", "تحويل النص إلى رقم", "تكبير الخط", "إخفاء الزر"], correctIndex: 1 },
            { text: "أي جملة تستخدم لعرض رسالة للمستخدم؟", options: ["Show()", "MsgBox()", "Print()", "Display()"], correctIndex: 1 },
            { text: "الرمز المستخدم للربط بين النصوص هو:", options: ["+", "&", "*", "/"], correctIndex: 1 },
            { text: "Dim x As Integer = 10 تعني:", options: ["إنشاء زر", "إنشاء متغير رقمي بقيمة 10", "طباعة الرقم 10", "حذف المتغير"], correctIndex: 1 },
            { text: "جملة Else تستخدم عندما يكون:", options: ["الشرط صحيح", "الشرط خطأ", "عند الضغط على زر", "عند تشغيل البرنامج"], correctIndex: 1 },
            { text: "لإيقاف البرنامج نستخدم:", options: ["Stop", "End", "Exit", "CloseAll"], correctIndex: 1 }
        ]
    },
    {
        id: 2,
        name: "تحدي الثقافة العامة 🌍",
        questions: [
            { 
                text: "ما هي عاصمة جمهورية مصر العربية؟", 
                options: ["الإسكندرية", "القاهرة", "الجيزة", "أسوان"], 
                correctIndex: 1 
            },
            { 
                text: "ما هو أكبر كوكب في المجموعة الشمسية؟", 
                options: ["المريخ", "الأرض", "المشتري", "زحل"], 
                correctIndex: 2 
            },
            { 
                text: "كم عدد قارات العالم؟", 
                options: ["5", "6", "7", "8"], 
                correctIndex: 2 
            }
        ]
    },
    {
        id: 3,
        name: "اختبار العلوم الممتع 🧪",
        questions: [
            { 
                text: "ما هو الرمز الكيميائي للماء؟", 
                options: ["CO2", "O2", "H2O", "NaCl"], 
                correctIndex: 2 
            },
            { 
                text: "ما هو العضو المسؤول عن ضخ الدم في الجسم؟", 
                options: ["الرئة", "القلب", "الكبد", "المعدة"], 
                correctIndex: 1 
            }
        ]
    },
    {
        id: 4, // يمكنك تغيير الرقم حسب ترتيب الاختبارات لديك
        name: "تحدي بايثون (مستوى متقدم) 🐍",
        questions: [
            { text: "ناتج التنفيذ: print('3 + 2')", options: ["5", "3 + 2", "خطأ", "32"], correctIndex: 1 },
            { text: "أي سطر يطبع الرقم 10 وليس نص '10' ؟", options: ["print('10')", "print(10)", "print(\"10\")", "كل ما سبق"], correctIndex: 1 },
            { text: "إذا كان a=4 و b=2، فما ناتج: print(a ** b)", options: ["6", "8", "16", "12"], correctIndex: 2 },
            { text: "ما هو ناتج: print(7 // 2)", options: ["3.5", "4", "3", "2"], correctIndex: 2 },
            { text: "ما هو ناتج: print(7 % 2)", options: ["1", "2", "3", "0"], correctIndex: 0 },
            { text: "ما ناتج: print(2 + 3 * 4)", options: ["20", "14", "24", "10"], correctIndex: 1 },
            { text: "ما ناتج: print((2 + 3) * 4)", options: ["14", "20", "24", "10"], correctIndex: 2 },
            { text: "أي العمليات التالية لها أعلى أولوية تنفيذ؟", options: ["+", "//", "**", "%"], correctIndex: 2 },
            { text: "ما ناتج: print(3 ** 2 ** 2)", options: ["81", "36", "18", "9"], correctIndex: 0 },
            { text: "ما ناتج: print(10 // 3 * 2)", options: ["6.66", "6", "4", "8"], correctIndex: 1 },
            { text: "ما ناتج: print(10 // (3 * 2))", options: ["1", "2", "3", "0"], correctIndex: 0 },
            { text: "إذا كان x=5، فما ناتج: print(x + x * x)", options: ["30", "50", "25", "15"], correctIndex: 0 },
            { text: "أي كود مما يلي يعطي ناتج 1 ؟", options: ["print(5 % 5)", "print(6 % 5)", "print(4 // 5)", "print(2 % 4)"], correctIndex: 1 },
            { text: "ما ناتج: print(2 * 2 ** 3)", options: ["64", "32", "16", "8"], correctIndex: 2 },
            { text: "أي كود ينتج 0 ؟", options: ["print(4 % 2)", "print(4 // 2)", "print(2 ** 0)", "print(2 % 4)"], correctIndex: 0 },
            { text: "ما ناتج: print(9 // 4 + 1)", options: ["3.25", "3", "2", "4"], correctIndex: 1 },
            { text: "ما الخطأ في الكود: print 'Hello'", options: ["لا يوجد خطأ", "يجب حذف Hello", "يجب استخدام أقواس", "يجب إضافة فاصلة"], correctIndex: 2 },
            { text: "إذا كان a=2, b=3, c=4 فما ناتج: print(a + b * c ** 2)", options: ["50", "26", "20", "14"], correctIndex: 0 },
            { text: "أي تعبير يعطي نفس نتيجة: print(17 % 5)", options: ["باقي قسمة 17 ÷ 5", "ناتج قسمة 17 ÷ 5", "حاصل ضرب 17 × 5", "مربع 5"], correctIndex: 0 },
            { text: "إذا كان x=3، فما ناتج: print(x ** 2 // 2)", options: ["4.5", "3", "4", "5"], correctIndex: 2 }
        ]
    },
    {
        id: 5, // يمكنك تعديل الرقم حسب ترتيب اختباراتك
        name: "بنك المعلومات الشامل 🌍💡",
        questions: [
            // 🌎 جغرافيا
            { text: "ما عاصمة مصر؟", options: ["الإسكندرية", "القاهرة", "الجيزة", "أسوان"], correctIndex: 1 },
            { text: "أطول نهر في العالم هو:", options: ["الأمازون", "النيل", "الفرات", "المسيسيبي"], correctIndex: 1 },
            { text: "أكبر قارة في العالم:", options: ["أفريقيا", "أوروبا", "آسيا", "أستراليا"], correctIndex: 2 },
            { text: "الدولة التي تُسمى بلد المليون شهيد:", options: ["المغرب", "الجزائر", "تونس", "ليبيا"], correctIndex: 1 },
            { text: "البحر الذي لا يحتوي على أسماك:", options: ["الأحمر", "الميت", "المتوسط", "العرب"], correctIndex: 1 },
            
            // 🔬 علوم
            { text: "الكوكب الأقرب للشمس:", options: ["الزهرة", "عطارد", "الأرض", "المريخ"], correctIndex: 1 },
            { text: "الجهاز المسؤول عن التنفس:", options: ["الهضمي", "الدوري", "التنفسي", "العصبي"], correctIndex: 2 },
            { text: "المادة التي يحتاجها النبات للبناء الضوئي:", options: ["الأكسجين", "ثاني أكسيد الكربون", "النيتروجين", "الهيدروجين"], correctIndex: 1 },
            { text: "وحدة قياس القوة:", options: ["متر", "جول", "نيوتن", "وات"], correctIndex: 2 },
            { text: "العضو الذي يضخ الدم:", options: ["الرئة", "القلب", "الكبد", "المعدة"], correctIndex: 1 },
            
            // 📜 تاريخ
            { text: "بُنيت الأهرامات في عصر:", options: ["الرومان", "الفراعنة", "العباسيين", "العثمانيين"], correctIndex: 1 },
            { text: "أول من استخدم الورق:", options: ["المصريون", "الرومان", "الصينيون", "الهنود"], correctIndex: 2 },
            { text: "القائد الذي فتح مصر:", options: ["خالد بن الوليد", "عمرو بن العاص", "سعد بن أبي وقاص", "طارق بن زياد"], correctIndex: 1 },
            { text: "الحرب العالمية الثانية انتهت عام:", options: ["1940", "1945", "1939", "1950"], correctIndex: 1 },
            { text: "أول حضارة عرفت الكتابة:", options: ["الفرعونية", "السومرية", "اليونانية", "الفارسية"], correctIndex: 1 },
            
            // ☪️ معلومات دينية
            { text: "عدد أركان الإسلام:", options: ["3", "4", "5", "6"], correctIndex: 2 },
            { text: "أول سورة في القرآن:", options: ["البقرة", "الفاتحة", "الناس", "الكهف"], correctIndex: 1 },
            { text: "النبي الذي ابتلعه الحوت:", options: ["موسى", "يونس", "يوسف", "إبراهيم"], correctIndex: 1 },
            { text: "عدد الصلوات المفروضة:", options: ["3", "4", "5", "6"], correctIndex: 2 },
            { text: "ليلة القدر تكون في:", options: ["شوال", "رمضان", "شعبان", "رجب"], correctIndex: 1 },
            
            // ⚽ رياضة
            { text: "عدد لاعبي فريق كرة القدم داخل الملعب:", options: ["9", "10", "11", "12"], correctIndex: 2 },
            { text: "اللعبة التي تستخدم المضرب والكرة الصفراء:", options: ["تنس", "سلة", "يد", "طائرة"], correctIndex: 0 },
            { text: "كأس العالم يُقام كل:", options: ["سنتين", "3 سنوات", "4 سنوات", "5 سنوات"], correctIndex: 2 },
            { text: "الرياضة التي يُستخدم فيها حوض سباحة:", options: ["الجمباز", "السباحة", "الجودو", "الملاكمة"], correctIndex: 1 },
            { text: "عدد أشواط مباراة كرة القدم:", options: ["شوط", "2", "3", "4"], correctIndex: 1 },
            
            // 💻 تكنولوجيا
            { text: "عقل الكمبيوتر يسمى:", options: ["الشاشة", "المعالج", "الفأرة", "الطابعة"], correctIndex: 1 },
            { text: "اختصار CPU يعني:", options: ["وحدة التخزين", "وحدة المعالجة المركزية", "وحدة الإدخال", "وحدة العرض"], correctIndex: 1 },
            { text: "البرنامج المستخدم لكتابة النصوص:", options: ["الرسام", "الوورد", "المتصفح", "الكاميرا"], correctIndex: 1 },
            { text: "وحدة قياس حجم الملفات:", options: ["متر", "لتر", "بايت", "ثانية"], correctIndex: 2 },
            { text: "الجهاز الذي يُدخل البيانات:", options: ["الشاشة", "الطابعة", "لوحة المفاتيح", "السماعة"], correctIndex: 2 },
            
            // 🧠 معلومات عامة
            { text: "الحيوان الملقب بسفينة الصحراء:", options: ["الحصان", "الجمل", "الفيل", "الأسد"], correctIndex: 1 },
            { text: "عاصمة فرنسا:", options: ["روما", "مدريد", "باريس", "لندن"], correctIndex: 2 },
            { text: "عدد أيام السنة (البسيطة):", options: ["360", "365", "366", "364"], correctIndex: 1 },
            { text: "اللغة الأكثر انتشارًا في العالم:", options: ["العربية", "الإنجليزية", "الإسبانية", "الصينية"], correctIndex: 1 },
            { text: "الغاز الذي نتنفسه:", options: ["النيتروجين", "الأكسجين", "الهيدروجين", "الهيليوم"], correctIndex: 1 },
            
            // 🧩 تفكير وملاحظة
            { text: "إذا كان اليوم الاثنين، فبعد 10 أيام يكون:", options: ["الثلاثاء", "الأربعاء", "الخميس", "الجمعة"], correctIndex: 2 },
            { text: "أيهم أكبر؟", options: ["كيلوجرام", "جرام", "ملليجرام", "طن"], correctIndex: 3 },
            { text: "الشكل الذي له 3 أضلاع:", options: ["مربع", "مثلث", "مستطيل", "خماسي"], correctIndex: 1 },
            { text: "نصف العدد 80 يساوي:", options: ["30", "20", "40", "60"], correctIndex: 2 },
            { text: "العدد الأولي من التالي:", options: ["9", "15", "17", "21"], correctIndex: 2 }
        ]
    }
];
// المتغيرات الأساسية
let team1Quiz = []; 
let team2Quiz = []; 
let qIndex1 = 0, qIndex2 = 0; 
let score1 = 0, score2 = 0;
let ropePos = 50; 
let matchTimer;
let secondsElapsed = 0;
let team1Finished = false, team2Finished = false;

// متغيرات التايمر المستقل
let timerInterval1, timerInterval2;
let timeLeft1 = 10, timeLeft2 = 10;

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('quizSelect');
    if (typeof globalQuizzes !== 'undefined') {
        globalQuizzes.forEach((q, i) => {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerText = q.name;
            select.appendChild(opt);
        });
    }
});

function shuffleArray(array) {
    let shuffled = array.slice(); 
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function startMatch() {
    const qIdx = document.getElementById('quizSelect').value;
    const team1Name = document.getElementById('team1Input').value || "الأشبال";
    const team2Name = document.getElementById('team2Input').value || "الزهرات";

    if (qIdx === "") return alert("اختر الامتحان أولاً!");

    const allQuestions = globalQuizzes[qIdx].questions;
    const numQuestions = Math.min(10, allQuestions.length);

    team1Quiz = shuffleArray(allQuestions).slice(0, numQuestions);
    team2Quiz = shuffleArray(allQuestions).slice(0, numQuestions);

    document.getElementById('setupModal').classList.add('hidden');
    document.getElementById('nameLeft').innerText = team1Name;
    document.getElementById('nameRight').innerText = team2Name;

    qIndex1 = 0; qIndex2 = 0; score1 = 0; score2 = 0; ropePos = 50;
    team1Finished = false; team2Finished = false;
    
    loadQuestion(1);
    loadQuestion(2);
    
    startGlobalTimer();
}

// 🌟 تشغيل المؤقت الخاص بكل فريق 🌟
function startTeamTimer(team) {
    const timerEl = document.getElementById(`timer${team}`);
    
    // إيقاف أي مؤقت سابق لنفس الفريق
    if (team === 1) clearInterval(timerInterval1);
    else clearInterval(timerInterval2);

    let timeLeft = 10;
    timerEl.innerText = timeLeft;
    timerEl.classList.remove('timer-danger');

    const interval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        
        if (timeLeft <= 3) timerEl.classList.add('timer-danger'); // وميض أحمر في آخر 3 ثواني
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            checkAns(team, -1); // إرسال -1 يعني الوقت انتهى (إجابة خاطئة)
        }
    }, 1000);

    if (team === 1) timerInterval1 = interval;
    else timerInterval2 = interval;
}

function loadQuestion(team) {
    const qIndex = (team === 1) ? qIndex1 : qIndex2;
    const targetQuiz = (team === 1) ? team1Quiz : team2Quiz; 
    
    if (qIndex >= targetQuiz.length) {
        document.getElementById(`qText${team}`).innerText = "🎉 أنهيت الأسئلة! انتظر...";
        document.getElementById(`timer${team}`).innerText = "✔"; // إخفاء التايمر
        document.getElementById(`timer${team}`).classList.remove('timer-danger');
        
        // إيقاف التايمر نهائياً للفريق الذي أنهى
        if(team === 1) clearInterval(timerInterval1);
        else clearInterval(timerInterval2);

        for(let i=0; i<4; i++) document.getElementById(`btn${team}_${i}`).style.display = "none";
        
        if (team === 1) team1Finished = true;
        if (team === 2) team2Finished = true;
        
        if (team1Finished && team2Finished) showWinner();
        return;
    }

    const q = targetQuiz[qIndex];
    document.getElementById(`qText${team}`).innerText = q.text;
    
    for(let i=0; i<4; i++) {
        const btn = document.getElementById(`btn${team}_${i}`);
        btn.style.display = "block";
        btn.innerText = q.options[i];
        btn.className = ""; 
        btn.disabled = false;
    }

    // بدء التايمر بمجرد ظهور السؤال
    startTeamTimer(team);
}

function checkAns(team, optIdx) {
    // إيقاف التايمر فور الإجابة أو انتهاء الوقت
    if (team === 1) clearInterval(timerInterval1);
    else clearInterval(timerInterval2);

    const qIndex = (team === 1) ? qIndex1 : qIndex2;
    const targetQuiz = (team === 1) ? team1Quiz : team2Quiz;
    const q = targetQuiz[qIndex];
    const correct = q.correctIndex;

    // تعطيل الأزرار لمنع الضغط المزدوج
    for(let i=0; i<4; i++) document.getElementById(`btn${team}_${i}`).disabled = true;

    // حالة الإجابة الصحيحة
    if (optIdx === correct) {
        document.getElementById(`btn${team}_${optIdx}`).classList.add("btn-correct");
        
        // 🌟 التعديل هنا: الفريق الأول (يمين) يزيد القيمة، والفريق الثاني (يسار) ينقصها 🌟
        if (team === 1) { score1++; ropePos += 5; } // سحب قوي لليمين (فريق 1)
        else { score2++; ropePos -= 5; } // سحب قوي لليسار (فريق 2)
    } 
    // حالة الإجابة الخاطئة أو انتهاء الوقت (-1)
    else {
        if (optIdx !== -1) {
            document.getElementById(`btn${team}_${optIdx}`).classList.add("btn-wrong");
        } else {
            document.getElementById(`qText${team}`).innerText = "⏳ انتهى الوقت!";
        }
        
        // كشف الإجابة الصحيحة
        document.getElementById(`btn${team}_${correct}`).classList.add("btn-correct");
        
        // عقوبة: الخصم يشد الحبل ناحيته قليلاً (تعديل الاتجاهات للعقوبة)
        if (team === 1) ropePos -= 3; 
        else ropePos += 3;
    }

    updateUI();

    // الانتقال للسؤال التالي بعد ثانية ونصف
    setTimeout(() => {
        if (team === 1) qIndex1++;
        else qIndex2++;
        loadQuestion(team);
    }, 1500); 
}

function updateUI() {
    document.getElementById('scoreLeft').innerText = score1;
    document.getElementById('scoreRight').innerText = score2;
    ropePos = Math.max(10, Math.min(90, ropePos));
    document.getElementById('marker').style.left = ropePos + "%";
}

function startGlobalTimer() {
    clearInterval(matchTimer);
    secondsElapsed = 0;
    matchTimer = setInterval(() => {
        secondsElapsed++;
        let m = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        let s = (secondsElapsed % 60).toString().padStart(2, '0');
        document.getElementById('timerDisplay').innerText = `⏱ وقت المعركة: ${m}:${s}`;
    }, 1000);
}

function showWinner() {
    clearInterval(matchTimer);
    const modal = document.getElementById('winnerModal');
    const text = document.getElementById('winnerText');
    modal.classList.remove('hidden');
    
    const team1Name = document.getElementById('nameLeft').innerText;
    const team2Name = document.getElementById('nameRight').innerText;

    if (score1 > score2) text.innerText = `الفوز لفريق ${team1Name}! 🏆`;
    else if (score2 > score1) text.innerText = `الفوز لفريق ${team2Name}! 🏆`;
    else text.innerText = "تعادل الأبطال! 🤝";
}