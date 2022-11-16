import axios from "axios";
import config from "../utils/config";

const BASE_URL = config.baseURLAdmin.toString();

class AdminService {

  adminLogin = async (formData) => {
    const data = {
      username: formData.username,
    };
    try {
      const res = await axios.post(`${BASE_URL}/login`, data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

}

export default new AdminService();
