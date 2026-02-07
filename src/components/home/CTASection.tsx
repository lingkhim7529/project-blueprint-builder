import { motion } from "framer-motion";
import { Sword, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(270 60% 50%) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(142 76% 46%) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-hero mb-8"
          >
            <Sword className="w-10 h-10 text-foreground" />
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quest
            </span>
            ?
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of learners who are mastering C# through epic battles. 
            Your adventure awaits—no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/levels">
              <Button variant="hero" size="xl">
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex items-center justify-center gap-6 text-muted-foreground text-sm">
            <span>✓ Free to start</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ No credit card</span>
            <span className="hidden sm:inline">•</span>
            <span>✓ Cancel anytime</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
