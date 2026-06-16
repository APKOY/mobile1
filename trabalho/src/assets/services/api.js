const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error('Erro ao buscar posts.');
  }

  return response.json();
}

export async function getPostById(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error('Erro ao buscar detalhes do post.');
  }

  return response.json();
}