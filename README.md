# SKAM notifier

This service will query [skam.p3.no](skam.p3.no) every minute, and broadcast 
a message with `title`, `link` and `date` to every websocket listener when a new
post arrives. 

A simple Chrome extension can be found in `/chrome-extension`. 

## Setup
Clone the repo, run `npm install` and `node index.js`.


## Todo 

- Do not use `date` as a global variable in case the server goes down. 
