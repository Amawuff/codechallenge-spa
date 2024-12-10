# Code Challenge -SPA

## Requirement Summary
   Create an SPA using React, Vue.js, Angular, or Svelte for updating a user’s profile. All
data should be stored and loaded from local storage. There are no API endpoints to
retrieve data.
### notable requirements
- login should time out after 60 seconds
- no security concerns (THIS IS NOT SECURE!)
- form validation
- phone number display and storage format

## What was used?
- Typescript: Good typing mitigates unexpected data issues!
- Vite: It's faster then create-react-app and starts you off with less things you don't need
- React: It's got context and state and is a popular framework!
- Material UI (MUI): To make things pretty quickly
  - mui-tel-input: So I don't have to validate phone numbers
- React-Router: To handle routing in the SPA
- React-Hook-Form: handles things like field validation and state management for forms very well
- UUID: to generate unique IDs for the profile data 

## Starting the app locally
- Install dependencies: `npm install`
- Start the app: `npm run dev`

This will start the server at `localhost:3000`.  You can now visit the site there. 
