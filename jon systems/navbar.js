(function () {
    const mount = document.querySelector('[data-site-navbar]');

    if (!mount) {
        return;
    }

    const preferredLanguage = window.localStorage.getItem('jonSystemsLanguageV2') || 'de';

    const labels = {
        en: {
            home: 'Home',
            printing: '3D Printing',
            cad: 'CAD Design',
            repairs: 'Repairs',
            programming: 'Programming',
            consulting: 'Consulting',
            projects: 'Projects',
            contact: 'Contact',
            impressum: 'Impressum',
        },
        de: {
            home: 'Startseite',
            printing: '3D-Druck',
            cad: 'CAD-Design',
            repairs: 'Reparaturen',
            programming: 'Programmierung',
            consulting: 'Beratung',
            projects: 'Projekte',
            contact: 'Kontakt',
            impressum: 'Impressum',
        },
    };

    const navLabels = labels[preferredLanguage] || labels.de;

    mount.innerHTML = `
        <nav>
            <div id="nav" class="nav">
                <a href="index.html" data-label-en="Home" data-label-de="Startseite">${navLabels.home}</a>
                <a href="3dPrinting.html" data-label-en="3D Printing" data-label-de="3D-Druck">${navLabels.printing}</a>
                <a href="cadDesign.html" data-label-en="CAD Design" data-label-de="CAD-Design">${navLabels.cad}</a>
                <a href="repairs.html" data-label-en="Repairs" data-label-de="Reparaturen">${navLabels.repairs}</a>
                <a href="programming.html" data-label-en="Programming" data-label-de="Programmierung">${navLabels.programming}</a>
                <a href="consulting.html" data-label-en="Consulting" data-label-de="Beratung">${navLabels.consulting}</a>
                <a href="projects.html" data-label-en="Projects" data-label-de="Projekte">${navLabels.projects}</a>
                <div class="rightSide">
                    <a href="contact.html" data-label-en="Contact" data-label-de="Kontakt">${navLabels.contact}</a>
                    <a href="impressum.html" data-label-en="Impressum" data-label-de="Impressum">${navLabels.impressum}</a>
                </div>
            </div>
        </nav>
    `;

    const switcher = document.createElement('div');
    switcher.className = 'site-language-switch';
    switcher.innerHTML = `
        <div class="langSwitch" aria-label="Language switcher">
            <button class="langButton ${preferredLanguage === 'en' ? 'active' : ''}" type="button" data-lang-toggle="en">EN</button>
            <button class="langButton ${preferredLanguage === 'de' ? 'active' : ''}" type="button" data-lang-toggle="de">DE</button>
        </div>
    `;

    mount.after(switcher);

    const currentFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    for (const link of mount.querySelectorAll('a[href]')) {
        const targetFile = (link.getAttribute('href') || '').split('/').pop().toLowerCase();
        const isActive = targetFile === currentFile;
        link.classList.toggle('active', isActive);
    }
})();