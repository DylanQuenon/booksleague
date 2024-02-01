import Template from "@/app/Template";
import { getBook } from "../../../../lib/book";
import Image from "next/image";


export async function generateMetadata(props) {
  const book = await getBook(props.params.id);
  return {
    title: book.title,
  };
}
export default async function BookPage({ params: { id } }) {
  const book = await getBook(id);

  return (
    <Template>
      <div className="slide" id="bookpres">
        <div className="wrapper">
          <h2 className="subtitle">{book.title}</h2>
          <div className="block-book">
            <div className="left">
              {book.image ? (
                <Image
                  src={book.image}
                  width={205}
                  height={300}
                  alt={book.title}
                  className="bookPic"
                />
              ) : (
                <p>Image non disponible</p>
              )}
            </div>
            <div className="right">
              <div className="block-pres">
                <p>
                  <b>Auteur:</b> <i>{book.authors.join(" ") }</i>
                </p>
                <p>
                  <b>ISBN:</b> <i>{book.isbn }</i>
                </p>
                <p>
                  <b>Prix:</b>{" "}
                  <i>
                    {book.listPriceAmount } {" "}
                    { book.currencyCode }
                  </i>
                </p>
                <p>
                  <b>Editions:</b> <i>{book.publisher}</i>
                </p>
                <p>
                  <b>Date de publication:</b>{" "}
                  <i>{book.publishedDate }</i>
                </p>
                <p>
                  <b>Nombre de pages:</b>{" "}
                  <i>{book.pageCount }</i>
                </p>
              </div>
            </div>
          </div>
          <b>Résumé:</b>{" "}
          <article
            dangerouslySetInnerHTML={{
              __html: book.description,
            }}
          />
        </div>
      </div>
    </Template>
  );
}
