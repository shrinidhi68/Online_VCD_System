import axios from "axios";
const url = "http://localhost:8080/";
class AdminService {
  login(admin) {
    return axios.post(url + "adminLogin", admin);
  }
  logout() {
    return axios.get(url + "adminLogout");
  }
  addVcdStore(vcdStore) {
    return axios.post(url + "addStore", vcdStore);
  }
  displayVcdStore() {
    return axios.get(url + "getAllStore");
  }
  deleteVcdStore(id) {
    return axios.delete(url + "deleteStore/" + id);
  }
  addVcdDetails(vcdDetails) {
    return axios.post(url + "addVcd", vcdDetails);
  }
  displayVcd() {
    return axios.get(url + "getAllVcd");
  }
  deleteVcd(id) {
    return axios.delete(url + "deleteVcd/" + id);
  }
  getByIdStore(id) {
    return axios.get(url + "getStoreById/" + id);
  }
  modifyStore(store) {
    return axios.put(url + "modifyStore", store);
  }
  getByIdVcd(id) {
    return axios.get(url + "getVcdById/" + id);
  }
  modifyVcd(vcd) {
    return axios.put(url + "modifyVcd", vcd);
  }
}
export default new AdminService();
