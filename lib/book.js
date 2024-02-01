import {marked} from "marked";
import qs from "qs";


const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyAOrXNWOcB5bNoZTgrlMiZR9lBl6OOJQ4Y"

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
  fields: ["id", "title", "authors", "publishedDate", "description", "image","publisher","pagesCount","isbn"]




  return {
    ...toBook(bookData),
    description: bookData.volumeInfo.description
      ? marked(bookData.volumeInfo.description)
      : "Description non disponible",

  };
}

export async function getBooks(limit) {
  const { items } = await fetchBooks({
    q: "football biographie",
    langRestrict: "fr",
    fields: ["id", "title", "authors", "publishedDate", "description", "image"],
    subject: "Biography & Autobiography / Sports",
    maxResults: limit,
  });

  return items.map(toBook);
}
export async function searchBooks(query) {
  const { items } = await fetchBooks({
    q: query,
    fields: ["id", "title", "authors"],
    langRestrict: "fr",
    key: API_KEY,
  });

  return items;
}

async function fetchBooks(parameters) {
  const url = `${GOOGLE_BOOKS_API_URL}?${qs.stringify(parameters, {

    encodeValuesOnly: true,
  })}`;


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
  const saleInfo = item.saleInfo || {};

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
    image: volumeInfo.imageLinks
      ? volumeInfo.imageLinks.large
        ? volumeInfo.imageLinks.large
        : volumeInfo.imageLinks.smallThumbnail
      : null,


listPriceAmount : saleInfo && saleInfo.listPrice ? saleInfo.listPrice.amount : "non disponible",
currencyCode : saleInfo && saleInfo.listPrice ? saleInfo.listPrice.currencyCode : " non disponible",
pageCount : volumeInfo.pageCount ||"non disponible",
isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : "non disponible",


  }}