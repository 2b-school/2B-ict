// تم الاستغناء عن روابط جوجل تماماً!

function handleLogin() {
    // جلب البيانات المدخلة (وتحويل اسم المستخدم لحروف صغيرة لتسهيل الدخول)
    const user = document.getElementById('username').value.trim().toLowerCase();
    const pass = document.getElementById('password').value.trim();
    const btn = document.getElementById('loginBtn');
    const msg = document.getElementById('error-message');

    // التأكد من إدخال البيانات
    if (!user || !pass) {
        msg.innerText = "يرجى إدخال كافة البيانات! ⚠️";
        return;
    }

    // تغيير شكل الزر
    btn.innerText = "جاري التحقق... ⏳";
    btn.disabled = true;
    msg.innerText = ""; 

    // وضعنا تأخير بسيط (نصف ثانية) ليعطي إحساساً للمستخدم أن النظام يقوم بالتحميل
    setTimeout(() => {
        let foundUser = null;

        // البحث داخل قاعدة البيانات المحلية (الموجودة في ملف db.js)
        for (let i = 0; i < usersDB.length; i++) {
            if (usersDB[i].username.toLowerCase() === user && usersDB[i].password === pass) {
                foundUser = usersDB[i];
                break; // وجدنا المستخدم، نوقف البحث
            }
        }

        // إذا تم العثور على المستخدم والبيانات صحيحة
        if (foundUser) {
            console.log("تم الدخول بنجاح!");
            localStorage.setItem("teacherName", foundUser.name); // حفظ اسم المعلم
            window.location.href = "teacher.html"; // الانتقال للوحة التحكم
        } 
        // إذا كانت البيانات خاطئة
        else {
            msg.innerText = "اسم المستخدم أو كلمة المرور غير صحيحة! ❌";
            btn.innerText = "دخول مباشر 🚀";
            btn.disabled = false;
        }
    }, 500); // 500 مللي ثانية (نصف ثانية)
}
// تفعيل تأثير التموج (Ripple Effect) على الأزرار
document.addEventListener('DOMContentLoaded', () => {
    // تحديد جميع الأزرار التي تحمل كلاس launch-button
    const buttons = document.querySelectorAll('.launch-button');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // حساب مكان ضغطة الماوس بالنسبة للزر
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;

            // إنشاء عنصر (span) جديد ليكون هو دائرة التموج
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // إضافة الدائرة داخل الزر
            this.appendChild(ripple);

            // حذف الدائرة بعد انتهاء الحركة (600 جزء من الثانية لتطابق الـ CSS)
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});