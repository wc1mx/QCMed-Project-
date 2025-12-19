# QCMed-Project-
test project 
# Student Registration – Full Stack Application

## Description
Cette application permet d’enregistrer des étudiants sur une plateforme de cours en ligne.
Elle est composée d’un backend Node.js/Express et d’un frontend React (Vite).
Les données sont stockées localement dans un fichier JSON.

## Stack technique
- Frontend : React (Vite) + CSS
- Backend : Node.js + Express
- Stockage : fichier JSON (en mémoire persistée)
- Communication : API REST

## Fonctionnalités
- Ajouter un étudiant (Nom, Email, Cours)
- Validation du format de l’email
- Champ optionnel “Expérience préalable” affiché uniquement si le cours est **Math Avancé**
- Affichage dynamique de la liste des étudiants
- Suppression d’un étudiant par email
- Tri du tableau par Nom ou Email

## Installation et exécution

### Backend
```bash
cd backend
npm install
node index.js
