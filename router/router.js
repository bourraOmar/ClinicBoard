const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
};

const routes = {
  "/" : "/components/home.html",
  "/login" : "/components/login.html",
  "/patient" : "/components/patient.html",
  "/rendez_vous" : "/components/rendez_vous.html",
}; 

const handleLocation = async () => {
  const path = window.location.pathname;
  const html = await fetch(routes[path]).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;
};

window.onpopstate =  handleLocation;
window.route = route;
handleLocation();