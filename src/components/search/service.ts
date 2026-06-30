// 18f87581a0034825ad1a14c14842484b
// https://newsapi.org/v2/top-headlines?country=us&apiKey=18f87581a0034825ad1a14c14842484b

// f811bb4b3b8b46f3b47a2325270071c2

let urlb =
  'https://gnews.io/api/v4/search?lang=en&max=15&apikey=f811bb4b3b8b46f3b47a2325270071c2';

export async function getHeadLines({ query, page = 1 }) {
  if (query === '') {
    return;
  }
  try {
    let url = `${urlb}&q=${query}&page=${page}`;
    console.log(url, '----------');
    const response = await fetch(url);

    console.log(url, '----------', response);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error('Error:', error);
  }
}
