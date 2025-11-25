FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install --workspaces
RUN npm --workspace=@hotel-project/backend run prisma:generate
RUN npm --workspace=@hotel-project/backend run build

EXPOSE 3000

CMD ["npm", "--workspace=@hotel-project/backend", "run", "start"]
