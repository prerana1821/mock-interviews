import Image from "next/image";
import { useTheme } from "../../context/Theme/Theme";
import bannerStyles from "./Banner.module.css";

export const Banner = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <div className={bannerStyles.banner} style={theme}>
      <h1 className={bannerStyles.title} style={theme}>
        Get Interview Ready with Mocky
      </h1>
      <Image
        priority
        src='/images/interview.png'
        width='750'
        height='500'
        alt=''
      />
    </div>
  );
};
