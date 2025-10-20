# clean-architecture-project

Proyecto realizado para aplicar conceptos de dominio, TDD y arquitectura limpia, con Typescript, NodeJS y Vitest,git en academy ForIT

# Objetivo

- **Sistema de Gestión de Reservas de Hotel**

## Estructura del proyecto

Proyecto de NodeJS con Typescript.  
Implementar el dominio, y (luego) el backend y el frontend, asique asegurate de separarlo adecuadamente.  
Podés usar la estructura de carpetas que quieras, pero asegurate de que sea clara y fácil de entender.  
Nuestra recomendación es que uses la siguiente estructura:

mi-proyecto/  
├── README.md  
├── package.json  
├── tsconfig.json  
├── domain/  
│ ├── package.json  
│ ├── src/  
│ │ ├── entities/  
│ │ ├── use-cases/  
│ │ └── services/  
├── apps/  
│ ├── backend/  
│ │ ├── package.json  
│ │ └── src/  
│ └── frontend/ #Lo haremos más adelante

Y usá el manejador de paquetes que quieras (npm, yarn, pnpm, etc).  
Nuestra recomendación es que uses yarn v2 o superior.

Funcionalidades
En el sistema que elijas, utilizando arquitectura limpia, TDD, Typescript y todo lo que viste hasta ahora, implementá todas las funcionalidades necesarias para que el dominio funcione correctamente.  
Asegurate de incluir:

- **Registro y autenticación de usuarios, incluyendo politicas de acceso, roles y permisos** como prefieras plantearlos.

- **Gestión de los recursos** (libros, habitaciones, pedidos, productos).

- **Funcionalidades específicas del dominio** (préstamo de libros, reservas de hotel, seguimiento de pedidos, carrito de compras).

Primero plantea el modelo de dominio y las entidades necesarias.  
Luego lista las funcionalidades que vas a implementar y cómo se relacionan entre sí.  
Y luego implementá cada caso de uso siguiendo las prácticas de TDD.

Una vez consideres que todo el dominio está listo, implementa un backend simple que construya una API basado en la funcionalidad expuesta en el dominio.  
Usá algún framework de tu preferencia (Express, Fastify, NestJS, etc) y probalo usando algo como Postman o Insomnia.
