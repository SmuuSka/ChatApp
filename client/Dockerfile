# Käytetään alustana Noden lts-alpine3.17
FROM node:lts-alpine3.17 as builder
# Asetetaan työkansioksi /app
WORKDIR /app
# Asetetaan muuttujien polku
ENV PATH /app/node_modules/.bin:$PATH
# Kopioidaan package.json ja package-lock.json juurikansioon
COPY package.json ./
COPY package-lock.json ./
# Asennetaan sovellus
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
# Kopioidaan kaikki projektista sovelluksen juurikansioon
COPY . ./
# Käynnistetään sovellus
CMD ["npm", "run", "start"]