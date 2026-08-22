# ROAM'S.AI V1.0 — Centre de Contrôle Numérique Souverain

> Système d'intelligence artificielle souverain doté d'une architecture cognitive **Tripartite (Système 1 • Système 2 • Système 3)**, d'un moteur de génération visuelle haute définition (1K / 2K / 4K), d'un diagnostic multimodal par capture d'écran en direct et d'un double numérique autonome.

---

## 🌟 Fonctionnalités Clés

### 🧠 1. Cerveau Cognitif Tripartite
- **Système 1 (Flash Réflexe)** : Réponses ultra-rapides et instinctives (< 150 ms) propulsées par `gemini-2.5-flash`.
- **Système 2 (Raisonnement & Logique)** : Décomposition logique pas à pas, résolution de problèmes complexes et production de code TypeScript/Python via `gemini-2.5-pro`.
- **Système 3 (Méta-Surveillance & Éthique)** : Audit qualitatif en temps réel, score de confiance (0–100%), détection des biais et ajustement dynamique de la personnalité.

### 🎨 2. Génération & Analyse d'Images Haute Fidélité
- **Détection Automatique d'Intention** : ROAM'S.AI distingue automatiquement une commande de création visuelle (« *Crée une image...* », « *Dessine...* ») d'une question textuelle ou d'une analyse d'image.
- **Moteur Visuel Dédié** : Intégration de `imagen-3.0-generate-002` avec transmission du prompt purifié.
- **Résolutions Configurables** : Support natif **1K Standard**, **2K Haute Définition** et **4K Ultra HD**.
- **Formats & Ratios** : Carré (1:1), Paysage (16:9), Portrait (9:16), Standard (4:3).
- **Affichage & Actions Directes** : Rendu visuel dans le message du chat, mode plein écran (lightbox), téléchargement PNG en un clic, bouton de régénération et modification rapide du prompt.
- **Zéro Simulation** : En cas d'indisponibilité ou d'erreur de clé, le système affiche une notification d'erreur transparente sans halluciner de description textuelle.

### 🖥️ 3. Perception Multimodale & Diagnostic d'Écran
- **Partage d'Écran en Direct** : Capture instantanée de fenêtre ou d'écran complet pour diagnostic interactif.
- **Observation Continue** : Veille automatique périodique sur les changements d'écran.
- **Upload & Glisser-Déposer** : Analyse d'images (PNG, JPG, WEBP) avec extraction d'éléments et résolution de pannes.

### 🌐 4. Recherche Web en Direct (Google Search Grounding)
- Activation / désactivation du grounding Google Search en direct dans le Chat.
- Citations cliquables des sources Web vérifiées en temps réel.

### 🎙️ 5. Contrôle Vocal & Synthèse Audio Sécurisée
- **Synthèse Vocale Ferme** : Lecture audio strictement déclenchée par un clic explicite sur le bouton « *Synthèse vocale* ».
- **Gestion des États** : Bouton d'interruption instantanée (*Arrêter*), nettoyage intelligent des balises markdown et blocs de code avant prononciation.
- **Reconnaissance Vocale (STT)** : Dictée vocale fluide via l'API Web Speech.

### 📑 6. Rendu Markdown & Blocs de Code Professionnels
- Rendu complet : Titres hiérarchiques, listes à puces/numérotées, tableaux stylisés, mise en gras/italique et citations.
- Coloration syntaxique des blocs de code avec bouton de copie en un clic et badge de langage.

### 🤖 7. Le Double Numérique Autonome
- Simulation et suivi de tâches en arrière-plan (veille technologique, audit de code, monitoring d'infrastructure).
- Système de progression d'expérience (XP) et de niveau pour l'Architecte.

---

## 🛠️ Architecture Technique

```
├── server.ts                  # Serveur backend Express avec proxy Google GenAI sécurisé
├── src/
│   ├── components/
│   │   ├── TripartiteChat.tsx    # Interface de chat principale & inspecteur de cerveau
│   │   ├── MarkdownRenderer.tsx  # Rendu Markdown avec Prism code blocks & GFM
│   │   ├── SovereignDouble.tsx   # Module de gestion du Double Autonome
│   │   ├── SystemMonitor.tsx     # Métriques système, mémoire et latence
│   │   ├── ManualModal.tsx       # Manuel complet d'utilisation (28 chapitres)
│   │   └── SettingsModal.tsx     # Configuration et clés API
│   ├── types/
│   │   └── roam.ts               # Types TypeScript unifiés (Tripartite, Images, Chat)
│   ├── App.tsx                   # Composant racine & navigation par onglets
│   └── main.tsx                  # Point d'entrée React 18
├── metadata.json              # Métadonnées applicatives et permissions
└── package.json               # Dépendances et scripts de build
```

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- Clé API Google Gemini (`GEMINI_API_KEY`)

### Installation & Lancement

1. **Cloner le projet**
   ```bash
   git clone https://github.com/ORMASISBANDUENGA/Roams.git
   cd Roams
   ```

2. **Configurer les variables d'environnement**
   Créez un fichier `.env` basé sur `.env.example` :
   ```env
   GEMINI_API_KEY=votre_cle_api_gemini
   ```

3. **Lancer en mode développement**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

4. **Build de production**
   ```bash
   npm run build
   npm start
   ```

---

## 🔒 Sécurité & Souveraineté des Données
- Toutes les clés API sont manipulées côté serveur (`server.ts`) et ne sont jamais exposées au navigateur client.
- Les requêtes d'images et d'analyses multimodales transitent par des endpoints d'API dédiés avec validation stricte des schémas.
- Aucune donnée confidentielle n'est conservée sans le consentement explicite de l'utilisateur.

---

## 📄 Licence
Projet développé sous architecture souveraine ROAM'S.AI V1.0. Tous droits réservés.
