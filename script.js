// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .service-card, .team-card, .news-card, .feature, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email адрес');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add loading state to body
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
`;

document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Hover effects for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add active class to current navigation item
function setActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavItem);

// Team Modal Functionality
const teamModal = document.getElementById('teamModal');
const teamCloseBtn = teamModal.querySelector('.close');
const teamCards = document.querySelectorAll('.team-card');

// Team data from vysota.ru
const teamData = {
    artemiev: {
        name: "Артемьев Олег",
        position: "Президент компании «Высота»",
        experience: "В девелопменте с 1998 г.",
        education: "Московский Государственный Технический Университет Радиотехники, Электроники и Автоматики – Прикладная математика. Ученая Степень – Mагистра Бизнес администрирования, США",
        workExperience: "Учредитель компаний State Development и Высота. Более 15 реализованных проектов. Строительства жилых домов в районе Остоженки - «Золотой миле»",
        projects: [
            "Более 15 реализованных проектов",
            "Строительство жилых домов в районе Остоженки - «Золотой миле»"
        ],
        hobbies: "Рекордсмен России по парашютному спорту, неоднократный победитель парусных регат"
    },
    aleksandrovsky: {
        name: "Александровский Юрий Юрьевич",
        position: "Генеральный директор Высота-ИНЖИНИРИНГ, Высота-Управление",
        experience: "Более 15 лет в девелопменте",
        education: "Финансовая академия при Правительстве РФ. Специализация – мировая экономика. Московский государственный строительный университет – промышленное и гражданское строительство. Manchester Business School – MBA for construction executives",
        workExperience: "Коммерческие банки, инвестиционная компания Газпромбанк-Инвест",
        projects: [
            "Многоквартирные дома (Москва, Краснодарский край, Архангельская область, Ярославская область)",
            "Коттеджные поселки (Московская область)",
            "Складские комплексы (Московская область)"
        ],
        hobbies: "Горные лыжи, любительский хоккей с шайбой"
    },
    don: {
        name: "Дон Алексей",
        position: "Технический директор",
        experience: "Более 10 лет в строительстве",
        education: "Московский Государственный Строительный Университет – Кафедра САПР (Системы автоматизированного проектирования)",
        workExperience: "Компании Mirax Group, ДОН-Строй, Высота",
        projects: [
            "ЖК «Кутузовская Ривьера»",
            "ЖК «Велл Хаус»",
            "Дома на улице Маршала Бирюзова 33, 41",
            "ЖК «Измайловский»",
            "Общей площадью более 350 тыс. кв.м"
        ],
        hobbies: "Сноуборд, кайтсёрфинг"
    },
    agapov: {
        name: "Агапов Николай",
        position: "Директор Департамента технического надзора",
        experience: "Более 15 лет в строительстве",
        education: "Оренбургский государственный университет 1998 г. - инженер строитель по специальности ПГС",
        workExperience: "ООО «КЕЙ холдинг», ООО «ЛИСТ», ПСФ «КРОСТ», ООО «КонтиВысотСтрой», ЗАО «АКАДЕМКАПСТРОЙ»",
        projects: [
            "Объекты промышленного и гражданского назначения"
        ],
        hobbies: "Охота"
    },
    khavanov: {
        name: "Хаванов Алексей",
        position: "Руководитель проекта «Aero City»",
        experience: "Более 10 лет в строительстве",
        education: "Московский Государственный Строительный Университет - Инженер-Строитель",
        workExperience: "Компании ООО «Группа Модуль», ЗАО «Поли-СК», ООО «Стриминвест текник групп», ООО «ВЫСОТА». От инженера до руководителя проекта",
        projects: [
            "Более 10 реализованных объектов",
            "ЖК «Монолит Плаза», ул. Косыгина, д. 19",
            "Офисный центр «Мерседес Бенз Плаза» Ленинградский пр. д. 39",
            "Офисный центр «Берлинский дом» ул. Петровка д. 5/5",
            "Аэропорт «Шереметьево» Терминал «С»",
            "Гостинично-деловой центр площадью 42 500 м² г.Химки",
            "Административно-деловой центр общей площадью 55 330 м² на 1-ом км Рублево-Успенское шоссе"
        ],
        hobbies: "Хоккей, горные лыжи"
    },
    vronsky: {
        name: "Вронский Руслан",
        position: "Руководитель проекта «Староалексеевская»",
        experience: "Более 15 лет в строительстве",
        education: "Нижегородское Высшее Военное Строительное командное училище (ВВСКУ), инженер по строительству и эксплуатации зданий и сооружений",
        workExperience: "ВВС (строительство различных объектов), Компания «Система А», КР Пропертис, RIG Group, Компания «Балтия», Высота ИНЖИНИРИРГ",
        projects: [
            "Здание Академии Бизнеса и Управления (МАБиУ) Марьина Роща",
            "Оздоровительный комплекс «Best Gim», Митино",
            "БЦ «Салют» ул. Сущевская",
            "ТРК г. Сергиев Посад",
            "Гостиница «Балтия» г. Санкт Петербург"
        ],
        hobbies: "Айкидо, туризм, рыбалка"
    },
    shapovalov: {
        name: "Шаповалов Игорь",
        position: "Руководитель проекта «Международный центр хирургии и реабилитации ФГБУ НМИЦ кардиологии» им. академика Е.И. Чазова Министерства здравоохранения РФ",
        experience: "Более 20 лет в строительстве",
        education: "Каменец-Подольское Высшее Военно-инженерное командное училище имени маршала инженерных войск В. К. Харченко (КПВВИКУ), инженер механик по эксплуатации машин инженерного вооружения (1989г.), подполковник. Кандидат технических наук (1998г.), старший научный сотрудник (2000г.). Курсы переподготовки: 2013г, Учебный центр «МОСДОР», г. Москва, Технический надзор по профилю: «Деятельность по строительству зданий и сооружений I и II уровней ответственности, осуществление строительного контроля Застройщиком»",
        workExperience: "Обширный опыт в строительстве и техническом надзоре",
        projects: [
            "ТЦ «МЕТРОПОЛИС» (1-я очередь)",
            "ТРЦ «Галерея» (Санкт-Петербург)",
            "ТРЦ «Галерея» (Краснодар)",
            "Многоквартирные дома (Псков, Московская область)",
            "Коттеджные поселки (Московская область)",
            "Комплексы отопительно-производственных котельных для нужд Министерства обороны России"
        ],
        hobbies: "Путешествия, любительский футбол и хоккей с шайбой, большой теннис, рыбалка"
    },
    dadayan: {
        name: "Дадаян Диана",
        position: "Руководитель юридической службы",
        experience: "Более 10 лет в юридической сфере",
        education: "Московский университет потребительской кооперации - юриспруденция",
        workExperience: "Производственная компания «Старатели», ООО «Высота»",
        projects: [
            "Юридическое сопровождение проекта по строительству и вводу в эксплуатацию завода строительных смесей марки «Старатели»",
            "Юридическое сопровождение строительства и ввода в эксплуатацию коттеджного поселка «Клуб 20'71»",
            "Строительство и ввод в эксплуатацию БЦ Нахимов"
        ],
        hobbies: "Юридическая практика, чтение профессиональной литературы"
    },
    kholodnaya: {
        name: "Холодная Надежда",
        position: "Директор департамента коммерческой недвижимости",
        experience: "Более 15 лет в сфере недвижимости",
        education: "Современная гуманитарная академия",
        workExperience: "Группа компаний Стройтех, ООО «Авеста и Ко», ООО «ВЫСОТА УПРАВЛЕНИЕ»",
        projects: [
            "Бизнес центр «Нахимов»",
            "Деловой центр «Аэро сити»",
            "Многофункциональный комплекс «Poklonka place»"
        ],
        hobbies: "Путешествия"
    }
};

// Open team modal function
function openTeamModal(memberId) {
    const memberData = teamData[memberId];
    if (!memberData) return;

    // Update modal content
    document.getElementById('modalTeamName').textContent = memberData.name;
    document.getElementById('modalTeamPosition').innerHTML = `<i class="fas fa-briefcase"></i> ${memberData.position}`;
    document.getElementById('modalTeamExperience').innerHTML = `<i class="fas fa-clock"></i> ${memberData.experience}`;
    document.getElementById('modalTeamEducation').innerHTML = `<p>${memberData.education}</p>`;
    document.getElementById('modalTeamWorkExperience').innerHTML = `<p>${memberData.workExperience}</p>`;
    
    // Update projects
    const projectsContainer = document.getElementById('modalTeamProjects');
    projectsContainer.innerHTML = '';
    if (memberData.projects && memberData.projects.length > 0) {
        const projectsList = document.createElement('ul');
        memberData.projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project;
            projectsList.appendChild(li);
        });
        projectsContainer.appendChild(projectsList);
    } else {
        projectsContainer.innerHTML = '<p>Информация о проектах не указана</p>';
    }
    
    // Update hobbies
    document.getElementById('modalTeamHobbies').innerHTML = `<p>${memberData.hobbies}</p>`;

    // Show modal
    teamModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close team modal function
function closeTeamModal() {
    teamModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for team cards
teamCards.forEach(card => {
    const memberId = card.getAttribute('data-member');
    const detailsBtn = card.querySelector('.team-details-btn');
    
    if (detailsBtn) {
        detailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openTeamModal(memberId);
        });
    }
    
    // Also allow clicking on the entire card
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('team-details-btn')) {
            openTeamModal(memberId);
        }
    });
});

// Close team modal when clicking on close button
if (teamCloseBtn) {
    teamCloseBtn.addEventListener('click', closeTeamModal);
}

// Close team modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === teamModal) {
        closeTeamModal();
    }
});

// Close team modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && teamModal.style.display === 'block') {
        closeTeamModal();
    }
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const projectCards = document.querySelectorAll('.project-card');

// Project data from vysota.ru
const projectsData = {
    riverpark: {
        title: "River Park Towers Кутузовский",
        location: "Москва, Кутузовский проезд, д. 16",
        status: "Ведется строительство",
        description: "River Park Towers Кутузовский – это будущее Кутузовского проспекта, чистый футуризм в архитектуре и новый уровень премиального комфорта для семей. 5 башен-небоскребов в 45-46 этажей объединены единым основанием с подземным паркингом и зеленым внутренним двором. Архитектура от именитого бюро ADM отличается уникальной пластикой фасадов – башни словно парят в воздухе, играя гранями как драгоценные камни. Так были рождены собственные имена для башен: Emerald, Amber, Diamond и Lazur. Комплекс расположен в престижной части Кутузовского проспекта за Бородинской панорамой на первой линии Москвы-реки, вблизи торговых центров «Времена Года», «Океания», «Афимолл». Совсем рядом парк «Фили»",
        work: "Технический заказчик",
        specs: [
            { label: "Площадь жилого здания (кв.м)", value: "3,2415" },
            { label: "Площадь участка (га)", value: "348 кв. м" },
            { label: "Площадь застройки наземной части (кв.м)", value: "8 032,4" },
            { label: "Площадь застройки подземной части (кв.м)", value: "13 168,3" },
            { label: "Количество этажей (шт.)", value: "2-45-46+тех.эт." },
            { label: "Количество подземных этажей (шт.)", value: "3" },
            { label: "Количество квартир (шт.)", value: "2012" },
            { label: "Площадь квартир общая (кв.м)", value: "141 550,1" },
            { label: "Количество мест хранения автомобилей (м/мест)", value: "1 134" }
        ]
    },
    gazprom: {
        title: "Комплекс зданий «Газпромбанка»",
        location: "Москва",
        status: "Завершен",
        description: "Современный офисный комплекс класса A+ для крупнейшего российского банка. Проект включает в себя многофункциональный деловой центр с передовыми технологиями и экологичными решениями.",
        work: "Технический заказчик",
        specs: [
            { label: "Класс здания", value: "A+" },
            { label: "Количество этажей", value: "25" },
            { label: "Общая площадь (кв.м)", value: "50 000" },
            { label: "Площадь участка (га)", value: "2.5" },
            { label: "Количество подземных этажей", value: "3" },
            { label: "Парковочных мест", value: "500" }
        ]
    },
    sportmaster: {
        title: "Штаб-квартиры «Спортмастер» и «O'stin»",
        location: "Москва",
        status: "Завершен",
        description: "Корпоративные офисы для ведущих спортивных и fashion брендов России. Современное здание с продуманной инфраструктурой и комфортными условиями для работы сотрудников.",
        work: "Технический заказчик",
        specs: [
            { label: "Количество этажей", value: "15" },
            { label: "Общая площадь (кв.м)", value: "30 000" },
            { label: "Количество компаний", value: "2" },
            { label: "Парковочных мест", value: "200" },
            { label: "Конференц-залов", value: "5" }
        ]
    },
    hotel: {
        title: "Гостиница на Зубовской площади",
        location: "Москва, Зубовская площадь",
        status: "Завершен",
        description: "Современная гостиница 4* в историческом центре Москвы. Уникальное сочетание классической архитектуры и современных технологий гостеприимства.",
        work: "Технический заказчик",
        specs: [
            { label: "Категория гостиницы", value: "4*" },
            { label: "Количество номеров", value: "150" },
            { label: "Количество этажей", value: "12" },
            { label: "Общая площадь (кв.м)", value: "25 000" },
            { label: "Ресторанов", value: "2" },
            { label: "Конференц-залов", value: "3" }
        ]
    },
    medical: {
        title: "Международный центр хирургии и реабилитации",
        location: "Москва",
        status: "Завершен",
        description: "Современный медицинский центр с передовым оборудованием и инновационными методами лечения. Центр специализируется на сложных хирургических операциях и реабилитации пациентов.",
        work: "Технический заказчик",
        specs: [
            { label: "Количество этажей", value: "8" },
            { label: "Общая площадь (кв.м)", value: "20 000" },
            { label: "Количество коек", value: "200" },
            { label: "Операционных залов", value: "8" },
            { label: "Отделений реабилитации", value: "5" },
            { label: "Парковочных мест", value: "150" }
        ]
    },
    business: {
        title: "Деловой квартал Poklonka place",
        location: "Москва",
        status: "Завершен",
        description: "Современный деловой квартал с офисами класса A и торговыми площадями. Комплекс включает в себя многофункциональные здания с развитой инфраструктурой.",
        work: "Технический заказчик",
        specs: [
            { label: "Количество этажей", value: "18" },
            { label: "Общая площадь (кв.м)", value: "45 000" },
            { label: "Класс здания", value: "A" },
            { label: "Офисных помещений", value: "120" },
            { label: "Торговых площадей", value: "5 000" },
            { label: "Парковочных мест", value: "300" }
        ]
    }
};

// Open modal function
function openProjectModal(projectId) {
    const projectData = projectsData[projectId];
    if (!projectData) return;

    // Update modal content
    document.getElementById('modalProjectTitle').textContent = projectData.title;
    document.getElementById('modalProjectLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${projectData.location}`;
    document.getElementById('modalProjectStatus').innerHTML = `<i class="fas fa-info-circle"></i> ${projectData.status}`;
    document.getElementById('modalProjectDescription').innerHTML = `<p>${projectData.description}</p>`;
    document.getElementById('modalProjectWork').textContent = projectData.work;

    // Update specifications
    const specsContainer = document.getElementById('modalProjectSpecs');
    specsContainer.innerHTML = '';
    
    projectData.specs.forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-label">${spec.label}</span>
            <span class="spec-value">${spec.value}</span>
        `;
        specsContainer.appendChild(specItem);
    });

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
projectCards.forEach(card => {
    const projectId = card.getAttribute('data-project');
    const detailsBtn = card.querySelector('.project-details-btn');
    
    if (detailsBtn) {
        detailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openProjectModal(projectId);
        });
    }
    
    // Also allow clicking on the entire card
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('project-details-btn')) {
            openProjectModal(projectId);
        }
    });
});

// Close modal when clicking on close button
if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
});

// News Modal Functionality
const newsModal = document.getElementById('newsModal');
const newsCloseBtn = newsModal.querySelector('.close');
const newsCards = document.querySelectorAll('.news-card');
const prevNewsBtn = document.getElementById('prevNewsBtn');
const nextNewsBtn = document.getElementById('nextNewsBtn');

let currentNewsIndex = 0;
const newsOrder = [
    'riverpark-completion',
    'new-project-moscow',
    'quality-award',
    'gazprom-completion',
    'medical-center',
    'business-quarter'
];

// News data
const newsData = {
    'riverpark-completion': {
        title: "Завершен проект жилого комплекса «River Park Towers»",
        date: "15 декабря 2023",
        category: "Завершение проекта",
        excerpt: "Успешно завершен строительный проект жилого комплекса премиум-класса River Park Towers на Кутузовском проспекте",
        content: `
            <p>ГК Высота с гордостью сообщает о завершении строительства одного из самых масштабных проектов в своей истории – жилого комплекса премиум-класса River Park Towers на Кутузовском проспекте.</p>
            
            <p>River Park Towers – это уникальный проект, состоящий из 5 башен-небоскребов высотой 45-46 этажей, объединенных единым основанием с подземным паркингом и зеленым внутренним двором. Архитектура от именитого бюро ADM отличается уникальной пластикой фасадов – башни словно парят в воздухе, играя гранями как драгоценные камни.</p>
            
            <p>Комплекс расположен в престижной части Кутузовского проспекта за Бородинской панорамой на первой линии Москвы-реки, вблизи торговых центров «Времена Года», «Океания», «Афимолл». Совсем рядом парк «Фили».</p>
            
            <p>Технико-экономические показатели проекта:</p>
            <ul>
                <li>Общая площадь квартир: 141 550,1 кв.м</li>
                <li>Количество квартир: 2012</li>
                <li>Количество этажей: 45-46 + технический этаж</li>
                <li>Подземных этажей: 3</li>
                <li>Парковочных мест: 1 134</li>
            </ul>
            
            <p>Проект полностью готов к заселению. Все инженерные системы запущены и протестированы, благоустройство территории завершено.</p>
        `,
        project: "River Park Towers Кутузовский – жилой комплекс премиум-класса с уникальной архитектурой и развитой инфраструктурой. Проект включает 5 башен-небоскребов с собственными именами: Emerald, Amber, Diamond и Lazur.",
        team: "Руководитель проекта: Хаванов Алексей. В команде проекта работали специалисты с опытом реализации крупных жилых комплексов премиум-класса."
    },
    'new-project-moscow': {
        title: "Новый проект в центре Москвы",
        date: "3 декабря 2023",
        category: "Новый проект",
        excerpt: "Начинаем реализацию нового элитного жилого комплекса в престижном районе Москвы",
        content: `
            <p>ГК Высота объявляет о начале реализации нового масштабного проекта – элитного жилого комплекса в центре Москвы.</p>
            
            <p>Проект будет реализован в одном из самых престижных районов столицы, где сочетаются историческая архитектура и современные технологии строительства. Новый комплекс станет образцом современного девелопмента с учетом всех требований к комфорту и качеству жизни.</p>
            
            <p>Особенности проекта:</p>
            <ul>
                <li>Элитные квартиры с панорамным остеклением</li>
                <li>Собственная инфраструктура и сервисы</li>
                <li>Подземный паркинг</li>
                <li>Ландшафтный дизайн территории</li>
                <li>Современные инженерные решения</li>
            </ul>
            
            <p>Проект находится на стадии проектирования. Ожидаемый срок завершения – 2025 год.</p>
        `,
        project: "Новый элитный жилой комплекс в центре Москвы. Проект находится на стадии разработки концепции и проектирования.",
        team: "Команда проекта формируется. Руководитель будет назначен в ближайшее время."
    },
    'quality-award': {
        title: "Награда за качество строительства",
        date: "20 ноября 2023",
        category: "Достижения",
        excerpt: "ГК Высота получила престижную награду за качество строительства и инновационные решения",
        content: `
            <p>ГК Высота удостоена престижной награды в области строительства за выдающиеся достижения в качестве строительства и внедрение инновационных решений.</p>
            
            <p>Награда была вручена на ежегодной церемонии «Лучшие строительные проекты года» за комплексный подход к качеству на всех этапах реализации проектов, от проектирования до сдачи в эксплуатацию.</p>
            
            <p>Жюри отметило следующие достижения компании:</p>
            <ul>
                <li>Высокое качество строительных работ</li>
                <li>Внедрение современных технологий</li>
                <li>Соблюдение всех экологических стандартов</li>
                <li>Инновационные инженерные решения</li>
                <li>Ответственный подход к безопасности</li>
            </ul>
            
            <p>Эта награда подтверждает лидерские позиции ГК Высота в строительной отрасли и признание профессионального сообщества.</p>
        `,
        project: "Награда получена за совокупность реализованных проектов компании, включая River Park Towers, комплекс зданий Газпромбанка и другие.",
        team: "Награда является результатом работы всей команды ГК Высота под руководством президента компании Артемьева Олега."
    },
    'gazprom-completion': {
        title: "Завершен комплекс зданий Газпромбанка",
        date: "10 ноября 2023",
        category: "Завершение проекта",
        excerpt: "Успешно завершен строительный проект офисного комплекса класса A+ для Газпромбанка",
        content: `
            <p>ГК Высота завершила строительство современного офисного комплекса класса A+ для Газпромбанка – одного из крупнейших банков России.</p>
            
            <p>Комплекс зданий Газпромбанка представляет собой многофункциональный деловой центр с передовыми технологиями и экологичными решениями. Здание соответствует самым высоким стандартам качества и комфорта для работы.</p>
            
            <p>Характеристики проекта:</p>
            <ul>
                <li>Класс здания: A+</li>
                <li>Количество этажей: 25</li>
                <li>Общая площадь: 50 000 кв.м</li>
                <li>Парковочных мест: 500</li>
                <li>Подземных этажей: 3</li>
            </ul>
            
            <p>Комплекс оснащен современными системами безопасности, климат-контроля и энергосбережения. Все офисные помещения готовы к заселению.</p>
        `,
        project: "Комплекс зданий Газпромбанка – современный офисный комплекс класса A+ с развитой инфраструктурой и передовыми технологиями.",
        team: "Руководитель проекта: Александровский Юрий Юрьевич. В команде работали специалисты с опытом реализации крупных офисных проектов."
    },
    'medical-center': {
        title: "Открытие медицинского центра",
        date: "25 октября 2023",
        category: "Открытие",
        excerpt: "Состоялось торжественное открытие Международного центра хирургии и реабилитации",
        content: `
            <p>Состоялось торжественное открытие Международного центра хирургии и реабилитации ФГБУ НМИЦ кардиологии им. академика Е.И. Чазова Министерства здравоохранения РФ.</p>
            
            <p>Центр оснащен самым современным медицинским оборудованием и предназначен для проведения сложных хирургических операций и реабилитации пациентов. Проект реализован с учетом всех требований современной медицины.</p>
            
            <p>Возможности центра:</p>
            <ul>
                <li>8 операционных залов</li>
                <li>200 коек для пациентов</li>
                <li>5 отделений реабилитации</li>
                <li>Современное диагностическое оборудование</li>
                <li>Комфортные условия для пациентов и персонала</li>
            </ul>
            
            <p>Центр готов к приему пациентов и проведению высокотехнологичных медицинских процедур.</p>
        `,
        project: "Международный центр хирургии и реабилитации – современный медицинский центр с передовым оборудованием для сложных операций и реабилитации.",
        team: "Руководитель проекта: Шаповалов Игорь. Команда включала специалистов с опытом строительства медицинских объектов."
    },
    'business-quarter': {
        title: "Завершен деловой квартал Poklonka place",
        date: "15 октября 2023",
        category: "Завершение проекта",
        excerpt: "Успешно завершен строительный проект современного делового квартала в центре Москвы",
        content: `
            <p>ГК Высота завершила строительство современного делового квартала Poklonka place в центре Москвы. Проект представляет собой многофункциональный комплекс с офисами класса A и торговыми площадями.</p>
            
            <p>Poklonka place стал новым центром деловой активности в столице, объединив в себе современные офисные пространства, торговые площади и развитую инфраструктуру.</p>
            
            <p>Характеристики квартала:</p>
            <ul>
                <li>18 этажей</li>
                <li>Общая площадь: 45 000 кв.м</li>
                <li>120 офисных помещений</li>
                <li>5 000 кв.м торговых площадей</li>
                <li>300 парковочных мест</li>
            </ul>
            
            <p>Квартал полностью готов к заселению арендаторами и началу коммерческой деятельности.</p>
        `,
        project: "Деловой квартал Poklonka place – многофункциональный комплекс с офисами класса A и торговыми площадями в центре Москвы.",
        team: "Руководитель проекта: Холодная Надежда. Команда специалистов по коммерческой недвижимости."
    }
};

// Open news modal function
function openNewsModal(newsId) {
    const news = newsData[newsId];
    if (!news) return;

    // Update modal content
    document.getElementById('modalNewsTitle').textContent = news.title;
    document.getElementById('modalNewsDate').innerHTML = `<i class="fas fa-calendar"></i> ${news.date}`;
    document.getElementById('modalNewsCategory').innerHTML = `<i class="fas fa-tag"></i> ${news.category}`;
    document.getElementById('modalNewsExcerpt').textContent = news.excerpt;
    document.getElementById('modalNewsContent').innerHTML = news.content;
    document.getElementById('modalNewsProject').innerHTML = `<p>${news.project}</p>`;
    document.getElementById('modalNewsTeam').innerHTML = `<p>${news.team}</p>`;

    // Update current news index
    currentNewsIndex = newsOrder.indexOf(newsId);

    // Update navigation buttons
    updateNewsNavigation();

    // Show modal
    newsModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update news navigation buttons
function updateNewsNavigation() {
    prevNewsBtn.disabled = currentNewsIndex === 0;
    nextNewsBtn.disabled = currentNewsIndex === newsOrder.length - 1;
    
    prevNewsBtn.style.opacity = currentNewsIndex === 0 ? '0.5' : '1';
    nextNewsBtn.style.opacity = currentNewsIndex === newsOrder.length - 1 ? '0.5' : '1';
}

// Navigate to previous news
function showPreviousNews() {
    if (currentNewsIndex > 0) {
        currentNewsIndex--;
        const newsId = newsOrder[currentNewsIndex];
        openNewsModal(newsId);
    }
}

// Navigate to next news
function showNextNews() {
    if (currentNewsIndex < newsOrder.length - 1) {
        currentNewsIndex++;
        const newsId = newsOrder[currentNewsIndex];
        openNewsModal(newsId);
    }
}

// Close news modal function
function closeNewsModal() {
    newsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for news cards
newsCards.forEach(card => {
    const newsId = card.getAttribute('data-news');
    const detailsBtn = card.querySelector('.news-details-btn');
    
    if (detailsBtn) {
        detailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openNewsModal(newsId);
        });
    }
    
    // Also allow clicking on the entire card
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('news-details-btn')) {
            openNewsModal(newsId);
        }
    });
});

// Navigation event listeners
if (prevNewsBtn) {
    prevNewsBtn.addEventListener('click', showPreviousNews);
}

if (nextNewsBtn) {
    nextNewsBtn.addEventListener('click', showNextNews);
}

// Close news modal when clicking on close button
if (newsCloseBtn) {
    newsCloseBtn.addEventListener('click', closeNewsModal);
}

// Close news modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === newsModal) {
        closeNewsModal();
    }
});

// Close news modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsModal.style.display === 'block') {
        closeNewsModal();
    }
    
    // Navigation with arrow keys
    if (newsModal.style.display === 'block') {
        if (e.key === 'ArrowLeft' && currentNewsIndex > 0) {
            showPreviousNews();
        } else if (e.key === 'ArrowRight' && currentNewsIndex < newsOrder.length - 1) {
            showNextNews();
        }
    }
}); 