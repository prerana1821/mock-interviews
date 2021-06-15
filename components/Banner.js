import Image from "next/image";
import bannerStyles from "./Banner.module.css";

export const Banner = () => {
  return (
    <div className={bannerStyles.banner}>
      <h1 className={bannerStyles.title}>Get Interview Ready with mocky</h1>
      <Image
        priority
        src='/images/interview.jpg'
        width='750px'
        height='500px'
      />
    </div>
  );
};
