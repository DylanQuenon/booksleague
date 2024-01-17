import {marked} from "marked";
import { getBook } from "../../../../lib/book";

export default async function BookPage({ params: { id } }) {
  const book = await getBook(id);

  return (
    <>
      <h1>{book.title}</h1>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{book.publishedDate}</p>
      </div>

      <div className="w-full">
        <p>{`Authors: ${book.authors.join(", ")}`}</p>
        <p>{`Publisher: ${book.publisher}`}</p>
      </div>

      <div className="w-full">
        <p className="font-semibold pb-3" dangerouslySetInnerHTML={{__html: book.body}}></p>
      </div>
    </>
  );
}
