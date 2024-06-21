// utils/drupal.js

export async function fetchDrupalArticles() {
  try {
    const response = await fetch('http://drupal-project/jsonapi/node/article', {
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    });

    console.log('Response:', response); // Log the response object

    if (!response.ok) {
      console.log('Failed to fetch articles:', response.statusText); // Log the status text
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    console.log('Data:', data); // Log the data
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error); // Log the error
    throw error;
  }
}
