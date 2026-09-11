document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageSections = document.querySelectorAll('.page-content');

    // وظيفة تبديل الصفحات
    function switchPage(targetPageId) {
        // إخفاء كل الصفحات وإزالة التفعيل من الأزرار
        pageSections.forEach(section => section.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));

        // إظهار الصفحة المطلوبة وتفعيل زرها
        const targetSection = document.getElementById(targetPageId);
        const targetButton = document.querySelector(`[data-target="${targetPageId}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (targetButton) {
            targetButton.classList.add('active');
        }
    }

    // إضافة التفاعل عند الضغط على أزرار القائمة
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPage = button.getAttribute('data-target');
            switchPage(targetPage);
            // تحديث رابط الـ Hash بدون إعادة تحميل الصفحة
            history.pushState(null, '', `#${targetPage}`);
        });
    });

    // قراءة الـ Hash الموجود في الرابط عند فتح الموقع لأول مرة
    function handleInitialHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            switchPage(hash);
        } else {
            switchPage('page-home');
        }
    }

    // دعم أزرار الرجوع والتالي في المتصفح (Back / Forward)
    window.addEventListener('popstate', handleInitialHash);

    // تشغيل الدالة لأول مرة
    handleInitialHash();
});
