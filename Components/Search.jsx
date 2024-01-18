"use client";
import{ useState, useEffect } from "react";
import { getBooks } from "../lib/book";
import Image from "next/image";
import styles from "./search.module.scss"


import Link from "next/link";


export default function Search() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const data = await getBooks(15);
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div className={styles.rowGroup}>
      <input
        type="text"
        placeholder="Rechercher des livres"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
     
      />
   

    </div>

      <div className="row">
      {filteredBooks.map((book) => (
        <Link key={book.title} href={`/books/${book.id}`} className="bookview">
            <div className="bookview">
            <div className="picBookView">
                {book.image && (
                <Image src={book.image} width={100} height={150} alt={book.title} />
                )}
            </div>
            <h3>{book.title}</h3>
            <p>By {book.authors}</p>
            <p> {book.listPriceAmount} {book.currencyCode}</p>
            <p>{book.description.substring(0, 50)}...</p>
            </div>
        </Link>
        ))}

      </div>
    </>
  );
}
