import Image from "next/image";
import Link from "next/link";
import custom404Style from "../styles/404.module.css";

export default function Custom404() {
  return (
    <div className={custom404Style.custom404}>
      <Image src='/images/404.svg' width='800px' height='600px' />
      <div>
        <h1 className={custom404Style.custom404Title}>
          Looks like you are lost!
        </h1>
        <p className={custom404Style.custom404Description}>
          The page you are trying to reach doesn't exist.
        </p>
        <Link href='/'>
          <a className={custom404Style.custom404HomeLink}>Home</a>
        </Link>
      </div>
    </div>
  );
}
