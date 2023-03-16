# Project Overview
This app is a stock app that allows users to add a particular stock to their watchlist or portfolio, so that they can track it's performance overtime and see what their returns would be. I was responsible for building the front-end using React with typescript and the back-end using Node.js and Express. I also integrated the website with a payment gateway (pay-pal) and implemented user authentication and authorization using JSON Web Tokens.
This is a work in progress, for I am always adding in new features and updating the app.
Open [this link](https://wallstreetfinds.netlify.app/) to view the live project.

## The techonologies used are:

*   Yarn
*   React
*   Typescript
*   Redux toolkit
*   Material UI icons
*   react-router-dom v6
*   Google OAuth
*   React query

## Installation Instructions

To install this app, follow these steps:

- Clone this repository to your local machine
- Navigate to the root directory of the project using cd your-repo
- Install the required dependencies by running `yarn || yarn install`
- Once the dependencies are installed, you need to setup the development environment to run on `https` and not `http`. You can follow this guide on how to do so, this is so that we can use secure cookies across the browser from our backend  - [how to setup https in dev env](https://web.dev/how-to-use-local-https/).
- Once the dependencies are installed and https is setup , start the app by running `yarn start`
- The above command runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.
- You also need to clone the backend repo, install the dependecies and start the dev server, for the fronted to work as expected.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

