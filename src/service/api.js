import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.200.106:3000/',
});

export default {
  getCategoriesList: async () => {
    let resposta;

    await api.get('categoria').then((response) => {
      resposta = response.data;
    });

    return resposta;

  },

  insertDish: async (nome, categoria_id) => {
    let resposta;

    await api.post('prato', {nome, categoria_id}, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },

  getCategoryDishes: async () => {
    let resposta;

    await api.get('categoriapratos').then((response) => {
      resposta = response.data;
    });

    return resposta;
  },

  insertCategory: async (nome) => {
    let resposta;

    await api.post('categoria', {nome}, {
      "headers": {
        'Content-Type':'application/json'
      }
    }).then(response => {
      resposta = response.data;
    }).catch(error => {
      resposta = error.response.data;
    });

    return resposta;
  },
}