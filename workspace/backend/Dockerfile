FROM node:25-slim AS deps
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci


FROM node:25-slim AS build
WORKDIR /app

COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN npm run build


FROM node:25-slim AS prod
RUN useradd -m -r nodeusr
WORKDIR /app

COPY --from=deps  /workspace/node_modules ./node_modules

COPY --from=build /workspace/dist          ./dist
COPY --from=build /workspace/package.json  ./

# si besoin d'uploads
#RUN mkdir -p /app/uploads && chown -R nodeusr:nodeusr /app/uploads

ENV NODE_ENV=production
EXPOSE 5000
USER nodeusr

CMD ["npm", "run", "start:prod"]