FROM node:15
WORKDIR /app
COPY package.json .
ARG APP_ENV
RUN if [ "$APP_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi
COPY . .
EXPOSE 9000
CMD ["npm", "start"]