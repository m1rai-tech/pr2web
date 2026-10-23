const form = document.querySelector('#registration');
const attachment = document.querySelector('#attachment');
const fileStatus = document.querySelector('#file-status');
const preview = document.querySelector('#avatar-preview');
const previewFigure = document.querySelector('#preview-figure');
const result = document.querySelector('#result');
let previewUrl;

function clearPreview() {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = undefined;
  preview.src = 'assets/conference.svg';
  preview.hidden = true;
  previewFigure.hidden = true;
}

attachment.addEventListener('change', () => {
  clearPreview();
  result.hidden = true;
  attachment.setCustomValidity('');
  const file = attachment.files[0];
  if (!file) {
    fileStatus.textContent = '';
    return;
  }
  const allowed = ['image/png', 'image/jpeg', 'application/pdf'];
  if (!allowed.includes(file.type) || file.size > 5 * 1024 * 1024) {
    const message = 'Обери PNG, JPG або PDF розміром до 5 МБ.';
    attachment.setCustomValidity(message);
    fileStatus.textContent = message;
    attachment.reportValidity();
    return;
  }
  fileStatus.textContent = `${file.name} · ${(file.size / 1024).toFixed(0)} КБ`;
  if (file.type.startsWith('image/')) {
    previewUrl = URL.createObjectURL(file);
    preview.src = previewUrl;
    preview.hidden = false;
    previewFigure.hidden = false;
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  result.textContent = 'Форму заповнено правильно.';
  result.hidden = false;
  result.focus();
});
form.addEventListener('input', () => { result.hidden = true; });
form.addEventListener('reset', () => {
  clearPreview();
  attachment.setCustomValidity('');
  fileStatus.textContent = '';
  result.hidden = true;
});
