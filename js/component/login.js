// login.js
import { hashPassword } from '../hash.js';
export const loginPage = () => {
  let user = localStorage.getItem("clinicApp:data") ? JSON.parse(localStorage.getItem("clinicApp:data")) : null;

  if (user) {
    return `
  <div class="auth-container">
    <header class="auth-header">
      <h1>🔐 Authentification & Sécurité</h1>
      <p>Veuillez entrer vos informations pour accéder à l’application.</p>
    </header>

    <main class="auth-main">
      <section class="auth-box">
        <h2>Connexion</h2>
        <form id="login-form">

          <label for="password">Mot de passe</label>
          <input type="password" id="password" placeholder="Votre mot de passe" />

          <button type="submit" id="login-button">Se connecter</button>
        </form>

        <div class="info-box">
          <p>⚠️ Tentatives échouées: <span id="fail-count">0</span></p>
          <p id="lock-message" class="hidden">🔒 Compte verrouillé temporairement après trop de tentatives.</p>
        </div>
      </section>
    </main>
  </div>
`; 
  } else {
    return `
    <div class="auth-container">
      <h1>🔐 Créer un mot de passe</h1>
      <form id="setup-form">
        <label for="new-password">Nouveau mot de passe</label>
        <input type="password" id="new-password" placeholder="Entrez le mot de passe" />
        <button type="submit">Enregistrer</button>
      </form>
    </div>`;
  }
};

export function setUpPassword () {
  const formSetPassword = document.getElementById('setup-form');
  if (!formSetPassword) return;

  formSetPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    let newPassword = document.getElementById('new-password').value.trim();
    if (!newPassword) {
      alert('please enter valid password ');
      return;
    }
    let hashed = await hashPassword(newPassword);
    let data = {
      password : hashed, 
      lockPasswordInput : 5
    };
    localStorage.setItem('clinicApp:data', JSON.stringify(data));
    alert("Mot de passe enregistré !");
    window.location.hash = '#/login';
  });
}

export function login() {
  const formLogin = document.getElementById('login-form');
  if (!formLogin) return;

  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('login-button');

  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    let loginPassword = passwordInput.value.trim();
    if (!loginPassword) {
      alert('Veuillez entrer un mot de passe valide');
      return;
    }

    let data = JSON.parse(localStorage.getItem('clinicApp:data'));
    if (!data) return;

    if (data.lockPasswordInput <= 0) {
      lockInputs();
      return;
    }

    let hashedInput = await hashPassword(loginPassword);
    if (hashedInput === data.password) {
      alert("Connexion réussie !");
      data.lockPasswordInput = 5; 
      window.location.hash = "#/";
    } else {
      data.lockPasswordInput -= 1;
      alert(`Mot de passe incorrect ! Tentatives restantes: ${data.lockPasswordInput}`);
      document.getElementById('fail-count').textContent = data.lockPasswordInput;
      if (data.lockPasswordInput <= 0) {
        lockInputs();
      }
    }

    localStorage.setItem('clinicApp:data', JSON.stringify(data));
  });

  function lockInputs() {
    passwordInput.disabled = true;
    loginButton.disabled = true;
    document.getElementById('lock-message').classList.remove("hidden");
  }
}