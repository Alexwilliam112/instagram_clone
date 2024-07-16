import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  video: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  infoContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    paddingBottom: 30,
    width: '100%',
    backgroundColor: 'transparent',
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  userName: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  followButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'white'
  },

  followButtonText: {
    color: '#ffffff',
    fontSize: 13
  },

  caption: {
    color: '#ffffff',
    marginTop: 10,
  },

  interactionContainer: {
    position: 'absolute',
    right: 15,
    bottom: 100,
    alignItems: 'center',
  },

  interactionButton: {
    alignItems: 'center',
    marginVertical: 10,
  },

  interactionText: {
    color: '#ffffff',
  },

  icon: {
    color: '#ffffff',
  },
});
