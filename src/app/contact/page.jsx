import "../globals.scss";
import Image from "next/image";
export const metadata={
    title:{
        default:'Contact',
    },
}
export default function ContactPage()
{
    return(
        <>
          <div className="slide" id="contact">
            <div className="wrapper">
                <h2 className="subtitle">Contact</h2>    

            </div>
          </div>
        </>
    )
}