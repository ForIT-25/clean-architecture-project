FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos solo los package.json de cada workspace
COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/
COPY domain/package.json domain/

# Instalación con workspaces evitando conflictos de peer deps
RUN npm install --workspaces --legacy-peer-deps

# Copiamos el resto del proyecto
COPY . .

# Prisma debe ejecutarse ANTES de build
RUN npm --workspace=@hotel-project/backend run prisma:generate

# Build del backend
RUN npm --workspace=@hotel-project/backend run build

# --- Stage final ---
FROM node:20-alpine

WORKDIR /app

# Copiamos los node_modules del builder
COPY --from=builder /app/node_modules ./node_modules

# Copiamos backend y domain ya compilados
COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/domain ./domain

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/

COPY --from=builder /app/apps/backend/.next ./apps/backend/.next

EXPOSE 3000

CMD ["npm", "--workspace=@hotel-project/backend", "run", "start"]
