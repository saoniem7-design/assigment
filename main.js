

    // GLOBAL STATE

    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;


    // SLIDESHOW

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function changeSlide(direction) {
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        showSlide(currentSlide);
        resetSlideInterval();
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Initialize slideshow
    if (slides.length > 0) {
        showSlide(0);
        resetSlideInterval();
    }


    // FACULTY DATA & RENDER

    const facultyMembers = [
        { name: 'យីន​​ សៅនីម', role: 'Full-Stack Web Developer', img: 'pic-teacher/nim.png' },
        { name: 'ថន​ ស្រីវ៉ាន', role: 'គ្រូភាសាអង់គ្លេស', img: 'pic-teacher/van.png' },
        { name: 'ធីម​ ស្រីនាត', role: 'គ្រូភាសាចិន', img: 'pic-teacher/neat.png' },
        { name: 'ផាត់ រ៉ាណាផាត', role: 'Digital Marketing Strategy', img: 'pic-teacher/suvan.png' },
    ];

    function renderFaculty() {
        const grid = document.getElementById('facultyGrid');
        if (!grid) return;
        grid.innerHTML = facultyMembers.map(m => `
            <div class="faculty-card">
                <img src="${m.img}" alt="${m.name}">
                <h3>${m.name}</h3>
                <p>${m.role}</p>
            </div>
        `).join('');
    }


    // COURSES DATA & RENDER

    const coursesData = [
        { id: 1, name: 'Full Stack Web Development', category: 'programming', price: 450, duration: '៣ ខែ', students: 120, img: 'pictures/full stack.png', desc: 'រៀនបង្កើតគេហទំព័រពេញលេញពី Frontend ដល់ Backend ជាមួយ HTML, CSS, JavaScript, React, Node.js និង MongoDB។' },
        { id: 2, name: 'Python Programming Master', category: 'programming', price: 350, duration: '៤ ខែ', students: 200, img: 'pictures/python.png', desc: 'រៀន Python ពីមូលដ្ឋានដល់កម្រិតខ្ពស់ រួមទាំង Data Science និង Automation។' },
        { id: 3, name: 'English for Business', category: 'language', price: 500, duration: '៦ ខែ', students: 80, img: 'pictures/english.png', desc: 'រៀនពីអាជីវកម្មអនឡាញ និងទីផ្សារ' },
        { id: 4, name: 'Graphic Design with Photoshop', category: 'design', price: 400, duration: '៣ ខែ', students: 95, img: 'pictures/photoshop.png', desc: 'រៀនរចនាក្រាហ្វិក និងកែរូបភាពជាមួយ Adobe Photoshop និង Illustrator។' },
        { id: 5, name: 'UI/UX Design Fundamentals', category: 'design', price: 550, duration: '៥ ខែ', students: 150, img: 'pictures/ui-ux.png', desc: 'រៀន UI/UX Design ពីមូលដ្ឋានដល់កម្រិតខ្ពស់' },
        { id: 6, name: 'Chinese for Beginners', category: 'language', price: 380, duration: '៥ ខែ', students: 110, img: 'pictures/book.png', desc: 'រៀនភាសាចិនតាមស្តង់ដារ HSK ពីកម្រិត ១ ដល់ ៣ ជាមួយគ្រូមានបទពិសោធន៍។' },
        { id: 7, name: 'Digital Marketing Strategy', category: 'business', price: 380, duration: '៥ ខែ', students: 110, img: 'pictures/digital marketing.png', desc: 'រៀន estrategy នៃការផ្សាយពាណិជ្ជកម្មឌីជីថល' },
        { id: 8, name: 'Accounting & Finance', category: 'business', price: 380, duration: '៥ ខែ', students: 110, img: 'pictures/accounting.png', desc: 'រៀនគណនេយ្យ និងហិរញ្ញវត្ថុពីមូលដ្ឋាន ដល់ការវិភាគរបាយការណ៍ហិរញ្ញវត្ថុ។' },
        { id: 9, name: 'Mobile App Development (Flutter)', category: 'programming', price: 380, duration: '៥ ខែ', students: 110, img: 'pictures/flutter.png', desc: 'រៀនការប្រព័ន្ធ App ជាមួយ Flutter និង Dart។' },
    ];

    let activeCourseFilter = 'all';

    function renderCourses() {
        const grid = document.getElementById('coursesGrid');
        if (!grid) return;
        const filtered = activeCourseFilter === 'all' ? coursesData : coursesData.filter(c => c.category === activeCourseFilter);
        grid.innerHTML = filtered.map(c => `
            <div class="course-card" onclick="openCourseDetail(${c.id})">
                <img src="${c.img}" alt="${c.name}">
                <div class="course-card-body">
                    <h3>${c.name}</h3>
                    <p>${c.desc}</p>
                    <div class="course-meta">
                        <span><i class="fa-solid fa-clock"></i> ${c.duration}</span>
                        <span><i class="fa-solid fa-users"></i> ${c.students}</span>
                        <span class="course-price">$${c.price}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function filterCourses(filter) {
        activeCourseFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        renderCourses();
    }


    // COURSE DETAIL MODAL

    function openCourseDetail(id) {
        const course = coursesData.find(c => c.id === id);
        if (!course) return;
        const content = document.getElementById('courseDetailContent');
        content.innerHTML = `
            <img src="${course.img}" alt="${course.name}" style="width: 100%; height: 280px; object-fit: cover;">
            <div style="padding: 1.5rem;">
                <h2 style="font-size: 1.5rem; font-weight: 700; color: #003366; margin-bottom: 0.5rem;">${course.name}</h2>
                <p style="color: #475569; margin-bottom: 1rem;">${course.desc}</p>
                <div style="display: flex; gap: 2rem; margin-bottom: 1.5rem; font-size: 0.875rem;">
                    <span><i class="fa-solid fa-clock" style="color: #003366;"></i> ${course.duration}</span>
                    <span><i class="fa-solid fa-users" style="color: #003366;"></i> ${course.students} សិស្ស</span>
                    <span style="font-weight: 700; color: #003366; font-size: 1.125rem;">$${course.price}</span>
                </div>
                <button onclick="closeCourseDetailModal(); openRegisterCourseModal();" style="width: 100%; background: #003366; color: white; padding: 0.75rem; border-radius: 8px; font-weight: 700; transition: background 0.2s;">
                    <i class="fa-solid fa-user-plus"></i> ចុះឈ្មោះរៀនវគ្គនេះ
                </button>
            </div>
        `;
        document.getElementById('courseDetailModal').classList.add('active');
    }

    function closeCourseDetailModal() {
        document.getElementById('courseDetailModal').classList.remove('active');
    }


    // AUTH / LOGIN

    function openLoginModal() {
        document.getElementById('loginModal').classList.add('active');
        document.getElementById('login-error-msg').classList.add('hidden');
        document.getElementById('loginForm').reset();
    }

    function closeLoginModal() {
        document.getElementById('loginModal').classList.remove('active');
    }

    document.getElementById('loginForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const errorMsg = document.getElementById('login-error-msg');

        if (username === 'saonim' && password === '123456') {
            closeLoginModal();
            document.getElementById('landing-page-view').classList.add('hidden');
            document.getElementById('admin-dashboard-view').classList.remove('hidden');
            showToast('ចូលប្រើប្រាស់បានជោគជ័យ!', 'success');
            renderDashboard();
        } else {
            errorMsg.textContent = 'ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ!';
            errorMsg.classList.remove('hidden');
        }
    });

    function logoutAdmin() {
        document.getElementById('admin-dashboard-view').classList.add('hidden');
        document.getElementById('landing-page-view').classList.remove('hidden');
        showToast('ចាកចេញពីប្រព័ន្ធបានជោគជ័យ!', 'info');
        window.scrollTo(0, 0);
    }


    // DASHBOARD TABS

    function switchDashboardTab(tab) {
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        document.querySelectorAll('.sidebar-nav button').forEach(btn => btn.classList.remove('active'));

        document.getElementById(`dash-tab-${tab}`).classList.add('active');
        document.getElementById(`nav-${tab}`).classList.add('active');

        if (tab === 'students') renderStudents();
        if (tab === 'teachers') renderTeachers();
        if (tab === 'payments') renderPayments();
        if (tab === 'registrations') renderAdminRegistrations();
        if (tab === 'courses') renderCoursesAdmin();
        if (tab === 'overview') renderDashboard();
    }


    // DASHBOARD DATA & RENDER

    let studentsData = [
        { id: 'STU-001', name: 'ចាន់ សុភា', gender: 'ប្រុស', class: '១០A', phone: '012 111 222' },
        { id: 'STU-002', name: 'សុខ ចាន់ថា', gender: 'ស្រី', class: '១០B', phone: '012 333 444' },
        { id: 'STU-003', name: 'លី ណា', gender: 'ស្រី', class: '១១A', phone: '012 555 666' },
    ];

    let teachersData = [
        { id: 'TCH-001', name: 'លី ណា ហេង', subject: 'គណិតវិទ្យា', email: 'heng@school.edu.kh', phone: '012 888 999' },
        { id: 'TCH-002', name: 'សុខ ចាន់ថា', subject: 'ភាសាអង់គ្លេស', email: 'chantha@school.edu.kh', phone: '012 777 888' },
    ];

    let paymentsData = [
        { id: 'INV-2026-001', student: 'ចាន់ សុភា', class: '១០A', desc: 'ថ្លៃសិក្សាខែកញ្ញា', amount: 450, date: '2026-09-21', status: 'paid', method: 'ABA Pay / KHQR' },
        { id: 'INV-2026-002', student: 'សុខ ចាន់ថា', class: '១០B', desc: 'ថ្លៃសិក្សាខែកញ្ញា', amount: 350, date: '2026-09-20', status: 'unpaid', method: 'សាច់ប្រាក់ (Cash)' },
    ];

    let registrationsData = [
        { id: 'REG-001', name: 'ចាន់ សុភា', course: 'គណិតវិទ្យាកម្រិតខ្ពស់', price: 450, phone: '012 111 222', date: '2026-09-21', status: 'pending' },
        { id: 'REG-002', name: 'សុខ ចាន់ថា', course: 'ភាសាអង់គ្លេសទូទៅ', price: 350, phone: '012 333 444', date: '2026-09-20', status: 'approved' },
    ];

    function renderDashboard() {
        document.getElementById('stat-total-students').textContent = studentsData.length;
        document.getElementById('stat-total-teachers').textContent = teachersData.length;
        document.getElementById('stat-total-registrations').textContent = registrationsData.length;
        renderStudents();
        renderTeachers();
        renderPayments();
        renderAdminRegistrations();
        renderCoursesAdmin();
    }

    function renderStudents() {
        const tbody = document.getElementById('student-table-body');
        if (!tbody) return;
        tbody.innerHTML = studentsData.map(s => `
            <tr>
                <td style="font-family: monospace;">${s.id}</td>
                <td style="font-weight: 500;">${s.name}</td>
                <td>${s.gender}</td>
                <td>${s.class}</td>
                <td>${s.phone}</td>
                <td style="text-align: center;">
                    <button onclick="deleteStudent('${s.id}')" style="color: #dc2626; background: none; border: none; cursor: pointer; font-size: 1rem;"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    function deleteStudent(id) {
        studentsData = studentsData.filter(s => s.id !== id);
        renderStudents();
        renderDashboard();
        showToast('លុបសិស្សបានជោគជ័យ!', 'success');
    }

    function renderTeachers() {
        const tbody = document.getElementById('teacher-table-body');
        if (!tbody) return;
        tbody.innerHTML = teachersData.map(t => `
            <tr>
                <td style="font-family: monospace;">${t.id}</td>
                <td style="font-weight: 500;">${t.name}</td>
                <td>${t.subject}</td>
                <td>${t.email}</td>
                <td>${t.phone}</td>
                <td style="text-align: center;">
                    <button onclick="deleteTeacher('${t.id}')" style="color: #dc2626; background: none; border: none; cursor: pointer; font-size: 1rem;"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    function deleteTeacher(id) {
        teachersData = teachersData.filter(t => t.id !== id);
        renderTeachers();
        renderDashboard();
        showToast('លុបគ្រូបង្រៀនបានជោគជ័យ!', 'success');
    }

    function renderPayments() {
        const tbody = document.getElementById('payment-table-body');
        if (!tbody) return;
        tbody.innerHTML = paymentsData.map(p => `
            <tr>
                <td style="font-family: monospace;">${p.id}</td>
                <td style="font-weight: 500;">${p.student}</td>
                <td>${p.class}</td>
                <td>${p.desc}</td>
                <td style="font-weight: 700; color: #003366;">$${p.amount}</td>
                <td>${p.date}</td>
                <td><span class="status-badge ${p.status === 'paid' ? 'status-paid' : 'status-unpaid'}">${p.status === 'paid' ? 'បានបង់' : 'មិនបង់'}</span></td>
                <td style="text-align: center;">
                    <button onclick="viewInvoice('${p.id}')" style="color: #2563eb; background: none; border: none; cursor: pointer; font-size: 1rem; margin-right: 0.5rem;"><i class="fa-solid fa-eye"></i></button>
                    <button onclick="deletePayment('${p.id}')" style="color: #dc2626; background: none; border: none; cursor: pointer; font-size: 1rem;"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    function deletePayment(id) {
        paymentsData = paymentsData.filter(p => p.id !== id);
        renderPayments();
        showToast('លុបវិក្កយបត្របានជោគជ័យ!', 'success');
    }

    function renderAdminRegistrations() {
        const tbody = document.getElementById('registrations-table-body');
        if (!tbody) return;
        const filter = document.getElementById('regStatusFilter')?.value || 'all';
        const filtered = filter === 'all' ? registrationsData : registrationsData.filter(r => r.status === filter);
        tbody.innerHTML = filtered.map(r => `
            <tr>
                <td style="font-family: monospace;">${r.id}</td>
                <td style="font-weight: 500;">${r.name}</td>
                <td>${r.course}</td>
                <td style="font-weight: 700; color: #003366;">$${r.price}</td>
                <td>${r.phone}</td>
                <td>${r.date}</td>
                <td><span class="status-badge ${r.status === 'pending' ? 'status-pending' : r.status === 'approved' ? 'status-approved' : 'status-rejected'}">${r.status === 'pending' ? 'រង់ចាំ' : r.status === 'approved' ? 'អនុម័ត' : 'បដិសេធ'}</span></td>
                <td style="text-align: center;">
                    ${r.status === 'pending' ? `
                        <button onclick="approveRegistration('${r.id}')" style="color: #059669; background: none; border: none; cursor: pointer; font-size: 1rem; margin-right: 0.5rem;"><i class="fa-solid fa-check"></i></button>
                        <button onclick="rejectRegistration('${r.id}')" style="color: #dc2626; background: none; border: none; cursor: pointer; font-size: 1rem;"><i class="fa-solid fa-times"></i></button>
                    ` : `<span style="font-size: 0.75rem; color: #64748b;">រួចរាល់</span>`}
                </td>
            </tr>
        `).join('');
    }

    function approveRegistration(id) {
        const reg = registrationsData.find(r => r.id === id);
        if (reg) {
            reg.status = 'approved';
            renderAdminRegistrations();
            renderDashboard();
            showToast('អនុម័តការចុះឈ្មោះបានជោគជ័យ!', 'success');
        }
    }

    function rejectRegistration(id) {
        const reg = registrationsData.find(r => r.id === id);
        if (reg) {
            reg.status = 'rejected';
            renderAdminRegistrations();
            renderDashboard();
            showToast('បដិសេធការចុះឈ្មោះបានជោគជ័យ!', 'info');
        }
    }
    function renderCoursesAdmin() {
        const tbody = document.getElementById('courses-table-body');
        if (!tbody) return;
        tbody.innerHTML = coursesData.map(c => `
            <tr>
                <td><img src="${c.img}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover;"></td>
                <td style="font-weight: 500;">${c.name}</td>
                <td>${c.category === 'programming' ? 'កុំព្យូទ័រ' : c.category === 'language' ? 'ភាសា' : c.category === 'business' ? 'អាជីវកម្ម' : 'រចនា'}</td>
                <td>${c.duration}</td>
                <td>${c.students}</td>
                <td style="font-weight: 700; color: #003366;">$${c.price}</td>
                <td style="text-align: center;">
                    <button onclick="deleteCourse(${c.id})" style="color: #dc2626; background: none; border: none; cursor: pointer; font-size: 1rem;"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    function deleteCourse(id) {
        const index = coursesData.findIndex(c => c.id === id);
        if (index > -1) {
            coursesData.splice(index, 1);
            renderCoursesAdmin();
            renderCourses();
            showToast('លុបវគ្គសិក្សាបានជោគជ័យ!', 'success');
        }
    }


    // STUDENT MODAL

    function openStudentModal() {
        document.getElementById('studentModal').classList.add('active');
        document.getElementById('studentForm').reset();
    }

    function closeStudentModal() {
        document.getElementById('studentModal').classList.remove('active');
    }

    document.getElementById('studentForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('std-name').value.trim();
        const gender = document.getElementById('std-gender').value;
        const classRoom = document.getElementById('std-class').value.trim();
        const phone = document.getElementById('std-phone').value.trim();
        if (!name || !classRoom || !phone) return;
        const id = 'STU-' + String(studentsData.length + 1).padStart(3, '0');
        studentsData.push({ id, name, gender, class: classRoom, phone });
        closeStudentModal();
        renderStudents();
        renderDashboard();
        showToast('បន្ថែមសិស្សបានជោគជ័យ!', 'success');
    });


    // TEACHER MODAL

    function openTeacherModal() {
        document.getElementById('teacherModal').classList.add('active');
        document.getElementById('teacherForm').reset();
    }

    function closeTeacherModal() {
        document.getElementById('teacherModal').classList.remove('active');
    }

    document.getElementById('teacherForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('tch-name').value.trim();
        const subject = document.getElementById('tch-subject').value.trim();
        const email = document.getElementById('tch-email').value.trim();
        const phone = document.getElementById('tch-phone').value.trim();
        if (!name || !subject || !email || !phone) return;
        const id = 'TCH-' + String(teachersData.length + 1).padStart(3, '0');
        teachersData.push({ id, name, subject, email, phone });
        closeTeacherModal();
        renderTeachers();
        renderDashboard();
        showToast('បន្ថែមគ្រូបង្រៀនបានជោគជ័យ!', 'success');
    });


    // INVOICE MODAL

    function openNewInvoiceModal() {
        const select = document.getElementById('inv-student-select');
        select.innerHTML = '<option value="">-- ជ្រើសរើសសិស្ស --</option>' +
            studentsData.map(s => `<option value="${s.name}">${s.name} (${s.class})</option>`).join('');
        document.getElementById('newInvoiceModal').classList.add('active');
        document.getElementById('newInvoiceForm').reset();
        new QRCode(document.getElementById('invoiceQRCode'), {
            text: 'KHQR-PAYMENT-DEMO',
            width: 100,
            height: 100,
        });
    }

    function closeNewInvoiceModal() {
        document.getElementById('newInvoiceModal').classList.remove('active');
    }

    function toggleInvoiceQR() {
        const method = document.getElementById('inv-method').value;
        const qrPreview = document.getElementById('invoiceQRPreview');
        const otherInfo = document.getElementById('invoiceOtherInfo');
        if (method === 'ABA Pay / KHQR') {
            qrPreview.style.display = 'flex';
            otherInfo.classList.add('hidden');
        } else {
            qrPreview.style.display = 'none';
            otherInfo.classList.remove('hidden');
        }
    }

    document.getElementById('newInvoiceForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const student = document.getElementById('inv-student-select').value;
        const desc = document.getElementById('inv-description').value.trim();
        const amount = parseFloat(document.getElementById('inv-amount').value);
        const status = document.getElementById('inv-status').value;
        const method = document.getElementById('inv-method').value;
        if (!student || !desc || !amount) return;

        const studentObj = studentsData.find(s => s.name === student);
        const classRoom = studentObj ? studentObj.class : '-';
        const id = 'INV-2026-' + String(paymentsData.length + 1).padStart(3, '0');
        const date = new Date().toISOString().split('T')[0];

        paymentsData.push({ id, student, class: classRoom, desc, amount, date, status, method });
        closeNewInvoiceModal();
        renderPayments();
        showToast('បង្កើតវិក្កយបត្របានជោគជ័យ!', 'success');
    });

    function viewInvoice(id) {
        const p = paymentsData.find(item => item.id === id);
        if (!p) return;

        document.getElementById('inv-view-id').textContent = p.id;
        document.getElementById('inv-view-date').textContent = 'កាលបរិច្ឆេទ: ' + p.date;
        document.getElementById('inv-view-student').textContent = p.student;
        document.getElementById('inv-view-class').textContent = 'ថ្នាក់រៀន: ' + p.class;
        document.getElementById('inv-view-phone').textContent = 'ទូរស័ព្ទ: ' + (studentsData.find(s => s.name === p.student)?.phone || '-');
        document.getElementById('inv-view-status-badge').textContent = p.status === 'paid' ? 'បានបង់រួច (PAID)' : 'មិនបានបង់ (UNPAID)';
        document.getElementById('inv-view-status-badge').style.background = p.status === 'paid' ? '#d1fae5' : '#fef3c7';
        document.getElementById('inv-view-status-badge').style.color = p.status === 'paid' ? '#047857' : '#b45309';
        document.getElementById('inv-view-method').textContent = 'វិធីសាស្ត្រ: ' + p.method;
        document.getElementById('inv-view-desc').textContent = p.desc;
        document.getElementById('inv-view-amount').textContent = '$' + p.amount.toFixed(2);
        document.getElementById('inv-view-subtotal').textContent = '$' + p.amount.toFixed(2);
        document.getElementById('inv-view-total').textContent = '$' + p.amount.toFixed(2);

        document.getElementById('invoiceViewModal').classList.add('active');
    }

    function closeInvoiceModal() {
        document.getElementById('invoiceViewModal').classList.remove('active');
    }

    function triggerPrintInvoice() {
        window.print();
    }


    // REGISTRATION MODAL (MULTI-STEP)

    let selectedCourse = null;

    function openRegisterCourseModal() {
        document.getElementById('registerCourseModal').classList.add('active');
        goToRegStep(1);
        document.getElementById('regStep1Form').reset();
        selectedCourse = null;
        document.getElementById('regSelectedCourse').classList.add('hidden');
        document.getElementById('regContinueBtn').disabled = true;
        document.getElementById('regContinueBtn').style.opacity = '0.5';
        document.getElementById('regContinueBtn').style.cursor = 'not-allowed';
        renderRegCourseList();
        // Reset payment method
        document.querySelector('input[name="regPayment"][value="khqr"]').checked = true;
        toggleRegPayment();
        // Generate QR
        new QRCode(document.getElementById('regPaymentQR'), {
            text: 'KHQR-REG-DEMO',
            width: 120,
            height: 120,
        });
    }

    function closeRegisterCourseModal() {
        document.getElementById('registerCourseModal').classList.remove('active');
    }

    function renderRegCourseList() {
        const container = document.getElementById('regCourseList');
        if (!container) return;
        container.innerHTML = coursesData.map(c => `
            <div onclick="selectRegCourse(${c.id})" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 12px; border: 2px solid ${selectedCourse && selectedCourse.id === c.id ? '#2563eb' : '#e2e8f0'}; background: ${selectedCourse && selectedCourse.id === c.id ? '#eff6ff' : 'white'}; cursor: pointer; transition: all 0.2s; margin-bottom: 0.5rem;" onmouseover="this.style.borderColor='#93c5fd'" onmouseout="this.style.borderColor='${selectedCourse && selectedCourse.id === c.id ? '#2563eb' : '#e2e8f0'}'">
                <img src="${c.img}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: cover;">
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.875rem; color: #1e293b;">${c.name}</div>
                    <div style="font-size: 0.75rem; color: #64748b;">${c.duration} | ${c.students} សិស្ស</div>
                </div>
                <div style="font-weight: 700; color: #003366;">$${c.price}</div>
            </div>
        `).join('');
    }

    function selectRegCourse(id) {
        selectedCourse = coursesData.find(c => c.id === id);
        renderRegCourseList();
        const detail = document.getElementById('regSelectedCourse');
        if (selectedCourse) {
            detail.classList.remove('hidden');
            document.getElementById('regSelectedImg').src = selectedCourse.img;
            document.getElementById('regSelectedName').textContent = selectedCourse.name;
            document.getElementById('regSelectedDuration').textContent = selectedCourse.duration + ' | ' + selectedCourse.students + ' សិស្ស';
            document.getElementById('regSelectedPrice').textContent = '$' + selectedCourse.price;
            document.getElementById('regContinueBtn').disabled = false;
            document.getElementById('regContinueBtn').style.opacity = '1';
            document.getElementById('regContinueBtn').style.cursor = 'pointer';
        } else {
            detail.classList.add('hidden');
            document.getElementById('regContinueBtn').disabled = true;
            document.getElementById('regContinueBtn').style.opacity = '0.5';
            document.getElementById('regContinueBtn').style.cursor = 'not-allowed';
        }
    }

    function goToRegStep(step, event) {
        if (event) event.preventDefault();

        document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.step-indicator .step').forEach(s => s.classList.remove('active'));

        document.getElementById(`reg-step-${step}`).classList.add('active');
        document.querySelector(`.step-indicator .step[data-step="${step}"]`).classList.add('active');

        if (step === 2) {
            renderRegCourseList();
        }

        if (step === 3) {
            if (!selectedCourse) {
                showToast('សូមជ្រើសរើសវគ្គសិក្សាជាមុន!', 'error');
                return;
            }
            document.getElementById('regSummaryName').textContent = document.getElementById('reg-name').value || '-';
            document.getElementById('regSummaryPhone').textContent = document.getElementById('reg-phone').value || '-';
            document.getElementById('regSummaryCourse').textContent = selectedCourse.name;
            document.getElementById('regSummaryTotal').textContent = '$' + selectedCourse.price;
            document.getElementById('regCashAmount').textContent = selectedCourse.price;

            // Regenerate QR with actual amount
            const qrContainer = document.getElementById('regPaymentQR');
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: `KHQR-${selectedCourse.price}-${Date.now()}`,
                width: 120,
                height: 120,
            });
        }
    }

    function toggleRegPayment() {
        const method = document.querySelector('input[name="regPayment"]:checked').value;
        const qrBox = document.getElementById('regQRBox');
        const cashBox = document.getElementById('regCashBox');
        if (method === 'khqr') {
            qrBox.classList.remove('hidden');
            cashBox.classList.add('hidden');
        } else {
            qrBox.classList.add('hidden');
            cashBox.classList.remove('hidden');
        }
    }

    function submitRegistration() {
        if (!selectedCourse) {
            showToast('សូមជ្រើសរើសវគ្គសិក្សាជាមុន!', 'error');
            return;
        }

        const name = document.getElementById('reg-name').value.trim();
        const phone = document.getElementById('reg-phone').value.trim();
        if (!name || !phone) {
            showToast('សូមបំពេញព័ត៌មានចាំបាច់!', 'error');
            return;
        }

        const id = 'REG-' + String(registrationsData.length + 1).padStart(3, '0');
        const date = new Date().toISOString().split('T')[0];
        registrationsData.push({
            id,
            name,
            course: selectedCourse.name,
            price: selectedCourse.price,
            phone,
            date,
            status: 'pending',
        });

        closeRegisterCourseModal();

        document.getElementById('regSuccessId').textContent = id;
        document.getElementById('regSuccessName').textContent = name;
        document.getElementById('regSuccessCourse').textContent = selectedCourse.name;
        document.getElementById('regSuccessModal').classList.add('active');

        renderAdminRegistrations();
        renderDashboard();
        updateRegBadge();
    }

    function closeRegSuccessModal() {
        document.getElementById('regSuccessModal').classList.remove('active');
    }

    function updateRegBadge() {
        const badge = document.getElementById('regCountBadge');
        if (badge) {
            const pending = registrationsData.filter(r => r.status === 'pending').length;
            if (pending > 0) {
                badge.textContent = pending;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }


    // TOAST

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const icon = document.getElementById('toast-icon');
        const msg = document.getElementById('toast-message');

        msg.textContent = message;
        if (type === 'success') {
            icon.className = 'fa-solid fa-circle-check';
            icon.style.color = '#34d399';
        } else if (type === 'error') {
            icon.className = 'fa-solid fa-circle-exclamation';
            icon.style.color = '#f87171';
        } else {
            icon.className = 'fa-solid fa-circle-info';
            icon.style.color = '#60a5fa';
        }

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }


    // CONTACT FORM

    document.getElementById('contactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ!', 'success');
        this.reset();
    });


    // INIT

    renderFaculty();
    renderCourses();
    renderDashboard();
    updateRegBadge();

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
        }
    });