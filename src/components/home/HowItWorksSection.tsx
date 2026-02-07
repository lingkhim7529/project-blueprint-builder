import { motion } from "framer-motion";
import { BookOpen, Swords, MessageCircle, Award } from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    step: "01",
    title: "Learn the Basics",
    description: "Start with interactive lessons covering C# fundamentals. Each topic is broken down into digestible chunks.",
  },
  {
    icon: Swords,
    step: "02",
    title: "Enter Battle",
    description: "Face a monster in turn-based combat. Answer quiz questions and write code to attack. Wrong answers mean you take damage!",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Get AI Help",
    description: "Struggling? Ask the NPC Tutor for hints. The AI understands your context and provides personalized explanations.",
  },
  {
    icon: Award,
    step: "04",
    title: "Level Up",
    description: "Defeat the boss to unlock the next level. Track your progress, earn XP, and become a C# master!",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
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
            How{" "}
            <span className="bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journey from beginner to C# warrior in four simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="relative z-10 text-center">
                {/* Step number */}
                <div className="font-display text-6xl font-bold text-primary/20 mb-2">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
