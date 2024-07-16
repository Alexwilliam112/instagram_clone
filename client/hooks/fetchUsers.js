import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../queries/users";
import profilePictureSelector from "../utils/profilePictureSelector";

class ProfileState {
  constructor() {
    if (ProfileState.instance) {
      return ProfileState.instance;
    }

    ProfileState.instance = this;
    this.profilePictures = [];
    this.stop = false
  }

  setStop() {
    this.stop = true
  }

  setData(data) {
    if(this.stop) return;
    this.profilePictures = data;
    return;
  }

  getPicture(_id) {
    const users = this.profilePictures;
    const path = users.find((obj) => obj.id === _id);
    return path.picture;
  }
}

const ProfileStateInstance = new ProfileState();

const useFetchUserProfiles = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  const errFunc = () => {
    return "";
  };

  if (loading) return { loading, error, data: [], getPath: errFunc };
  if (error) return { loading, error, data: [], getPath: errFunc };

  if (data && data.GetAllUser && data.GetAllUser.data) {
    const userData = data.GetAllUser.data;
    const profilePictures = userData.map((user) => ({
      id: user._id,
      picture: profilePictureSelector(),
    }));

    ProfileStateInstance.setData(profilePictures);
    ProfileStateInstance.setStop()

    return {
      loading,
      error,
      data: profilePictures,
      getPath: ProfileStateInstance.getPicture.bind(ProfileStateInstance),
    };
  }

  return { loading, error, data: [], getPath: errFunc };
};

export default useFetchUserProfiles;
