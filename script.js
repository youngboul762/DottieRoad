// ===== Turf & Members Editing =====
const turfFields = {
  main: document.getElementById('profile-turf-main'),
  notable: document.getElementById('profile-turf-notable'),
  neighborhood: document.getElementById('profile-turf-neighborhood'),
  map: document.getElementById('profile-turf-map')
};

const membersGrid = document.getElementById('members-grid');

function openEditor() {
  // Existing profile fields
  inputs.set.value = fields.set.textContent;
  inputs.main.value = fields.main.textContent;
  inputs.aliases.value = fields.aliases.textContent;
  inputs.neighborhood.value = fields.neighborhood.textContent;
  inputs.years.value = fields.years.textContent;
  inputs.concept.value = fields.concept.textContent;
  inputs.allies.value = fields.allies.textContent;
  inputs.opps.value = fields.opps.textContent;
  inputs.history.value = fields.history.textContent;

  // Turf fields
  inputs.turfMain.value = turfFields.main.textContent;
  inputs.turfNotable.value = turfFields.notable.textContent;
  inputs.turfNeighborhood.value = turfFields.neighborhood.textContent;
  inputs.turfMap.value = turfFields.map.src;

  // Members fields (optional: serialize to JSON string)
  const memberData = Array.from(membersGrid.querySelectorAll('.member-card')).map(card=>{
    return {
      alias: card.querySelector('.member-alias').textContent,
      role: card.querySelector('.member-role').textContent,
      img: card.querySelector('img').src
    };
  });
  inputs.members.value = JSON.stringify(memberData);

  editor.classList.remove('hidden');
}

// Add new input fields in your editor HTML:
/*
<input id="input-turf-main" type="text">
<input id="input-turf-notable" type="text">
<input id="input-turf-neighborhood" type="text">
<input id="input-turf-map" type="text">  // URL of map image
<textarea id="input-members"></textarea> // JSON of members
*/

// On save:
document.getElementById('save-profile').addEventListener('click', () => {
  // Profile fields
  fields.set.textContent = inputs.set.value || 'Unnamed Set';
  fields.main.textContent = inputs.main.value || '—';
  fields.aliases.textContent = inputs.aliases.value || '—';
  fields.neighborhood.textContent = inputs.neighborhood.value || '—';
  fields.years.textContent = inputs.years.value || '—';
  fields.concept.textContent = inputs.concept.value || '—';
  fields.allies.textContent = inputs.allies.value || '—';
  fields.opps.textContent = inputs.opps.value || '—';
  fields.history.textContent = inputs.history.value || '—';

  // Turf fields
  turfFields.main.textContent = inputs.turfMain.value || '—';
  turfFields.notable.textContent = inputs.turfNotable.value || '—';
  turfFields.neighborhood.textContent = inputs.turfNeighborhood.value || '—';
  turfFields.map.src = inputs.turfMap.value || 'map-placeholder.png';

  // Members section
  try{
    const memberData = JSON.parse(inputs.members.value || '[]');
    membersGrid.innerHTML = '';
    memberData.forEach(m=>{
      const div = document.createElement('div');
      div.classList.add('member-card');
      div.innerHTML = `
        <img src="${m.img || 'member-placeholder.png'}" alt="${m.alias}">
        <p><strong>Alias:</strong> <span class="member-alias">${m.alias || '—'}</span></p>
        <p><strong>Role:</strong> <span class="member-role">${m.role || '—'}</span></p>
      `;
      membersGrid.appendChild(div);
    });
  }catch(e){
    console.error("Invalid members JSON", e);
  }

  closeEditor();
});
