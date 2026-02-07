import { motion } from "framer-motion";
import { Lock, Check, Play, Star, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface Level {
  id: number;
  title: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "locked" | "available" | "completed";
  xp: number;
  lessonsCount: number;
  questionsCount: number;
}

const mockLevels: Level[] = [
  { id: 1, title: "The Beginning", topic: "Variables & Data Types", difficulty: "Beginner", status: "completed", xp: 100, lessonsCount: 3, questionsCount: 10 },
  { id: 2, title: "Flow Control", topic: "If/Else & Switch", difficulty: "Beginner", status: "completed", xp: 150, lessonsCount: 4, questionsCount: 12 },
  { id: 3, title: "The Loop Dungeon", topic: "For & While Loops", difficulty: "Beginner", status: "available", xp: 200, lessonsCount: 4, questionsCount: 15 },
  { id: 4, title: "Method Mastery", topic: "Functions & Methods", difficulty: "Intermediate", status: "locked", xp: 250, lessonsCount: 5, questionsCount: 15 },
  { id: 5, title: "Array Arena", topic: "Arrays & Collections", difficulty: "Intermediate", status: "locked", xp: 300, lessonsCount: 5, questionsCount: 18 },
  { id: 6, title: "Object Origins", topic: "Classes & Objects", difficulty: "Intermediate", status: "locked", xp: 350, lessonsCount: 6, questionsCount: 20 },
  { id: 7, title: "Inheritance Isle", topic: "OOP Inheritance", difficulty: "Advanced", status: "locked", xp: 400, lessonsCount: 5, questionsCount: 18 },
  { id: 8, title: "Interface Inferno", topic: "Interfaces & Polymorphism", difficulty: "Advanced", status: "locked", xp: 450, lessonsCount: 6, questionsCount: 20 },
  { id: 9, title: "Exception Escape", topic: "Error Handling", difficulty: "Advanced", status: "locked", xp: 500, lessonsCount: 4, questionsCount: 15 },
  { id: 10, title: "The Final Boss", topic: "LINQ & Advanced Topics", difficulty: "Advanced", status: "locked", xp: 600, lessonsCount: 7, questionsCount: 25 },
];

const difficultyColors = {
  Beginner: "text-primary",
  Intermediate: "text-warning",
  Advanced: "text-destructive",
};

const LevelMap = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Dungeon{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Map
            </span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Progress through the dungeons, defeat monsters, and master C# one level at a time.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-primary font-semibold">2 / 10 Levels</span>
          </div>
          <div className="xp-bar h-3">
            <motion.div
              className="xp-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: "20%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <span>250 XP earned</span>
            <span>Total: 3,300 XP</span>
          </div>
        </motion.div>

        {/* Level Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`level-card ${level.status === "locked" ? "locked" : ""} ${level.status === "completed" ? "completed" : ""}`}
            >
              {/* Level number badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center font-display font-bold text-primary">
                  {level.id}
                </div>
                {level.status === "completed" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                {level.status === "locked" && (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
                {level.status === "available" && (
                  <div className="w-8 h-8 rounded-full bg-accent animate-pulse flex items-center justify-center">
                    <Play className="w-4 h-4 text-accent-foreground" />
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold mb-1">{level.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{level.topic}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className={difficultyColors[level.difficulty]}>{level.difficulty}</span>
                <span>•</span>
                <span>{level.lessonsCount} lessons</span>
                <span>•</span>
                <span>{level.questionsCount} questions</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium text-warning">{level.xp} XP</span>
              </div>

              {/* Action button */}
              {level.status === "available" && (
                <Link to={`/battle?level=${level.id}`}>
                  <Button variant="battle" className="w-full">
                    <Swords className="w-4 h-4 mr-2" />
                    Enter Battle
                  </Button>
                </Link>
              )}
              {level.status === "completed" && (
                <Link to={`/lessons?level=${level.id}`}>
                  <Button variant="outline" className="w-full">
                    Review Lessons
                  </Button>
                </Link>
              )}
              {level.status === "locked" && (
                <Button variant="ghost" className="w-full" disabled>
                  <Lock className="w-4 h-4 mr-2" />
                  Locked
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelMap;
