const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Menü öffnen'); mobileNav.hidden = true; }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen'); mobileNav.hidden = !open; });
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 851px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const tabs = [...document.querySelectorAll('[data-filter]')];
function activateTab(tab) { const filter = tab.dataset.filter; tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; }); document.querySelectorAll('[data-category]').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; }); document.querySelector('#treatment-grid').setAttribute('aria-labelledby', tab.id); }
tabs.forEach((tab, index) => { tab.addEventListener('click', () => activateTab(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = (index + 1) % tabs.length; if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length; if (event.key === 'Home') next = 0; if (event.key === 'End') next = tabs.length - 1; if (next !== undefined) { event.preventDefault(); activateTab(tabs[next]); tabs[next].focus(); } }); });

const treatments = {
  face: { title: 'Gesicht', description: 'Ihre Mimik und Ihre Ausstrahlung machen Sie unverwechselbar. Gemeinsam besprechen wir Ihre Wünsche und die Möglichkeiten einer individuellen Behandlung.', services: [['Oberlidstraffung', 'oberlidstraffung.html'], ['Faltenbehandlung', 'faltenunterspritzung.html'], ['Weitere Gesichtsbehandlungen', 'gesicht.html']] },
  breast: { title: 'Brust', description: 'Harmonie ist eine persönliche Empfindung. Wir beraten Sie zu den Möglichkeiten der Brustchirurgie und berücksichtigen dabei Ihre individuellen Voraussetzungen und Wünsche.', services: [['Brustvergrößerung', 'brustvergroesserung.html'], ['Bruststraffung', 'bruststraffung.html'], ['Brustverkleinerung', 'brustverkleinerung.html']] },
  body: { title: 'Körper', description: 'Sich im eigenen Körper wohlzufühlen, ist etwas sehr Persönliches. In einem ausführlichen Gespräch klären wir, welche Möglichkeiten für Ihr Anliegen infrage kommen.', services: [['Fettabsaugung', 'fettabsaugung.html'], ['Bauchdeckenstraffung', 'bauchdeckenstraffung.html'], ['Weitere Körperbehandlungen', 'koerper.html']] }
};
const dialog = document.querySelector('#treatment-dialog');
document.querySelectorAll('[data-treatment]').forEach(card => card.addEventListener('click', () => { const data = treatments[card.dataset.treatment]; document.querySelector('#dialog-title').textContent = data.title; document.querySelector('#dialog-description').textContent = data.description; const list = document.querySelector('#dialog-services'); list.replaceChildren(); data.services.forEach(([name, path]) => { const li = document.createElement('li'); const link = document.createElement('a'); link.href = `https://www.e-sthetic.de/${path}`; link.target = '_blank'; link.rel = 'noopener'; link.textContent = `${name} ↗`; li.append(link); list.append(li); }); dialog.showModal(); }));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); });

const clinicSlides = [ { image: 'assets/clinic-reception.jpg', alt: 'Der helle Empfang der e-sthetic Privatklinik in Essen', caption: 'Willkommen bei e-sthetic.' }, { image: 'assets/clinic-suite.jpg', alt: 'Ein ruhiges Patientenzimmer der e-sthetic Privatklinik', caption: 'Raum für Ruhe und Erholung.' } ];
let clinicIndex = 0;
function changeClinicSlide(direction) { clinicIndex = (clinicIndex + direction + clinicSlides.length) % clinicSlides.length; const slide = clinicSlides[clinicIndex]; const photo = document.querySelector('#clinic-photo'); photo.src = slide.image; photo.alt = slide.alt; document.querySelector('#clinic-caption').textContent = slide.caption; document.querySelector('#clinic-count').textContent = `0${clinicIndex + 1} / 02`; }
document.querySelector('#clinic-prev').addEventListener('click', () => changeClinicSlide(-1));
document.querySelector('#clinic-next').addEventListener('click', () => changeClinicSlide(1));
document.querySelector('#year').textContent = new Date().getFullYear();
