import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos';

const TodoService = {
  async getAll() {
    // /?_start=0&_limit=5 - стартовое значение 0, лимит данных 5 шт
    return await axios.get(`${url}/?_start=0&_limit=205`);
  },

  async getById(id) {
    return await axios.get(`${url}/${id}`);
  },

  async create(title) {
    return await axios.post(url, {
      title,
      userId: 1,
      completed: false,
    });
  },
};

export default TodoService;
