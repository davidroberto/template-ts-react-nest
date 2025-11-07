### BUILD: 

- `npm install` pour installer les dépendances en local (pour complétion du code)
- Copiez le fichier `.env` en `.env.local` et modifiez les variables d'environnement
- Modifiez les DNS de votre machine pour associer "nomdedomainlocalvoulu.local" vers 127.0.0.1 (Pris en charge par le conteneur Nginx qui route vers le service frontend)
- Ajouter "nomdedomainlocalvoulu.local" en server_name dans le fichier nginx.conf.dev en frontend
- Ajouter "nomdedomainlocalvoulu.local" aux server.allowedHosts et au hmr.host (pour le hot reload) du fichier vite.config.ts en frontend

### RUN: 

- `docker compose --env-file .env.local -f docker-compose.dev.yml up` pour lancer l'application en dev accessible sur `http://nomdedomainlocalvoulu.local`**
- Le frontend est accessible sur `http://nomdedomainlocalvoulu.local` avec la page d'accueil par défaut de vite
- Le backend est accessible sur `http://nomdedomainlocalvoulu.local/api/healthcheck avec le endpoint en GET par défaut ("hello from shared")

### DEPLOY:

Première installation : 

- cloner le dépot
- créer le fichier `.env.prod` avec les variables d'environnement de production


Continuous integration :
- Chaque push sur main déclenche un hook de prepush qui lance les tests et annule le push si les tests échouent.

Continuous delivery : 
Manuel : 
- ssh sur le serveur
- `git pull origin main`
- `docker compose --env-file .env.prod -f docker-compose.prod.yml build && docker compose --env-file .env.prod -f docker-compose-vma.yml up`

Automatisé :
- Push d'un tag de version (github action configuré)

Pour arrêter et supprimer le stack, volumes, conteneurs orphelins :

  `docker compose --env-file .env.prod -f docker-compose.prod.yml down --volumes --remove-orphans`
  
En prod, pour tester la bdd : `docker exec -it idDuContainer psql -U xxxxUser -d xxxxxDB -c '\dt`
Pour se connecter en sh dans le conteneur : `docker exec -it idDuContainer sh`
