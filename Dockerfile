# base image: a small Linux with Node.js 20 already installed
FROM node:20-alpine

# create a non-root user/group to run the app as
# (running as root inside a container is a security risk)
RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

# copy only the dependency manifests first so Docker can cache
# the "npm install" layer and skip it when only source files change
COPY package*.json ./

# WORKDIR was created while we were "app", but on some systems it
# ends up owned by root - fix ownership before installing
USER root
RUN chown -R app:app .
USER app

RUN npm install

# copy the rest of the project (this gets overridden at runtime
# by the bind mount in compose.yaml, but is needed for `docker build`
# to work standalone too)
COPY . .

# document which port the dev server listens on
EXPOSE 5173

CMD ["npm", "run", "dev"]
