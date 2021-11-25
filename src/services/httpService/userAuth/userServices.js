import http from '../http-common';
// import authHeader from '../../auth/authHeader';
class userService {
  //   getAll() {
  //     return http.get("/tutorials");
  //   }

  //   get(id) {
  //     return http.get(`/tutorials/${id}`);
  //   }

  commonPostService(route, data) {
    return http.post(route, data);
  }
  commonGetService(route, data) {
    return http.get(route, data);
  }

  //   update(id, data) {
  //     return http.put(`/tutorials/${id}`, data);
  //   }

  //   delete(id) {
  //     return http.delete(`/tutorials/${id}`);
  //   }

  //   deleteAll() {
  //     return http.delete(`/tutorials`);
  //   }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new userService();
