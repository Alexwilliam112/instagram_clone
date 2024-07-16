import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./contexts/authContext";
import MainNavigation from "./stacks/index";

export default function App() {
  return (
    <ApolloProvider client={client}>
        <AuthProvider>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </AuthProvider>
    </ApolloProvider>
  );
}
