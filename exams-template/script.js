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
        // مصفوفة أسئلة الصح والخطأ (فارغة)
        trueFalse: [],

        // مصفوفة أسئلة الاختيار من متعدد (تم دمج الأسئلة الجديدة هنا)
        multipleChoice: [
            {
                id: 1,
                question: "1. اختر البرنامج الذي يطبع الناتج '10'.",
                options: [
                    { value: "0", text: `let num1 = 3;\nlet num2 = 7;\nconsole.log(num1 + num2);` },
                    { value: "1", text: `let num1 = 3;\nlet num2 = 7;\nconsole.log(num1 * num2);` },
                    { value: "2", text: `let num1 3;\nlet num2 7;\nconsole.log(num1 + num2);` },
                    { value: "3", text: `let num1 = 3;\nlet num2 = 7;\nconsole.log log(num1 + num2);` }
                ],
                correctAnswer: "0",
                note: "يقوم هذا الكود بتعريف المتغيرات بشكل صحيح وجمعها (3 + 7 = 10)."
            },
            {
                id: 2,
                question: "2. اختر البرنامج الذي يطبع: 'Password authentication is required for payment.' (المبلغ 50000).",
                options: [
                    { value: "0", text: `let total = 50000;\nif (total < 30000) {\n  console.log("Payment completed.");\n} else {\n  console.log("Password authentication is required for payment.");\n}` },
                    { value: "1", text: `let total = 50000;\nif (total > 30000) {\n  console.log("Payment completed.");\n} else {\n  console.log("Password authentication is required for payment.");\n}` },
                    { value: "2", text: `let total = 50000;\nif (total < 30000) {\n  ("Payment completed.");\n} else {\n  ("Password authentication is required for payment.");\n}` },
                    { value: "3", text: `let total = 50000;\nif (total 30000) {\n  console.log("Payment completed.");\n} If {\n  console.log("Password authentication is required for payment.");\n}` }
                ],
                correctAnswer: "0",
                note: "بما أن 50000 ليست أقل من 30000، يتم تنفيذ الكود الموجود داخل else."
            },
            {
                id: 3,
                question: "3. اختر البرنامج الذي يطبع: 'We are open today.' (اليوم هو Wednesday).",
                options: [
                    { value: "0", text: `let weekday = "Wednesday";\nif (weekday == "Saturday") {\n  console.log("We are closed today.");\n} else {\n  console.log("We are open today.");\n}` },
                    { value: "1", text: `let weekday = "Wednesday";\nif (weekday == "Saturday") {\n  console.log("We are closed today.");\n} if {\n  console.log("We are open today.");\n}` },
                    { value: "2", text: `let weekday = "Wednesday";\nif (weekday == "Saturday") {\n  ("We are closed today.");\n} else {\n  ("We are open today.");\n}` },
                    { value: "3", text: `let weekday = "Wednesday";\nif (weekday == "Saturday") {\n  console.log("We are closed today.");\n} else {\n}` }
                ],
                correctAnswer: "0",
                note: "اليوم ليس السبت، لذا يتجاوز الشرط الأول وينفذ ما بداخل else."
            },
            {
                id: 4,
                question: "4. اختر البرنامج الذي يطبع: 'It's not boiling.' (درجة الحرارة 60).",
                options: [
                    { value: "0", text: `let waterTemperature = 60;\nif (waterTemperature == 100) {\n  console.log("It's boiling.");\n} else {\n  console.log("It's not boiling.");\n}` },
                    { value: "1", text: `let waterTemperature 60;\nif (waterTemperature == 100) {\n  console.log("It's boiling.");\n} else {\n  console.log("It's not boiling.");\n}` },
                    { value: "2", text: `let waterTemperature = 60;\nif (waterTemperature == 100) {\n  console.log("It's boiling.");\n} if {\n  console.log("It's not boiling.");\n}` },
                    { value: "3", text: `let waterTemperature 60;\nif (waterTemperature == 100) {\n  console.log("It's boiling.");\n} if {\n  console.log("It's not boiling.");\n}` }
                ],
                correctAnswer: "0",
                note: "درجة الحرارة 60 لا تساوي 100، لذا يتم تنفيذ جملة else."
            },
            {
                id: 5,
                question: "5. اختر البرنامج الذي يطبع: 'You probably don't need an umbrella.' (الطقس Sunny).",
                options: [
                    { value: "0", text: `let weather = "Sunny";\nif (weather == "Rainy") {\n  console.log("Let's bring an umbrella.");\n} else {\n  console.log("You probably don't need an umbrella.");\n}` },
                    { value: "1", text: `let weather "Sunny";\nIf {\n  console.log("Let's bring an umbrella.");\n} else {\n  console.log("You probably don't need an umbrella.");\n}` },
                    { value: "2", text: `let weather = "Sunny";\nif\n  console.log("Let's bring an umbrella.");\nFif {\n  console.log("You probably don't need an umbrella.");\n}` },
                    { value: "3", text: `let weather "Sunny";\nif (weather "Rainy") {\n  console.log("Let's bring an umbrella.");\n} else {\n  console.log("You probably don't need an umbrella.");\n}` }
                ],
                correctAnswer: "0",
                note: "الخيار الأول هو الوحيد المكتوب بصيغة JavaScript صحيحة."
            },
            {
                id: 6,
                question: "6. اختر البرنامج الذي يطبع: 'Maki is older than me.' (عمر ماكي 25، عمري 15).",
                options: [
                    { value: "0", text: `let makiAge = 25;\nlet myAge = 15;\nif (makiAge < myAge) {\n  console.log("Maki is younger than me.");\n} else if (makiAge > myAge) {\n  console.log("Maki is older than me.");\n} else {\n  console.log("Maki is the same age as me.");\n}` },
                    { value: "1", text: `let makiAge = 25;\nlet myAge = 15;\nif (makiAge < myAge) {\n  "Maki is younger than me.";\n} else if (makiAge > myAge) {\n  "Maki is older than me.";\n} else {\n  "Maki is the same age as me.";\n}` },
                    { value: "2", text: `let makiAge = 25;\nlet myAge = 15;\nif (makiAge < myAge) {\n  console.log("Maki is younger than me.");\n} else (makiAge > myAge) {\n  console.log("Maki is older than me.");\n} else {\n  console.log("Maki is the same age as me.");\n}` },
                    { value: "3", text: `let makiAge = 25\nlet myAge = 15;\nif (makiAge < myAge) {\n  console.log("Maki is younger than me.");\n} else if (makiAge > myAge) {\n  console.log("Maki is older than me.");\n} else {\n}` }
                ],
                correctAnswer: "0",
                note: "يتحقق الشرط الثاني (25 > 15) فيطبع الجملة المطلوبة."
            },
            {
                id: 7,
                question: "7. اختر البرنامج الذي يطبع: 'Good evening.' (الوقت Evening).",
                options: [
                    { value: "0", text: `let timeZone = "Evening";\nif (timeZone == "Morning") {\n  console.log("Good morning.");\n} else if (timeZone == "Afternoon") {\n  console.log("Hello.");\n} else {\n  console.log("Good evening.");\n}` },
                    { value: "1", text: `let timeZone = "Evening";\nif (timeZone == "Morning") {\n  console.log("Good morning.");\n} else (timeZone == "Afternoon") {\n  console.log("Hello.");\n} else {\n  console.log("Good evening.");\n}` },
                    { value: "2", text: `let timeZone "Evening";\nif else (timeZone == "Morning") {\n  console.log("Good morning.");\n} else (timeZone == "Afternoon") {\n  console.log("Hello.");\n} else {\n  console.log("Good evening.");\n}` },
                    { value: "3", text: `let timeZone = "Evening";\nif else (timeZone == "Morning") {\n  console.log("Good morning.");\n} else if (timeZone == "Afternoon") {\n  console.log("Hello.");\n} else {\n  console.log("Good evening.");\n}` }
                ],
                correctAnswer: "0",
                note: "بما أن الوقت ليس صباحاً ولا ظهراً، يتم تنفيذ جملة else الأخيرة."
            },
            {
                id: 8,
                question: "8. اختر البرنامج الذي يطبع: 'Unlocked' (مجموع الأرقام 5+7+5 = 17 والمفتاح 17).",
                options: [
                    { value: "0", text: `let num1 = 5;\nlet num2 = 7;\nlet num3 = 5;\nlet key = 17;\nif ((num1 + num2 + num3) == key) {\n  console.log("Unlocked");\n} else {\n  console.log("The number is incorrect.");\n}` },
                    { value: "1", text: `let num1 = 5;\nlet num2 = 7;\nlet num3 = 5;\nlet key = 17;\nif ((num1 + num2 + num3) < key) {\n  console.log("Unlocked");\n} else {\n  console.log("The number is incorrect.");\n}` },
                    { value: "2", text: `let num1 = 5;\nlet num2 = 7;\nlet num3 = 5;\nlet key = 17;\nif ((num1 * num2 * num3) == key) {\n  console.log("Unlocked");\n} else {\n  console.log("The number is incorrect.");\n}` },
                    { value: "3", text: `let num1 = 5;\nlet num2 = 7;\nlet num3 = 5;\nlet key = 17;\nif ((num1 * num2 * num3) < key) {\n  console.log("Unlocked");\n} else {\n  console.log("The number is incorrect.");\n}` }
                ],
                correctAnswer: "0",
                note: "مجموع 5 + 7 + 5 يساوي 17، وهو مساوٍ لقيمة المفتاح."
            },
            {
                id: 9,
                question: "9. اختر البرنامج الذي يطبع: 'Charging is required.' (البطارية 0).",
                options: [
                    { value: "0", text: `let battery = 0;\nif (battery == 0) {\n  console.log("Charging is required.");\n}` },
                    { value: "1", text: `let battery = 0;\nif (battery = 0) {\n  console.log("Charging is required.");\n}` },
                    { value: "2", text: `let battery 0;\nif (battery = 0) {\n  console.log("Charging is required.");\n}` },
                    { value: "3", text: `let battery 0;\nif (battery == 0) {\n  console.log("Charging is required.");\n}` }
                ],
                correctAnswer: "0",
                note: "يجب استخدام علامة == للمقارنة، وكتابة تعريف المتغير بشكل صحيح."
            },
            {
                id: 10,
                question: "10. اختر البرنامج الذي يطبع: 'Fuel is full.' (الوقود 100).",
                options: [
                    { value: "0", text: `let fuel = 100;\nif (fuel == 100) {\n  console.log("Fuel is full.");\n}` },
                    { value: "1", text: `let fuel 100;\nif (fuel > 100) {\n  console.log("Fuel is full.");\n}` },
                    { value: "2", text: `let fuel = 100;\nif (fuel > 100) {\n  console.log("Fuel is full.");\n}` },
                    { value: "3", text: `let fuel = 100;\nif (fuel == 100) {\n}` }
                ],
                correctAnswer: "0",
                note: "الشرط fuel == 100 هو الصحيح لأن القيمة تساوي 100 تماماً."
            },
            {
                id: 11,
                question: "11. اختر الكود الذي يغير الغداء من كاري إلى أومليت ثم يطبع القائمة.",
                options: [
                    { value: "0", text: `let lunch = "Curry rice";\nif (lunch == "Curry rice") {\n  console.log("We don't have ingredients to make curry rice.");\n  console.log("We'll make a different lunch.");\n  lunch = "Omelet rice";\n}\nconsole.log("Displaying the lunch menu");\nconsole.log(lunch);` },
                    { value: "1", text: `let lunch "Curry rice";\nif (lunch "Curry rice") {\n  console.log("We don't have ingredients...");\n  console.log("We'll make a different lunch.");\n  lunch "Omelet rice";\n}\nconsole.log("Displaying the lunch menu");\nconsole.log(lunch);` },
                    { value: "2", text: `let lunch "Curry rice";\nif (lunch "Curry rice") {\n  console.log(" We don't have ingredients...");\n  console.log(" We'll make a different lunch.");\n  lunch "Omelet rice";\n}\nconsole.log("Displaying the lunch menu");\nconsole.log(lunch);` },
                    { value: "3", text: `let lunch "Curry rice";\nif (lunch "Curry rice") (\n  console.log(" we don't have ingredients...");\n  console.log("we Il make a different lunch.");\n  lunch "Omelet rice";\n}\nconsole.log("Displaying the lunch menu");\nconsole.log(lunch);` }
                ],
                correctAnswer: "0",
                note: "تم استخدام علامة = لإعادة تعيين قيمة المتغير lunch بشكل صحيح داخل الشرط."
            },
            {
                id: 12,
                question: "12. اختر البرنامج الذي يطبع: 'This car is full.' (السعة 6، الركاب 4 وزادوا 2).",
                options: [
                    { value: "0", text: `let passengersNum = 4;\nlet carCapacity = 6;\npassengersNum = passengersNum + 2;\nif (passengersNum > carCapacity) {\n  console.log("Please reduce the number of passengers.");\n} else if (passengersNum == carCapacity) {\n  console.log("This car is full.");\n} else {\n  console.log("This car still has room for passengers.");\n}` },
                    { value: "1", text: `let passengersNum = 4;\nlet carCapacity = 6;\npassengersNum 2 passengersNum;\nif (passengersNum > carCapacity) {\n  console.log("Please reduce the number of passengers.");\n} else if (passengersNum carCapacity) {\n  console.log("This car is full.");\n} else {\n  console.log("This car still has room for passengers.");\n}` },
                    { value: "2", text: `let passengersNum = 4;\nlet carCapacity = 6;\npassengersNum passengerslum = 2;\nif (passengersNum carCapacity) {\n  console.log("Please reduce the number of passengers.");\n} else if (passengersNum carCapacity) {\n  console.log("This car is full.");\n} else {\n  console.log("This car still has room for passengers.");\n}` },
                    { value: "3", text: `let passengersNum 4;\nlet carCapacity = 5;\npassengersNum 2 passengersNum;\nif (passengersNum carCapacity) {\n  console.log("Please reduce the number of passengers.");\n} else if (passengersNum carCapacity) {\n  console.log("This car is full.");\n} else\n  console.log("This car still has room for passengers.");` }
                ],
                correctAnswer: "0",
                note: "عدد الركاب أصبح 6 (4+2)، وهو يساوي السعة، فيتحقق شرط else if."
            },
            {
                id: 13,
                question: "13. اختر البرنامج الذي يطبع: 'You are in the first group.' (الرقم 35).",
                options: [
                    { value: "0", text: `let num = 35;\nif (num > 20) {\n  console.log("You are in the first group.");\n} else {\n  console.log("You are in the second group.");\n}` },
                    { value: "1", text: `let num = 35;\nif (num20) {\n  console.log("You are in the first group.");\n} else {\n  console.log("You are in the second group.");\n}` },
                    { value: "2", text: `let num = 35;\nif (num < 20) {\n  ("You are in the first group.");\n} else {\n  ("You are in the second group.");\n}` },
                    { value: "3", text: `let num\nif (num\n35;\n20) {\n  console.log("You are in the first group.");\n} else {\n  console.log("You are in the second group.");\n}` }
                ],
                correctAnswer: "0",
                note: "الرقم 35 أكبر من 20، لذا يتحقق الشرط الأول."
            },
            {
                id: 14,
                question: "14. اختر البرنامج الذي يطبع السعر الإجمالي '1500' ثم 'You don't have enough money.'",
                options: [
                    { value: "0", text: `let orangePrice = 300;\nlet orangeNum = 5;\nlet totalCost = orangePrice * orangeNum;\nconsole.log(totalCost);\nif (totalCost < 1000) {\n  console.log("You can buy it.");\n} else {\n  console.log("You don't have enough money.");\n}` },
                    { value: "1", text: `let orangePrice = 300;\nlet orangeNum = 5;\nlet totalCost = 0;\ntotalCost orangePrice\nconsole.log(totalCost);\nif (totalCost < 1000) {\n  orangeNum;\n  console.log("You can buy it.");\n  console.log("You don't have enough money.");\n} else {\n}` },
                    { value: "2", text: `let orangePrice = 300;\nlet orangeNum = 5;\nlet totalCost = 0;\ntotalCost orangePrice / orangeNum;\nconsole.log(totalCost);\nif (totalCost < 1000) {\n  console.log("You can buy it.");\n} else {\n  console.log("You don't have enough money.");\n}` },
                    { value: "3", text: `let orangePrice = 300;\nlet orangeNum = 5;\nlet totalCost = 0\nif (totalCost > 1000) {\n  console.log("You can buy it.");\n} else {\n  console.log("You don't have enough money.");\n}` }
                ],
                correctAnswer: "0",
                note: "السعر 1500 (300*5)، وهو ليس أقل من 1000، لذا يذهب لـ else."
            },
            {
                id: 15,
                question: "15. اختر البرنامج الذي يطبع المتبقي 4 للوصول للهدف (الهدف 8 - المباع 4).",
                options: [
                    { value: "0", text: `let soldNumber = 4;\nlet salesTarget = 8;\nif (soldNumber < salesTarget) {\n  console.log("Remaining quantity to reach the sales goal is as follows.");\n  console.log(salesTarget - soldNumber);\n} else {\n  console.log("Sales goal achieved.");\n}` },
                    { value: "1", text: `let soldNumber = 4;\nlet salesTarget 8;\nif (soldNumber salesTarget) {\n  console.log("Remaining quantity to reach the sales goal is as follows.");\n  console.log(salesTarget - soldNumber);\n} else {\n  console.log("Sales goal achieved.");\n}` },
                    { value: "2", text: `let soldNumber = 4;\nlet salesTarget = 8;\nif (soldNumber salesTarget) {\n  console.log("Remaining quantity to reach the sales goal is as follows.");\n  console.log(salesTarget\n} else {\n  soldNumber);\n  console.log("Sales goal achieved.");\n}` },
                    { value: "3", text: `let soldNumber = 4;\nlet salesTarget = 8;\nif (soldNumber salesTarget) {\n  console.log("Remaining quantity to reach the sales goal is as follows.");\n  console.log(salesTarget soldNumber);\n} else {\n  console.log("Sales goal achieved.");\n}` }
                ],
                correctAnswer: "0",
                note: "المباع أقل من الهدف، فنطرح المباع من الهدف (8 - 4 = 4)."
            },
            {
                id: 16,
                question: "16. اختر البرنامج الذي يطبع: 'Reservations are available.' (الحد 20، المحجوز 10).",
                options: [
                    { value: "0", text: `let peopleNumLimit = 20;\nlet reservationPeopleNum = 10;\nif (peopleNumLimit > reservationPeopleNum) {\n  console.log("Reservations are available.");\n} else {\n  console.log("Reservations are not available.");\n}` },
                    { value: "1", text: `let peopleNumLimit = 20;\nlet reservationPeopleNum = 10;\nelse (peopleNumLimit < reservationPeopleNum) {\n  console.log("Reservations are available.");\n} else {\n  console.log("Reservations are not available.");\n}` },
                    { value: "2", text: `let peopleNumLimit = 20;\nlet reservationPeopleNum = 10;\nif (peopleNumLimit\nreservationPeopleNum) {\n  console.log("Reservations are available.");\n} else {\n  console.log("Reservations are not available.");\n}` },
                    { value: "3", text: `let peopleNumLimit = 20\nlet reservationPeopleNum = 10` }
                ],
                correctAnswer: "0",
                note: "الحد الأقصى (20) أكبر من عدد المحجوزين (10)، فالشرط صحيح."
            },
            {
                id: 17,
                question: "17. اختر البرنامج الذي يطبع: Car ثم Shinkansen ثم Airplane بالترتيب.",
                options: [
                    { value: "0", text: `let vehicle = "Car";\nconsole.log(vehicle);\nvehicle = "Shinkansen";\nconsole.log(vehicle);\nvehicle = "Airplane";\nconsole.log(vehicle);` },
                    { value: "1", text: `let vehicle = "Car";\nconsole.log(vehicle);\nvehicle = "Shinkansen";\nconsole.log(vehicle);\nvehicle = "Airplane";\nconsole.log(vehicle);\n` },
                    { value: "2", text: `let vehicle = "Car";\nvehicle = "Shinkansen";\nvehicle = "Airplane";\nconsole.log(vehicle);\nconsole.log(vehicle);\nconsole.log(vehicle);` },
                    { value: "3", text: `let vehicle = "Car";\nconsole.log(vehicle);\nvehicle "Shinkansen";\nconsole.log(vehicle);\nvehicle "Airplane";\nconsole.log(vehicle);` }
                ],
                correctAnswer: "0",
                note: "يجب الطباعة قبل تغيير القيمة."
            },
            {
                id: 18,
                question: "18. اختر البرنامج الذي يطبع 'Discount available.' والسعر الجديد 5500.",
                options: [
                    { value: "0", text: `let stampNum = 5;\nlet price = 6500;\nif (stampNum == 5) {\n  console.log("Discount available.");\n  price = price - 1000;\n}\nconsole.log("The total bill is as follows.");\nconsole.log(price);` },
                    { value: "1", text: `let stampNum = 5;\nlet price = 6500;\nconsole.log("The total bill is as follows.");\nconsole.log(price);\nif (stampNum == 5) {\n  console.log("Discount available.");\n  price price 1000;\n}` },
                    { value: "2", text: `let stampNum = 5;\nlet price = 6500;\nelse (stampNum == 5) {\n  console.log("Discount available.");\n  price price 1000;\n}\nconsole.log("The total bill is as follows.");\nconsole.log(price);` },
                    { value: "3", text: `let stampNum = 5\nlet price = 6500;\nif (stampNum == 5) {\n  console.log("Discount available.");\n  price price - 1000;` }
                ],
                correctAnswer: "0",
                note: "يتحقق الشرط ويتم تحديث السعر بطرح 1000 ثم طباعته."
            },
            {
                id: 19,
                question: "19. اختر البرنامج الذي يطبع: 'It's size M.' (الوزن 300).",
                options: [
                    { value: "0", text: `let appleWeight = 300;\nif (appleWeight > 400) {\n  console.log("It's size L.");\n} else if (appleWeight > 200) {\n  console.log("It's size M.");\n} else {\n  console.log("It's size S.");\n}` },
                    { value: "1", text: `let appleWeight = 300;\nif (appleWeight > 400) {\n  console.log("It's size L.");\n} else if (appleWeight > 200) {\n  console.log("It's size M.");\n} else {\n  console.log("It's size S.");\n}` },
                    { value: "2", text: `let appleWeight = 300;\nif (appleWeight > 400) {\n  console.log("It's size L.");\n} else if (appleWeight > 200) {\n  console.log("It's size M.");\n} else {\n  console.log("It's size S.");\n}` },
                    { value: "3", text: `let appleWeight = 300;\nif (appleWeight > 400) {\n  console.log("It's size L.");` }
                ],
                correctAnswer: "0",
                note: "300 ليست أكبر من 400، لكنها أكبر من 200، لذا ينفذ else if."
            },
            {
                id: 20,
                question: "20. اختر البرنامج الذي يطبع: 'You can purchase a book.' (المحفظة 10000، الكتاب 1500).",
                options: [
                    { value: "0", text: `let bookPrice = 1500;\nlet myWallet = 10000;\nif (myWallet > bookPrice) {\n  console.log("You can purchase a book.");\n} else {\n  console.log("Not enough money");\n}` },
                    { value: "1", text: `let bookPrice = 1500;\nlet myWallet = 10000;\nif (myWallet < bookPrice) {\n  console.log("You can purchase a book.");\n} else {\n  console.log("Not enough money");\n}` },
                    { value: "2", text: `let bookPrice = 1500;\nlet myWallet = 10000;\nif (myWallet > bookPrice) {\n  console.log("You can purchase a book.");\n} else {\n}` },
                    { value: "3", text: `let bookPrice = 1500;\nlet myWallet = 10000;` }
                ],
                correctAnswer: "0",
                note: "رصيد المحفظة أكبر من سعر الكتاب، فالشرط صحيح."
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
