# hellom210-docker Beispiel 

- Erstelle dir ein neues GitLab Projekt
- Kopiere die Inhalte von diesem Projekt in dein Projekt
- Das Projekt ist so konfiguriert, dass auch eine allfällige Datenbankanbindung getestet werden kann.
- Die Umgebungsvariabeln für die DB sind: DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD

```Shell 

docker run -e "DB_HOST=localhost" -e "DB_PORT=3306" -e "DB_NAME=hellom210" -e "DB_USERNAME=hellom210user" -e "DB_PASSWORD=hellom210password" -p 8080:8080 hellom210 

```

## Dockerfile erstellen (Dockerfile - hellom210)

- Image erstellen und einen Namen geben. Standardkonvention ist dem aktuellsten Image den Tag latest zu geben

`docker build -t hellom210:latest -t hellom210:1.0.0 .`

- Images anschauen um zu sehen ob es geklappt hat

`docker images`

- Container erstellen und starten

`docker run -p 8080:8080 hellom210:latest`

- Webserver testen

`curl http://localhost:8088`

## GitLab Container Registry (GitLab Container Registry hellom210)

- Füge deinem GitLab Account ein Personal Access Token mit den Rechten "read_registry, write_registry" für hellom210 hinzu

- Logge dich mit docker bei deiner Registry ein. Verwende dein Username und das erstellte Token als Password

`docker login registry.gitlab.com`

- Erstelle dein Image mit dem Registry Namespace als Namen. Achte darauf, dass wir jeweils die Versionsnummer und das Tag für das aktuellste haben wollen.

`docker build -t registry.gitlab.com/coaching-m210/hellom210-docker:latest -t registry.gitlab.com/coaching-m210/hellom210-docker:1.0.0 .`

- Images anschauen um zu sehen ob es geklappt hat

`docker images`

- Container erstellen und starten um zu testen

`docker run -p 8080:8080 registry.gitlab.com/coaching-m210/hellom210-docker:latest`

- Webserver des Container testen

`curl http://localhost:8080`

- Image mit Tag Version in Registry pushen.

`docker push registry.gitlab.com/coaching-m210/hellom210-docker:1.0.0`

- Image mit Tag latest in Registry pushen.

`docker push registry.gitlab.com/coaching-m210/hellom210-docker:latest`
