(function () {
    document.documentElement.classList.add('js');

    const languageButtons = document.querySelectorAll('[data-lang-toggle]');
    const preferredLanguage = window.localStorage.getItem('jonSystemsLanguageV2') || 'de';
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').replace(/\.html$/i, '').toLowerCase() || 'index';

    function rememberOriginal(element, useHtml = false) {
        const key = useHtml ? 'i18nOriginalHtml' : 'i18nOriginalText';

        if (!element.dataset[key]) {
            element.dataset[key] = useHtml ? element.innerHTML : element.textContent;
        }

        return key;
    }

    function localizeText(selector, germanText, language, options = {}) {
        const element = document.querySelector(selector);

        if (!element) {
            return;
        }

        const useHtml = options.html === true;
        const key = rememberOriginal(element, useHtml);

        if (language === 'de') {
            if (useHtml) {
                element.innerHTML = germanText;
            } else {
                element.textContent = germanText;
            }
            return;
        }

        if (useHtml) {
            element.innerHTML = element.dataset[key];
        } else {
            element.textContent = element.dataset[key];
        }
    }

    function localizeAll(selector, germanTexts, language, options = {}) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
            const germanText = germanTexts[index];

            if (typeof germanText !== 'string') {
                return;
            }

            const useHtml = options.html === true;
            const key = rememberOriginal(element, useHtml);

            if (language === 'de') {
                if (useHtml) {
                    element.innerHTML = germanText;
                } else {
                    element.textContent = germanText;
                }
                return;
            }

            if (useHtml) {
                element.innerHTML = element.dataset[key];
            } else {
                element.textContent = element.dataset[key];
            }
        });
    }

    function localizeAttr(selector, attributeName, germanValue, language) {
        const element = document.querySelector(selector);

        if (!element) {
            return;
        }

        const key = `i18nOriginal${attributeName.charAt(0).toUpperCase()}${attributeName.slice(1)}`;

        if (!element.dataset[key]) {
            element.dataset[key] = element.getAttribute(attributeName) || '';
        }

        element.setAttribute(attributeName, language === 'de' ? germanValue : element.dataset[key]);
    }

    function localizeAttrAll(selector, attributeName, germanValues, language) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
            const germanValue = germanValues[index];

            if (typeof germanValue !== 'string') {
                return;
            }

            const key = `i18nOriginal${attributeName.charAt(0).toUpperCase()}${attributeName.slice(1)}`;

            if (!element.dataset[key]) {
                element.dataset[key] = element.getAttribute(attributeName) || '';
            }

            element.setAttribute(attributeName, language === 'de' ? germanValue : element.dataset[key]);
        });
    }

    function localizeLabelAll(selector, germanValues, language) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((element, index) => {
            const germanText = germanValues[index];

            if (typeof germanText !== 'string') {
                return;
            }

            const key = 'i18nOriginalLabelText';

            if (!element.dataset[key]) {
                element.dataset[key] = element.childNodes[0]?.nodeValue || '';
            }

            if (language === 'de') {
                if (element.childNodes[0] && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                    element.childNodes[0].nodeValue = `${germanText} `;
                } else {
                    element.insertBefore(document.createTextNode(`${germanText} `), element.firstChild);
                }
            } else if (element.childNodes[0] && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                element.childNodes[0].nodeValue = element.dataset[key];
            }
        });
    }

    function localizeTitle(germanTitle, language) {
        if (!document.documentElement.dataset.i18nOriginalTitle) {
            document.documentElement.dataset.i18nOriginalTitle = document.title;
        }

        document.title = language === 'de' ? germanTitle : document.documentElement.dataset.i18nOriginalTitle;
    }

    function localizeNavbar(language) {
        const links = document.querySelectorAll('[data-label-en][data-label-de]');

        for (const link of links) {
            link.textContent = language === 'de' ? (link.dataset.labelDe || link.textContent) : (link.dataset.labelEn || link.textContent);
        }
    }

    function translateIndex(language) {
        localizeTitle('Jon Systems | CAD, 3D-Druck, Programmierung & Reparaturen', language);
        localizeText('header.hero .reveal h1', 'Sorgfältige technische Arbeit mit verlässlichem Ergebnis.', language);
        localizeText('header.hero .reveal .lead', 'Jon Systems unterstützt Privatkunden und kleine Unternehmen mit CAD, 3D-Druck, Programmierung, Beratung und Reparaturen. Jede Anfrage wird klar besprochen, praktisch geplant und so umgesetzt, dass das Ergebnis auch wirklich nutzbar ist.', language);
        localizeText('header.hero .reveal .actions a[href="contact.html"]', 'Projekt anfragen', language);
        localizeText('header.hero .reveal .actions a[href="repairs.html"]', 'Reparaturen ansehen', language);
        localizeAll('header.hero .reveal .tag-list .tag', ['Maßgefertigte Teile', 'Prototypenbegleitung', 'Technische Beratung', 'Reparaturen auf Anfrage'], language);
        localizeAll('.carousel--workshop .workshop-slide-text .eyebrow', ['3D-Druck', 'Reparaturen', 'CAD'], language);
        localizeAll('.carousel--workshop .workshop-slide-text h2', ['Funktionales Druckteil', 'Fahrzeugservice und Reparatur', 'CAD-Vorbereitung für den Druck'], language);
        localizeAll('.carousel--workshop .workshop-slide-text > p:last-of-type', ['Passgenaue Druckteile für Stabilität und den praktischen Einsatz.', 'Werkstatterfahrung mit Inspektion und Servicearbeiten an Autos und Mopeds.', 'Konstruktionen werden so vorbereitet, dass sie sich zuverlässig fertigen und weiterbearbeiten lassen.'], language);
        localizeText('.carousel--workshop .carousel-meta span:first-child', 'Werkstatt-Highlights', language);
        localizeText('header.hero .hero-card .actions a[href="projects.html"]', 'Projekte ansehen', language);
        localizeAll('header.hero .hero-card .stat strong', ['CAD', '3D-Druck', 'Reparaturen'], language);
        localizeAll('header.hero .hero-card .stat span', ['Präzise Modelle und technische Zeichnungen', 'Vom Konzept bis zum funktionalen Teil', 'Praktische Einschätzung und saubere Lösungen'], language);
        localizeText('main .section > .section-header > div > .eyebrow', 'Leistungen', language);
        localizeText('main .section > .section-header > div > h2', 'Alles zielt auf ein klares Ergebnis.', language);
        localizeText('main .section > .section-header > p', 'Die Website konzentriert sich auf die Arbeiten, nach denen Kunden tatsächlich fragen: Konstruktion, Fertigung, Reparatur, Programmierung und praxisnahe Beratung.', language);
        localizeAll('.grid.cards.four .card h3', ['CAD-Design', '3D-Druck', 'Reparaturen', 'Programmierung'], language);
        localizeAll('.grid.cards.four .card p', ['Saubere Modelle, technische Logik und Dateien, die für Druck, Bearbeitung oder Prüfung vorbereitet sind.', 'Schnelle Prototypen und Sonderteile mit Blick auf Passform, Funktion und Oberfläche.', 'Analyse, Diagnose und Reparatur für alles, was sich sinnvoll instandsetzen lässt.', 'Automatisierung, Web-Tools, Embedded-Projekte und kleinere technische Softwareaufgaben.'], language);
        localizeText('footer.footer', 'Jon Systems - Leistungen eines Einzelunternehmens für Konstruktion, Prototyping, Reparaturen und technische Unterstützung.', language);
    }

    function translate3dPrinting(language) {
        localizeTitle('3D-Druck - Jon Systems', language);
        localizeText('header.hero .reveal .eyebrow', 'Additive Fertigung', language);
        localizeText('header.hero .reveal h1', '3D-Druck, der beim Bauteil ansetzt und nicht bei der Maschine.', language);
        localizeText('header.hero .reveal .lead', 'Von Einzelteilen bis zu funktionalen Prototypen liegt der Fokus auf passender Form, klarer Funktion und einem Ergebnis, das im Alltag funktioniert.', language);
        localizeText('header.hero .reveal .actions a[href="contact.html"]', 'Druck anfragen', language);
        localizeText('header.hero .reveal .actions a[href="cadDesign.html"]', 'Zuerst ein Modell?', language);
        localizeAll('header.hero .hero-card .stat strong', ['Prototyp', 'Funktionsteil', 'Support'], language);
        localizeAll('header.hero .hero-card .stat span', ['Schnelle Iterationen und Testteile', 'Für den praktischen Einsatz gebaut', 'Bei Bedarf mit CAD-Unterstützung'], language);
        localizeText('main .section .section-header .eyebrow', 'Ablauf', language);
        localizeText('main .section .section-header h2', 'Messen, modellieren, drucken, prüfen.', language);
        localizeText('main .section > .section-header > p', 'Der Druckprozess wird zuverlässiger, wenn das Design vorher geprüft wird. Deshalb kann der Service bei Bedarf auch CAD-Unterstützung vor der Fertigung umfassen.', language);
        localizeAll('.grid.cards .card h3', ['Sonderteile', 'Prototypenteile', 'Design-Support'], language);
        localizeAll('.grid.cards .card p', ['Ersatzclips, Halter, Abdeckungen und technische Bauteile.', 'Testobjekte und Überarbeitungen, bevor die finale Version entsteht.', 'CAD-Aufbereitung für den Druck, wenn das vorhandene Modell unvollständig oder ungeeignet ist.'], language);
        localizeText('footer.footer', '3D-Druck ist am wirksamsten, wenn er vor Produktionsbeginn an den konkreten Anwendungsfall angepasst wird.', language);
    }

    function translateCadDesign(language) {
        localizeTitle('CAD-Design - Jon Systems', language);
        localizeText('header.hero .reveal .eyebrow', 'CAD-Arbeit', language);
        localizeText('header.hero .reveal h1', 'CAD-Design mit klarem Ziel und einem Ergebnis, das sich nutzen lässt.', language);
        localizeText('header.hero .reveal .lead', 'CAD-Design hilft bei präziser Planung, schnellen Anpassungen und besseren Fertigungsergebnissen. Ob für den Druck, die Reparatur oder ein technisches Konzept: Das Modell sollte verständlich, robust und alltagstauglich sein.', language);
        localizeText('header.hero .reveal .actions a[href="contact.html"]', 'CAD-Anfrage starten', language);
        localizeText('header.hero .reveal .actions a[href="repairs.html"]', 'Ersatzteile', language);
        localizeText('main .section .section-header .eyebrow', 'Konstruktionsziel', language);
        localizeText('main .section .section-header h2', 'Modelle für Druck, Reparatur oder Fertigung vorbereitet.', language);
        localizeText('main .section > .section-header > p', 'Der CAD-Workflow ist bewusst einfach: Problem benennen, Geometrie erstellen, Passform prüfen und am Ende Dateien übergeben, die direkt nutzbar sind.', language);
        localizeText('.split .card:nth-of-type(1) h3', 'Was enthalten ist', language);
        localizeAll('.split .card:nth-of-type(1) .list li', ['Bauteile modellieren und technische Zeichnungen vorbereiten.', 'Bestehende Teile und beschädigte Komponenten überarbeiten.', 'Geometrie für 3D-Druck oder Prüfung aufbereiten.', 'Klare Kommunikation zu Maßen und Grenzen.'], language);
        localizeText('.split .card:nth-of-type(2) h3', 'Beispielreferenzen', language);
        localizeAll('.split .card:nth-of-type(2) .figure-caption', ['Lokales Software-Referenzbild.', 'Lokales technisches Modell als Referenz.'], language);
        localizeText('footer.footer', 'CAD-Arbeit ist am stärksten, wenn sie von Anfang an auf den finalen Fertigungsschritt ausgelegt ist.', language);
    }

    function translateRepairs(language) {
        localizeTitle('Reparaturen - Jon Systems', language);
        localizeText('header.hero .reveal .eyebrow', 'Reparaturservice', language);
        localizeText('header.hero .reveal h1', 'Reparaturen für die Dinge, auf die Sie sich wirklich verlassen.', language);
        localizeText('header.hero .reveal .lead', 'Jon Systems bietet auf Anfrage Reparaturen für technische Gegenstände, Gehäuse, Kleingeräte, defekte Komponenten und Sonderteile an. Jeder Fall wird sorgfältig geprüft und mit einer klaren Einschätzung beantwortet, was sich reparieren, ersetzen oder verbessern lässt.', language);
        localizeText('header.hero .reveal .actions a[href="contact.html"]', 'Reparaturanfrage senden', language);
        localizeText('header.hero .reveal .actions a[href="cadDesign.html"]', 'Sonderersatzteile', language);
        localizeAll('header.hero .hero-card .stat strong', ['Prüfen', 'Reparieren', 'Ersetzen'], language);
        localizeAll('header.hero .hero-card .stat span', ['Erste Prüfung und ehrliche Einschätzung', 'Teil, Gehäuse oder Funktion wieder instand setzen', 'Fehlende Teile bei Bedarf nachfertigen'], language);
        localizeText('main .section.reveal .section-header .eyebrow', 'Was repariert wird', language);
        localizeText('main .section.reveal .section-header h2', 'Viele Anfragen, praktische Ergebnisse.', language);
        localizeText('main .section.reveal > .section-header > p', 'Senden Sie die Details, auch wenn der Fall ungewöhnlich ist. Wenn eine Reparatur sinnvoll möglich ist, sage ich das offen. Wenn Ersatz oder eine Neuentwicklung mehr Sinn ergibt, empfehle ich das stattdessen.', language);
        localizeAll('.grid.cards.four .card h3', ['Elektronik', 'Mechanische Teile', '3D-gedruckte Teile', 'Sonderlösungen'], language);
        localizeAll('.grid.cards.four .card p', ['Geräte, Steckverbinder, kleine Platinen, Leitungsprobleme und zerstörungsfreie Fehlersuche.', 'Defekte Abdeckungen, Halter, Aufnahmen, Befestigungen und kleine Funktionsteile.', 'Ersatzdrucke, stärkere Überarbeitungen und Teile mit besserer Passform oder Oberfläche.', 'Wenn es keinen direkten Ersatz gibt, kann ein neues Teil oder eine Neukonstruktion die Lücke schließen.'], language);
        localizeText('.split .card:nth-of-type(1) .eyebrow', 'Reparaturablauf', language);
        localizeText('.split .card:nth-of-type(1) h2', 'So läuft der Auftrag ab.', language);
        localizeAll('.split .card:nth-of-type(1) .list li', ['Problem beschreiben und wenn möglich Fotos beifügen.', 'Erste Prüfung auf Machbarkeit, Aufwand und Risiko.', 'Reparatur, Ersatz oder Neuentwicklung je nach Fall.', 'Rückgabe mit klarer Erklärung des Ergebnisses.'], language);
        localizeText('.split .card:nth-of-type(2) .eyebrow', 'Fahrzeuge', language);
        localizeText('.split .card:nth-of-type(2) h2', 'Autos, Mopeds und praktische Servicearbeiten.', language);
        localizeText('.split .card:nth-of-type(2) > p:last-of-type', 'Die Erfahrung umfasst Reparatur und Wartung von Fahrzeugen wie Autos und Mopeds. Weitere Werkstattbilder folgen später.', language);
        localizeText('main .section:nth-of-type(3) .section-header .eyebrow', 'Werkstattbilder', language);
        localizeText('main .section:nth-of-type(3) .section-header h2', 'Aktuelle Reparatur- und Servicefotos.', language);
        localizeText('main .section:nth-of-type(3) > .section-header > p', 'Die Werkstatt bekommt später weitere Bilder. Diese zeigen vorerst Reparaturen und praktische Servicearbeiten.', language);
        localizeAll('main .section:nth-of-type(3) .figure-caption', ['Mechanische Wartung an einem Moped.', '3D-gedruckte Ersatzteile können Reparatur und Service unterstützen.'], language);
        localizeText('footer.footer', 'Reparaturen werden Fall für Fall geprüft, damit die Lösung praktisch und transparent bleibt.', language);
    }

    function translateProjects(language) {
        localizeTitle('Projekte - Jon Systems', language);
        localizeText('main .section .section-header .eyebrow', 'Projekte', language);
        localizeText('main .section .section-header h2', 'Abgeschlossene Arbeiten im Wechsel.', language);
        localizeText('main .section > .section-header > p', 'Eine kleine Slideshow mit ausgewählten CAD-, 3D-Druck-, Reparatur- und Installationsarbeiten.', language);
        const localizeProjectSlide = (slideIndex, title, firstParagraph, secondParagraph) => {
            const slideSelector = `.carousel--projects .carousel-slide:nth-of-type(${slideIndex}) .project-slide-text`;

            localizeText(`${slideSelector} strong`, title, language);
            localizeText(`${slideSelector} p:first-of-type`, firstParagraph, language);
            localizeText(`${slideSelector} p:last-of-type`, secondParagraph, language);
        };

        localizeProjectSlide(1, 'CAD-Entwurf eines Rotorblatts für ein Windrad', 'Auslegung eines Rotorblatts mit guter Aerodynamik und stabiler Struktur.', 'Der Schwerpunkt liegt auf sauberen Maßen, praxisgerechten Wandstärken und zügigen Überarbeitungen.');
        localizeProjectSlide(2, '3D-Druck-Analyse', 'Druckparameter für bessere Ergebnisse abstimmen.', 'Mehrere Iterationen zeigen, welche Form die Festigkeit und Montage im Einsatz verbessert.');
        localizeProjectSlide(3, '3D-gedruckte Baugruppe', 'Individuell konstruierte und gedruckte Teile für eine optische Baugruppe.', 'Mit passenden Druckeinstellungen und Nacharbeit bleibt das Teil dauerhaft maßhaltig.');
        localizeProjectSlide(4, 'Fahrzeug-Service', 'Ein Zahnriemenwechsel am Passat.', 'Dazu kommen Wartungs- und Prüfarbeiten an Autos und Mopeds.');
        localizeProjectSlide(5, 'Solaranlage in Frankreich', 'Solarmontage auf einem Trapezdach in Frankreich.', 'Wichtig ist eine stabile Ausführung, die sicher zum vorhandenen Dach passt.');
        localizeText('.carousel--projects .carousel-meta span:first-child', 'Projekt-Slideshow', language);
        localizeText('.split .card:nth-of-type(1) .eyebrow', 'Erfolgreiche Projekte', language);
        localizeText('.split .card:nth-of-type(1) h2', 'Ein Blick auf aktuelle Arbeiten', language);
        localizeText('.split .card:nth-of-type(1) > p:last-of-type', 'Jon Systems hat bereits viele Projekte umgesetzt, darunter CAD-Design, 3D-Druck, Reparaturen und Installationen. Jedes Projekt wird mit Blick auf Genauigkeit, Alltagstauglichkeit und klare Abstimmung bearbeitet.', language);
        localizeText('.split .card:nth-of-type(2) .eyebrow', 'Weitere Ergänzungen', language);
        localizeText('.split .card:nth-of-type(2) h2', 'Projekte werden laufend ergänzt.', language);
        localizeText('.split .card:nth-of-type(2) > p:last-of-type', 'Die Projekt-Slideshow wächst, sobald neue Arbeiten fertig sind. Dazu gehören CAD-, 3D-Druck-, Reparatur- und Installationsarbeiten.', language);
        // localizeText('footer.footer', 'Projekte werden als einfache Slideshow gezeigt, damit neue Arbeiten nach und nach ergänzt werden können.', language);
    }

    function translateProgramming(language) {
        localizeTitle('Programmierung - Jon Systems', language);
        localizeText('header.hero .reveal .eyebrow', 'Softwarearbeit', language);
        localizeText('header.hero .reveal h1', 'Programmierung, die ein echtes Problem löst.', language);
        localizeAll('header.hero .reveal .lead', ['Kleine technische Softwareprojekte, Automatisierung, Webseiten, Embedded-Skripte und individuelle Werkzeuge lassen sich leichter umsetzen, wenn sie von Anfang an sauber aufgebaut sind.', 'Ich habe Erfahrung mit Python, C++ und anderen Sprachen und helfe bei kleineren Codeaufgaben mit einer praktischen Lösung.'], language);
        localizeText('header.hero .reveal .actions a[href="contact.html"]', 'Über ein Projekt sprechen', language);
        localizeText('header.hero .reveal .actions a[href="consulting.html"]', 'Umfang besprechen', language);
        localizeAll('header.hero .hero-card .stat strong', ['Web', 'Automatisierung', 'Embedded'], language);
        localizeAll('header.hero .hero-card .stat span', ['Webseiten und laufende Aktualisierungen', 'Werkzeuge, die Handarbeit sparen', 'Praktische Skripte und Geräte'], language);
        localizeText('main .section .section-header .eyebrow', 'Fähigkeiten', language);
        localizeText('main .section .section-header h2', 'Kleine Programmieraufgaben sauber erledigt.', language);
        localizeText('main .section > .section-header > p', 'Jon Systems kann bei kleineren Programmieraufgaben innerhalb Ihres Projekts helfen.', language);
        localizeAll('.grid.cards .card h3', ['Kleine Anfragen', 'Daten', 'Embedded-Systems'], language);
        localizeAll('.grid.cards .card p', ['Statische Seiten und Service-Websites mit klarer Struktur und gut lesbarem Code.', 'Datenverarbeitung und kleine Werkzeuge, die manuelle Arbeit reduzieren.', 'Arduino, Raspberry Pi und ähnliche Projekte, bei denen Hardware und Software zusammenkommen.'], language);
        localizeText('footer.footer', 'Programmierungsaufträge werden so abgegrenzt, dass sie nützlich, wartbar und realistisch supportbar bleiben.', language);
    }

    function translateConsulting(language) {
        localizeTitle('Beratung - Jon Systems', language);
        localizeText('header.hero .reveal .eyebrow', 'Technische Beratung', language);
        localizeText('header.hero .reveal h1', 'Projektberatung für Unternehmen und technische Teams.', language);
        localizeText('header.hero .reveal .lead', 'Unternehmen können Jon Systems beauftragen, um ein Projekt mit technischem Wissen, praxisnaher Problemlösung und klaren Entscheidungen zu unterstützen, damit es zügig vorankommt.', language);
        localizeText('header.hero .reveal .actions a[href="contact.html"]', 'Beratungsanfrage starten', language);
        localizeText('header.hero .reveal .actions a[href="cadDesign.html"]', 'CAD- und Prototypen-Support', language);
        localizeText('header.hero .hero-card .media .mediaText .eyebrow', 'Projektunterstützung', language);
        localizeText('header.hero .hero-card .media .mediaText h2', 'Technische Orientierung für reale Aufträge.', language);
        localizeText('header.hero .hero-card .media .mediaText p', 'Beratungsbilder können später ergänzt werden, der Fokus bleibt aber auf der Leistung.', language);
        localizeAll('header.hero .hero-card .stat strong', ['Analyse', 'Struktur', 'Support'], language);
        localizeAll('header.hero .hero-card .stat span', ['Klare Optionen und nächste Schritte', 'Einfache Dokumentation und Planung', 'Nützliche Impulse für technische Entscheidungen'], language);
        localizeText('.split .card:nth-of-type(1) .eyebrow', 'Themen', language);
        localizeText('.split .card:nth-of-type(1) h2', 'Hilfreich, wenn ein Projekt externes Wissen braucht.', language);
        localizeAll('.split .card:nth-of-type(1) .list li', ['Projektplanung und Klärung des Umfangs.', 'Technische Bewertung von Teilen, Prozessen oder Prototypen.', 'Ob Reparatur, Neuentwicklung oder ein neuer Aufbau sinnvoller ist.', 'Unterstützung für Unternehmen, die eine externe technische Perspektive brauchen.'], language);
        localizeText('.split .card:nth-of-type(2) .eyebrow', 'Ergebnis', language);
        localizeText('.split .card:nth-of-type(2) h2', 'Weniger Unsicherheit, mehr Richtung.', language);
        localizeText('.split .card:nth-of-type(2) > p:last-of-type', 'Das Ziel ist keine allgemeine Beratung, sondern eine klare Empfehlung, die sich ohne unnötigen Zeitverlust umsetzen lässt.', language);
        localizeText('footer.footer', 'Beratung bleibt praxisnah, damit der nächste Schritt klar ist.', language);
    }

    function translateContact(language) {
        localizeTitle('Kontakt - Jon Systems', language);
        localizeText('header.hero .reveal .eyebrow', 'Kontakt', language);
        localizeText('header.hero .reveal h1', 'Starten Sie mit einer klaren Anfrage.', language);
        localizeText('header.hero .reveal .lead', 'Beschreiben Sie im Formular Ihr Anliegen, den Zeitrahmen und die wichtigsten Details. Fotos sind bei Reparatur- oder CAD-Anfragen besonders hilfreich.', language);
        localizeAll('header.hero .reveal .tag-list .tag', ['info@jon-systems.com', 'Esslingen am Neckar', 'Heidelberg', 'Marnheim (Pfalz)'], language);
        localizeText('header.hero .hero-card .media .mediaText .eyebrow', 'Direkter Kontakt', language);
        localizeText('header.hero .hero-card .media .mediaText h2', 'Anfrage senden und ich kümmere mich darum.', language);
        localizeText('header.hero .hero-card .media .mediaText p', 'Projekt- oder Werkstattbilder können bei Bedarf später ergänzt werden.', language);
        localizeAll('header.hero .hero-card .stat strong', ['E-Mail', 'Ort', 'Land'], language);
        localizeAll('header.hero .hero-card .stat span', ['info@jon-systems.com', 'Esslingen am Neckar, Heidelberg, Marnheim (Pfalz)', 'Deutschland'], language);
        localizeText('main .contact-grid .card:nth-of-type(1) .eyebrow', 'Direkter Kontakt', language);
        localizeText('main .contact-grid .card:nth-of-type(1) h2', 'Kontakt auf einen Blick', language);
        localizeAll('main .contact-grid .card:nth-of-type(1) .contact-item strong', ['E-Mail', 'Antwortformat'], language);
        localizeAll('main .contact-grid .card:nth-of-type(1) .contact-item span', ['Klare Antwort, konkreter nächster Schritt und transparenter Umfang.'], language);
        localizeText('main .contact-grid .card:nth-of-type(2) .eyebrow', 'Kontaktformular', language);
        localizeText('main .contact-grid .card:nth-of-type(2) h2', 'Projektanfrage senden', language);
        localizeLabelAll('main .contact-grid .card:nth-of-type(2) label', ['Name', 'E-Mail', 'Telefon', 'Thema', 'Betreff', 'Nachricht'], language);
        localizeAttr('main .contact-grid .card:nth-of-type(2) input[name="name"]', 'placeholder', 'Ihr Name', language);
        localizeAttr('main .contact-grid .card:nth-of-type(2) input[name="email"]', 'placeholder', 'name@beispiel.de', language);
        localizeAttr('main .contact-grid .card:nth-of-type(2) input[name="phone"]', 'placeholder', 'Optional', language);
        localizeAttr('main .contact-grid .card:nth-of-type(2) input[name="subject"]', 'placeholder', 'Worum geht es bei der Anfrage?', language);
        localizeAttr('main .contact-grid .card:nth-of-type(2) textarea[name="message"]', 'placeholder', 'Beschreiben Sie die Aufgabe, den Zeitrahmen und relevante Details.', language);
        localizeAll('main .contact-grid .card:nth-of-type(2) select[name="service"] option', ['Thema wählen', 'CAD-Design', '3D-Druck', 'Reparaturen', 'Programmierung', 'Beratung', 'Allgemeine Anfrage'], language);
        localizeText('main .contact-grid .card:nth-of-type(2) button[type="submit"]', 'E-Mail vorbereiten', language);
        localizeText('main .contact-grid .card:nth-of-type(2) .form-note', 'Das Formular öffnet Ihr E-Mail-Programm mit den eingetragenen Daten. So bleibt die Seite schlank und es wird nichts unnötig getrackt.', language);
        localizeText('footer.footer', 'Fotos und Maße helfen, die erste Einschätzung bei Reparatur- und CAD-Anfragen zu beschleunigen.', language);
    }

    function translateImpressum(language) {
        localizeTitle('Impressum - Jon Systems', language);
        localizeText('.section-header .eyebrow', 'Impressum', language);
        localizeText('.section-header h2', 'Impressum', language);
        localizeText('.section-header p', 'Diese Seite bündelt das Impressum, die Kontaktdaten, die EU-Streitbeilegung und die Datenschutzerklärung an einem Ort.', language);
        localizeText('.split .card:nth-of-type(1) h3', 'Verantwortlich', language);
        localizeText('.split .card:nth-of-type(2) h3', 'Kontakt', language);
        localizeText('.section .card:nth-of-type(3) h3', 'EU-Streitschlichtung', language);
        localizeText('.section .card:nth-of-type(3) p:nth-of-type(1)', 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:', language);
        localizeText('.section .card:nth-of-type(3) p:nth-of-type(3)', 'Die E-Mail-Adresse finden Sie oben im Impressum.', language);
        localizeText('.section .card:nth-of-type(4) h1', 'Datenschutzerklärung', language);
        localizeText('.section .card:nth-of-type(4) h2#m4158', 'Präambel', language);
        localizeText('.section .card:nth-of-type(4) h2#m3', 'Verantwortlicher', language);
        localizeText('.section .card:nth-of-type(4) h2#mOverview', 'Übersicht der Verarbeitungen', language);
        localizeText('.section .card:nth-of-type(4) h3', 'Arten der verarbeiteten Daten', language);
        localizeText('footer.footer', 'Jon Systems - Einzelunternehmen.', language);
    }

    function applySiteTranslations(language) {
        localizeNavbar(language);

        switch (currentPage) {
            case 'index':
                translateIndex(language);
                break;
            case '3dprinting':
                translate3dPrinting(language);
                break;
            case 'caddesign':
                translateCadDesign(language);
                break;
            case 'repairs':
                translateRepairs(language);
                break;
            case 'projects':
                translateProjects(language);
                break;
            case 'programming':
                translateProgramming(language);
                break;
            case 'consulting':
                translateConsulting(language);
                break;
            case 'contact':
                translateContact(language);
                break;
            case 'impressum':
                translateImpressum(language);
                break;
        }
    }

    function setLanguage(language) {
        document.documentElement.lang = language;
        window.localStorage.setItem('jonSystemsLanguageV2', language);

        for (const button of languageButtons) {
            button.classList.toggle('active', button.dataset.langToggle === language);
        }

        applySiteTranslations(language);
    }

    setLanguage(preferredLanguage);

    for (const button of languageButtons) {
        button.addEventListener('click', () => {
            setLanguage(button.dataset.langToggle || 'en');
        });
    }

    function initCarousel(root) {
        const slides = Array.from(root.querySelectorAll('.carousel-slide'));

        if (slides.length === 0) {
            return;
        }

        const positionLabel = root.querySelector('[data-carousel-position]');
        const intervalMs = Number(root.dataset.carouselInterval || '4500');
        const pointerPauseMs = Number(root.dataset.carouselPointerPause || '1800');
        let activeIndex = 0;
        let timerId = null;
        let pointerInside = false;
        let focusInside = false;
        let lastPointerActivity = 0;

        const controls = document.createElement('div');
        controls.className = 'carousel-controls';

        const prevButton = document.createElement('button');
        prevButton.type = 'button';
        prevButton.className = 'carousel-arrow carousel-arrow--prev';
        prevButton.setAttribute('aria-label', 'Previous slide');
        prevButton.textContent = '‹';

        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.className = 'carousel-arrow carousel-arrow--next';
        nextButton.setAttribute('aria-label', 'Next slide');
        nextButton.textContent = '›';

        controls.append(prevButton, nextButton);

        const meta = root.querySelector('.carousel-meta');
        if (meta) {
            root.insertBefore(controls, meta);
        } else {
            root.appendChild(controls);
        }

        const normalizeIndex = (value) => {
            return (value + slides.length) % slides.length;
        };

        const showSlide = (nextIndex) => {
            activeIndex = normalizeIndex(nextIndex);

            for (const [index, slide] of slides.entries()) {
                slide.classList.toggle('is-active', index === activeIndex);
            }

            if (positionLabel) {
                positionLabel.textContent = `${activeIndex + 1} / ${slides.length}`;
            }
        };

        const advance = () => {
            showSlide((activeIndex + 1) % slides.length);
        };

        const canAutoAdvance = () => {
            if (pointerInside || focusInside) {
                return false;
            }

            return Date.now() - lastPointerActivity >= pointerPauseMs;
        };

        const start = () => {
            if (timerId === null) {
                timerId = window.setInterval(() => {
                    if (canAutoAdvance()) {
                        advance();
                    }
                }, intervalMs);
            }
        };

        const stop = () => {
            if (timerId !== null) {
                window.clearInterval(timerId);
                timerId = null;
            }
        };

        showSlide(0);
        start();

        const notePointerActivity = () => {
            lastPointerActivity = Date.now();
        };

        prevButton.addEventListener('click', () => {
            notePointerActivity();
            showSlide(activeIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            notePointerActivity();
            showSlide(activeIndex + 1);
        });

        root.addEventListener('mouseenter', () => {
            pointerInside = true;
            notePointerActivity();
        });

        root.addEventListener('mousemove', notePointerActivity);
        root.addEventListener('pointerdown', notePointerActivity);

        root.addEventListener('mouseleave', () => {
            pointerInside = false;
            notePointerActivity();
        });

        root.addEventListener('focusin', () => {
            focusInside = true;
        });

        root.addEventListener('focusout', (event) => {
            if (!root.contains(event.relatedTarget)) {
                focusInside = false;
            }
        });
    }

    for (const carousel of document.querySelectorAll('[data-carousel]')) {
        initCarousel(carousel);
    }

    const revealItems = document.querySelectorAll('.reveal');

    if (revealItems.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                }
            }
        }, {
            threshold: 0.14,
        });

        for (const item of revealItems) {
            observer.observe(item);
        }
    } else {
        for (const item of revealItems) {
            item.classList.add('is-visible');
        }
    }

    const mailForms = document.querySelectorAll('[data-mailto-form]');

    for (const form of mailForms) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const recipient = form.dataset.recipient || 'info@jon-systems.com';
            const data = new FormData(form);
            const subject = data.get('subject')?.toString().trim() || 'New request from Jon Systems website';
            const name = data.get('name')?.toString().trim() || 'Not provided';
            const email = data.get('email')?.toString().trim() || 'Not provided';
            const phone = data.get('phone')?.toString().trim() || 'Not provided';
            const service = data.get('service')?.toString().trim() || 'General request';
            const message = data.get('message')?.toString().trim() || 'No message provided.';

            const body = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                `Service: ${service}`,
                '',
                message,
            ].join('\n');

            window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }
})();