# College Policy Portal

A static, responsive educational policy portal for an Australian college, RTO or training organisation.

## Folder structure

```text
/
├── index.html
├── policies.html
├── procedures.html
├── courses.html
├── forms.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── pdfs/
│   └── sample PDF placeholders
└── images/
    └── logos and image assets
```

## How to upload new PDFs

1. Save your approved PDF file using a simple lowercase filename, for example:
   `student-code-of-conduct-policy.pdf`
2. Upload or copy the PDF into the `/pdfs` folder.
3. Open `/js/script.js`.
4. Add a new entry inside the `documents` list:

```js
{
  title: 'Student Code of Conduct Policy',
  type: 'Policy',
  category: 'Compliance',
  file: 'pdfs/student-code-of-conduct-policy.pdf',
  updated: '2026-05-20',
  description: 'Student behaviour expectations and responsibilities.'
}
```

5. Save the file and refresh the website.

## How to edit policies

1. Edit the source policy document in Word or your document management system.
2. Export the approved version as a PDF.
3. Replace the old PDF in `/pdfs` with the new PDF.
4. Keep the same filename if you want existing links to continue working.
5. Update the `updated` date and description in `/js/script.js`.

## How to update document links

All document links are controlled in `/js/script.js`.

Update the `file` value to point to the correct PDF path:

```js
file: 'pdfs/your-new-file-name.pdf'
```

Use forward slashes and avoid spaces in filenames.

## How to deploy using GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this project into the repository.
3. Go to **Settings** in the repository.
4. Select **Pages** from the left menu.
5. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
6. Select **Save**.
7. GitHub will generate a free website link after deployment.
8. Add that link to your LMS.

## How to customise branding

- Change colours in `/css/style.css` under the `:root` section.
- Replace placeholder contact details in each HTML footer and in `contact.html`.
- Add your logo to `/images` and update the header HTML if required.
- Update the website title in each HTML file.

## Accessibility and SEO notes

This website includes:

- semantic HTML landmarks
- skip-to-content link
- responsive mobile layout
- keyboard-accessible buttons and links
- descriptive page titles and meta descriptions
- readable colour contrast
- no database or backend dependency

## Maintenance tips for non-technical staff

- Only edit PDFs in `/pdfs` and document records in `/js/script.js` for routine updates.
- Keep filenames short, lowercase and hyphenated.
- Do not delete existing PDFs unless you have updated any matching links.
- Test the website after each change by opening `index.html` locally or visiting GitHub Pages.
