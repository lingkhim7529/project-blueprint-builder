import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface NPCTutorProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuestion?: string;
}

const initialGreeting = `Greetings, young warrior! 🧙‍♂️

I am Codex, your NPC Tutor. I'm here to help you on your quest to master C#. 

Feel free to ask me about:
• The current question you're facing
• Any C# concept you're struggling with
• Hints without giving away the answer

How can I assist you today?`;

const NPCTutor = ({ isOpen, onClose, currentQuestion }: NPCTutorProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: initialGreeting },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    // Simulated AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hint") || lowerMessage.includes("help")) {
      return `Let me give you a hint without spoiling the answer! 💡

Think about the fundamental concepts:
- What data types are you working with?
- What is the syntax pattern for this operation?
- Try to recall similar examples from the lesson.

If you're still stuck, try breaking down the question into smaller parts. What specifically is confusing you?`;
    }

    if (lowerMessage.includes("loop") || lowerMessage.includes("for") || lowerMessage.includes("while")) {
      return `Great question about loops! 🔄

In C#, we have several types of loops:

**For Loop** - When you know how many times to iterate:
\`\`\`csharp
for (int i = 0; i < 10; i++) {
    Console.WriteLine(i);
}
\`\`\`

**While Loop** - When you don't know the count:
\`\`\`csharp
while (condition) {
    // code
}
\`\`\`

**Do-While Loop** - Executes at least once:
\`\`\`csharp
do {
    // code
} while (condition);
\`\`\`

Would you like me to explain any of these in more detail?`;
    }

    if (lowerMessage.includes("variable") || lowerMessage.includes("int") || lowerMessage.includes("string")) {
      return `Ah, variables! The building blocks of programming! 📦

In C#, you declare variables like this:
\`\`\`csharp
int number = 42;
string name = "Warrior";
bool isReady = true;
double price = 19.99;
\`\`\`

Remember:
- \`int\` for whole numbers
- \`string\` for text
- \`bool\` for true/false
- \`double\` for decimals

The keyword \`var\` can also be used when the type is obvious from the value!`;
    }

    if (currentQuestion && (lowerMessage.includes("question") || lowerMessage.includes("current"))) {
      return `The current question asks: "${currentQuestion}"

Let me help you think through this:
1. Read the question carefully
2. Eliminate obviously wrong answers first
3. Think about what you learned in the lesson

I can give you a more specific hint if you tell me which part is confusing!`;
    }

    return `That's a great question, warrior! 🗡️

Let me think about this...

While I'd love to give you the direct answer, the best learning happens when you discover it yourself! Here's what I suggest:

1. Re-read the relevant lesson content
2. Think about the C# syntax rules you've learned
3. Try to eliminate obviously wrong answers

If you're still stuck, tell me specifically what concept is confusing you, and I'll provide a more targeted hint!`;
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: simulateAIResponse(input.trim()),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-magic flex items-center justify-center">
                  <Bot className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Codex the Tutor</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary" />
                    AI-Powered Assistant
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.role === "user" ? "chat-bubble-user" : "chat-bubble-npc"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.role === "assistant" ? (
                        <Bot className="w-4 h-4 text-secondary" />
                      ) : (
                        <User className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {message.role === "assistant" ? "Codex" : "You"}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="chat-bubble-npc flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-secondary animate-spin" />
                    <span className="text-sm text-muted-foreground">Codex is thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Codex for help..."
                  className="flex-1 bg-muted border-border"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  variant="hero"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Hint: Ask about concepts, not direct answers! 😉
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NPCTutor;
