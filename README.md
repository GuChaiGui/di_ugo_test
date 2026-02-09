
# 📘 DI UGO Test – Backend Symfony & Frontend React

Ce projet est une application complète composée :

- **d’un backend Symfony 6.4** permettant d’importer des données clients/commandes depuis des fichiers CSV et d’exposer une API REST,
- **d’un frontend React + TypeScript** permettant d’afficher les clients, leurs commandes, la pagination et les totaux multi‑devises.

Ce README décrit l’installation, l’architecture, les commandes disponibles, l’API, les tests, ainsi que le fonctionnement global du projet.

---

## Informations du projet  
| Élément  | Valeur  |
|--|--|
| Projet | DI UGO Test |
| Backend | Symfony 6.4 (PHP 8.2) |
| Frontend | React + TypeScript | 
| Base de données | SQLite | 
| Auteur | Alexandre LY| 
| Date | 2026 |

---


# 📑 Sommaire

1. Présentation du projet  
2. Technologies utilisées  
3. Architecture du repository  
4. Installation du backend Symfony  
5. Base de données & migrations  
6. Import des fichiers CSV  
7. API REST disponible  
8. Tests backend  
9. Installation du frontend React  
10. Fonctionnement du frontend  
11. Tests frontend  
12. Notes importantes  
13. Résumé rapide d’installation
14. Piste d'améliorations

---

# 🧩 1. Présentation du projet

L’objectif du test technique est de :

-   importer des **clients** et leurs **commandes** depuis deux fichiers CSV,
-   stocker ces données en base via Doctrine,
-   exposer une **API REST** permettant de récupérer les clients et leurs commandes,
-   afficher ces données dans une interface **React + TypeScript**,
-   proposer un affichage clair, paginé, avec navigation et totaux multi‑devises.

Le projet est conçu pour être **simple à installer**, **facile à lire**, et **proprement structuré**.

---

# 🛠 2. Technologies utilisées

## Backend
- Symfony **6.4**
- PHP **8.2**
- Doctrine ORM
- SQLite 
- Symfony Console 
- PHPUnit (tests)

## Frontend
-   React 18
-   TypeScript
-   Vite
-   Jest + React Testing Library
-   Playwright (tests E2E)


---

# 📁 3. Architecture du repository

```
di_ugo_test/
│
├── backend/
│   ├── bin/
│   ├── config/
│   ├── import/
│   ├── migrations/
│   ├── public/
│   ├── src/
│   │   ├── Command/
│   │   ├── Controller/
│   │   ├── Entity/
│   │   ├── Repository/
│   │   └── Kernel.php
│   ├── tests/
│   ├── var/
│   ├── vendor/
│   ├── .env
│   ├── composer.json
│   ├── composer.lock
│   └── symfony.lock
│
└── frontend/
    ├── src/
    ├── public/
    ├── tests/
    ├── vite.config.ts
    ├── jest.config.cjs
    ├── package.json
    └── tsconfig.json
```

# 🔧 4. Installation du backend Symfony

## 1. Cloner le projet

    git clone https://github.com/GuChaiGui/di_ugo_test.git
    cd di_ugo_test/backend 

## 2. Installer les dépendances

```
composer install
```

## 3. Configurer l’environnement


```
cp .env .env.local
```
Par défaut, la base SQLite est :


```
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
```

# 🗄 5. Base de données & migrations

Créer la base et appliquer les migrations :


```
php bin/console doctrine:migrations:migrate
```

La base SQLite est créée dans :

```
backend/var/data.db
```

# 📥 6	. Import des fichiers CSV

## 1. Placer les fichiers CSV

Mettre les fichiers dans :

```
backend/var/import/customers.csv
backend/var/import/purchases.csv
```

## 2. Lancer l’import

```
php bin/console ugo:orders:import
```

La commande :

-   crée les clients s’ils n’existent pas,
    
