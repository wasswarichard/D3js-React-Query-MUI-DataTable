# poc-be-rwasswa

[Live Demo](https://61ceaa2cc5975e6b3e717f8e--infallible-kare-2876f2.netlify.app/ 'D3js')

## Libraries/Frameworks used

-  **Frontend** : React, TypeScript, [React Query Client](https://react-query.tanstack.com/), Material UI, [D3js](https://d3js.org/), Jest, React Testing Library.

## Design decisions

### Frontend

-  **Code Organisation** : The `shared` directory contains all the reusable artifacts. The `pages` directory contain the navigable pages in the UI.
-  **Caching & Performance** : React query client caches the queries in-memory. This provides nice performance boost to the application.
-  **Testing** : The usecases are covered with integration testing using React testing library. The shared components have unit tests using Jest.
-  **Component library** : Components and Grid system of [material-ui](https://material-ui.com/) is used.
-  **Component styling** : CSS-in-JS solution of material-ui is used.
-  **Linting & Formatting** : Prettier for code formatting. husky and lint-staged are used as auxiliary library.
-  **Deployment** : Since the Frontend is a static webapp, it can be hosted in AWS S3 and served via a CDN like AWS CloudFront.
-  **Logging & Monitoring** : A service like [Sentry](https://sentry.io/for/react/) can be used to monitor performance and errors.

## Further improvements

-  The application can be built as a real-time dashboard. For this a push-based approach using GraphQL Subscriptions or WebSockets can be used. For a pull-based approach, WebWorker can be used. API clients like Apollo Client and React Query have out-of-the-box support for polling at regular intervals in the background.
-  Additional functionalities like the following can be implemented:
   -  Filtering and sorting support can be added to the API and the DataTable
   -  Switching to dark mode can be added. The useTheme() custom hook used in the code can be extended to implement this feature.
-  E2E test cases can be added using Cypress or TestCafe

## To run locally

4. Inside the directory, run `npm install` to install the frontend dependencies.
5. Create a `.env` file under directory and set the following environment variables:

```
REACT_APP_ENDPOINT='https://mighty-oasis-32829.herokuapp.com/api/'
```

6. Start the frontend dev server using `npm start`.

## Test cases snapshot

Frontend:

![Snapshot of frontend cases](/docs/testcases.PNG)

Thanks for your time :)
