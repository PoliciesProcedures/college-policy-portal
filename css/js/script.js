const documents = [
  { title: 'Student Handbook', type: 'Course Document', category: 'General', file: 'pdfs/student-handbook.pdf', updated: '2026-01-15', description: 'Key information for students about studying, support services and responsibilities.' },
  { title: 'Academic Integrity Policy', type: 'Policy', category: 'Academic', file: 'pdfs/academic-integrity-policy.pdf', updated: '2026-01-20', description: 'Rules and expectations for academic honesty, plagiarism and assessment conduct.' },
  { title: 'Complaints and Appeals Policy', type: 'Policy', category: 'Compliance', file: 'pdfs/complaints-appeals-policy.pdf', updated: '2026-02-05', description: 'How students can raise concerns, complaints or appeal decisions.' },
  { title: 'Privacy Policy', type: 'Policy', category: 'Compliance', file: 'pdfs/privacy-policy.pdf', updated: '2026-02-15', description: 'How personal information is collected, stored, used and protected.' },
  { title: 'Assessment Procedure', type: 'Procedure', category: 'Academic', file: 'pdfs/assessment-procedure.pdf', updated: '2026-01-30', description: 'Procedure for assessment submission, marking, feedback and resubmission.' },
  { title: 'Student Support Procedure', type: 'Procedure', category: 'Student Support', file: 'pdfs/student-support-procedure.pdf', updated: '2026-02-10', description: 'Steps for identifying and supporting students who need additional assistance.' },
  { title: 'BSB Course Outline', type: 'Course Document', category: 'Business', file: 'pdfs/bsb-course-outline.pdf', updated: '2026-03-01', description: 'Example business course outline, units and course requirements.' },
  { title: 'ICT Course Outline', type: 'Course Document', category: 'Information Technology', file: 'pdfs/ict-course-outline.pdf', updated: '2026-03-01', description: 'Example ICT course outline, units and course requirements.' },
  { title: 'Change of Details Form', type: 'Form', category: 'Administration', file: 'pdfs/change-of-details-form.pdf', updated: '2026-01-12', description: 'Use this form to update student contact or personal details.' },
  { title: 'Assessment Extension Form', type: 'Form', category: 'Academic', file: 'pdfs/assessment-extension-form.pdf', updated: '2026-01-12', description: 'Request additional time for an assessment before the due date.' }
];

const pageType = document.body.dataset.pageType || 'All';
const grid = document.querySelector('[data-document-grid]');
const searchInput = document.querySelector('[data-search]');
const categoryFilter = document.querySelector('[data-category-filter]');
const noResults = document.querySelector('[data-no-results]');
const pdfFrame = document.querySelector('[data-pdf-viewer]');
const mobileMenuBtn = document.querySelector('[data-mobile-menu]');
const nav = document.querySelector('[data-nav]');
const themeToggle = document.querySelector('[data-theme-toggle]');

function currentDocs() {
  if (pageType === 'All') return documents;
  return documents.filter(doc => doc.type === pageType);
}

function renderCategories() {
  if (!categoryFilter) return;
  const categories = ['All', ...new Set(currentDocs().map(doc => doc.category))];
  categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
}

function renderDocuments() {
  if (!grid) return;
  const query = (searchInput?.value || '').toLowerCase().trim();
  const category = categoryFilter?.value || 'All';
  const filtered = currentDocs().filter(doc => {
    const matchesQuery = [doc.title, doc.type, doc.category, doc.description].join(' ').toLowerCase().includes(query);
    const matchesCategory = category === 'All' || doc.category === category;
    return matchesQuery && matchesCategory;
  });

  grid.innerHTML = filtered.map(doc => `
    <article class="document-card">
      <div>
        <span class="tag">${doc.type}</span>
        <h3>${doc.title}</h3>
        <p>${doc.description}</p>
        <div class="doc-meta">
          <span>📁 ${doc.category}</span>
          <span>🗓 Updated ${formatDate(doc.updated)}</span>
        </div>
      </div>
      <div class="doc-actions">
        <button class="btn btn-secondary" type="button" data-view-pdf="${doc.file}">👁 View</button>
        <a class="btn btn-primary" href="${doc.file}" download>⬇ Download</a>
      </div>
    </article>
  `).join('');

  if (noResults) noResults.style.display = filtered.length ? 'none' : 'block';
  document.querySelectorAll('[data-view-pdf]').forEach(button => {
    button.addEventListener('click', () => openPdf(button.dataset.viewPdf));
  });
}

function openPdf(file) {
  if (!pdfFrame) {
    window.open(file, '_blank', 'noopener');
    return;
  }
  pdfFrame.src = file;
  pdfFrame.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateString));
}

function initialiseTheme() {
  const storedTheme = localStorage.getItem('portal-theme');
  if (storedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeButton();
}

function updateThemeButton() {
  if (!themeToggle) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeToggle.textContent = isDark ? '☀ Light' : '🌙 Dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

mobileMenuBtn?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
});

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('portal-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('portal-theme', 'dark');
  }
  updateThemeButton();
});

searchInput?.addEventListener('input', renderDocuments);
categoryFilter?.addEventListener('change', renderDocuments);

document.querySelector('[data-year]')?.append(new Date().getFullYear());
initialiseTheme();
renderCategories();
renderDocuments();
