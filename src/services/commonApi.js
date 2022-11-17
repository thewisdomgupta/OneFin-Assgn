import axios from "axios";

const getAvatar = async (movieName) => {
  try {
    const response = await axios.get(`https://ui-avatars.com/${movieName}`);
    return response;
  } catch (ex) {
    return ex;
  }
};

export default getAvatar;
