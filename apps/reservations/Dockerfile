# Template to build app and how to create a container\

# Extend pre-existing image
FROM node:alpine AS development

# SET WORKING DIRECTORY FOR CONTAINER
WORKDIR /usr/src/app

# COPY package.json TO WORKING DICRECTORY AND COPY yarn.lock
COPY package.json ./
COPY yarn.lock ./

RUN npm install yarn
RUN yarn install

# COPY OVER WHOLE APP INTO THE ROOT OF DOCKER CONTAINER
COPY . .

RUN yarn build


FROM node:alpine AS production

# SPECIFY ENV
ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV} 

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install yarn
RUN yarn install --production

#
COPY --from=development /usr/src/app/dist ./dist

CMD ["node",  "dist/apps/reservations/main"]

