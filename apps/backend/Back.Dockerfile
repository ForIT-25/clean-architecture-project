FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/
COPY domain/package.json domain/

RUN npm install --workspaces --legacy-peer-deps

COPY . .

RUN npm --workspace=@hotel-project/backend run prisma:generate

RUN npm --workspace=@hotel-project/backend run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/backend ./apps/backend
COPY --from=builder /app/domain ./domain

COPY package.json package-lock.json ./
COPY apps/backend/package.json apps/backend/

COPY --from=builder /app/apps/backend/.next ./apps/backend/.next

EXPOSE 3000

CMD ["npm", "--workspace=@hotel-project/backend", "run", "start"]
