"use client"
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
  const [key, setKey] = useState(Date.now()); // Ajout de la clé unique

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setKey(Date.now()); // Réinitialisation de la clé unique
  };

  const itemsPerPage = 9;
  const paginatedBooks = Pagination.getData(
    filteredBooks,
    currentPage,
    itemsPerPage
  );

  return (
    <Template key={key}>
      {" "}
      {/* Utilisation de la clé unique ici */}
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
      {itemsPerPage < filteredBooks.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={books.length}
          onPageChanged={handlePageChange}
        />
      )}
    </Template>
  );
}
