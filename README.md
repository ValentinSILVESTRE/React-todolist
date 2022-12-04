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
-   ❌ Faire un vrai formulaire
-   ❌ Ajouter des catégories aux tâches (travail, maison, ...)
-   ❌ Trier et filtrer les tâches
-   ❌ Ajouter une répétition
-   ❌ Ajouter des dossiers pour regrouper les tâches
-   ❌ Ajouter des utilisateurs
-   ❌ Faire un vrai backend
-   ❌ Authentification
-   ❌ Tester

### `Détails`

-   ❌ Faire un footer
-   ❌ Empêcher de créér plusieurs tâches avec le même titre ?
-   ❌ Quand on clique sur la modification de tache, le titre associé est sélectionné

## `Task`

-   id : string
-   title : string
-   content : string
-   endDate : Date
-   startDate? : Date
-   priority : high | medium | low
-   author : User
-   contributors : User[]
-   folder : Folder
