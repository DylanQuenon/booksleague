import "dotenv/config";
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

async function fetchAndWriteGoogleBooksData() {
  try {
    const googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes';
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    const queryParams = {
      q: 'les coulisses du football', 
      maxResults: 20, 
      langRestrict: 'fr',
      orderBy: 'newest',
      subject: "Biography & Autobiography / Sports",
      key: apiKey,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = `${googleBooksUrl}?${queryString}`;

    const googleBooksResponse = await fetch(fullUrl);

    if (!googleBooksResponse.ok) {
      throw new Error(`Erreur de requête Google Books API: ${googleBooksResponse.status} - ${googleBooksResponse.statusText}`);
    }

    const googleBooksData = await googleBooksResponse.json();
    const formatted = JSON.stringify(googleBooksData, null, 2);
    const file = 'google-books-api-response.json';

    writeFileSync(file, formatted, 'utf8');
    console.log(`Données de Google Books API écrites avec succès dans ${file}`);
  } catch (error) {
    console.error(`Une erreur s'est produite: ${error.message}`);
  }
}

fetchAndWriteGoogleBooksData();
