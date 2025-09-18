const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  "/": "/components/login.html",
  "/patient": "/components/patient.html",
  "/rendez_vous": "/components/rendez_vous.html",
};

const handleLocation = async () => {
  const path = window.location.pathname;

  if (path === "/index.html"){
    window.history.replaceState({}, "", "/");
    path = "/";
  }
  
  const route = routes[path] || "/components/404.html";
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  const navbar = document.getElementById("main-nav");
  if (path === "/"){
    navbar.style.display = "none"
  }else{
    navbar.style.display = "flex"
  }

};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
