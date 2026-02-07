import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Swords, MessageCircle, ArrowRight, RotateCcw, Trophy, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import NPCTutor from "./NPCTutor";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is the correct way to declare an integer variable in C#?",
    options: ["int myNumber = 5;", "integer myNumber = 5;", "num myNumber = 5;", "var myNumber = '5';"],
    correctAnswer: 0,
    explanation: "In C#, 'int' is the keyword used to declare an integer variable. The syntax is: int variableName = value;",
  },
  {
    id: 2,
    question: "Which loop will execute at least once regardless of the condition?",
    options: ["for loop", "while loop", "do-while loop", "foreach loop"],
    correctAnswer: 2,
    explanation: "A do-while loop always executes its code block at least once before checking the condition, unlike while or for loops.",
  },
  {
    id: 3,
    question: "What does the 'break' keyword do inside a loop?",
    options: ["Pauses the loop", "Exits the loop entirely", "Skips to the next iteration", "Restarts the loop"],
    correctAnswer: 1,
    explanation: "The 'break' keyword immediately exits the loop, skipping all remaining iterations.",
  },
  {
    id: 4,
    question: "How do you write a single-line comment in C#?",
    options: ["<!-- comment -->", "/* comment */", "// comment", "# comment"],
    correctAnswer: 2,
    explanation: "In C#, single-line comments start with // and everything after it on that line is ignored by the compiler.",
  },
  {
    id: 5,
    question: "What is the output of: Console.WriteLine(5 + 3 * 2);?",
    options: ["16", "11", "13", "10"],
    correctAnswer: 1,
    explanation: "Following order of operations (PEMDAS), multiplication happens first: 3 * 2 = 6, then addition: 5 + 6 = 11.",
  },
];

const BattleArena = () => {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [showTutor, setShowTutor] = useState(false);
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null);
  const [playerShake, setPlayerShake] = useState(false);
  const [enemyShake, setEnemyShake] = useState(false);

  const question = mockQuestions[currentQuestion];
  const playerDamage = 25;
  const enemyDamage = 20;

  const handleAnswer = (answerIndex: number) => {
    if (showResult || gameOver) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // Player attacks enemy
      setEnemyShake(true);
      setTimeout(() => setEnemyShake(false), 300);
      const newEnemyHP = Math.max(0, enemyHP - playerDamage);
      setEnemyHP(newEnemyHP);
      setBattleLog(prev => [...prev, `✅ Correct! You dealt ${playerDamage} damage to the monster!`]);

      if (newEnemyHP <= 0) {
        setTimeout(() => setGameOver("win"), 1000);
      }
    } else {
      // Enemy attacks player
      setPlayerShake(true);
      setTimeout(() => setPlayerShake(false), 300);
      const newPlayerHP = Math.max(0, playerHP - enemyDamage);
      setPlayerHP(newPlayerHP);
      setBattleLog(prev => [...prev, `❌ Wrong! The monster dealt ${enemyDamage} damage to you!`]);

      if (newPlayerHP <= 0) {
        setTimeout(() => setGameOver("lose"), 1000);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // All questions answered, check win condition
      if (enemyHP > 0 && playerHP > 0) {
        setGameOver(enemyHP < playerHP ? "win" : "lose");
      }
    }
  };

  const restartBattle = () => {
    setPlayerHP(100);
    setEnemyHP(100);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setBattleLog([]);
    setGameOver(null);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Battle Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-accent to-destructive bg-clip-text text-transparent">
              Battle Arena
            </span>
          </h1>
          <p className="text-muted-foreground">Level 3: The Loop Dungeon</p>
        </motion.div>

        {/* Game Over Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center p-8 rounded-2xl bg-card border border-border max-w-md"
              >
                {gameOver === "win" ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center mx-auto mb-6">
                      <Trophy className="w-10 h-10 text-foreground" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-primary mb-4">Victory!</h2>
                    <p className="text-muted-foreground mb-6">
                      You defeated the monster and earned 200 XP!
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-destructive to-accent flex items-center justify-center mx-auto mb-6">
                      <Skull className="w-10 h-10 text-foreground" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-destructive mb-4">Defeated!</h2>
                    <p className="text-muted-foreground mb-6">
                      The monster was too strong. Try again and learn from your mistakes!
                    </p>
                  </>
                )}
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={restartBattle}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  {gameOver === "win" && (
                    <Button variant="hero">
                      Next Level
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Battle Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* HP Bars */}
            <div className="grid grid-cols-2 gap-8">
              {/* Player HP */}
              <motion.div
                animate={playerShake ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="font-semibold">You</span>
                  <span className="ml-auto text-primary font-bold">{playerHP}/100</span>
                </div>
                <div className="hp-bar">
                  <motion.div
                    className="hp-bar-fill-player"
                    animate={{ width: `${playerHP}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Enemy HP */}
              <motion.div
                animate={enemyShake ? { x: [-5, 5, -5, 5, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Skull className="w-5 h-5 text-destructive" />
                  <span className="font-semibold">Loop Golem</span>
                  <span className="ml-auto text-destructive font-bold">{enemyHP}/100</span>
                </div>
                <div className="hp-bar">
                  <motion.div
                    className="hp-bar-fill-enemy"
                    animate={{ width: `${enemyHP}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="level-card"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {mockQuestions.length}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTutor(true)}
                  className="text-secondary hover:text-secondary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask Tutor
                </Button>
              </div>

              <h3 className="font-display text-xl font-semibold mb-6">
                {question.question}
              </h3>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    className={`w-full p-4 rounded-xl text-left transition-all border ${
                      showResult
                        ? index === question.correctAnswer
                          ? "border-primary bg-primary/10 text-primary"
                          : index === selectedAnswer
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : "border-border text-muted-foreground"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span className="font-code text-sm">{option}</span>
                  </motion.button>
                ))}
              </div>

              {/* Result & Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-xl ${
                      isCorrect ? "bg-primary/10 border border-primary/30" : "bg-destructive/10 border border-destructive/30"
                    }`}
                  >
                    <p className={`font-semibold mb-2 ${isCorrect ? "text-primary" : "text-destructive"}`}>
                      {isCorrect ? "⚔️ Critical Hit!" : "💥 You took damage!"}
                    </p>
                    <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    
                    {!gameOver && (
                      <Button
                        variant={isCorrect ? "default" : "destructive"}
                        className="mt-4"
                        onClick={nextQuestion}
                      >
                        {currentQuestion < mockQuestions.length - 1 ? "Next Question" : "Finish Battle"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Battle Log Sidebar */}
          <div className="space-y-6">
            <div className="level-card">
              <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                <Swords className="w-5 h-5 text-accent" />
                Battle Log
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {battleLog.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Answer questions to attack!</p>
                ) : (
                  battleLog.map((log, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-muted-foreground"
                    >
                      {log}
                    </motion.p>
                  ))
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="level-card">
              <h3 className="font-display text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={() => setShowTutor(true)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ask NPC Tutor
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={restartBattle}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart Battle
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NPC Tutor Modal */}
      <NPCTutor
        isOpen={showTutor}
        onClose={() => setShowTutor(false)}
        currentQuestion={question?.question}
      />
    </div>
  );
};

export default BattleArena;
