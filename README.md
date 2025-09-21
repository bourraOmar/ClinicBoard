# Clinic SPA - Gestion de Cabinet de Santé

## Contexte du projet
Aujourd’hui, le cabinet de santé gère ses patients, rendez-vous et finances avec Excel, entraînant erreurs, doublons et manque de sécurité.  
Le projet vise à créer une **application web monopage (SPA)**, 100 % locale, qui centralise toutes ces fonctions dans une interface fluide, ergonomique et sécurisée, avec **persistance en LocalStorage** et **accès protégé par mot de passe hashé**.

---

## Fonctionnalités principales

### 🔐 Authentification & sécurité
- Initialisation de l’application avec création du mot de passe (si première utilisation).  
- Connexion avec vérification du hash.  
- Compteur d’échecs et verrouillage temporaire après plusieurs tentatives.  
- **Bonus :** Chiffrement du JSON stocké dans le LocalStorage.

### 👥 Gestion des patients
- CRUD patient (Ajouter, Modifier, Supprimer).  
- Champs : Nom complet, Téléphone, E-mail, Notes.  
- Recherche simple (nom ou téléphone).  
- Historique des rendez-vous liés.

### 📅 Gestion des rendez-vous
- Création de rendez-vous avec patient, praticien, salle, type, durée.  
- Modification (horaire, durée, statut).  
- Annulation ou statut no-show.  
- Filtrage par praticien / statut.  
- Vue Jour (agenda simple).

### 💰 Gestion des recettes & dépenses
- Enregistrer une recette (montant, méthode de paiement, libellé).  
- Enregistrer une dépense (montant, catégorie, libellé, date).  
- Suivi du budget mensuel (objectif vs réalisé).

### 📊 Tableau de bord
- KPIs : Chiffre d’affaires mensuel, Total dépenses, Marge (recettes – dépenses), Nombre de patients, Nombre de consultations.  
- Navigation centralisée vers les modules : Patients, RDV, Recettes/Dépenses.

### 📂 Données & persistance
- Données stockées en **LocalStorage JSON** (clé unique : `clinicApp:data`).  
- Schéma clair avec :  
  - `patients`  
  - `appointments`  
  - `cash`  
  - `auth`  
- Réinitialisation automatique si aucun mot de passe défini.

---

## Installation & utilisation
1. **Cloner le projet**
```bash
git clone <lien-du-repo>
cd <nom-du-dossier>
