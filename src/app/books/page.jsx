import Search from "../../../Components/Search";
import "../globals.scss";
import Image from "next/image";
export const metadata={
    title:{
        default:'Books',
    },
}
export default function BooksPage()
{
    return(
        <>
          <div className="slide" id="books">
            <div className="wrapper">
                <h2 className="subtitle" id="titlebooks">Tout nos livres</h2>  
                <Search />  
            </div>
          </div>
        </>
    )
}