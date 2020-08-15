FROM node:lts-alpine

# install project dependencies
RUN yarn install

# build app for production with minification
CMD ["yarn" "serve"]
