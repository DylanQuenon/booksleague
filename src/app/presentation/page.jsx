
import "../globals.scss";
import Image from "next/image";
import Template from "../Template";
import Button from "@/Components/Button";
export const metadata = {
    title: {
        default: 'Presentation',
    },
}
export default function PresentationPage() {
    return (
        //template qui utilise l'animation
        <Template>
            <div className="slide" id="presentation">
                <div className="wrapper">
                    <div className="block-flex">
                        <div className="left">
                            <h2 className="subtitle" id="subPresentation">Qui sommes-nous?</h2>
                            <div className="jumbotronPres">
                                <p>Explorez l&apos;univers captivant du football avec BooksLeague. Plongez dans des histoires riches en émotions, des récits mémorables et des coulisses passionnantes du sport que vous aimez. Laissez-vous emporter par notre collection soigneusement sélectionnée qui célèbre la beauté du jeu à travers chaque page. </p>
                                <p>Chez BooksLeague, chaque livre est une invitation à vivre intensément le football sous de nouvelles perspectives. Que vous soyez un passionné du sport ou un lecteur avide en quête de découvertes, notre bibliothèque vous promet des moments de lecture inoubliables, où la magie du football prend vie à chaque ligne.</p>

                                <div className="link_books" id="link" >
                                    <Button />
                                </div>

                            </div>
                        </div>
                        <div className="right">
                            <div className="boxPic">
                                <Image
                                    src='/images/pile.png'
                                    width={300}
                                    height={250}
                                    alt="Pile de livres"

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}