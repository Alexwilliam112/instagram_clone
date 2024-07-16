import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';

const AuthStack = createNativeStackNavigator();

export default AuthStacks = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="loginpage" component={LoginPage} />
            <AuthStack.Screen name="registerpage" component={RegisterPage} />
        </AuthStack.Navigator>
    );
}
