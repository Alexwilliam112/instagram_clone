import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    logo: {
        width: 100,
        height: 100,
        marginBottom: 40,
    },
    
    input: {
        width: '100%',
        height: 50,
        borderColor: '#444',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#1c1c1c',
        color: '#fff',
    },
    
    button: {
        backgroundColor: '#3797ef',
        width: '100%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    forgotPassword: {
        color: '#3797ef',
        marginBottom: 20,
    },
    
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
    
    orText: {
        marginHorizontal: 10,
        color: '#888',
    },
    
    facebookButton: {
        marginBottom: 20,
    },
    
    facebookButtonText: {
        color: '#3797ef',
        fontSize: 16,
    },
    
    signupContainer: {
        flexDirection: 'row',
    },
    
    signupText: {
        color: '#888',
    },
    
    signupLink: {
        color: '#3797ef',
        marginLeft: 5,
    },
    
    loginContainer: {
        flexDirection: 'column',
        alignItems: 'item',
        justifyContent: 'center',
        gap: 10,
        width: '100%'
    },
    
    button2: {
        backgroundColor: 'transparent',
        borderColor: '#3797ef',
        borderWidth: 1,
        width: '100%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 3,
        marginBottom: 20,
    },
    
    haveAccountContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 15,
    },

    blockx: {
        height: 20
    },

    iconImage: {
        width: 33,
        height: 33
    }
});
