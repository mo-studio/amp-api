FROM node:12-alpine as base
RUN apk add zsh vim

WORKDIR /app
COPY package.json package-lock.json ./
COPY . .

EXPOSE 3000
# ENTRYPOINT [ "./entry-point.sh" ]
ENTRYPOINT ["npm", "run", "dev"]