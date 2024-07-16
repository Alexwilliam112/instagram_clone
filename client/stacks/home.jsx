import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from '../pages/home/home';
import UserProfile from '../pages/explores/userProfile'
import PostViewPage from '../pages/explores/postView'

const HomeStack = createNativeStackNavigator();

export default HomeStacks = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="homepage" component={Homepage} />
            <HomeStack.Screen name="userProfile2" component={UserProfile} />
            <HomeStack.Screen name="postPage" component={PostViewPage} />
        </HomeStack.Navigator>
    );
}