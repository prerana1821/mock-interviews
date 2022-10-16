import { Banner, InfoCards } from "../components";
import { infoCardsContent } from "../content/infoCards.content";

export default function Home() {
  return (
    <div>
      <Banner />

      <InfoCards content={infoCardsContent} />
    </div>
  );
}
