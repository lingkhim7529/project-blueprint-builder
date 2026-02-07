import Navbar from "@/components/layout/Navbar";
import LevelMap from "@/components/game/LevelMap";
import Footer from "@/components/layout/Footer";

const Levels = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LevelMap />
      <Footer />
    </div>
  );
};

export default Levels;
