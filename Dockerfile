# Etapa 1: Construcción
FROM node:22.20.0-alpine3.21 AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

RUN npm run build

# Etapa 2: Servir archivos estáticos con Nginx
FROM nginx:stable-alpine

# Elimina configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]