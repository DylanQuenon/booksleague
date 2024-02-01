import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/outline";
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
