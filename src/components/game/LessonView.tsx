import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const lessonContent = {
  title: "For Loops in C#",
  level: "Level 3: The Loop Dungeon",
  progress: 2,
  totalSections: 4,
  sections: [
    {
      title: "Introduction to Loops",
      content: `Loops are one of the most powerful concepts in programming. They allow you to execute a block of code multiple times without having to write it repeatedly.

Imagine you need to print numbers from 1 to 100. Without loops, you'd need 100 lines of code! With a loop, you can do it in just 3-4 lines.`,
    },
    {
      title: "The For Loop Syntax",
      content: `The for loop is the most common type of loop in C#. Here's the basic syntax:`,
      code: `for (initialization; condition; increment)
{
    // code to execute
}

// Example: Print numbers 1 to 5
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}`,
    },
    {
      title: "Breaking Down the Parts",
      content: `A for loop has three parts:

**1. Initialization** - Runs once at the start (e.g., \`int i = 0\`)
**2. Condition** - Checked before each iteration (e.g., \`i < 10\`)
**3. Increment** - Runs after each iteration (e.g., \`i++\`)`,
      code: `// Count down from 10 to 1
for (int count = 10; count >= 1; count--)
{
    Console.WriteLine(count);
}
Console.WriteLine("Blast off! 🚀");`,
    },
    {
      title: "Practice Time!",
      content: `Now it's time to test your knowledge! Head to the battle arena and put your loop skills to the test.

Remember:
- \`i++\` is shorthand for \`i = i + 1\`
- \`i--\` is shorthand for \`i = i - 1\`
- The loop continues while the condition is \`true\`
- When the condition becomes \`false\`, the loop ends`,
    },
  ],
};

const LessonView = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/levels" className="text-muted-foreground hover:text-primary text-sm mb-2 inline-flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Back to Levels
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {lessonContent.title}
          </h1>
          <p className="text-muted-foreground">{lessonContent.level}</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Lesson Progress</span>
            <span className="text-primary font-semibold">
              {lessonContent.progress} / {lessonContent.totalSections}
            </span>
          </div>
          <div className="xp-bar h-2">
            <div
              className="xp-bar-fill"
              style={{ width: `${(lessonContent.progress / lessonContent.totalSections) * 100}%` }}
            />
          </div>
        </motion.div>

        {/* Lesson Sections */}
        <div className="space-y-8">
          {lessonContent.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="level-card"
            >
              <div className="flex items-center gap-3 mb-4">
                {index < lessonContent.progress ? (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                )}
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
              </div>

              <div className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                {section.content}
              </div>

              {section.code && (
                <div className="code-editor p-4 text-sm overflow-x-auto">
                  <pre className="font-code text-primary">
                    <code>{section.code}</code>
                  </pre>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-12 pt-8 border-t border-border"
        >
          <Button variant="ghost" disabled>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous Lesson
          </Button>

          <Link to="/battle">
            <Button variant="battle" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Start Battle
            </Button>
          </Link>

          <Button variant="ghost">
            Next Lesson
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonView;
