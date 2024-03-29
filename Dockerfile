FROM node:17

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install
RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]