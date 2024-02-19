import { marked } from "marked";
import qs from "qs";


const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyAOrXNWOcB5bNoZTgrlMiZR9lBl6OOJQ4Y"

// charge l'id d'un livre
async function fetchBookById(bookId) {
  const url = `${GOOGLE_BOOKS_API_URL}/${bookId}?key=${API_KEY}&langRestrict=fr`; //modifie l'url

  console.log("fetchBookById: ", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error( //gérer les erreurs dans l'appel d'api
        `L'API Google Books retourne ${response.status} pour ${url}`
      );
    }

    const data = await response.json(); //si tout se passe bien on return le data

    console.log("API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
}
//récupère le livre grâce à la fonction fetchBookByID
export async function getBook(id) {
  const bookData = await fetchBookById(id);
  fields: ["id", "title", "authors", "publishedDate", "description", "image", "publisher", "pagesCount", "isbn"] //LES CHAMPS QU'ON RECUPERE




  return {
    ...toBook(bookData), //on clone le toBook et on le remplit avec les données
    description: bookData.volumeInfo.description // on teste pour la description si il y'a en a une pour éviter les erreurs 
      ? marked(bookData.volumeInfo.description)
      : "Description non disponible",

  };
}
// récupère les livres avec en parametre une possible limit, les paramètres sont relatif avec l'api google books
export async function getBooks(limit) {
  const { items } = await fetchBooks({
    q: "football biographie", // la recherche pour charger les livres
    langRestrict: "fr",// la langue
    fields: ["id", "title", "authors", "publishedDate", "description", "image"], //les champs
    subject: "Biography & Autobiography / Sports", //le sujet
    maxResults: limit, // la limite 
  });

  return items.map(toBook);
}
// pour rechercher un livre autre possibilité
// export async function searchBooks(query) {
//   const { items } = await fetchBooks({ 
//     q: query, // sa recherche
//     fields: ["id", "title", "authors"], // ses champs
//     langRestrict: "fr",
//     key: API_KEY,
//   });

//   return items;
// }

//charger les livres avec les parametres
async function fetchBooks(parameters) {
  const url = `${GOOGLE_BOOKS_API_URL}?${qs.stringify(parameters, {

    encodeValuesOnly: true,
  })}`;


  console.log("fetchBooks: ", url);
  console.log("Query parameters:", parameters);
  //test pour récupérer les données
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

//récupère les infos de l'api 
function toBook(item) {
  const volumeInfo = item.volumeInfo || {};
  const saleInfo = item.saleInfo || {};

  return {
    // on récupère les champs et si ils sont pas disponible on remplace 
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
      ? new Date(volumeInfo.publishedDate).toLocaleDateString("fr-FR", { //reformatage de la date
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      : "Date de publication non disponible",
    image: volumeInfo.imageLinks // récupère l'image la plus grande possible
      ? volumeInfo.imageLinks.large
        ? volumeInfo.imageLinks.large
        : volumeInfo.imageLinks.smallThumbnail
      : null,


    listPriceAmount: saleInfo && saleInfo.listPrice ? saleInfo.listPrice.amount : "non disponible",
    currencyCode: saleInfo && saleInfo.listPrice ? saleInfo.listPrice.currencyCode : " non disponible",
    pageCount: volumeInfo.pageCount || "non disponible",
    isbn: volumeInfo.industryIdentifiers ? volumeInfo.industryIdentifiers[0].identifier : "non disponible",


  }
}