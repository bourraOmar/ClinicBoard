import { loginPage, login, setUpPassword } from "./component/login.js";
import { patientPage, initPatientPage } from "./component/patient.js";
import { rendezVousPage, initRendezVousPage } from "./component/rendezVous.js";
import { financePage, initFinancePage } from "./component/finance.js";
import { dashboardPage } from "./component/dashboard.js";

// guard
function isAuthenticated() {
  return !!localStorage.getItem("clinicApp:data");
}

// تعريف الروتات
const urlRoutes = {
  '/': { template: dashboardPage },
  '/login': { template: loginPage },
  '/patient': { template: patientPage },
  '/rendezvous': { template: rendezVousPage },
  '/finance': { template: financePage }
};

function urlLocationHandler() {
  let location = window.location.hash.replace("#", "") || "/";

  // login guard
  if (isAuthenticated()) {
    if (location === "/login") location = window.location.hash = "#/";
  } else {
    if (location !== "/login") location = window.location.hash = "#/login";
  }

  let route = urlRoutes[location] || urlRoutes['/'];

  // render page
  document.getElementById("root").innerHTML = route.template();

  // init scripts
  if (location === "/login") {
    setUpPassword();
    login();
  } else if (location === "/patient") {
    initPatientPage();
  } else if (location === "/rendezvous") {
    initRendezVousPage();
  } else if (location === "/finance") {
    initFinancePage();
  } else if (location === "/") {
    dashboardPage
  }
}

// nav buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;

  e.preventDefault();
  const target = btn.getAttribute("data-target");
  if (!target) return;

  // تغيير hash + تحميل الصفحة
  window.location.hash = target;
  urlLocationHandler();

  // إذا كانت القائمة مفتوحة في mobile، غادي نغلقوها
  const nav = document.querySelector("nav");
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
  }
});

// toggle hamburger
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}


window.addEventListener("hashchange", urlLocationHandler);
window.addEventListener("load", urlLocationHandler);
