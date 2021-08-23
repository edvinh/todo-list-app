FROM node:latest
ENV NODE_ENV=production
WORKDIR /usr/src/client
COPY ["package.json", "./"]
RUN npm install --silent
RUN npm install serve
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]