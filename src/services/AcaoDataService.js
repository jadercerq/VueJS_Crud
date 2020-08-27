import http from "../http-common";

class AcaoDataService {
  getAll() {
    return http.get("/acoes");
  }

  get(id) {
    return http.get(`/acoes/${id}`);
  }

  create(data) {
    return http.post("/acoes", data);
  }

  update(id, data) {
    return http.put(`/acoes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/acoes/${id}`);
  }

  deleteAll() {
    return http.delete(`/acoes`);
  }

  findByTitle(ticker) {
    return http.get(`/acoes?ticker=${ticker}`);
  }
}

export default new AcaoDataService();
