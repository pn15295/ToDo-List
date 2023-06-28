export default function ({ $axios, $config, store }, inject) {
  // The API instance to access thee new endpoints
  const todo = $axios.create({
    baseURL: `http://localhost:3000`,
  });

  inject("todo", todo);
}