-   crée les commandes associées,
    
-   évite les doublons (basé sur `purchaseIdentifier` + `customer`),
    
-   affiche un résumé en console.
    

# 🌐 7. API REST disponible
## Lancer le backend :
```
symfony serve
```

Le backend sera disponible sur :


```
http://127.0.0.1:8000
```

## GET /customers

Retourne la liste de tous les clients.

Exemple :


```
[
  {
    "id": 1,
    "title": "m",
    "lastname": "Norris",
    "firstname": "Chuck",
    "postal_code": "83600",
    "city": "Fréjus",
    "email": "chuck@norris.com"
  }
]
```

## GET /customers/{id}/orders

Retourne les commandes d’un client.

Exemple :


```
[
  {
	  "last_name": "Norris",
		"purchase_identifier": "1/01",
    "product_id": 4324,
    "quantity": 1,
    "price": 7,
    "currency": "EUR",
    "date": "2024-11-02"
  }
]
```

## GET /health

Vérifier que le backend fonctionne

```
{ "status": "ok" }
```

# 🧪 8. Tests backend

Lancer les tests :

```
php bin/phpunit
```

Tests inclus :

-   HealthApiTest → vérifie `/health`
    
-   CustomerApiTest → vérifie `/customers` et `/customers/{id}/orders`
    
# ⚛️ 9. Installation du frontend React


```
cd ../frontend
npm install
npm run dev
```

Le frontend tourne sur :

```
http://localhost:5173
```

# 🖥️ 10. Fonctionnement du frontend

Le frontend propose :

-   une page **Customers** affichant la liste des clients,
    
-   un clic sur un client ouvre la page **Orders**,
    
-   affichage des commandes avec :
    
    -   pagination,
        
    -   totaux multi‑devises,
        
    -   mise en forme claire,
        
-   composants réutilisables (Table, Pagination…),
    
-   code en TypeScript strict.
    

# 🧪 11. Tests frontend

## ✔ Tests unitaires (Jest + React Testing Library)

Lancer :

Code

```
npm test
```

Tests inclus :

-   affichage des colonnes
    
-   affichage des lignes
    
-   pagination activée/désactivée
    
-   navigation entre pages
    

## ✔ Tests E2E (Playwright)

Lancer :

```
npm run test:e2e
```
ou en mode visuel
```
npx playwright test --headed
```

Le test E2E vérifie :

-   chargement de la page Customers
    
-   clic sur un client
    
-   affichage de la page Orders
    
-   pagination fonctionnelle

# ⚙️ 12. Notes importantes

-   `var/` et `vendor/` sont ignorés dans Git
    
-   `node_modules/` est ignoré dans Git
    
-   les CSV doivent être placés dans `var/import`
    
-   l’import évite les doublons
    
-   les migrations gèrent toute la structure de la base
    
-   le backend doit tourner avant le frontend
    

# 🚀 13. Installation Rapide

## Backend


```
cd backend
composer install
cp .env .env.local
php bin/console doctrine:migrations:migrate
# placer customers.csv et purchases.csv
php bin/console ugo:orders:import
symfony serve
```

## Frontend



```
cd frontend
npm install
npm run dev
```

Le frontend démarre sur :

```
http://localhost:5173
```

# 💡 14. Piste d'améliorations

-   **Optimiser l’import CSV**  avec un système de batch (flush/clear) pour améliorer les performances et réduire la consommation mémoire.
    
-   **Ajouter des index en base**  (ex. sur `customer_id`) afin d’accélérer les recherches et rendre l’import plus scalable.
- **Améliorer la robustesse de l’import** via une validation des données (email, date, prix, quantité) et une gestion d’erreurs plus fine.
-  **Conteneurisation complète (Docker multi‑services)** Mettre backend + frontend + base SQLite/PostgreSQL dans un docker-compose reproductible.  ➡️ avec `docker compose up`, tout tourne identique partout.
