import Image from "next/image";
import Link from "next/link";
import custom404Style from "../styles/404.module.css";
import React from "react";
import { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <div className={custom404Style.custom404}>
      <Image src='/images/404.svg' width='800' height='600' alt='' />
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
};

export default Custom404;
