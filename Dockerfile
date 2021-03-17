FROM node:14-stretch

# Set up repo for MongoDB client
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Install required dependencies
RUN apt-get update && apt-get install -yq \
    default-jdk \
    dos2unix \
    git-core \
    gnupg \
    libgconf2-4 \
    libncurses5 \
    libxml2-dev \
    libxslt-dev \
    libz-dev \
    mongodb-org-shell \
    mongodb-org-tools \
    python-pytest \
    unzip \
    xclip \
    xsel \
    xvfb

# Update NPM to latest version
RUN npm i npm@latest

# Install Heroku CLI
RUN npm install -g heroku

# Install Gulp Build Tool
RUN npm install -g gulp

COPY scripts/wait.sh /app/wait.sh
RUN dos2unix /app/wait.sh && chmod a+x /app/wait.sh

ENTRYPOINT ["/app/wait.sh"]
