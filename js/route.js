import { patientPage, initPatientPage } from "./component/patient.js";
import { rendezVousPage, initRendezVousPage } from "./component/rendezVous.js";
import { financePage, initFinancePage } from "./component/finance.js";
import { loginPage, login, setUpPassword } from "./component/login.js";
import { dashboardPage, initDashboard } from "./component/dashboard.js";

const root = document.getElementById("root");

const routes = {
  home: { template: dashboardPage, init: initDashboard },
  patient: { template: patientPage, init: initPatientPage },
  rendezvous: { template: rendezVousPage, init: initRendezVousPage },
  finance: { template: financePage, init: initFinancePage },
  login: { template: loginPage, init: () => { setUpPassword(); login(); } }
};

// Hash routing
function renderRoute() {
  const hash = location.hash.replace("#", "") || "home";
  const route = routes[hash] || routes["home"];
  root.innerHTML = route.template();
  if (route.init) route.init();
}


window.addEventListener("hashchange", renderRoute);
window.addEventListener("load", renderRoute);

// Nav buttons
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    location.hash = btn.dataset.target;
  });
});
