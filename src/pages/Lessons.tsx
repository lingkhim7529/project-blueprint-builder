import Navbar from "@/components/layout/Navbar";
import LessonView from "@/components/game/LessonView";
import Footer from "@/components/layout/Footer";

const Lessons = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LessonView />
      <Footer />
    </div>
  );
};

export default Lessons;
