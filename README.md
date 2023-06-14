
# Supabase CRUD

les proccedure a suivre sont les proccedure d'installation pour
l'API et pour se créer un compte Supabase et créer une BDD






## Installation de L'API

Prérequis WSL, NVM, terminal windows

Prémière étape : installer WSL et un terminal

allez dans le microsoft store et installer windows terminal
toujours dans le microsoft store chercher et installer ubuntu 22.04.02 LST

ouvrir terminal et taper :
```bash 
wsl --install
```
une fois fini ouvrir un nouveau terminal ubuntu 22.04.02 LST
et créer user avec un mot de passe (de votre choix).
une fois fait nous allons faire les mise a jours, taper donc dans votre terminal ubuntu :"
```bash
sudo apt-get update && sudo apt-get upgrade -y
``` 
entrée votre mot de passe pour commencer la mise a jours

nous allons maintenant vérifier que git est bien installer pour ce faire nous allons taper dans le terminal ubuntu :
```bash
 git --version
```

### Procedure d'installation de git si git non installer de base
il devrais vous afficher la version de git si cela n'est pas le cas faire la procedure suivante: taper dans votre terminal :
```bash
sudo apt install git
&&
git --version
```
la version de git vous seras donc afficher

### Procedure d'installation et NVM et Node
dans votre terminal vous allez taper :
```bash
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
```
une fois fini nous allons verifier sa version puis installer node18
```bash
nvm --version
&&
nvm install 18.16.0
&&
nvm use 18.16.0
&&
node --version
```
normalement node --version devrais vous donner la version : 18.16.0



### Créer un compte supabase et créer une table
[lien supabase pour créer un compte](https://supabase.com/)
une fois fait, créer un nouveau project et donc créer une nouvelle organisation, donner un nom a votre projet et selectionner votre regions.
dans table editor, créer une nouvelle table **contact** avec:
* id en clef primaire qui est auto incrémentable 
* title
* name
* adress
* realAdress
* departement
* country
* tel
* email

Et desactiver le RLS

### Cloner le project et l'installer
dans le terminal ubuntu toujours nous allons taper les commande suivante :
```bash
git clone https://github.com/Baptiste-Ferrand/CRUD.git
&&
cd CRUD
&&
npm install
&&
npm run dev
```
l'API est maintenant lancer

### Ajouter et mêttre en place le .env
copier le .env.example puis coller le au même endroit sous le nom de .env
remplir les variable du .env

`PORT` : 3002

`supabaseURL` : vôtre lien supabaseUrl que vous trouverez dans les paramettre/API de vôtre project supabase (internet)

`supabaseKEY` : vôtre clef supabase que vous trouverez dans les paramettre/API de vôtre project supabase (internet)

### Installation Postman
[Lien Postman](https://www.postman.com/downloads/)
télécharger puis installer Postman sur vôtre ordinateur, la création d'un compte n'est pas obligatoire mais recommander.

[Cours pour utiliser Postman](https://openclassrooms.com/fr/courses/6573181-adoptez-les-api-rest-pour-vos-projets-web/7498761-utilisez-postman-pour-formuler-vos-requetes)

### Remplir la BDD avec les datas
appeller la root : "http://localhost:3002/contact/fill" avec postman
avec l'attribue post

### Postman Doc
[Postman Doc](./assets/CRUD_NOSQL.md)