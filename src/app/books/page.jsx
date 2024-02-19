'use client'
import { useState, useEffect } from "react";
import { getBooks } from "@/lib/book";
import Book from "@/Components/Book";
import Pagination from "@/Components/Pagination";
import Template from "../Template";
import BookLoader from "@/Components/loaders/BookLoader";

export default function BooksPage() {
  const [search, setSearch] = useState(""); // les states 
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [key, setKey] = useState(Date.now()); // on attribue une key unique pour le template sur base de la date exacte
  const [sortBy, setSortBy] = useState(() => {
    if (typeof window !== 'undefined') { // test pour éviter une erreur au lancement a cause du localstorage
      return localStorage.getItem('sortBy') || 'title-asc'; // soit on récupère ce qu'il y'a dans le localstorage pour le tri ou on met le titre a à z par défaut
    } else {
      return 'title-asc'; // Valeur par défaut si localStorage n'est pas disponible
    }
  });

  const fetchBooks = async () => {
    const data = await getBooks(27);
    setBooks(data); //on charge les livres
  };

  useEffect(() => {
    fetchBooks(); // on appelle la fonction dans le useeffect
  }, []);

  const filteredBooks = books.filter( //on filtre les livres sur base de leur auteurs ou le titre pour la recherche
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.authors.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const sortBooks = (books, sortBy) => { // on trie les livres pour les filtres avec une switch case
    switch (sortBy) {
      case "title-asc":
        return books.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return books.sort((a, b) => b.title.localeCompare(a.title));
      case "author-asc":
        return books.sort((a, b) => a.authors[0].localeCompare(b.authors[0]));
      case "author-desc":
        return books.sort((a, b) => b.authors[0].localeCompare(a.authors[0]));


      default:
        return books;
    }
  };

  const sortedBooks = sortBooks(filteredBooks, sortBy);

  const handlePageChange = (page) => {
    setCurrentPage(page); // on change la page et la key  pour l'animation 
    setKey(Date.now());
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem("sortBy", value); // Enregistrer le choix du filtre dans le local storage
    }
  };

  const itemsPerPage = 9;
  const paginatedBooks = Pagination.getData(
    sortedBooks,// récupère les données de la pagination
    currentPage,
    itemsPerPage
  );

  return (
    <Template key={key}>
      <div className="slide" id="books">
        <div className="wrapper">
          <h2 className="subtitle" id="titlebooks">
            Tous nos livres
          </h2>

          <div className="rowGroup">
            <input
              type="text"
              placeholder="Rechercher des livres"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search"
            />
          </div>

          <div className="rowGroup">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="sort"
            >
              <option disabled>
                Trier par...
              </option>

              <option value="title-asc">Titre (A-Z)</option>
              <option value="title-desc">Titre (Z-A)</option>
              <option value="author-asc">Auteur (A-Z)</option>
              <option value="author-desc">Auteur (Z-A)</option>

            </select>
          </div>

          {books.length === 0 && (
            <BookLoader /> // on appelle le loader si c'est = a 0
          )}
          {/* si on trouve rien on affiche aucun résultat */}

          {paginatedBooks.length === 0 && <p>Aucun résultat</p>}

          <div className="row">
            {paginatedBooks.map((book) => (
              <Book key={book.id} book={book} /> // on appelle le composant livre et attribue le livre correspondant
            ))}
          </div>
        </div>
      </div>
      {itemsPerPage < sortedBooks.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={sortedBooks.length}
          onPageChanged={handlePageChange}
        />
      )}
    </Template>
    //template qui utilise l'animation
  );
}
