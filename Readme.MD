# Manga Dojo

Api rest hecha con typescript y SQL organizada con Clean Architecture

## Descripción
* Manga dojo es una aplicación hecha para poner en práctica la arquitectura limpia
* Es una aplicación real; separa el front end y el backend en 2 módulos distintos
* La finalidad de la aplicación es funcionar como una página para que los usuarios se creen una cuenta y tengan en ella toda la colección de mangas que han leido, dejando reseñas de los mismos y calificandolos. Al mismo tiempo, esto impulsa el negocio principal de la empresa; la venta de mangas, que se puede realizar desde la misma sección desde donde el usuario deja su reseña de la obra.



## Funcionalidades (end points)

### MANGAS 

#### Get
* api/mangas: Trae todos los mangas de la base de datos
* 
#### Post
* api/mangas: Permite dar de alta un nuevo manga ingresando por body información clave
* 

---

## Capas

### Entry point:
* Establece configuraciones de todos los frameworks y librerías de terceros, siendo el orquestador de estos recursos

### Entities
* 

### Use cases
* 

### Interface adapters
* 

### Infrastructure
* 

---

### Librerias externas:
* Express (api rest)
* Awilix (inyección de dependencias)
* Mysql2 (sql)
* Dotenv (para seguridad)
* bcryptjs (para cifrar contraseñas)
* jsonwebtoken (Para crear y verificar tokens web JSON)