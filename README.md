# `Todo List`

Projet du module React à Diginamic.

Inspiration : [Youtube](https://www.youtube.com/watch?v=8ZKq0r-g87M)

## `Todo`

-   ✅ Afficher les tâches issues du mock
-   ✅ Styliser le formulaire de création de task
-   ✅ CRUD
-   ✅ Ajouter un état aux tâches (todo / done)
-   ✅ Ajouter une date limite
-   ✅ Ajouter une priorité aux tâches
-   ✅ Trier les tâches par date puis ❌ priorité
-   ✅ Faire un joli formulaire
-   ❌ Ajouter des catégories aux tâches (travail, maison, ...)
-   ❌ Trier et filtrer les tâches
-   ❌ Permettre les tâches quotidiennes
-   ❌ Ajouter des dossiers pour regrouper les tâches
-   ❌ Ajouter des utilisateurs
-   ❌ Faire un vrai backend
-   ❌ Authentification
-   ❌ Tester
-   ❌ Responsive

### `Détails`

-   ✅ Modifier l'icone du crayon quand on est en mode edit
-   ✅ Faire un footer
-   ✅ Faire un composant TaskEdit différent de Task et faire passer les données depuis le parent
-   ❌ Empêcher de créér plusieurs tâches avec le même titre ?

## `Task`

-   id : string
-   title : string
-   content : string
-   deadline : Date
-   startDate? : Date
-   priority : high | medium | low
-   author : User
-   contributors : User[]
-   folder : Folder
