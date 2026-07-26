FROM node:20-alpine

LABEL org.opencontainers.image.title="Nocthera"
LABEL org.opencontainers.image.description="Nocthera — Modular Discord Bot Framework"
LABEL org.opencontainers.image.authors="JD Gabriel"
LABEL org.opencontainers.image.version="1.0.0"

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "start"]
