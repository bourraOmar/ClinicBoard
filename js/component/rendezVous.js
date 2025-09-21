export function rendezVousPage() {
  const patients = JSON.parse(localStorage.getItem('clinicApp:patients')) || [];

  const patientOptions = patients.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
  const praticienOptions = ['Dr. Smith', 'Dr. Lee', 'Dr. Brown'].map(p => `<option value="${p}">${p}</option>`).join('');
  const salleOptions = ['Salle 1', 'Salle 2', 'Salle 3'].map(s => `<option value="${s}">${s}</option>`).join('');
  const typeOptions = ['Consultation', 'Examen', 'Urgence'].map(t => `<option value="${t}">${t}</option>`).join('');

  return `
    <h1>Gestion des rendez-vous</h1>

    <section class="rendezvous-form">
      <h2>Créer un rendez-vous</h2>
      <form id="rv-form">
        <label>Patient:</label>
        <select id="rv-patient" required>
          <option value="">-- Sélectionner un patient --</option>
          ${patientOptions}
        </select>

        <label>Praticien:</label>
        <select id="rv-praticien" required>
          <option value="">-- Sélectionner un praticien --</option>
          ${praticienOptions}
        </select>

        <label>Salle:</label>
        <select id="rv-salle" required>
          <option value="">-- Sélectionner une salle --</option>
          ${salleOptions}
        </select>

        <label>Type:</label>
        <select id="rv-type" required>
          <option value="">-- Sélectionner le type --</option>
          ${typeOptions}
        </select>

        <label>Durée (min):</label>
        <input type="number" id="rv-duree" min="1" required>

        <label>Heure:</label>
        <input type="time" id="rv-heure" required>

        <label>Statut:</label>
        <select id="rv-statut" required>
          <option value="prévu">Prévu</option>
          <option value="terminé">Terminé</option>
          <option value="no-show">No-show</option>
          <option value="annulé">Annulé</option>
        </select>

        <button type="submit" id="rv-submit-btn">Créer</button>
      </form>
    </section>

    <section class="rendezvous-list">
      <h2>Liste des rendez-vous</h2>
      <table id="rv-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Praticien</th>
            <th>Salle</th>
            <th>Type</th>
            <th>Durée</th>
            <th>Heure</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  `;
}


export function initRendezVousPage() {
  const rvForm = document.getElementById('rv-form');
  const rvTableBody = document.querySelector('#rv-table tbody');
  const rvSubmitBtn = document.getElementById('rv-submit-btn');

  let rvs = JSON.parse(localStorage.getItem('clinicApp:rv')) || [];
  let editIndex = null;

  function renderTable() {
    rvTableBody.innerHTML = '';
    rvs.forEach((rv, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${rv.patient}</td>
        <td>${rv.praticien}</td>
        <td>${rv.salle}</td>
        <td>${rv.type}</td>
        <td>${rv.duree}</td>
        <td>${rv.heure}</td>
        <td>${rv.statut}</td>
        <td>
          <button data-index="${index}" class="edit-btn">Modifier</button>
          <button data-index="${index}" class="delete-btn">Supprimer</button>
        </td>
      `;
      rvTableBody.appendChild(tr);
    });
  }

  renderTable();

  rvForm.addEventListener('submit', e => {
    e.preventDefault();

    if (editIndex !== null) {
      // update only editable fields
      rvs[editIndex].duree = document.getElementById('rv-duree').value;
      rvs[editIndex].heure = document.getElementById('rv-heure').value;
      rvs[editIndex].statut = document.getElementById('rv-statut').value;

      editIndex = null;
      rvSubmitBtn.textContent = "Créer";

      // reactiver les champs pour creation suivante
      document.getElementById('rv-patient').disabled = false;
      document.getElementById('rv-praticien').disabled = false;
      document.getElementById('rv-salle').disabled = false;
      document.getElementById('rv-type').disabled = false;
    } else {
      // creation normale
      const rvData = {
        patient: document.getElementById('rv-patient').value,
        praticien: document.getElementById('rv-praticien').value,
        salle: document.getElementById('rv-salle').value,
        type: document.getElementById('rv-type').value,
        duree: document.getElementById('rv-duree').value,
        heure: document.getElementById('rv-heure').value,
        statut: document.getElementById('rv-statut').value,
      };
      rvs.push(rvData);
    }

    localStorage.setItem('clinicApp:rv', JSON.stringify(rvs));
    rvForm.reset();
    renderTable();
  });

  rvTableBody.addEventListener('click', e => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('delete-btn')) {
      rvs.splice(index, 1);
      localStorage.setItem('clinicApp:rv', JSON.stringify(rvs));
      renderTable();
    }
    if (e.target.classList.contains('edit-btn')) {
      const rv = rvs[index];
      // remplir uniquement les champs modifiables
      document.getElementById('rv-duree').value = rv.duree;
      document.getElementById('rv-heure').value = rv.heure;
      document.getElementById('rv-statut').value = rv.statut;

      // désactiver les autres champs
      document.getElementById('rv-patient').disabled = true;
      document.getElementById('rv-praticien').disabled = true;
      document.getElementById('rv-salle').disabled = true;
      document.getElementById('rv-type').disabled = true;

      editIndex = index;
      rvSubmitBtn.textContent = "Sauvegarder";
    }
  });
}
