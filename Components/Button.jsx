import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/outline";

//composant d'un bouton qu'on retrouve 2 fois pour éviter les répitions
export default function Button() {
  return (
    <Link href="/books" className="buttonBooks">
      Voir les livres{" "}
      <span>
        <ArrowRightIcon className="icon" />
      </span>
    </Link>
  );
}
