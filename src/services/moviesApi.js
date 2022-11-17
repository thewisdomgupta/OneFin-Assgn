import apiInstance from "./api";

const getMovies = async (param) => {
  try {
    const url = param ? `/maya/movies/?${param}`: "/maya/movies/";
    const response = await apiInstance.get(url);

    if (response.data.count) {
      return {
        success: true,
        data: response.data
      };
    } else {
      return {
        success: false,
        error: response?.data?.error?.message
      };
    }
  } catch (ex) {
    return {
      success: false,
      data: null
    };
  }
};

export default {
  getMovies
}
