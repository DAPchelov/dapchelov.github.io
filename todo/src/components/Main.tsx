import { App } from "./App";
import LoginPage from "./loginPage/LoginPage";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useState } from "react";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    split,
    HttpLink
} from "@apollo/client";


const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql"
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: "ws://localhost:4000/graphql"
    })
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});


const Main: React.FC = () => {
    const [UUID, setUUID] = useState<string>();

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App UUID = {UUID}/>} />
                    <Route path="/login" element={<LoginPage setUUID={setUUID} />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export { Main };