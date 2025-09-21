export function financePage() {
  return `
    <h1>Gestion des recettes & dépenses</h1>

    <section class="finance-form">
      <h2>Ajouter une recette</h2>
      <form id="recette-form">
        <input type="number" id="recette-montant" placeholder="Montant" required>
        <input type="text" id="recette-libelle" placeholder="Libellé" required>
        <select id="recette-methode">
          <option value="Espèces">Espèces</option>
          <option value="Carte bancaire">Carte bancaire</option>
          <option value="Virement">Virement</option>
        </select>
        <input type="date" id="recette-date" required>
        <button type="submit">Ajouter recette</button>
      </form>

      <h2>Ajouter une dépense</h2>
      <form id="depense-form">
        <input type="number" id="depense-montant" placeholder="Montant" required>
        <input type="text" id="depense-libelle" placeholder="Libellé" required>
        <select id="depense-categorie">
          <option value="Fournitures">Fournitures</option>
          <option value="Salaires">Salaires</option>
          <option value="Charges">Charges</option>
        </select>
        <input type="date" id="depense-date" required>
        <button type="submit">Ajouter dépense</button>
      </form>
    </section>

    <section class="finance-tables">
      <h2>Récapitulatif</h2>
      <h3>Recettes</h3>
      <table id="recette-table">
        <thead>
          <tr>
            <th>Montant</th>
            <th>Libellé</th>
            <th>Méthode</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <h3>Dépenses</h3>
      <table id="depense-table">
        <thead>
          <tr>
            <th>Montant</th>
            <th>Libellé</th>
            <th>Catégorie</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <h3>Budget mensuel</h3>
      <p>Total recettes: <span id="total-recettes">0</span> MAD</p>
      <p>Total dépenses: <span id="total-depenses">0</span> MAD</p>
      <p>Solde: <span id="solde">0</span> MAD</p>
    </section>
  `;
}


export function initFinancePage() {
  const recetteForm = document.getElementById('recette-form');
  const depenseForm = document.getElementById('depense-form');

  const recetteTableBody = document.querySelector('#recette-table tbody');
  const depenseTableBody = document.querySelector('#depense-table tbody');

  const totalRecettesEl = document.getElementById('total-recettes');
  const totalDepensesEl = document.getElementById('total-depenses');
  const soldeEl = document.getElementById('solde');

  let recettes = JSON.parse(localStorage.getItem('finance:recettes')) || [];
  let depenses = JSON.parse(localStorage.getItem('finance:depenses')) || [];

  function renderTables() {
    recetteTableBody.innerHTML = recettes.map((r, i) => `
      <tr>
        <td>${r.montant}</td>
        <td>${r.libelle}</td>
        <td>${r.methode}</td>
        <td>${r.date}</td>
        <td><button data-index="${i}" class="delete-recette">Supprimer</button></td>
      </tr>
    `).join('');

    depenseTableBody.innerHTML = depenses.map((d, i) => `
      <tr>
        <td>${d.montant}</td>
        <td>${d.libelle}</td>
        <td>${d.categorie}</td>
        <td>${d.date}</td>
        <td><button data-index="${i}" class="delete-depense">Supprimer</button></td>
      </tr>
    `).join('');

    updateBudget();
  }

  function updateBudget() {
    const totalRecettes = recettes.reduce((acc, r) => acc + Number(r.montant), 0);
    const totalDepenses = depenses.reduce((acc, d) => acc + Number(d.montant), 0);
    totalRecettesEl.textContent = totalRecettes;
    totalDepensesEl.textContent = totalDepenses;
    soldeEl.textContent = totalRecettes - totalDepenses;
  }

  recetteForm.addEventListener('submit', e => {
    e.preventDefault();
    const montant = document.getElementById('recette-montant').value;
    const libelle = document.getElementById('recette-libelle').value;
    const methode = document.getElementById('recette-methode').value;
    const date = document.getElementById('recette-date').value;

    recettes.push({ montant, libelle, methode, date });
    localStorage.setItem('finance:recettes', JSON.stringify(recettes));
    recetteForm.reset();
    renderTables();
  });

  depenseForm.addEventListener('submit', e => {
    e.preventDefault();
    const montant = document.getElementById('depense-montant').value;
    const libelle = document.getElementById('depense-libelle').value;
    const categorie = document.getElementById('depense-categorie').value;
    const date = document.getElementById('depense-date').value;

    depenses.push({ montant, libelle, categorie, date });
    localStorage.setItem('finance:depenses', JSON.stringify(depenses));
    depenseForm.reset();
    renderTables();
  });

  recetteTableBody.addEventListener('click', e => {
    if(e.target.classList.contains('delete-recette')){
      const index = e.target.dataset.index;
      recettes.splice(index, 1);
      localStorage.setItem('finance:recettes', JSON.stringify(recettes));
      renderTables();
    }
  });

  depenseTableBody.addEventListener('click', e => {
    if(e.target.classList.contains('delete-depense')){
      const index = e.target.dataset.index;
      depenses.splice(index, 1);
      localStorage.setItem('finance:depenses', JSON.stringify(depenses));
      renderTables();
    }
  });

  renderTables();
}
