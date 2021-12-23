## Información del proyecto

Crawler con nodejs que obtiene todas las imagenes y enlaces de un site para localizar enlaces rotos.

## Instalación

Instalamos todas las dependencias.

```bash
$ npm install
```

## Analizar todos los enlaces del site

El script fullSiteCrawler recorre todo el site y muestra por terminal los enlaces rotos.

```bash
$ npm run fullSiteCrawler --url=pagina_objetivo
```

## Obtener imágenes

El script getImages recorre la página y devuelve todas las imágenes que encuentra.

```bash
$ npm run getImages --url=pagina_objetivo
```
