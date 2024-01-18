import { getBook } from "../../../../lib/book";
import Image from "next/image";

export default async function BookPage({ params: { id } }) {
  const book = await getBook(id);

  return (
    <>
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
                  <b>Auteur:</b> <i>{book.authors || "non disponible"}</i>
                </p>
                <p>
                  <b>Editions:</b> <i>{book.editions || "non disponible"}</i>
                </p>
                <p>
                  <b>Prix:</b>{" "}
                  <i>
                    {book.listPriceAmount || "non disponible"} {book.currencyCode || "non disponible"}
                  </i>
                </p>
                <p>
                  <b>Editions:</b> <i>{book.publisher || "non disponible"}</i>
                </p>
              </div>
            </div>
          </div>
          <b>Résumé:</b>{" "}
          <article
            dangerouslySetInnerHTML={{
              __html: book.description || "non disponible",
            }}
          />
        </div>
      </div>
    </>
  );
}