import axios from "axios";
const url = "http://localhost:8080/";

class UserService {
  saveUser(user) {
    return axios.post(url + "userRegister", user);
  }
  login(user) {
    return axios.post(url + "userLogin", user);
  }
  logout() {
    return axios.get(url + "userLogout");
  }
  searchVcdStore(place) {
    return axios.get(url + "getStoreByPlace/" + place);
  }
  searchVcdByName(name) {
    return axios.get(url + "getAllVcdByName/" + name);
  }
  searchVcdByCatgory(name) {
    return axios.get(url + "getAllVcdByCatgory/" + name);
  }
  searchVcdByLanguage(name) {
    return axios.get(url + "getAllVcdByLanguage/" + name);
  }
  searchVcdByRating(name) {
    return axios.get(url + "getAllVcdByRating/" + name);
  }
  addToCart(cart) {
    return axios.post(url + "addVcdToCart", cart);
  }
  getCartDetailsByUser(user) {
    return axios.post(url + "getCartDetailsByUser", user);
  }
  deleteFromCart(id) {
    return axios.delete(url + "deleteVcdFromCart/" + id);
  }
  getCartById(id) {
    return axios.get(url + "getByCartId/" + id);
  }
  modifyCart(cart) {
    return axios.put(url + "modifyVcdInCart", cart);
  }
  getCart(user) {
    return axios.post(url + "book", user);
  }
  orderBooking(order) {
    return axios.post(url + "orderBooking", order);
  }
  getOrderHistoryByUser(user) {
    return axios.post(url + "getPymentDetails", user);
  }
}
export default new UserService();
