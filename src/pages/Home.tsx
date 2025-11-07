import HeroHeader from "@/components/anime/HeroHeader";
import AnimeList from "../components/anime/AnimeList";
import Footer from "@/components/Footer";
import NavigationBar from "@/components/anime/NavigationBar";

const Home = () => {
  return (
    <>
      <NavigationBar />
      <HeroHeader />
      <div className="py-4 px-8">
        <main className="flex flex-col mb-8">
          <AnimeList />
        </main>
      </div>
      <Footer className="px-8" />
    </>
  );
};

export default Home;
