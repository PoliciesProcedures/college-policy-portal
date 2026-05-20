const documents = [

  {
    title: 'Academic Integrity Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'academic-integrity-policy.pdf'
  },

  {
    title: 'Assessment Extension Form',
    type: 'Form',
    category: 'Forms',
    file: 'assessment-extension-form.pdf'
  },

  {
    title: 'Assessment Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'assessment-procedure.pdf'
  },

  {
    title: 'BSB Course Outline',
    type: 'Course Document',
    category: 'Courses',
    file: 'bsb-course-outline.pdf'
  },

  {
    title: 'Change of Details Form',
    type: 'Form',
    category: 'Forms',
    file: 'change-of-details-form.pdf'
  },

  {
    title: 'Complaints Appeals Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'complaints-appeals-policy.pdf'
  },

  {
    title: 'CINC Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'SNS - PRO -CINC Pro-V2.2.pdf'
  },

  {
    title: 'Transition Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'SNS - PRO Transition Procedure V2.0.pdf'
  },

  {
    title: 'Internal Audit Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'SNS - POL- Internal Audit Policy V2.0.pdf'
  },

  {
    title: 'TNAS Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'SNS - POL-TNAS V3.0.pdf'
  },

  {
    title: 'CDR Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'SNS - PRO CDR Procedure- V3.0.pdf'
  },

  {
    title: 'Internal Audit Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'SNS - PRO Internal Audit Procedure 2.0.pdf'
  },

  {
    title: 'Transition Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'SNS - Transition Policy V2.0.pdf'
  },

  {
    title: 'CINC Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'SNS-POL-CINC Policy V2.0.pdf'
  },

  {
    title: 'Document and Version Control Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'SNS-POL-Document and Version Control V1.0.pdf'
  },

  {
    title: 'Governance Integrity Policy',
    type: 'Policy',
    category: 'Policies',
    file: 'SNS-POL-Governance Integrity Policy V1.0.pdf'
  },

  {
    title: 'Document and Version Control Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'SNS-PRO-Document &Version Control V1.0.pdf'
  },

  {
    title: 'Management Review Procedure',
    type: 'Procedure',
    category: 'Procedures',
    file: 'SNS-PRO-Management Review Procedure V1.0.pdf'
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
