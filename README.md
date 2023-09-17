# README

The purpose of this project is to create and achieve SMART goals
This project features a backend written with Ruby on Rails and frontend written with React.js.

## Getting started
- install backend dependencies
```bash
bundle install
```
- install frontend dependencies
```bash
cd client && npm install
```
- seed database
```bash
rails db:seed
```
- start up rails server (it is important to specify port as 3001 😉)
```bash
rails s -p 3001
```
- start up client
```bash
cd smart-goals-client && npm start
```
## Testing
To run a test suite run following in a root folder
```bash
rspec
```
