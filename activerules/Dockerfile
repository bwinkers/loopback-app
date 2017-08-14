FROM nodesource/node:6

RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64.deb
RUN dpkg -i dumb-init_*.deb

RUN groupadd -r nodejs \
   && useradd -m -r -g nodejs nodejs

USER nodejs

RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app

COPY package.json .
RUN npm install --production
COPY . .

CMD ["dumb-init", "node", "index.js"]