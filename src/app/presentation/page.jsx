import "../globals.scss";
import Image from "next/image";
export const metadata={
    title:{
        default:'Presentation',
    },
}
export default function PresentationPage()
{
    return(
        <>
          <div className="slide" id="presentation">
            <div className="wrapper">
                <div className="block-flex">
                    <div className="left">
                <h2 className="subtitle" id="subPresentation">Qui sommes-nous?</h2>
                        <div className="jumbotronPres">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi neque velit, sodales non dapibus sit amet, mollis id turpis. Donec a nisi vitae magna tincidunt pellentesque. Suspendisse eu ante sit amet nibh sagittis interdum quis sed ipsum. </p>
                        
                                <a href="#" className="link">Accédez aux livres</a>
                            
                        </div>
                    </div>
                    <div className="right">
                        <div className="boxPic">
                        <Image
                      src='/images/pile.png'
                      width={400}
                      height={350}
                      alt="Pile de livres"
              
                    />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}