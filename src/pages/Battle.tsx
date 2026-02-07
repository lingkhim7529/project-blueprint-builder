import Navbar from "@/components/layout/Navbar";
import BattleArena from "@/components/game/BattleArena";

const Battle = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BattleArena />
    </div>
  );
};

export default Battle;
