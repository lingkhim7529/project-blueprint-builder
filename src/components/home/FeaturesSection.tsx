import { motion } from "framer-motion";
import { Sword, Brain, Trophy, Code, Gamepad2, BookOpen } from "lucide-react";

const features = [
  {
    icon: Sword,
    title: "Battle System",
    description: "Fight enemies by answering C# questions correctly. Wrong answers damage you, but correct ones deal devastating blows!",
    gradient: "from-accent to-destructive",
  },
  {
    icon: Brain,
    title: "AI Tutor",
    description: "Stuck on a concept? Our NPC Tutor powered by AI provides hints and explanations tailored to your learning level.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: Trophy,
    title: "Level Progression",
    description: "Progress through 10+ dungeon levels, each teaching new C# concepts from basics to advanced OOP.",
    gradient: "from-warning to-accent",
  },
  {
    icon: Code,
    title: "Real Code Editor",
    description: "Write and submit actual C# code. Our backend analyzes your submissions with Roslyn for instant feedback.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Earn XP, unlock achievements, and compete on leaderboards. Learning has never been this engaging!",
    gradient: "from-destructive to-accent",
  },
  {
    icon: BookOpen,
    title: "Structured Lessons",
    description: "Each level includes bite-sized lessons covering syntax, control flow, OOP, collections, and more.",
    gradient: "from-primary to-warning",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dungeon-pattern" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Why{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CodeQuest
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine the thrill of gaming with the power of structured learning to make
            mastering C# an adventure you'll actually enjoy.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group level-card hover:border-primary/30"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${feature.gradient}`}
              >
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
