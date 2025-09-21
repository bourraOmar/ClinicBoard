export function dashboardPage() {
  const patients = JSON.parse(localStorage.getItem("clinicApp:patients")) || [];
  const rvs = JSON.parse(localStorage.getItem("clinicApp:rv")) || [];
  const recettes = JSON.parse(localStorage.getItem("finance:recettes")) || [];
  const depenses = JSON.parse(localStorage.getItem("finance:depenses")) || [];

  const totalRecettes = recettes.reduce((acc, r) => acc + Number(r.montant), 0);
  const totalDepenses = depenses.reduce((acc, d) => acc + Number(d.montant), 0);
  const solde = totalRecettes - totalDepenses;

  const nbPatients = patients.length;
  const nbConsultations = rvs.length;

  return `
    <h1>Tableau de bord</h1>

    <div class="dashboard-kpis">
      <div class="kpi"><h3>Total recettes</h3><p>${totalRecettes} MAD</p></div>
      <div class="kpi"><h3>Total dépenses</h3><p>${totalDepenses} MAD</p></div>
      <div class="kpi"><h3>Solde</h3><p>${solde} MAD</p></div>
      <div class="kpi"><h3>Nombre de patients</h3><p>${nbPatients}</p></div>
      <div class="kpi"><h3>Nombre de consultations</h3><p>${nbConsultations}</p></div>
    </div>
  `;
}


