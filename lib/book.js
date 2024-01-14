import marked from "marked";
import qs from "qs";
import dotenv from "dotenv/config";
import fetch from "node-fetch";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

async function fetchBookById(bookId) {
  const url = `${GOOGLE_BOOKS_API_URL}/${bookId}?key=${API_KEY}&langRestrict=fr`;

  console.log("fetchBookById: ", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `L'API Google Books retourne ${response.status} pour ${url}`
      );
    }

    const data = await response.json();

    console.log("API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
}

export async function getBook(id) {
  const bookData = await fetchBookById(id);

  return {
    ...toBook(bookData),
  };
}

export async function searchBooks(query) {
  const { items } = await fetchBooks({
    q: query,
    fields: ["id", "title", "authors"],
  });

  return items.map((book) => ({
    id: book.id,
    title: book.volumeInfo.title,
    authors: book.volumeInfo.authors,
  }));
}

export async function getBooks(limit) {
  const { items } = await fetchBooks({
    q: "football+biography",
    fields: [
      "id",
      "title",
      "authors",
      "publishedDate",
      "description",
      "image",
      "body",
    ],
    sort: ["publishedDate:desc"],
    langRestrict: "fr",
    subject: "Biography & Autobiography / Sports",
    maxResults: limit,
  });

  return items.map(toBook);
}

async function fetchBooks(parameters) {
  const url = `https://www.googleapis.com/books/v1/volumes?${qs.stringify(
    parameters,
    {
      encodeValuesOnly: true,
    }
  )}&key=${API_KEY}`;

  console.log("fetchBooks: ", url);
  console.log("Query parameters:", parameters);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `L'API Google Books retourne ${response.status} pour ${url}`
      );
    }

    const data = await response.json();

    console.log("API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

function toBook(item) {
  const volumeInfo = item.volumeInfo || {};

  return {
    id: item.id,
    title: volumeInfo.title || "Titre non disponible",
    description: volumeInfo.description || "Description non disponible",
    authors: volumeInfo.authors
      ? volumeInfo.authors
      : ["Auteur non disponible"],
    categories: volumeInfo.categories
      ? volumeInfo.categories
      : ["Catégorie non disponible"],
    publisher: volumeInfo.publisher || "Éditeur non disponible",
    publishedDate: volumeInfo.publishedDate
      ? new Date(volumeInfo.publishedDate).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Date de publication non disponible",
    image: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : null,
  };
}
