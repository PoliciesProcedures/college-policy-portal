const documents = [

  {
    title: 'Document Version Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'document-version-policy.pdf'
  },

  {
    title: 'Document Version Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'document-version-procedure.pdf'
  },

  {
    title: 'Governance Integrity Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'governance-integrity-policy.pdf'
  },

  {
    title: 'Internal Audit Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'internal-audit-policy.pdf'
  },

  {
    title: 'Internal Audit Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'internal-audit-procedure.pdf'
  },

  {
    title: 'Management Review Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'management-review-procedure.pdf'
  },

  {
    title: 'Privacy Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'privacy-policy.pdf'
  },

  {
    title: 'Student Handbook',
    type: 'Handbook',
    category: 'Course Documents',
    file: 'student-handbook.pdf'
  },

  {
    title: 'Student Support Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'student-support-procedure.pdf'
  },

  {
    title: 'ICT Course Outline',
    type: 'Course Document',
    category: 'Course Documents',
    file: 'ict-course-outline.pdf'
  }

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

  if (pageType === 'Policy') {
    return documents.filter(doc => doc.category === 'Policies');
  }

  if (pageType === 'Procedure') {
    return documents.filter(doc => doc.category === 'Procedures');
  }

  if (pageType === 'Course Document') {
    return documents.filter(doc => doc.category === 'Course Documents');
  }

  if (pageType === 'Form') {
    return documents.filter(doc => doc.category === 'Forms');
  }

  return documents;
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
        <p>${doc.description || 'Official college document available for viewing and download.'}</p>
        <div class="doc-meta">
          <span>📁 ${doc.category}</span>
          <span>📄 PDF Document</span>
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

  pdfFrame.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

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
