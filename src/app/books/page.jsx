'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { getBooks } from "../../../lib/book";
import Book from "../../../Components/Book";
import Pagination from "../../../Components/Pagination";
import Template from "../Template";

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [key, setKey] = useState(Date.now());
  const [sortBy, setSortBy] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sortBy') || 'title-asc';
    } else {
      return 'title-asc'; // Valeur par défaut si localStorage n'est pas disponible
    }
  });

  const fetchBooks = async () => {
    const data = await getBooks(27);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.authors.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const sortBooks = (books, sortBy) => {
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
    setCurrentPage(page);
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
    sortedBooks,
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
              <option  disabled>
                Trier par...
              </option>

              <option value="title-asc">Titre (A-Z)</option>
              <option value="title-desc">Titre (Z-A)</option>
              <option value="author-asc">Auteur (A-Z)</option>
              <option value="author-desc">Auteur (Z-A)</option>

            </select>
          </div>

          {books.length === 0 && (
            <Image
              width="300"
              height="300"
              src="/images/loading-gif.gif"
              alt="Gif Chargement"
            />
          )}

          {paginatedBooks.length === 0 && <p>Aucun résultat</p>}

          <div className="row">
            {paginatedBooks.map((book) => (
              <Book key={book.id} book={book} />
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
  );
}
