import Image from "next/image";
import bannerStyles from "./Banner.module.css";

export const Banner = (): JSX.Element => {
  return (
    <div className={bannerStyles.banner}>
      <h1 className={bannerStyles.title}>Get Interview Ready with Mocky</h1>
      <Image
        priority
        src='/images/interview.jpg'
        width='750'
        height='500'
        alt=''
      />
    </div>
  );
};
