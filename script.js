// Profile Editing & Logo Preview
const editToggle = document.getElementById('edit-toggle');
const editor = document.getElementById('editor');
const logoInput = document.getElementById('logo-input');
const logoPreview = document.getElementById('logo-preview');

const inputs = {
  set: document.getElementById('input-set'),
  main: document.getElementById('input-main'),
  aliases: document.getElementById('input-aliases'),
  neighborhood: document.getElementById('input-neighborhood'),
  years: document.getElementById('input-years'),
  concept: document.getElementById('input-concept'),
  allies: document.getElementById('input-allies'),
  opps: document.getElementById('input-opps'),
  history: document.getElementById('input-history'),
  turfMain: document.getElementById('input-turf-main'),
  turfNotable: document.getElementById('input-turf-notable'),
  turfNeighborhood: document.getElementById('input-turf-neighborhood'),
  turfMap: document.getElementById('input-turf-map'),
  members: document.getElementById('input-members')
};

const fields = {
  set: document.getElementById('profile-set'),
  main: document.getElementById('profile-main'),
  aliases: document.getElementById('profile-aliases'),
  neighborhood: document.getElementById('profile-neighborhood'),
  years: document.getElementById('profile-years'),
  concept: document.getElementById('profile-concept'),
  allies: document.getElementById('profile-allies'),
  opps: document.getElementById('profile-opps'),
  history: document.getElementById('profile-history'),
  turfMain: document.getElementById('profile-turf-main'),
  turfNotable: document.getElementById('profile-turf-notable'),
  turfNeighborhood: document.getElementById('profile-turf-neighborhood'),
  turfMap: document.getElementById('profile-turf-map'),
  membersGrid: document.getElementById('members-grid')
};

function openEditor(){
  for(let key in fields){
    if(key==='membersGrid') continue;
    inputs[key].value = fields[key].textContent || fields[key].src || '';
  }
  // Serialize members
  const memberData = Array.from(fields.membersGrid.querySelectorAll('.member-card')).map(card=>{
    return {alias: card.querySelector('.member-alias').textContent,
            role: card.querySelector('.member-role').textContent,
            img: card.querySelector('img').src};
  });
  inputs.members.value = JSON.stringify(memberData,null,2);
  editor.classList.remove('hidden');
}
function closeEditor(){ editor.classList.add('hidden'); }

editToggle.addEventListener('click', ()=>editor.classList.contains('hidden')?openEditor():closeEditor());

document.getElementById('save-profile').addEventListener('click',()=>{
  for(let key in fields){
    if(key==='membersGrid') continue;
    if(key==='turfMap'){
      fields[key].src = inputs[key].value || 'map-placeholder.png';
    }else{
      fields[key].textContent = inputs[key].value || '—';
    }
  }
  // Update members
  try{
    const memberData = JSON.parse(inputs.members.value || '[]');
    fields.membersGrid.innerHTML='';
    memberData.forEach(m=>{
      const div=document.createElement('div');
      div.classList.add('member-card');
      div.innerHTML=`<img src="${m.img||'member-placeholder.png'}" alt="${m.alias||'Member'}">
                     <p><strong>Alias:</strong> <span class="member-alias">${m.alias||'—'}</span></p>
                     <p><strong>Role:</strong> <span class="member-role">${m.role||'—'}</span></p>`;
      fields.membersGrid.appendChild(div);
    });
  }catch(e){console.error("Invalid members JSON",e);}
  closeEditor();
});

logoInput.addEventListener('change', evt=>{
  const f=evt.target.files&&evt.target.files[0];
  if(!f) return;
  logoPreview.src=URL.createObjectURL(f);
});

// Last updated
document.getElementById('last-updated').textContent = `Last updated: ${new Date().toLocaleString()}`;
