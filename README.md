# apollo-link-response-queue

An Apollo link that queues up responses based on the query type and resolves the final response.

### Motivation

In certain situtations several different mutations can be made that update the same entity in rapid succesion. In this case, resolving only the latest response will help in reducing unwanted UI updates and ensure that only the most up-to-date data is stored in cache.

### Installation

```
yarn add apollo-link-response-queue
```

### Usage

```js
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import ResponseQueueLink from 'apollo-link-response-queue';

const responseQueueLink = new ResponseQueueLink();

const link = ApolloLink.from([
  responseQueueLink,
  new HttpLink({ uri: GRAPHQL_SERVER_URI }),
]);
```

```js
// Pass through { queueResponse: true } to the mutation context
const Todos = () => (
  <Mutation mutation={UPDATE_TODOS} context={{ queueResponse: true }}>
    {/* Component */}
  </Mutation>
);

```