FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm install npm
EXPOSE 3000
CMD ["npm", "run", "dev"]
