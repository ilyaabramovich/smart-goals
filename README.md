# README

The purpose of this project is to create and achieve SMART goals
This project features a backend written with Ruby on Rails and frontend written with React.js.

## Getting started
Install backend dependencies:
```bash
bundle install
```
Install frontend dependencies:
```bash
cd client && npm install
```
Seed database:
```bash
rails db:seed
```
Start up a rails server (NOTE: it is important to specify port as 3001 😉):
```bash
rails s -p 3001
```
Start up client:
```bash
cd client && npm run dev
```
## Testing
To run a backend test suite run following in a root folder:
```bash
rspec
```
