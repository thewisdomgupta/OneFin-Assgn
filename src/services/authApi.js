import apiInstance from "./api";
import { StorageUtil } from "../util/commonUtil";

const login = async ({ username, password }) => {
  try {
    const response = await apiInstance.post("usermodule/login/  ", {
      username,
      password
    });

    if (response.data.is_success) {
      StorageUtil.setItem("auth_token", response.data.token);
      return { success: true };
    } else {
      return {
        success: false,
        error: response?.error?.message
      };
    }
  } catch (ex) {
    return ex;
  }
};
export default {
  login
};
