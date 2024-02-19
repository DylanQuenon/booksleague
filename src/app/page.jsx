
import Image from "next/image";
import "./globals.scss";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { getBooks } from "@/lib/book";
import Link from "next/link";
import Book from "@/Components/Book";
import Template from "./Template";
import Button from "@/Components/Button";



export default async function Home() {
  const books = await getBooks(3); // on en récupère que 3

  return (
    <Template>
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
                <Link href="/presentation" className="button_anim">
                  Voir plus{" "}
                  <span>
                    <ArrowRightIcon className="icon" />
                  </span>
                </Link>
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
            Les plus populaires
          </h2>
          <div className="row">
            {books.map((book) => (
             <Book key={book.id} book={book} />
            ))}
          </div>
          <div className="link_books" id="viewBooks">
           <Button/>
          </div>
        </div>
      </div>
    </Template>
  );
}
