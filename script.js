// ===== Profile Editing & Logo Preview =====
const editToggle = document.getElementById('edit-toggle');
const editor = document.getElementById('editor');
const logoInput = document.getElementById('logo-input');
const logoPreview = document.getElementById('logo-preview');

const inputs = {
  set: document.getElementById('input-set'),
  main: document.getElementById('input-main'),
  notable: document.getElementById('input-notable'),
  neighborhood: document.getElementById('input-neighborhood'),
  years: document.getElementById('input-years'),
  composition: document.getElementById('input-composition'),
  notes: document.getElementById('input-notes')
};

const fields = {
  set: document.getElementById('profile-set'),
  main: document.getElementById('profile-main'),
  notable: document.getElementById('profile-notable'),
  neighborhood: document.getElementById('profile-neighborhood'),
  years: document.getElementById('profile-years'),
  composition: document.getElementById('profile-composition'),
  notes: document.getElementById('profile-notes')
};

function openEditor() {
  inputs.set.value = fields.set.textContent;
  inputs.main.value = fields.main.textContent;
  inputs.notable.value = fields.notable.textContent;
  inputs.neighborhood.value = fields.neighborhood.textContent;
  inputs.years.value = fields.years.textContent;
  inputs.composition.value = fields.composition.textContent;
  inputs.notes.value = fields.notes.textContent;
  editor.classList.remove('hidden');
}
function closeEditor() { editor.classList.add('hidden'); }
editToggle.addEventListener('click', () => {
  editor.classList.contains('hidden') ? openEditor() : closeEditor();
});
document.getElementById('save-profile').addEventListener('click', () => {
  fields.set.textContent = inputs.set.value || 'Unnamed Set';
  fields.main.textContent = inputs.main.value || '—';
  fields.notable.textContent = inputs.notable.value || '—';
  fields.neighborhood.textContent = inputs.neighborhood.value || '—';
  fields.years.textContent = inputs.years.value || '—';
  fields.composition.textContent = inputs.composition.value || '—';
  fields.notes.textContent = inputs.notes.value || '—';
  closeEditor();
});
document.getElementById('cancel-edit').addEventListener('click', closeEditor);

logoInput.addEventListener('change', (evt) => {
  const f = evt.target.files && evt.target.files[0];
  if (!f) return;
  logoPreview.src = URL.createObjectURL(f);
});

// ===== Spinner logic (fictional items) =====
const items = {
  contraband: ["Replica Ledger","Encrypted Thumbdrive","Fake Passes","Counterfeit Tokens","Vintage Watch (prop)"],
  supplies: ["Toolkit (roleplay)","First-aid Kit (prop)","Disposable Radio","Protective Vest (stunt prop)"],
  gear: ["Hooded Jacket (faction)","Embroidered Patch","Custom Bandana","Faction Lanyard"]
};

const spinBtn = document.getElementById('spin');
const categorySelect = document.getElementById('category');
const result = document.getElementById('result');

spinBtn.addEventListener('click', () => {
  const cat = categorySelect.value;
  const list = items[cat] || [];
  if (!list.length) { result.textContent = "No items in this category."; return; }
  result.textContent = "Spinning...";
  spinBtn.disabled = true;
  let rounds = 24, i=0;
  const interval = setInterval(()=>{
    result.textContent = list[i % list.length];
    i++;
    if(i>rounds){
      clearInterval(interval);
      const chosen = list[Math.floor(Math.random()*list.length)];
      result.textContent = `🎯 You received: ${chosen}`;
      spinBtn.disabled=false;
    }
  },60);
});

// ===== Last-updated timestamp =====
const lastUpdatedEl = document.getElementById('last-updated');
const now = new Date();
lastUpdatedEl.textContent = `Last updated: ${now.toLocaleString()}`;
