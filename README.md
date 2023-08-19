# API de Disney - README

¡Bienvenido a la API de Disney! Esta API te permite acceder a diferentes endpoints para gestionar la autenticación de usuarios y obtener información sobre personajes de Disney. A continuación, te proporcionamos información sobre los endpoints disponibles y cómo iniciar la aplicación.

## Endpoints

### Autenticación de Usuarios

- **Endpoint:** `/api/v1/auth/login`

  - **Método:** POST
  - **Descripción:** Este endpoint te permite iniciar sesión como usuario registrado. Debes proporcionar las credenciales correctas para obtener un token de acceso.

- **Endpoint:** `/api/v1/auth/register`
  - **Método:** POST
  - **Descripción:** Registra un nuevo usuario en la aplicación de Disney. Proporciona la información necesaria para crear una cuenta.

### Personajes de Disney

- **Endpoint:** `/api/v1/characters`
  - **Método:** GET
  - **Descripción:** Obtiene una lista completa de personajes de Disney. Accede a este endpoint para explorar la amplia variedad de personajes que ofrece el mundo Disney.

## Iniciar la Aplicación

Para poner en marcha la aplicación de manera sencilla, te recomendamos utilizar Docker Compose. Asegúrate de tener Docker instalado en tu máquina antes de continuar.

1. Abre una terminal en el directorio raíz del proyecto.

2. Ejecuta el siguiente comando para iniciar el contenedor de MySQL y la aplicación:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d mysql
   npm run dev
   ```

¡Listo! La aplicación estará ahora en funcionamiento y podrás acceder a los endpoints mencionados anteriormente.

Recuerda que esta es una breve descripción para ayudarte a empezar con la API de Disney. Si necesitas más detalles sobre los endpoints, la estructura de la aplicación o cualquier otra información, asegúrate de revisar la documentación completa del proyecto.

¡Diviértete explorando el mundo mágico de Disney a través de nuestra API! Si tienes alguna pregunta o problema, no dudes en ponerte en contacto con nuestro equipo de soporte.

Nota: Esta documentación puede estar sujeta a cambios y actualizaciones. Última actualización: [Fecha]
