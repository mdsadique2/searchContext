// 18f87581a0034825ad1a14c14842484b
// https://newsapi.org/v2/top-headlines?country=us&apiKey=18f87581a0034825ad1a14c14842484b

// f811bb4b3b8b46f3b47a2325270071c2

let urlb = 'https://gnews.io/api/v4/search?lang=en&max=15&apikey=f811bb4b3b8b46f3b47a2325270071c2';

export async function getHeadLines({ query, page = 1, controller }) {
  if (query === '') {
    return;
  }
  try {
    let url = `${urlb}&q=${query.trim()}&page=${page}`;
    const response = await fetch(url, {
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const users = await response.json();
    console.log('---users', users);
    return users
  } catch (error) {
    console.error('Error:', error);
  }
}
