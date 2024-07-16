import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExplorePage from '../pages/explores/explore';
import searchResult from '../pages/explores/searchResult';
import UserProfile from '../pages/explores/userProfile'
import PostViewPage from '../pages/explores/postView'

const Stack = createNativeStackNavigator();

export default ExploreStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="exploreScreen" component={ExplorePage} />
            <Stack.Screen name="searchResult" component={searchResult} />
            <Stack.Screen name="userProfile" component={UserProfile} />
            <Stack.Screen name="postPage" component={PostViewPage} />
        </Stack.Navigator>
    );
}