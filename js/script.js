/**
 * ============================================
 * Akash Hinge — Product Management Portfolio
 * Main Script
 * ============================================
 *
 * Systems:
 * 1. Content Rendering (Hero, About, Education, Skills, Mission/Vision, Journey)
 * 2. Project System (modular loading, cards, inline expansion)
 * 3. Experience Timeline
 * 4. Certificate System
 * 5. Blog System (inline expansion)
 * 6. Navigation (smooth scroll, active state, mobile menu)
 * 7. Animations (scroll reveal, staggered entry)
 * 8. Gallery (arrows, swipe, keyboard)
 * 9. Lightbox
 * 10. Utilities
 */

(function () {
    'use strict';

    // ==========================================
    // UTILITIES
    // ==========================================

    /** Check if a value has real content (not empty, placeholder, null) */
    function hasContent(value) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') {
            const trimmed = value.trim();
            if (trimmed === '') return false;
            // Detect placeholders like "YOUR ...", "YEAR", "START DATE", etc.
            if (/^YOUR\s/i.test(trimmed)) return false;
            if (/^(YEAR|START DATE|END DATE|ADD .* HERE|COMING SOON|LOREM IPSUM|DATA NOT AVAILABLE)$/i.test(trimmed)) return false;
            return true;
        }
        if (Array.isArray(value)) {
            return value.some(item => {
                if (typeof item === 'string') return hasContent(item);
                if (typeof item === 'object') return Object.values(item).some(v => hasContent(v));
                return !!item;
            });
        }
        if (typeof value === 'object') {
            return Object.values(value).some(v => hasContent(v));
        }
        return !!value;
    }

    /** Create an element with optional class and inner HTML */
    function el(tag, className, html) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (html !== undefined) element.innerHTML = html;
        return element;
    }

    /** Sanitize text for safe HTML insertion */
    function esc(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /** Check if an image or resource URL exists asynchronously */
    function imageExists(url) {
        return new Promise(function (resolve) {
            if (!url || typeof url !== 'string') {
                resolve(false);
                return;
            }
            if (/\.pdf$/i.test(url)) {
                resolve(true);
                return;
            }
            const img = new Image();
            img.onload = function () { resolve(true); };
            img.onerror = function () { resolve(false); };
            img.src = url;
        });
    }

    /** Parse date string (e.g., "April 2026", "Sep 2026", "July 26") to sortable timestamp */
    function parseDateStringToTime(dateStr) {
        if (!dateStr || typeof dateStr !== 'string') return Infinity;

        const str = dateStr.trim();
        const months = {
            'january': 0, 'jan': 0,
            'february': 1, 'feb': 1,
            'march': 2, 'mar': 2,
            'april': 3, 'apr': 3,
            'may': 4,
            'june': 5, 'jun': 5,
            'july': 6, 'jul': 6,
            'august': 7, 'aug': 7,
            'september': 8, 'sep': 8, 'sept': 8,
            'october': 9, 'oct': 9,
            'november': 10, 'nov': 10,
            'december': 11, 'dec': 11
        };

        const match = str.match(/([a-zA-Z]+)\s*(\d{2,4})?/i);
        if (match) {
            const mStr = match[1].toLowerCase();
            let year = match[2] ? parseInt(match[2], 10) : 2026;
            if (year < 100) year += 2000;

            if (mStr in months) {
                return new Date(year, months[mStr], 1).getTime();
            }
        }

        return Infinity;
    }


    /** SVG icons used throughout */
    const icons = {
        arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
        externalLink: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
        download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
        mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
        github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
        close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
        chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
        chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
        flip: '↻'
    };


    // ==========================================
    // 1. HERO RENDERING
    // ==========================================

    function renderHero() {
        const info = typeof siteInfo !== 'undefined' ? siteInfo : {};

        // Name & Greeting
        const nameEl = document.getElementById('heroName');
        if (nameEl) {
            nameEl.innerHTML = '<span class="hero__greeting" style="display: inline-block; margin-right: 8px;">Hello, I am</span>' +
                '<span class="hero__intro-text" style="display: inline-block;">Akash <span class="accent-underline">Hinge</span></span>';
        }

        // Headline
        const headlineEl = document.getElementById('heroHeadline');
        if (headlineEl && hasContent(info.headline)) {
            headlineEl.textContent = info.headline;
        }

        // Tagline
        const taglineEl = document.getElementById('heroTagline');
        if (taglineEl && hasContent(info.tagline)) {
            taglineEl.textContent = info.tagline;
        }

        // Actions
        const actionsEl = document.getElementById('heroActions');
        if (actionsEl) {
            // Resume button
            if (hasContent(info.resume)) {
                const resumeBtn = el('a', 'btn btn--primary');
                resumeBtn.href = info.resume;
                resumeBtn.target = '_blank';
                resumeBtn.rel = 'noopener';
                resumeBtn.innerHTML = icons.download + ' Download Resume';
                resumeBtn.setAttribute('aria-label', 'Download resume PDF');

                // Check if resume file exists
                imageExists(info.resume).then(exists => {
                    // PDF won't trigger img onload, so use fetch
                }).catch(() => { });

                actionsEl.appendChild(resumeBtn);
            }

            // Let's Talk button
            if (hasContent(info.email)) {
                const talkBtn = el('a', 'btn btn--secondary');
                talkBtn.href = 'mailto:' + info.email;
                talkBtn.textContent = "Let's Talk";
                talkBtn.setAttribute('aria-label', 'Send email');
                actionsEl.appendChild(talkBtn);
            } else {
                const talkBtn = el('a', 'btn btn--secondary');
                talkBtn.href = '#contact';
                talkBtn.textContent = "Let's Talk";
                actionsEl.appendChild(talkBtn);
            }
        }

        // Socials
        const socialsEl = document.getElementById('heroSocials');
        if (socialsEl) {
            if (hasContent(info.linkedin)) {
                const a = el('a', 'hero__social-link');
                a.href = info.linkedin;
                a.target = '_blank';
                a.rel = 'noopener';
                a.innerHTML = icons.linkedin + ' LinkedIn';
                a.setAttribute('aria-label', 'LinkedIn profile');
                socialsEl.appendChild(a);
            }
            if (hasContent(info.github)) {
                const a = el('a', 'hero__social-link');
                a.href = info.github;
                a.target = '_blank';
                a.rel = 'noopener';
                a.innerHTML = icons.github + ' GitHub';
                a.setAttribute('aria-label', 'GitHub profile');
                socialsEl.appendChild(a);
            }
            if (hasContent(info.email)) {
                const a = el('a', 'hero__social-link');
                a.href = 'mailto:' + info.email;
                a.innerHTML = icons.mail + ' Email';
                a.setAttribute('aria-label', 'Send email');
                socialsEl.appendChild(a);
            }
        }

        // Profile image — organic shape with popout head and bottom circle clip
        const frame = document.getElementById('heroImageFrame');
        if (frame && hasContent(info.profileImage)) {
            imageExists(info.profileImage).then(exists => {
                if (exists) {
                    const imgSrc = esc(info.profileImage);
                    const altText = esc(info.name ? 'Portrait of ' + info.name : 'Akash Hinge');
                    frame.innerHTML =
                        '<div class="hero__avatar-dots" aria-hidden="true"></div>' +
                        '<div class="hero__avatar-outline" aria-hidden="true"></div>' +
                        '<div class="hero__avatar-shape">' +
                        '<img class="hero__avatar-img hero__avatar-img--inside" src="' + imgSrc + '" alt="' + altText + '" loading="eager">' +
                        '</div>' +
                        '<div class="hero__avatar-popout" aria-hidden="true">' +
                        '<img class="hero__avatar-img hero__avatar-img--popout" src="' + imgSrc + '" alt="" loading="eager">' +
                        '</div>';
                } else {
                    renderProfilePlaceholder(frame);
                }
            });
        } else if (frame) {
            renderProfilePlaceholder(frame);
        }
    }

    function renderProfilePlaceholder(frame) {
        const ph = el('div', 'hero__image-placeholder');
        ph.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        frame.appendChild(ph);
    }


    // ==========================================
    // 2. ABOUT SECTION
    // ==========================================

    function renderAbout() {
        const about = typeof aboutContent !== 'undefined' ? aboutContent : {};
        const container = document.getElementById('aboutIntro');
        if (!container) return;

        let hasAnyContent = false;

        if (hasContent(about.heading)) {
            const h = el('h2', 'about__heading', esc(about.heading));
            container.appendChild(h);
            hasAnyContent = true;
        }

        if (hasContent(about.introduction)) {
            const p = el('p', 'about__text', esc(about.introduction));
            container.appendChild(p);
            hasAnyContent = true;
        }

        if (hasContent(about.description)) {
            const p = el('p', 'about__text', esc(about.description));
            container.appendChild(p);
            hasAnyContent = true;
        }

        if (hasContent(about.currentFocus)) {
            const focus = el('div', 'about__focus');
            focus.innerHTML = '<div class="about__focus-label">Current Focus</div><p class="about__focus-text">' + esc(about.currentFocus) + '</p>';
            container.appendChild(focus);
            hasAnyContent = true;
        }

        // Hide the about section label if no about content
        if (!hasAnyContent) {
            container.style.display = 'none';
        }
    }


    // ==========================================
    // 3. EDUCATION
    // ==========================================

    function renderEducation() {
        const edu = typeof educationContent !== 'undefined' ? educationContent : {};
        const container = document.getElementById('educationContainer');
        if (!container) return;

        const hasDegree = hasContent(edu.degree);
        const hasInstitution = hasContent(edu.institution);

        if (!hasDegree && !hasInstitution) {
            container.style.display = 'none';
            return;
        }

        // Education label above the card
        const label = el('div', 'education-label', 'Education');
        container.appendChild(label);

        const card = el('div', 'education-card');

        const iconDiv = el('div', 'education-card__icon');
        iconDiv.innerHTML = icons.book;
        card.appendChild(iconDiv);

        const body = el('div', 'education-card__body');

        if (hasDegree) {
            body.appendChild(el('div', 'education-card__degree', esc(edu.degree)));
        }
        if (hasInstitution) {
            body.appendChild(el('div', 'education-card__institution', esc(edu.institution)));
        }

        // Year info
        const yearParts = [];
        if (hasContent(edu.duration)) yearParts.push(edu.duration);
        if (hasContent(edu.expectedCompletion)) yearParts.push('Expected ' + edu.expectedCompletion);
        if (yearParts.length) {
            body.appendChild(el('div', 'education-card__year', esc(yearParts.join(' · '))));
        }

        if (hasContent(edu.description)) {
            body.appendChild(el('div', 'education-card__desc', esc(edu.description)));
        }

        card.appendChild(body);

        // Make card clickable if college journey data exists
        if (edu.collegeJourney && hasContent(edu.collegeJourney)) {
            card.classList.add('education-card--clickable');
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Click to see college journey details');

            // Click indicator
            var arrow = el('div', 'education-card__arrow');
            arrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
            card.appendChild(arrow);

            // Expandable panel
            var panel = el('div', 'education-card__panel');
            panel.id = 'educationPanel';

            var panelInner = el('div', 'education-card__panel-inner');

            if (hasContent(edu.collegeJourney.summary)) {
                panelInner.appendChild(el('p', 'education-card__panel-summary', esc(edu.collegeJourney.summary)));
            }

            if (hasContent(edu.collegeJourney.highlights)) {
                var hTitle = el('div', 'education-card__panel-label', 'What I\'ve Been Doing');
                panelInner.appendChild(hTitle);
                var hList = el('ul', 'education-card__panel-list');
                edu.collegeJourney.highlights.forEach(function (h) {
                    if (hasContent(h)) hList.appendChild(el('li', '', esc(h)));
                });
                if (hList.children.length) panelInner.appendChild(hList);
            }

            const clubsOrActivities = edu.collegeJourney.activties || edu.collegeJourney.activities || edu.collegeJourney.clubs;
            if (hasContent(clubsOrActivities)) {
                var cTitle = el('div', 'education-card__panel-label', 'Clubs & Activities');
                panelInner.appendChild(cTitle);
                var cList = el('ul', 'education-card__panel-list');
                clubsOrActivities.forEach(function (c) {
                    if (hasContent(c)) cList.appendChild(el('li', '', esc(c)));
                });
                if (cList.children.length) panelInner.appendChild(cList);
            }

            panel.appendChild(panelInner);
            container.appendChild(card);
            container.appendChild(panel);

            card.addEventListener('click', function () {
                var isOpen = panel.classList.toggle('education-card__panel--open');
                card.classList.toggle('education-card--open', isOpen);
            });
            card.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var isOpen = panel.classList.toggle('education-card__panel--open');
                    card.classList.toggle('education-card--open', isOpen);
                }
            });
        } else {
            container.appendChild(card);
        }
    }


    // ==========================================
    // 4. MISSION & VISION
    // ==========================================

    function renderMissionVision() {
        const mv = typeof missionVision !== 'undefined' ? missionVision : {};
        const container = document.getElementById('missionVisionContainer');
        if (!container) return;

        const hasMission = mv.mission && hasContent(mv.mission.text);
        const hasVision = mv.vision && hasContent(mv.vision.text);

        if (!hasMission && !hasVision) {
            container.style.display = 'none';
            return;
        }

        const grid = el('div', 'mission-vision__grid');

        if (hasMission) {
            grid.appendChild(createFlipCard(mv.mission.title || 'Mission', mv.mission.text, '✦'));
        }
        if (hasVision) {
            grid.appendChild(createFlipCard(mv.vision.title || 'Vision', mv.vision.text, '◇'));
        }

        container.appendChild(grid);
    }

    function createFlipCard(title, text, doodle) {
        const card = el('div', 'flip-card');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', title + '. Click or press Enter to flip.');

        card.innerHTML = `
            <div class="flip-card__inner">
                <div class="flip-card__front">
                    <div class="flip-card__front-doodle">${doodle}</div>
                    <div class="flip-card__front-label">What drives me</div>
                    <div class="flip-card__front-title">${esc(title)}</div>
                    <div class="flip-card__front-hint">${icons.flip} Flip to read</div>
                </div>
                <div class="flip-card__back">
                    <div class="flip-card__back-title">${esc(title)}</div>
                    <div class="flip-card__back-text">${esc(text)}</div>
                </div>
            </div>
        `;

        // Tap to flip on mobile
        card.addEventListener('click', function () {
            this.classList.toggle('flip-card--flipped');
        });

        // Keyboard
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flip-card--flipped');
            }
        });

        return card;
    }


    // ==========================================
    // 5. JOURNEY TIMELINE
    // ==========================================

    function renderJourney() {
        const about = typeof aboutContent !== 'undefined' ? aboutContent : {};
        const container = document.getElementById('journeyContainer');
        if (!container) return;

        if (!hasContent(about.journey)) {
            container.style.display = 'none';
            return;
        }

        const title = el('h3', 'journey__title', 'My Journey');
        container.appendChild(title);

        const timeline = el('div', 'timeline');

        about.journey.forEach(function (item, index) {
            if (!hasContent(item)) return;

            const itemEl = el('div', 'timeline__item');
            itemEl.style.transitionDelay = (index * 100) + 'ms';

            const dot = el('div', 'timeline__dot');
            itemEl.appendChild(dot);

            if (hasContent(item.year)) {
                itemEl.appendChild(el('div', 'timeline__year', esc(item.year)));
            }
            if (hasContent(item.title)) {
                itemEl.appendChild(el('div', 'timeline__title', esc(item.title)));
            }
            if (hasContent(item.description)) {
                itemEl.appendChild(el('div', 'timeline__desc', esc(item.description)));
            }

            timeline.appendChild(itemEl);
        });

        if (timeline.children.length > 0) {
            container.appendChild(timeline);
        } else {
            container.style.display = 'none';
        }
    }





    // ==========================================
    // 7. PROJECTS SYSTEM
    // ==========================================

    const projectFolders = ['bookmyshow', 'bigbasket', 'uber', 'zomato', 'X (twitter)','jtbd'];
    const loadedProjects = [];

    function loadProjects() {
        let loadIndex = 0;

        function loadNext() {
            if (loadIndex >= projectFolders.length) {
                renderProjects();
                return;
            }

            const folder = projectFolders[loadIndex];
            const script = document.createElement('script');
            script.src = 'content/projects/' + folder + '/project.js?v=' + Date.now();

            script.onload = function () {
                if (typeof projectData !== 'undefined' && projectData) {
                    // Deep-copy the data before moving to next file
                    loadedProjects.push({ folder: folder, data: JSON.parse(JSON.stringify(projectData)) });
                    projectData = null;
                }
                loadIndex++;
                loadNext();
            };

            script.onerror = function () {
                loadIndex++;
                loadNext();
            };

            document.head.appendChild(script);
        }

        if (projectFolders.length === 0) {
            renderProjects();
        } else {
            loadNext();
        }
    }

    function renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        if (loadedProjects.length === 0) {
            // Show placeholder project cards instead of hiding
            for (var i = 0; i < 3; i++) {
                var placeholder = el('div', 'project-wrapper reveal');
                placeholder.innerHTML =
                    '<div class="placeholder-card">' +
                    '<div class="placeholder-card__icon">📋</div>' +
                    '<div class="placeholder-card__label">Project ' + (i + 1) + '</div>' +
                    '<div class="placeholder-card__text">Add your project case study here. Edit the project.js file to populate this card.</div>' +
                    '</div>';
                grid.appendChild(placeholder);
            }
        } else {
            // Show up to 4 projects (2x2 grid) on landing page
            loadedProjects.forEach(function (project, index) {
                if (index >= 4) return;

                var wrapper = el('div', 'project-wrapper reveal');
                wrapper.style.transitionDelay = (index * 150) + 'ms';

                var card = createProjectCard(project, index);
                wrapper.appendChild(card);
                grid.appendChild(wrapper);
            });

            // Add View More Case Studies button container
            var existingProjBtn = grid.parentElement.querySelector('.projects__view-more-container');
            if (existingProjBtn) existingProjBtn.remove();

            var viewMoreContainer = el('div', 'projects__view-more-container reveal');
            var viewMoreBtn = document.createElement('button');
            viewMoreBtn.className = 'projects__view-more';
            viewMoreBtn.innerHTML = 'View More Case Studies <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
            viewMoreBtn.addEventListener('click', function () {
                openCaseStudyArchiveModal();
            });

            viewMoreContainer.appendChild(viewMoreBtn);
            grid.parentElement.appendChild(viewMoreContainer);
        }

        // Certificates come from project files, render them now
        renderCertificates();

        // Re-check which sections should be hidden
        hideEmptySections();
        initScrollReveal();
    }

    function createProjectCard(project, index) {
        const data = project.data;
        const card = el('div', 'project-card');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', (data.title || 'Project') + '. Click to view case study modal.');

        const number = el('div', 'project-card__number', String(index + 1).padStart(2, '0'));
        card.appendChild(number);

        const inner = el('div', 'project-card__inner');

        // Image area
        const imageArea = el('div', 'project-card__image-area');
        if (hasContent(data.image)) {
            const imgPath = (/^(assets\/|content\/|http|\/)/i.test(data.image))
                ? data.image
                : 'content/projects/' + project.folder + '/' + data.image;
            const img = el('img', 'project-card__image');
            img.src = imgPath;
            img.alt = (data.title || 'Project') + ' preview';
            img.loading = 'lazy';
            img.onerror = function () {
                this.parentElement.innerHTML = '<div class="project-card__image-placeholder">' + esc(data.title || project.folder) + '</div>';
            };
            imageArea.appendChild(img);
        } else {
            imageArea.innerHTML = '<div class="project-card__image-placeholder">' + esc(data.title || project.folder) + '</div>';
        }
        inner.appendChild(imageArea);

        // Content area
        const content = el('div', 'project-card__content');

        if (hasContent(data.category)) {
            content.appendChild(el('div', 'project-card__category', esc(data.category)));
        }
        if (hasContent(data.title)) {
            content.appendChild(el('h3', 'project-card__title', esc(data.title)));
        }
        if (hasContent(data.hook)) {
            content.appendChild(el('p', 'project-card__hook', esc(data.hook)));
        }
        if (hasContent(data.description)) {
            content.appendChild(el('p', 'project-card__description', esc(data.description)));
        }
        if (hasContent(data.date)) {
            content.appendChild(el('div', 'project-card__date', esc(data.date)));
        }

        // Tags (Hidden on card preview for uniform height; shown inside modal)
        /* Tags omitted on preview card per design specification */

        // CTA
        const cta = el('div', 'project-card__cta');
        cta.innerHTML = 'View Case Study ' + icons.arrow;
        content.appendChild(cta);

        inner.appendChild(content);
        card.appendChild(inner);

        // Click to open Modal Overlay with blurred backdrop
        card.addEventListener('click', function () {
            openProjectModal(project);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(project);
            }
        });

        return card;
    }

    function initProjectModal() {
        const modal = document.getElementById('projectModal');
        const backdrop = document.getElementById('projectModalBackdrop');
        const closeBtn = document.getElementById('projectModalClose');

        if (backdrop) backdrop.addEventListener('click', closeProjectModal);
        if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeProjectModal();
        });
    }

    function closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;
        modal.classList.remove('project-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        const caseArchive = document.getElementById('caseStudyArchiveModal');
        const blogArchive = document.getElementById('blogArchiveModal');
        const isArchiveOpen = (caseArchive && caseArchive.classList.contains('project-modal--open')) ||
            (blogArchive && blogArchive.classList.contains('project-modal--open'));
        if (!isArchiveOpen) {
            document.body.style.overflow = '';
        }
    }

    // ==========================================
    // CASE STUDY ARCHIVE MODAL & FILTERING
    // ==========================================

    function initCaseStudyArchiveModal() {
        const modal = document.getElementById('caseStudyArchiveModal');
        const backdrop = document.getElementById('caseStudyArchiveBackdrop');
        const closeBtn = document.getElementById('caseStudyArchiveClose');
        const dateFilter = document.getElementById('caseStudyDateFilter');

        if (backdrop) backdrop.addEventListener('click', closeCaseStudyArchiveModal);
        if (closeBtn) closeBtn.addEventListener('click', closeCaseStudyArchiveModal);
        if (dateFilter) dateFilter.addEventListener('change', renderCaseStudyArchiveGrid);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('project-modal--open')) {
                closeCaseStudyArchiveModal();
            }
        });
    }

    function openCaseStudyArchiveModal() {
        const modal = document.getElementById('caseStudyArchiveModal');
        if (!modal) return;

        populateCaseStudyArchiveFilters();
        renderCaseStudyArchiveGrid();

        modal.classList.add('project-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCaseStudyArchiveModal() {
        const modal = document.getElementById('caseStudyArchiveModal');
        if (!modal) return;
        modal.classList.remove('project-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function populateCaseStudyArchiveFilters() {
        const dateFilter = document.getElementById('caseStudyDateFilter');
        if (!dateFilter) return;

        const baseMonths = [
            "April 2026",
            "May 2026",
            "June 2026",
            "July 2026",
            "August 2026",
            "September 2026",
            "October 2026"
        ];

        const dates = new Set(baseMonths);

        loadedProjects.forEach(function (p) {
            if (p.data && hasContent(p.data.date)) {
                dates.add(p.data.date.trim());
            }
        });

        const sortedDates = Array.from(dates).sort((a, b) => parseDateStringToTime(a) - parseDateStringToTime(b));

        const selectedDate = dateFilter.value;
        dateFilter.innerHTML = '<option value="ALL">All Added</option>';
        sortedDates.forEach(function (d) {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            if (d === selectedDate) opt.selected = true;
            dateFilter.appendChild(opt);
        });
    }

    function renderCaseStudyArchiveGrid() {
        const grid = document.getElementById('caseStudyArchiveGrid');
        const dateFilter = document.getElementById('caseStudyDateFilter');
        if (!grid) return;

        grid.innerHTML = '';
        const selectedDate = dateFilter ? dateFilter.value : 'ALL';

        const filtered = loadedProjects.filter(function (p) {
            if (!p.data) return false;
            if (selectedDate === 'ALL') return true;
            if (!p.data.date) return false;
            return p.data.date.trim() === selectedDate || parseDateStringToTime(p.data.date) === parseDateStringToTime(selectedDate);
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="archive-empty-state"><div class="archive-empty-state__icon">🔍</div><div class="archive-empty-state__text">No case studies match the selected date.</div></div>';
            return;
        }

        filtered.forEach(function (project, idx) {
            const card = createCompactProjectCard(project, idx);
            grid.appendChild(card);
        });
    }

    function createCompactProjectCard(project, index) {
        const data = project.data;
        const card = el('div', 'compact-card');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', (data.title || 'Project') + '. Click to view full case study.');

        // Image area
        const imageArea = el('div', 'compact-card__image-area');
        if (hasContent(data.image)) {
            const imgPath = (/^(assets\/|content\/|http|\/)/i.test(data.image))
                ? data.image
                : 'content/projects/' + project.folder + '/' + data.image;
            const img = el('img', 'compact-card__image');
            img.src = imgPath;
            img.alt = (data.title || 'Project') + ' preview';
            img.loading = 'lazy';
            img.onerror = function () {
                this.parentElement.innerHTML = '<div class="project-card__image-placeholder" style="font-size: 0.9rem;">' + esc(data.title || project.folder) + '</div>';
            };
            imageArea.appendChild(img);
        } else {
            imageArea.innerHTML = '<div class="project-card__image-placeholder" style="font-size: 0.9rem;">' + esc(data.title || project.folder) + '</div>';
        }
        card.appendChild(imageArea);

        // Body
        const body = el('div', 'compact-card__body');
        if (hasContent(data.category)) {
            body.appendChild(el('div', 'compact-card__category', esc(data.category)));
        }
        if (hasContent(data.title)) {
            body.appendChild(el('h3', 'compact-card__title', esc(data.title)));
        }
        if (hasContent(data.hook) || hasContent(data.description)) {
            const excerptText = data.hook || data.description;
            body.appendChild(el('p', 'compact-card__excerpt', esc(excerptText)));
        }

        // Meta (date & CTA)
        const meta = el('div', 'compact-card__meta');
        meta.appendChild(el('span', '', esc(data.date || '')));
        const cta = el('span', 'compact-card__cta');
        cta.innerHTML = 'View ' + icons.arrow;
        meta.appendChild(cta);
        body.appendChild(meta);

        card.appendChild(body);

        // Click opens full case study detail modal
        card.addEventListener('click', function () {
            openProjectModal(project);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(project);
            }
        });

        return card;
    }


    function openProjectModal(project) {
        const modal = document.getElementById('projectModal');
        const content = document.getElementById('projectModalContent');
        if (!modal || !content) return;

        const data = project.data;
        content.innerHTML = '';

        // Header
        const header = el('div', 'case-study__header');
        if (hasContent(data.category) || hasContent(data.date)) {
            const metaParts = [];
            if (hasContent(data.category)) metaParts.push(data.category);
            if (hasContent(data.date)) metaParts.push(data.date);
            header.appendChild(el('div', 'case-study__meta', esc(metaParts.join(' · '))));
        }
        if (hasContent(data.title)) {
            header.appendChild(el('h2', 'case-study__title', esc(data.title)));
        }
        if (hasContent(data.subtitle)) {
            header.appendChild(el('h4', 'case-study__subtitle', esc(data.subtitle)));
        }
        if (hasContent(data.hook)) {
            header.appendChild(el('p', 'case-study__hook', esc(data.hook)));
        }

        // Tags
        if (hasContent(data.tags)) {
            const tagsDiv = el('div', 'case-study__tags');
            data.tags.forEach(function (tag) {
                if (hasContent(tag)) tagsDiv.appendChild(el('span', 'tag', esc(tag)));
            });
            if (tagsDiv.children.length) header.appendChild(tagsDiv);
        }

        // Live Demo Link
        if (hasContent(data.liveDemo) && !data.liveDemo.includes('[ADD')) {
            const demoDiv = el('div', 'case-study__live-demo');
            const demoBtn = el('a', 'case-study__live-demo-btn');
            demoBtn.href = data.liveDemo;
            demoBtn.target = '_blank';
            demoBtn.rel = 'noopener noreferrer';
            demoBtn.innerHTML = icons.externalLink + ' <span>View Live Prototype / Demo</span>';
            demoDiv.appendChild(demoBtn);
            header.appendChild(demoDiv);
        }

        content.appendChild(header);

        // Body
        const body = el('div', 'case-study__body');

        // Helper function to append a section ONLY if it produces real content
        function appendSectionIfContent(sectionTitle, renderCallback) {
            const sec = el('div', 'case-study__section');
            const titleEl = el('h4', 'case-study__section-title', esc(sectionTitle));
            sec.appendChild(titleEl);
            const initialChildCount = sec.children.length;

            renderCallback(sec);

            // Only append to body if something was actually added besides the title
            if (sec.children.length > initialChildCount) {
                body.appendChild(sec);
            }
        }

        // Generic flexible renderer for strings, arrays, or objects
        function renderFlexibleValue(container, val) {
            if (!hasContent(val)) return;

            if (typeof val === 'string') {
                container.appendChild(el('p', 'case-study__text', esc(val)));
            } else if (Array.isArray(val)) {
                const list = el('ul', 'case-study__list');
                val.forEach(function (item) {
                    if (!hasContent(item)) return;
                    if (typeof item === 'string') {
                        list.appendChild(el('li', '', esc(item)));
                    } else if (typeof item === 'object') {
                        const itemTitle = item.title || item.name || item.heading || item.principle || item.type || '';
                        const itemDesc = item.description || item.reason || item.focus || item.observations || item.purpose || item.text || '';
                        let text = '';
                        if (hasContent(itemTitle)) text += '<strong>' + esc(itemTitle) + '</strong>';
                        if (hasContent(itemTitle) && hasContent(itemDesc)) text += ': ';
                        if (hasContent(itemDesc)) {
                            text += Array.isArray(itemDesc) ? itemDesc.map(esc).join(', ') : esc(itemDesc);
                        }
                        if (hasContent(text)) list.appendChild(el('li', '', text));
                    }
                });
                if (list.children.length) container.appendChild(list);
            } else if (typeof val === 'object' && val !== null) {
                if (hasContent(val.statement)) {
                    container.appendChild(el('blockquote', '', esc(val.statement)));
                }
                if (hasContent(val.challengedAssumption)) {
                    container.appendChild(el('p', 'case-study__text', '<strong>Challenged Assumption:</strong> ' + esc(val.challengedAssumption)));
                }
                if (hasContent(val.description)) {
                    container.appendChild(el('p', 'case-study__text', esc(val.description)));
                }
                if (hasContent(val.insight)) {
                    container.appendChild(el('p', 'case-study__text', '<strong>Key Insight:</strong> ' + esc(val.insight)));
                }
                if (hasContent(val.problemStatement)) {
                    container.appendChild(el('blockquote', '', esc(val.problemStatement)));
                }
                // Handle nested arrays like steps, stages, priorities, issues, opportunities, directions, points, needs, coreBreakdown, etc.
                const childKeys = ['steps', 'stages', 'issues', 'priorities', 'opportunities', 'directions', 'points', 'needs', 'coreBreakdown', 'targetMarket', 'existingAlternatives', 'constraints', 'trends', 'segments'];
                childKeys.forEach(function (k) {
                    if (hasContent(val[k])) {
                        renderFlexibleValue(container, val[k]);
                    }
                });
            }
        }

        // 1. Overview & Description
        if (hasContent(data.overview)) {
            appendSectionIfContent('Overview', function (sec) {
                sec.appendChild(el('p', 'case-study__text', esc(data.overview)));
            });
        } else if (hasContent(data.description)) {
            appendSectionIfContent('Overview', function (sec) {
                sec.appendChild(el('p', 'case-study__text', esc(data.description)));
            });
        }

        // 2. Target Users (Handles array of strings OR array of objects)
        if (hasContent(data.targetUsers)) {
            appendSectionIfContent('Target Users', function (sec) {
                const users = data.targetUsers;
                if (Array.isArray(users)) {
                    const hasObjects = users.some(u => typeof u === 'object' && u !== null && (hasContent(u.name) || hasContent(u.description)));
                    if (hasObjects) {
                        const grid = el('div', 'case-study__user-grid');
                        users.forEach(function (user) {
                            if (!user || typeof user !== 'object') return;
                            if (!hasContent(user.name) && !hasContent(user.description)) return;
                            const card = el('div', 'case-study__user-card');
                            if (hasContent(user.name)) card.appendChild(el('div', 'case-study__user-name', esc(user.name)));
                            if (hasContent(user.description)) card.appendChild(el('div', 'case-study__user-desc', esc(user.description)));
                            grid.appendChild(card);
                        });
                        if (grid.children.length) sec.appendChild(grid);
                    } else {
                        const list = el('ul', 'case-study__list');
                        users.forEach(function (u) {
                            if (hasContent(u)) list.appendChild(el('li', '', esc(typeof u === 'string' ? u : (u.name || u.description || ''))));
                        });
                        if (list.children.length) sec.appendChild(list);
                    }
                } else {
                    renderFlexibleValue(sec, users);
                }
            });
        }

        // 3. Defined sections list
        const dynamicSections = [
            { key: 'context', title: 'Context' },
            { key: 'challenge', title: 'Challenge' },
            { key: 'jtbd', title: 'Jobs To Be Done (JTBD)' },
            { key: 'jobsToBeDone', title: 'Jobs To Be Done (JTBD)' },
            { key: 'userNeeds', title: 'User Needs Captured' },
            { key: 'painPoints', title: 'User Pain Points' },
            { key: 'deeperAnxiety', title: 'The Deeper Anxiety' },
            { key: 'firstPrinciples', title: 'First Principles Analysis' },
            { key: 'fundamentalProblems', title: 'Fundamental Problems' },
            { key: 'solutionPrinciples', title: 'Solution Principles' },
            { key: 'problemStatement', title: 'Core Problem Statement' },
            { key: 'reflection', title: 'Reflection & Mindset Shift' },
            { key: 'keyTakeaways', title: 'Key Takeaways' },
            { key: 'researchGoal', title: 'Research Goal' },
            { key: 'marketResearch', title: 'Market Research' },
            { key: 'userResearch', title: 'User Research' },
            { key: 'interviewQuestions', title: 'User Interview Questions' },
            { key: 'research', title: 'Research' },
            { key: 'researchInsights', title: 'Research Insights' },
            { key: 'userProblems', title: 'User Problems' },
            { key: 'userJourney', title: 'User Journey Evaluated' },
            { key: 'evaluation', title: 'UX Evaluation' },
            { key: 'keyIssues', title: 'Key UX Issues' },
            { key: 'problemPrioritization', title: 'Problem Prioritization' },
            { key: 'opportunity', title: 'Opportunity' },
            { key: 'ideation', title: 'Ideation' },
            { key: 'solutionDirections', title: 'Solution Directions' },
            { key: 'prioritization', title: 'Prioritization' },
            { key: 'productThinking', title: 'Product Thinking' },
            { key: 'uxDirection', title: 'UX Direction' },
            { key: 'ux', title: 'UX & Prototype' },
            { key: 'learnings', title: 'Learnings & Takeaways' }
        ];

        dynamicSections.forEach(function (s) {
            if (!hasContent(data[s.key])) return;
            const customTitle = (typeof data[s.key] === 'object' && data[s.key] !== null && hasContent(data[s.key].title))
                ? data[s.key].title
                : s.title;

            appendSectionIfContent(customTitle, function (sec) {
                renderFlexibleValue(sec, data[s.key]);
            });
        });

        // 4. Solution Prioritization Framework
        if (hasContent(data.solutionPrioritization) && typeof data.solutionPrioritization === 'object') {
            const sp = data.solutionPrioritization;
            appendSectionIfContent('Solution Prioritization (' + esc(sp.framework || 'RICE') + ')', function (sec) {
                if (Array.isArray(sp.selectedSolutions)) {
                    const list = el('ul', 'case-study__list');
                    sp.selectedSolutions.forEach(function (sol) {
                        if (!sol) return;
                        list.appendChild(el('li', '', '<strong>' + esc(sol.name) + '</strong> (Score: ' + esc(sol.score) + ') — ' + esc(sol.reason)));
                    });
                    if (list.children.length) sec.appendChild(list);
                }
            });
        }

        // 5. User Flow Transformation (Before vs After)
        if (hasContent(data.userFlow) && typeof data.userFlow === 'object') {
            const uf = data.userFlow;
            const grid = el('div', 'case-study__flow-grid');

            if (Array.isArray(uf.before) && uf.before.some(hasContent)) {
                const col = el('div', 'case-study__flow-col case-study__flow-col--before');
                col.appendChild(el('h5', '', 'Before (Friction Flow)'));
                const ol = el('ol');
                uf.before.forEach(function (step) { if (hasContent(step)) ol.appendChild(el('li', '', esc(step))); });
                col.appendChild(ol);
                grid.appendChild(col);
            }

            if (Array.isArray(uf.after) && uf.after.some(hasContent)) {
                const col = el('div', 'case-study__flow-col case-study__flow-col--after');
                col.appendChild(el('h5', '', 'After (Proposed Solution Flow)'));
                const ol = el('ol');
                uf.after.forEach(function (step) { if (hasContent(step)) ol.appendChild(el('li', '', esc(step))); });
                col.appendChild(ol);
                grid.appendChild(col);
            }

            if (grid.children.length) {
                const sec = el('div', 'case-study__section');
                sec.appendChild(el('h4', 'case-study__section-title', 'User Flow Transformation'));
                sec.appendChild(grid);
                body.appendChild(sec);
            }
        }

        // 6. Proposed Solutions Cards
        if (hasContent(data.solutions) && Array.isArray(data.solutions)) {
            appendSectionIfContent('Proposed Solutions', function (sec) {
                data.solutions.forEach(function (sol) {
                    if (!sol) return;
                    const solCard = el('div', 'case-study__solution-card');
                    if (hasContent(sol.title)) solCard.appendChild(el('h4', 'case-study__solution-title', esc(sol.title)));
                    if (hasContent(sol.description)) solCard.appendChild(el('p', 'case-study__text', esc(sol.description)));
                    if (hasContent(sol.problemSolved)) {
                        solCard.appendChild(el('div', 'case-study__solution-label', 'Problem Solved'));
                        solCard.appendChild(el('p', 'case-study__text', esc(sol.problemSolved)));
                    }
                    if (hasContent(sol.productThinking) && Array.isArray(sol.productThinking)) {
                        solCard.appendChild(el('div', 'case-study__solution-label', 'Product Thinking'));
                        const ul = el('ul', 'case-study__list');
                        sol.productThinking.forEach(function (pt) { if (hasContent(pt)) ul.appendChild(el('li', '', esc(pt))); });
                        solCard.appendChild(ul);
                    }
                    if (solCard.children.length) sec.appendChild(solCard);
                });
            });
        }

        // 7. Success Metrics & Target Impact (Handles array of strings OR array of objects)
        if (hasContent(data.successMetrics)) {
            appendSectionIfContent('Success Metrics & Target Impact', function (sec) {
                const metrics = data.successMetrics;
                if (Array.isArray(metrics)) {
                    const hasObjects = metrics.some(m => typeof m === 'object' && m !== null && (hasContent(m.value) || hasContent(m.label)));
                    if (hasObjects) {
                        const metricsGrid = el('div', 'case-study__metrics-grid');
                        metrics.forEach(function (m) {
                            if (!m || typeof m !== 'object') return;
                            if (!hasContent(m.value) && !hasContent(m.label)) return;
                            const card = el('div', 'case-study__metric-card');
                            if (hasContent(m.value)) card.appendChild(el('div', 'case-study__metric-value', esc(m.value)));
                            if (hasContent(m.label)) card.appendChild(el('div', 'case-study__metric-label', esc(m.label)));
                            metricsGrid.appendChild(card);
                        });
                        if (metricsGrid.children.length) sec.appendChild(metricsGrid);
                    } else {
                        const list = el('ul', 'case-study__list');
                        metrics.forEach(function (m) {
                            if (hasContent(m)) list.appendChild(el('li', '', esc(typeof m === 'string' ? m : (m.label || m.value || ''))));
                        });
                        if (list.children.length) sec.appendChild(list);
                    }
                } else {
                    renderFlexibleValue(sec, metrics);
                }
            });
        }

        // 8. Custom sections
        if (Array.isArray(data.customSections)) {
            data.customSections.forEach(function (sec) {
                if (!sec || !hasContent(sec.title) || !hasContent(sec.content)) return;
                appendSectionIfContent(sec.title, function (secEl) {
                    renderFlexibleValue(secEl, sec.content);
                });
            });
        }

        // Gallery
        if (hasContent(data.gallery) || hasContent(data.images)) {
            const galleryImages = data.gallery || data.images;
            if (Array.isArray(galleryImages) && galleryImages.length > 0) {
                const gallery = createGallery(galleryImages, project.folder);
                if (gallery) body.appendChild(gallery);
            }
        }

        content.appendChild(body);

        // Open modal
        modal.classList.add('project-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function toggleCaseStudy(index) {
        const cs = document.getElementById('caseStudy-' + index);
        if (!cs) return;

        const isOpen = cs.classList.contains('case-study--open');

        // Close all other open case studies
        document.querySelectorAll('.case-study--open').forEach(function (openCs) {
            openCs.classList.remove('case-study--open');
        });

        if (!isOpen) {
            cs.classList.add('case-study--open');
            // Scroll to case study after a brief delay for animation
            setTimeout(function () {
                cs.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            // Scroll back to the project card
            const wrapper = cs.parentElement;
            if (wrapper) {
                setTimeout(function () {
                    wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }


    // ==========================================
    // 8. GALLERY
    // ==========================================

    function createGallery(images, folder) {
        const validImages = images.filter(function (img) {
            return hasContent(typeof img === 'string' ? img : img.src || img.url || img.path);
        });

        if (validImages.length === 0) return null;

        const gallery = el('div', 'gallery');
        const track = el('div', 'gallery__track');
        let currentSlide = 0;

        validImages.forEach(function (img) {
            const slide = el('div', 'gallery__slide');
            const src = typeof img === 'string' ? img : (img.src || img.url || img.path);
            const imgPath = 'content/projects/' + folder + '/' + src;

            const imgEl = el('img');
            imgEl.src = imgPath;
            imgEl.alt = (typeof img === 'object' && img.caption) ? img.caption : 'Project image';
            imgEl.loading = 'lazy';
            slide.appendChild(imgEl);

            if (typeof img === 'object' && hasContent(img.caption)) {
                slide.appendChild(el('div', 'gallery__caption', esc(img.caption)));
            }

            track.appendChild(slide);
        });

        gallery.appendChild(track);

        if (validImages.length > 1) {
            // Nav arrows
            const prevBtn = el('button', 'gallery__nav gallery__nav--prev');
            prevBtn.innerHTML = icons.chevronLeft;
            prevBtn.setAttribute('aria-label', 'Previous image');

            const nextBtn = el('button', 'gallery__nav gallery__nav--next');
            nextBtn.innerHTML = icons.chevronRight;
            nextBtn.setAttribute('aria-label', 'Next image');

            gallery.appendChild(prevBtn);
            gallery.appendChild(nextBtn);

            // Dots
            const dotsContainer = el('div', 'gallery__dots');
            validImages.forEach(function (_, i) {
                const dot = el('button', 'gallery__dot' + (i === 0 ? ' gallery__dot--active' : ''));
                dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
                dot.addEventListener('click', function () { goToSlide(i); });
                dotsContainer.appendChild(dot);
            });
            gallery.appendChild(dotsContainer);

            function goToSlide(n) {
                currentSlide = Math.max(0, Math.min(n, validImages.length - 1));
                track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

                dotsContainer.querySelectorAll('.gallery__dot').forEach(function (d, i) {
                    d.classList.toggle('gallery__dot--active', i === currentSlide);
                });
            }

            prevBtn.addEventListener('click', function () { goToSlide(currentSlide - 1); });
            nextBtn.addEventListener('click', function () { goToSlide(currentSlide + 1); });

            // Keyboard
            gallery.setAttribute('tabindex', '0');
            gallery.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
                if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
            });

            // Touch swipe
            let touchStartX = 0;
            let touchEndX = 0;

            gallery.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            gallery.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) goToSlide(currentSlide + 1);
                    else goToSlide(currentSlide - 1);
                }
            }, { passive: true });
        }

        return gallery;
    }


    // ==========================================
    // 9. EXPERIENCE TIMELINE
    // ==========================================

    function renderExperience() {
        const exp = typeof experienceContent !== 'undefined' ? experienceContent : [];
        const timeline = document.getElementById('experienceTimeline');
        const section = document.getElementById('experience');
        if (!timeline || !section) return;

        // Filter out entries that are all placeholders
        const validEntries = exp.filter(function (entry) {
            return hasContent(entry.company) || hasContent(entry.role);
        });

        if (validEntries.length === 0) {
            section.classList.add('hidden');
            return;
        }

        validEntries.forEach(function (entry, index) {
            const card = el('div', 'exp-card');
            card.style.transitionDelay = (index * 150) + 'ms';

            const dot = el('div', 'exp-card__dot');
            card.appendChild(dot);

            // Company logo placeholder
            var logoBox = el('div', 'exp-card__logo');
            if (hasContent(entry.logo)) {
                logoBox.innerHTML = '<img src="' + esc(entry.logo) + '" alt="' + esc(entry.company || 'Company') + ' Logo" class="exp-card__logo-img">';
            } else {
                logoBox.innerHTML = '<span class="exp-card__logo-placeholder">Company Logo</span>';
            }
            card.appendChild(logoBox);

            const header = el('div', 'exp-card__header');

            if (hasContent(entry.role)) {
                header.appendChild(el('div', 'exp-card__role', esc(entry.role)));
            }

            if (hasContent(entry.startDate) || hasContent(entry.endDate)) {
                const dateStr = [entry.startDate, entry.endDate].filter(hasContent).join(' — ');
                header.appendChild(el('div', 'exp-card__dates', esc(dateStr)));
            }

            card.appendChild(header);

            if (hasContent(entry.company)) {
                card.appendChild(el('div', 'exp-card__company', esc(entry.company)));
            }

            if (hasContent(entry.location)) {
                const loc = el('div', 'exp-card__location');
                loc.innerHTML = icons.mapPin + ' ' + esc(entry.location);
                // Fix icon size
                loc.querySelector('svg').style.width = '14px';
                loc.querySelector('svg').style.height = '14px';
                card.appendChild(loc);
            }

            if (hasContent(entry.description)) {
                card.appendChild(el('p', 'exp-card__description', esc(entry.description)));
            }

            if (hasContent(entry.highlights)) {
                const list = el('ul', 'exp-card__highlights');
                entry.highlights.forEach(function (h) {
                    if (hasContent(h)) list.appendChild(el('li', '', esc(h)));
                });
                if (list.children.length) card.appendChild(list);
            }

            if (hasContent(entry.tags)) {
                const tagsDiv = el('div', 'exp-card__tags');
                entry.tags.forEach(function (t) {
                    if (hasContent(t)) tagsDiv.appendChild(el('span', 'tag', esc(t)));
                });
                if (tagsDiv.children.length) card.appendChild(tagsDiv);
            }

            timeline.appendChild(card);
        });
    }


    // ==========================================
    // 10. CERTIFICATES
    // ==========================================

    function renderCertificates() {
        const section = document.getElementById('certificates');
        const grid = document.getElementById('certificatesGrid');
        if (!section || !grid) return;

        grid.innerHTML = '';
        const allCerts = [];

        // 1. Standalone certificates from content/certificates/certificate.js
        if (typeof certificates !== 'undefined' && Array.isArray(certificates)) {
            certificates.forEach(function (cert) {
                if (hasContent(cert)) {
                    allCerts.push({ cert: cert, folder: '' });
                }
            });
        }

        // 2. Certificates attached to individual project files
        loadedProjects.forEach(function (project) {
            if (project.data.certificates && Array.isArray(project.data.certificates)) {
                project.data.certificates.forEach(function (cert) {
                    if (hasContent(cert)) {
                        allCerts.push({ cert: cert, folder: project.folder });
                    }
                });
            }
        });

        if (allCerts.length === 0) {
            for (var i = 0; i < 3; i++) {
                var placeholder = el('div', 'cert-card reveal');
                placeholder.innerHTML =
                    '<div class="placeholder-card">' +
                    '<div class="placeholder-card__icon">🏆</div>' +
                    '<div class="placeholder-card__label">Certificate ' + (i + 1) + '</div>' +
                    '<div class="placeholder-card__text">Preview images will appear here. Add certificates to content/certificates/certificate.js.</div>' +
                    '</div>';
                grid.appendChild(placeholder);
            }
        } else {
            allCerts.forEach(function (item, index) {
                var card = createCertificateCard(item.cert, item.folder, index);
                if (index >= 3) {
                    card.classList.add('cert-card--hidden');
                }
                grid.appendChild(card);
            });

            // Add View More / View Less Certificates button if more than 3 certificates exist
            if (allCerts.length > 3) {
                var existingBtn = grid.parentElement.querySelector('.certs__view-more-container');
                if (existingBtn) existingBtn.remove();

                var viewMoreContainer = el('div', 'certs__view-more-container reveal');
                var viewMoreBtn = document.createElement('button');
                viewMoreBtn.className = 'certs__view-more';
                viewMoreBtn.innerHTML = 'View More Certificates <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
                var isCertExpanded = false;
                viewMoreBtn.addEventListener('click', function () {
                    isCertExpanded = !isCertExpanded;
                    var cards = grid.querySelectorAll('.cert-card');
                    cards.forEach(function (c, i) {
                        if (i >= 3) {
                            if (isCertExpanded) {
                                c.classList.remove('cert-card--hidden');
                            } else {
                                c.classList.add('cert-card--hidden');
                            }
                        }
                    });
                    if (isCertExpanded) {
                        viewMoreBtn.innerHTML = 'View Less Certificates <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="transform: rotate(180deg);"><polyline points="6 9 12 15 18 9"/></svg>';
                    } else {
                        viewMoreBtn.innerHTML = 'View More Certificates <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
                        var section = document.getElementById('certificates');
                        if (section) section.scrollIntoView({ behavior: 'smooth' });
                    }
                    initScrollReveal();
                });
                viewMoreContainer.appendChild(viewMoreBtn);
                grid.parentElement.appendChild(viewMoreContainer);
            }
        }
    }

    function initCertModal() {
        const backdrop = document.getElementById('certModalBackdrop');
        const closeBtn = document.getElementById('certModalClose');

        if (backdrop) backdrop.addEventListener('click', closeCertModal);
        if (closeBtn) closeBtn.addEventListener('click', closeCertModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeCertModal();
        });
    }

    function closeCertModal() {
        const modal = document.getElementById('certModal');
        if (!modal) return;
        modal.classList.remove('project-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openCertModal(cert, imgPath) {
        const modal = document.getElementById('certModal');
        const content = document.getElementById('certModalContent');
        if (!modal || !content) return;

        const titleText = cert.title || cert.name || 'Certificate Details';
        content.innerHTML = '';

        // Header
        const header = el('div', 'case-study__header');
        const metaParts = [];
        if (hasContent(cert.provider)) metaParts.push(cert.provider);
        if (hasContent(cert.date)) metaParts.push(cert.date);
        if (metaParts.length) {
            header.appendChild(el('div', 'case-study__meta', esc(metaParts.join(' · '))));
        }

        header.appendChild(el('h2', 'case-study__title', esc(titleText)));

        if (hasContent(cert.tags)) {
            const tagsDiv = el('div', 'case-study__tags');
            cert.tags.forEach(function (tag) {
                if (hasContent(tag)) tagsDiv.appendChild(el('span', 'tag', esc(tag)));
            });
            if (tagsDiv.children.length) header.appendChild(tagsDiv);
        }

        content.appendChild(header);

        // Body
        const body = el('div', 'case-study__body');

        // Large Preview Image
        if (hasContent(imgPath)) {
            const imageSec = el('div', 'case-study__section cert-modal__image-sec');
            const imgEl = el('img', 'cert-modal__image');
            imgEl.src = imgPath;
            imgEl.alt = titleText + ' preview';
            imgEl.style.cursor = 'zoom-in';
            imgEl.addEventListener('click', function () {
                openLightbox(imgPath);
            });
            imageSec.appendChild(imgEl);

            const hint = el('div', 'cert-modal__image-hint', 'Click image for full-screen preview');
            imageSec.appendChild(hint);
            body.appendChild(imageSec);
        }

        // Description / Overview
        if (hasContent(cert.description)) {
            const descSec = el('div', 'case-study__section');
            descSec.appendChild(el('h4', 'case-study__section-title', 'Overview & Description'));
            descSec.appendChild(el('p', 'case-study__text', esc(cert.description)));
            body.appendChild(descSec);
        }

        // Learnings
        if (hasContent(cert.learnings) && Array.isArray(cert.learnings)) {
            const learnSec = el('div', 'case-study__section');
            learnSec.appendChild(el('h4', 'case-study__section-title', 'Key Learnings & Skills Acquired'));
            const list = el('ul', 'case-study__list');
            cert.learnings.forEach(function (l) {
                if (hasContent(l)) list.appendChild(el('li', '', esc(l)));
            });
            if (list.children.length) {
                learnSec.appendChild(list);
                body.appendChild(learnSec);
            }
        }

        content.appendChild(body);

        // Open modal
        modal.classList.add('project-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function createCertificateCard(cert, folder, index) {
        const card = el('div', 'cert-card cert-card--clickable reveal');
        card.style.transitionDelay = (index * 100) + 'ms';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', (cert.title || cert.name || 'Certificate') + '. Click to view certificate details.');

        const titleText = cert.title || cert.name || 'Certificate';
        const imageRaw = cert.certificate || cert.image || '';

        const imgPath = (/^(assets\/|asset\/|content\/|http|\/)/i.test(imageRaw))
            ? imageRaw
            : (folder ? 'content/projects/' + folder + '/certificates/' + imageRaw : imageRaw);

        // Preview Image Area
        if (hasContent(imgPath)) {
            const imageArea = el('div', 'cert-card__image-area');
            const img = el('img', 'cert-card__image');
            img.src = imgPath;
            img.alt = titleText + ' preview';
            img.loading = 'lazy';
            img.onerror = function () { imageArea.style.display = 'none'; };

            imageArea.appendChild(img);
            card.appendChild(imageArea);
        }

        // Preview Body: ONLY Name, Provider, Date, and CTA!
        const body = el('div', 'cert-card__body');

        if (hasContent(titleText)) {
            body.appendChild(el('div', 'cert-card__name', esc(titleText)));
        }
        body.appendChild(el('div', 'cert-card__provider', hasContent(cert.provider) ? esc(cert.provider) : '&nbsp;'));
        body.appendChild(el('div', 'cert-card__date', hasContent(cert.date) ? esc(cert.date) : '&nbsp;'));

        const cta = el('div', 'cert-card__cta');
        cta.innerHTML = 'View Details ' + icons.arrow;
        body.appendChild(cta);

        card.appendChild(body);

        // Click to open Certificate Modal Overlay
        card.addEventListener('click', function () {
            openCertModal(cert, imgPath);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCertModal(cert, imgPath);
            }
        });

        return card;
    }

    function renderProjectCertificates(certs, folder, container) {
        if (!Array.isArray(certs) || certs.length === 0) return;

        const validCerts = certs.filter(function (c) { return hasContent(c); });
        if (validCerts.length === 0) return;

        const section = el('div', 'case-study__section');
        section.appendChild(el('h4', 'case-study__section-title', 'Certificates'));

        const certsGrid = el('div', 'certificates__grid');
        validCerts.forEach(function (cert, i) {
            certsGrid.appendChild(createCertificateCard(cert, folder, i));
        });

        section.appendChild(certsGrid);
        container.appendChild(section);
    }


    // ==========================================
    // 11. LIGHTBOX
    // ==========================================

    function openLightbox(src) {
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightboxImage');
        if (!lightbox || !img) return;

        img.src = src;
        lightbox.classList.add('lightbox--open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;

        lightbox.classList.remove('lightbox--open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function initLightbox() {
        const closeBtn = document.getElementById('lightboxClose');
        const lightbox = document.getElementById('lightbox');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        if (lightbox) {
            lightbox.addEventListener('click', function (e) {
                if (e.target === lightbox) closeLightbox();
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }


    // ==========================================
    // 12. BLOG
    // ==========================================

    const blogPosts = []; // Will be populated if blog content files exist

    function loadBlogs() {
        if (typeof blogContent !== 'undefined' && Array.isArray(blogContent)) {
            blogContent.forEach(function (post) {
                if (hasContent(post)) blogPosts.push(post);
            });
            renderBlogs();
            return;
        }

        const script = document.createElement('script');
        script.src = 'content/blogs/blogs.js';

        script.onload = function () {
            if (typeof blogContent !== 'undefined' && Array.isArray(blogContent)) {
                blogContent.forEach(function (post) {
                    if (hasContent(post)) blogPosts.push(post);
                });
            }
            renderBlogs();
        };

        script.onerror = function () {
            renderBlogs();
        };

        document.head.appendChild(script);
    }

    function renderBlogs() {
        const section = document.getElementById('blog');
        const grid = document.getElementById('blogGrid');
        if (!section || !grid) return;

        grid.innerHTML = '';

        if (blogPosts.length === 0) {
            section.classList.add('hidden');
        } else {
            section.classList.remove('hidden');
            blogPosts.forEach(function (post, index) {
                if (index >= 2) return; // Only show up to 2 blogs on landing page

                const wrapper = el('div', 'blog-wrapper reveal');
                wrapper.style.transitionDelay = (index * 100) + 'ms';

                const card = createBlogCard(post, index);
                wrapper.appendChild(card);
                grid.appendChild(wrapper);
            });

            // Add View More Blogs button container
            var existingBtn = grid.parentElement.querySelector('.blog__view-more-container');
            if (existingBtn) existingBtn.remove();

            var viewMoreContainer = el('div', 'blog__view-more-container reveal');
            var viewMoreBtn = document.createElement('button');
            viewMoreBtn.className = 'blog__view-more';
            viewMoreBtn.innerHTML = 'View More Blogs <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
            viewMoreBtn.addEventListener('click', function () {
                openBlogArchiveModal();
            });

            viewMoreContainer.appendChild(viewMoreBtn);
            grid.parentElement.appendChild(viewMoreContainer);
        }

        // Re-check which sections should be hidden
        hideEmptySections();
        initScrollReveal();
    }

    function createBlogCard(post, index) {
        const card = el('div', 'blog-card');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', (post.title || 'Blog post') + '. Click to read.');

        if (hasContent(post.category)) {
            card.appendChild(el('div', 'blog-card__category', esc(post.category)));
        }
        if (hasContent(post.title)) {
            card.appendChild(el('h3', 'blog-card__title', esc(post.title)));
        }
        if (hasContent(post.excerpt)) {
            card.appendChild(el('p', 'blog-card__excerpt', esc(post.excerpt)));
        }
        if (hasContent(post.date)) {
            card.appendChild(el('div', 'blog-card__date', esc(post.date)));
        }

        const readMore = el('div', 'blog-card__read-more');
        readMore.innerHTML = 'Read More ' + icons.arrow;
        card.appendChild(readMore);

        card.addEventListener('click', function () {
            openBlogModal(post);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBlogModal(post);
            }
        });

        return card;
    }

    function createBlogArticle(post, index) {
        // Kept for backwards compatibility but no longer used for inline
        const article = el('div', 'blog-article');
        article.id = 'blogArticle-' + index;
        return article;
    }

    function openBlogModal(post) {
        var modal = document.getElementById('blogModal');
        var content = document.getElementById('blogModalContent');
        if (!modal || !content) return;

        // Build modal content
        content.innerHTML = '';

        if (hasContent(post.category)) {
            content.appendChild(el('div', 'blog-card__category', esc(post.category)));
        }
        if (hasContent(post.title)) {
            content.appendChild(el('h3', '', esc(post.title)));
        }
        if (hasContent(post.date)) {
            content.appendChild(el('div', 'blog-card__date', esc(post.date)));
        }

        // Introduction
        if (hasContent(post.introduction)) {
            content.appendChild(el('p', '', esc(post.introduction)));
        }

        // Main content
        if (hasContent(post.body)) {
            if (typeof post.body === 'string') {
                content.appendChild(el('p', '', esc(post.body)));
            } else if (Array.isArray(post.body)) {
                post.body.forEach(function (block) {
                    if (typeof block === 'string' && hasContent(block)) {
                        content.appendChild(el('p', '', esc(block)));
                    } else if (typeof block === 'object' && hasContent(block)) {
                        if (hasContent(block.heading)) {
                            content.appendChild(el('h3', '', esc(block.heading)));
                        }
                        if (hasContent(block.text)) {
                            content.appendChild(el('p', '', esc(block.text)));
                        }
                        if (hasContent(block.items)) {
                            var list = el('ul');
                            block.items.forEach(function (item) {
                                if (hasContent(item)) list.appendChild(el('li', '', esc(item)));
                            });
                            if (list.children.length) content.appendChild(list);
                        }
                        if (hasContent(block.quote)) {
                            content.appendChild(el('blockquote', '', esc(block.quote)));
                        }
                    }
                });
            }
        }

        // Key takeaways
        if (hasContent(post.takeaways)) {
            var tkDiv = el('div', 'blog-modal__takeaways');
            tkDiv.appendChild(el('div', 'blog-modal__takeaways-title', 'Key Takeaways'));
            var list = el('ul');
            post.takeaways.forEach(function (tk) {
                if (hasContent(tk)) list.appendChild(el('li', '', esc(tk)));
            });
            if (list.children.length) tkDiv.appendChild(list);
            content.appendChild(tkDiv);
        }

        // Conclusion
        if (hasContent(post.conclusion)) {
            content.appendChild(el('p', '', esc(post.conclusion)));
        }

        // Show modal
        modal.classList.add('blog-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBlogModal() {
        var modal = document.getElementById('blogModal');
        if (!modal) return;
        modal.classList.remove('blog-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        const caseArchive = document.getElementById('caseStudyArchiveModal');
        const blogArchive = document.getElementById('blogArchiveModal');
        const isArchiveOpen = (caseArchive && caseArchive.classList.contains('project-modal--open')) ||
            (blogArchive && blogArchive.classList.contains('project-modal--open'));
        if (!isArchiveOpen) {
            document.body.style.overflow = '';
        }
    }

    function initBlogModal() {
        var closeBtn = document.getElementById('blogModalClose');
        var backdrop = document.getElementById('blogModalBackdrop');

        if (closeBtn) closeBtn.addEventListener('click', closeBlogModal);
        if (backdrop) backdrop.addEventListener('click', closeBlogModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeBlogModal();
        });
    }

    // ==========================================
    // BLOG ARCHIVE MODAL & FILTERING
    // ==========================================

    function initBlogArchiveModal() {
        const modal = document.getElementById('blogArchiveModal');
        const backdrop = document.getElementById('blogArchiveBackdrop');
        const closeBtn = document.getElementById('blogArchiveClose');
        const catFilter = document.getElementById('blogCategoryFilter');
        const dateFilter = document.getElementById('blogDateFilter');

        if (backdrop) backdrop.addEventListener('click', closeBlogArchiveModal);
        if (closeBtn) closeBtn.addEventListener('click', closeBlogArchiveModal);
        if (catFilter) catFilter.addEventListener('change', renderBlogArchiveGrid);
        if (dateFilter) dateFilter.addEventListener('change', renderBlogArchiveGrid);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('project-modal--open')) {
                closeBlogArchiveModal();
            }
        });
    }

    function openBlogArchiveModal() {
        const modal = document.getElementById('blogArchiveModal');
        if (!modal) return;

        populateBlogArchiveFilters();
        renderBlogArchiveGrid();

        modal.classList.add('project-modal--open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBlogArchiveModal() {
        const modal = document.getElementById('blogArchiveModal');
        if (!modal) return;
        modal.classList.remove('project-modal--open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function populateBlogArchiveFilters() {
        const catFilter = document.getElementById('blogCategoryFilter');
        const dateFilter = document.getElementById('blogDateFilter');
        if (!catFilter || !dateFilter) return;

        const categories = new Set();
        const baseMonths = [
            "April 2026",
            "May 2026",
            "June 2026",
            "July 2026",
            "August 2026",
            "September 2026",
            "October 2026"
        ];
        const dates = new Set(baseMonths);

        blogPosts.forEach(function (post) {
            if (hasContent(post.category)) categories.add(post.category.trim());
            if (hasContent(post.date)) dates.add(post.date.trim());
        });

        const selectedCat = catFilter.value;
        catFilter.innerHTML = '<option value="ALL">All Categories</option>';
        categories.forEach(function (cat) {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            if (cat === selectedCat) opt.selected = true;
            catFilter.appendChild(opt);
        });

        const sortedDates = Array.from(dates).sort((a, b) => parseDateStringToTime(a) - parseDateStringToTime(b));

        const selectedDate = dateFilter.value;
        dateFilter.innerHTML = '<option value="ALL">All Added</option>';
        sortedDates.forEach(function (d) {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            if (d === selectedDate) opt.selected = true;
            dateFilter.appendChild(opt);
        });
    }

    function renderBlogArchiveGrid() {
        const grid = document.getElementById('blogArchiveGrid');
        const catFilter = document.getElementById('blogCategoryFilter');
        const dateFilter = document.getElementById('blogDateFilter');
        if (!grid) return;

        grid.innerHTML = '';
        const selectedCat = catFilter ? catFilter.value : 'ALL';
        const selectedDate = dateFilter ? dateFilter.value : 'ALL';

        const filtered = blogPosts.filter(function (post) {
            const matchesCat = (selectedCat === 'ALL' || (post.category && post.category.trim() === selectedCat));
            let matchesDate = false;
            if (selectedDate === 'ALL') {
                matchesDate = true;
            } else if (post.date) {
                matchesDate = (post.date.trim() === selectedDate || parseDateStringToTime(post.date) === parseDateStringToTime(selectedDate));
            }
            return matchesCat && matchesDate;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="archive-empty-state"><div class="archive-empty-state__icon">🔍</div><div class="archive-empty-state__text">No articles match the selected filters.</div></div>';
            return;
        }

        filtered.forEach(function (post, idx) {
            const card = createCompactBlogCard(post, idx);
            grid.appendChild(card);
        });
    }

    function createCompactBlogCard(post, index) {
        const card = el('div', 'compact-card');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', (post.title || 'Blog Article') + '. Click to read article.');

        const body = el('div', 'compact-card__body');
        if (hasContent(post.category)) {
            body.appendChild(el('div', 'compact-card__category', esc(post.category)));
        }
        if (hasContent(post.title)) {
            body.appendChild(el('h3', 'compact-card__title', esc(post.title)));
        }
        if (hasContent(post.excerpt) || hasContent(post.introduction)) {
            const excerptText = post.excerpt || post.introduction;
            body.appendChild(el('p', 'compact-card__excerpt', esc(excerptText)));
        }

        // Meta (date & CTA)
        const meta = el('div', 'compact-card__meta');
        meta.appendChild(el('span', '', esc(post.date || '')));
        const cta = el('span', 'compact-card__cta');
        cta.innerHTML = 'Read Article ' + icons.arrow;
        meta.appendChild(cta);
        body.appendChild(meta);

        card.appendChild(body);

        // Click opens full blog detail modal
        card.addEventListener('click', function () {
            openBlogModal(post);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBlogModal(post);
            }
        });

        return card;
    }



    // ==========================================
    // 13. FOOTER
    // ==========================================

    function renderFooter() {
        const info = typeof siteInfo !== 'undefined' ? siteInfo : {};

        // Year
        const yearEl = document.getElementById('footerYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        // Actions
        const actionsEl = document.getElementById('footerActions');
        if (actionsEl) {
            if (hasContent(info.email)) {
                const btn = el('a', 'btn btn--accent');
                btn.href = 'mailto:' + info.email;
                btn.innerHTML = icons.mail + " Let's Talk";
                actionsEl.appendChild(btn);
            }

            if (hasContent(info.resume)) {
                const btn = el('a', 'btn btn--secondary');
                btn.href = info.resume;
                btn.target = '_blank';
                btn.rel = 'noopener';
                btn.innerHTML = icons.download + ' Resume';
                btn.style.color = '#fff';
                btn.style.borderColor = 'rgba(255,255,255,0.3)';
                btn.style.background = 'transparent';
                actionsEl.appendChild(btn);
            }
        }

        // Links
        const linksEl = document.getElementById('footerLinks');
        if (linksEl) {
            if (hasContent(info.email)) {
                const a = el('a', 'footer__link');
                a.href = 'mailto:' + info.email;
                a.innerHTML = icons.mail + ' ' + esc(info.email);
                linksEl.appendChild(a);
            }
            if (hasContent(info.linkedin)) {
                const a = el('a', 'footer__link');
                a.href = info.linkedin;
                a.target = '_blank';
                a.rel = 'noopener';
                a.innerHTML = icons.linkedin + ' LinkedIn';
                linksEl.appendChild(a);
            }
            if (hasContent(info.github)) {
                const a = el('a', 'footer__link');
                a.href = info.github;
                a.target = '_blank';
                a.rel = 'noopener';
                a.innerHTML = icons.github + ' GitHub';
                linksEl.appendChild(a);
            }
            if (hasContent(info.location)) {
                const a = el('span', 'footer__link');
                a.innerHTML = icons.mapPin + ' ' + esc(info.location);
                linksEl.appendChild(a);
            }

            // Fix icon sizes in footer links
            linksEl.querySelectorAll('svg').forEach(function (svg) {
                svg.style.width = '16px';
                svg.style.height = '16px';
                svg.style.flexShrink = '0';
            });
        }
    }


    // ==========================================
    // 14. NAVIGATION
    // ==========================================

    function initNavigation() {
        const toggle = document.getElementById('navToggle');
        const overlay = document.getElementById('navOverlay');
        const nav = document.getElementById('nav');

        // Mobile menu toggle
        if (toggle && overlay) {
            toggle.addEventListener('click', function () {
                const isOpen = overlay.classList.contains('nav__overlay--open');
                overlay.classList.toggle('nav__overlay--open');
                toggle.classList.toggle('nav__toggle--open');
                toggle.setAttribute('aria-expanded', !isOpen);
                document.body.style.overflow = isOpen ? '' : 'hidden';
            });

            // Close on link click
            overlay.querySelectorAll('.nav__link').forEach(function (link) {
                link.addEventListener('click', function () {
                    overlay.classList.remove('nav__overlay--open');
                    toggle.classList.remove('nav__toggle--open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });
        }

        // Nav shadow on scroll
        if (nav) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 10) {
                    nav.classList.add('nav--shadow');
                } else {
                    nav.classList.remove('nav--shadow');
                }
            }, { passive: true });
        }

        // Active section tracking
        initActiveSection();
    }

    function initActiveSection() {
        const sections = document.querySelectorAll('section[id], #education, footer[id]');
        const navLinks = document.querySelectorAll('.nav__link[data-section]');

        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(function (link) {
                        const secVal = link.getAttribute('data-section') || (link.dataset && link.dataset.section);
                        link.classList.toggle('nav__link--active', secVal === id);
                    });

                    // Also update mobile nav links
                    document.querySelectorAll('.nav__overlay .nav__link').forEach(function (link) {
                        const secVal = link.getAttribute('data-section') || (link.dataset && link.dataset.section);
                        link.classList.toggle('nav__link--active', secVal === id);
                    });
                }
            });
        }, {
            rootMargin: '-20% 0px -40% 0px',
            threshold: 0.05
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });

        // Ensure Contact is active when scrolled to footer / near bottom of page
        window.addEventListener('scroll', function () {
            var scrollPosition = window.innerHeight + window.scrollY;
            var docHeight = document.documentElement.scrollHeight;
            if (scrollPosition >= docHeight - 80) {
                navLinks.forEach(function (link) {
                    const secVal = link.getAttribute('data-section') || (link.dataset && link.dataset.section);
                    link.classList.toggle('nav__link--active', secVal === 'contact');
                });
                document.querySelectorAll('.nav__overlay .nav__link').forEach(function (link) {
                    const secVal = link.getAttribute('data-section') || (link.dataset && link.dataset.section);
                    link.classList.toggle('nav__link--active', secVal === 'contact');
                });
            }
        }, { passive: true });
    }


    // ==========================================
    // 15. SCROLL REVEAL
    // ==========================================

    function initScrollReveal() {
        const elements = document.querySelectorAll('.reveal, .timeline__item, .exp-card');

        if (elements.length === 0) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            elements.forEach(function (el) {
                el.classList.add('reveal--visible');
                el.classList.add('revealed');
            });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }


    // ==========================================
    // 16. HIDE EMPTY SECTIONS
    // ==========================================

    function hideEmptySections() {
        // Only hide blog if truly empty
        var checks = [
            { gridId: 'blogGrid', sectionId: 'blog' }
        ];

        checks.forEach(function (check) {
            var grid = document.getElementById(check.gridId);
            var section = document.getElementById(check.sectionId);
            if (grid && section) {
                if (grid.children.length === 0) {
                    section.classList.add('hidden');
                } else {
                    section.classList.remove('hidden');
                }
            }
        });

        // Hide nav links for hidden sections
        document.querySelectorAll('.nav__link[data-section]').forEach(function (link) {
            var sectionId = link.getAttribute('data-section') || (link.dataset && link.dataset.section);
            if (sectionId === 'contact') return;
            var section = document.getElementById(sectionId);
            if (section && section.classList.contains('hidden')) {
                link.style.display = 'none';
            } else if (section) {
                link.style.display = '';
            }
        });

        // Also hide in mobile nav
        document.querySelectorAll('.nav__overlay .nav__link').forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href) return;
            var sectionId = href.replace('#', '');
            if (sectionId === 'contact') return;
            var section = document.getElementById(sectionId);
            if (section && section.classList.contains('hidden')) {
                link.style.display = 'none';
            } else if (section) {
                link.style.display = '';
            }
        });
    }


    // ==========================================
    // 17. TIMELINE GLOW ON SCROLL
    // ==========================================

    function initTimelineGlow() {
        var expTimeline = document.getElementById('experienceTimeline');
        if (!expTimeline) return;

        var dots = expTimeline.querySelectorAll('.exp-card__dot');
        var cards = expTimeline.querySelectorAll('.exp-card');
        if (dots.length === 0 && cards.length === 0) return;

        function updateGlow() {
            var viewportCenter = window.innerHeight / 2;

            // Experience timeline dots
            cards.forEach(function (card, i) {
                var rect = card.getBoundingClientRect();
                var cardCenter = rect.top + rect.height / 2;
                var distance = Math.abs(cardCenter - viewportCenter);
                var isNearest = distance < 250;

                var dot = dots[i];
                if (dot) {
                    if (isNearest) {
                        dot.classList.add('exp-card__dot--active');
                    } else {
                        dot.classList.remove('exp-card__dot--active');
                    }
                }
            });

            // About journey timeline dots
            var journeyDots = document.querySelectorAll('.timeline__dot');
            var journeyItems = document.querySelectorAll('.timeline__item');
            journeyItems.forEach(function (item, i) {
                var rect = item.getBoundingClientRect();
                var itemCenter = rect.top + rect.height / 2;
                var distance = Math.abs(itemCenter - viewportCenter);
                var isNearest = distance < 250;

                var dot = journeyDots[i];
                if (dot) {
                    if (isNearest) {
                        dot.classList.add('timeline__dot--active');
                    } else {
                        dot.classList.remove('timeline__dot--active');
                    }
                }
            });
        }

        window.addEventListener('scroll', updateGlow, { passive: true });
        updateGlow(); // Initial check
    }


    function initFooterPlane() {
        const plane = document.getElementById('footerPaperPlane');
        const footer = document.getElementById('contact');
        if (!plane || !footer) return;

        let lastFlyTime = 0;
        const COOLDOWN_MS = 20000; // 20 seconds cooldown
        let isFlying = false;

        function triggerFlight() {
            const now = Date.now();
            if (isFlying) return;
            if (now - lastFlyTime < COOLDOWN_MS) return;

            isFlying = true;
            lastFlyTime = now;

            plane.classList.remove('footer-paper-plane--launched');
            // Force reflow to restart CSS animation
            void plane.offsetWidth;
            plane.classList.add('footer-paper-plane--launched');
        }

        plane.addEventListener('animationend', function () {
            isFlying = false;
            plane.classList.remove('footer-paper-plane--launched');
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    triggerFlight();
                }
            });
        }, { threshold: 0.15 });

        observer.observe(footer);
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================

    function init() {
        // Render content
        renderHero();
        renderAbout();
        renderEducation();
        renderMissionVision();
        renderJourney();
        renderExperience();
        renderFooter();

        // Load dynamic content (projects, blogs)
        loadProjects();
        loadBlogs();

        // Initialize interactions
        initNavigation();
        initLightbox();
        initBlogModal();
        initProjectModal();
        initCertModal();
        initCaseStudyArchiveModal();
        initBlogArchiveModal();
        initFooterPlane();

        // Delayed init for animations (after content is rendered)
        setTimeout(function () {
            initScrollReveal();
            hideEmptySections();
            initTimelineGlow();
        }, 300);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
