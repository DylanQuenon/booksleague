
import Image from "next/image";
import "./globals.scss";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { getBooks } from "../../lib/book";
import Link from "next/link";



export default async function Home() {
  const books = await getBooks(3);

  return (
    <>
      <div className="slide" id="home">
        <div className="circle" id="circle_home"></div>
        <div className="wrapper">
          <div className="block-home">
            <div className="jumbotron">
              <h1>BOOKS LEAGUE</h1>
              <p>
                BooksLeague - Explorez l&apos;univers du football à travers les
                pages, vivez chaque but, chaque émotion, chaque histoire
                captivante
              </p>
              <div className="link_more">
                <a href="/presentation" className="button_anim">
                  Voir plus{" "}
                  <span>
                    <ArrowRightIcon className="icon" />
                  </span>
                </a>
              </div>
              <div className="circle" id="circle_bottom"></div>
            </div>

            <div className="block-right">
              <div className="pic_rectangle">
                <Image
                  src="/images/coverbook.jpg"
                  alt="Book"
                  width={300}
                  height={350}
                  className="picBook"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bandeau">
          <div className="block" id="block1">
            <p> + 150</p>
            <p> Livres</p>
          </div>
          <div className="block" id="block2">
            <p> + 50</p>
            <p> Biographies</p>
          </div>
          <div className="block" id="block3">
            <p> 100%</p>
            <p> Passion</p>
          </div>
        </div>
      </div>
      <div className="slide" id="mostRecent">
        <div className="wrapper">
          <h2 className="subtitle" id="recent">
            Les plus récents
          </h2>
          <div className="row">
            {books.map((book) => (
              <Link
                key={book.title}
                href={`/books/${book.id}`}
                className="bookview"
              >
                <div className="bookview">
                  <div className="picBookView">
                    <Image
                      src={book.image}
                      width={100}
                      height={150}
                      alt={book.title}
                    />
                  </div>
                  <h3>{book.title}</h3>
                  <p>By {book.authors}</p>
                  <p>{book.description.substring(0, 50)}...</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="link_books" id="viewBooks">
            <Link href="/books" className="buttonBooks">
              Voir les livres{" "}
              <span>
                <ArrowRightIcon className="icon" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
