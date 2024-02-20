import Link from "next/link";
import Image from "next/image";
// composant livres pour pas se répéter

export default function Book({ book }) {
  return (
    <Link href={`/books/${book.id}`} className="bookview">
      <div className="bookview">
        <div className="picBookView">
          {book.image && ( //vérifie l'existence de l'image
            <Image src={book.image} width={100} height={150} alt={book.title} />
          )}
        </div>
        <h3>{book.title}</h3>
        <p>By {book.authors.join(" ")}</p>

        <p>{book.description.substring(0, 50)}...</p>
      </div>
    </Link>
  );
}
