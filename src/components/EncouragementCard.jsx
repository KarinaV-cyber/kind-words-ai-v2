

import { useState, useEffect } from "react";

function EncouragementCard({ mood, category }) {
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const moodMessages = {
    Happy: "It's wonderful to recognize the good things happening in your life.",
    Stressed: "You may be carrying a lot right now. Remember to give yourself some breathing room.",
    Overwhelmed: "You don't have to figure everything out today. Take one small step at a time.",
    Anxious: "You deserve patience and kindness. Focus on what you can control right now.",
    Sad: "It's okay to have difficult days. You don't have to pretend to be okay.",
    Hopeful: "Hold on to that sense of possibility. Small steps can lead to meaningful changes."
  };

  const categoryMessages = {
    "Work Stress": "Choose one priority and give yourself permission to tackle the rest gradually.",
    Confidence: "You don't need to have everything figured out to believe in your abilities.",
    Relationships: "Your feelings matter, and healthy boundaries are an important part of caring for yourself.",
    "Personal Growth": "Growth isn't always visible. Give yourself credit for the progress you're making.",
    Motivation: "You don't need a perfect plan. Begin with one small action.",
    "Difficult Day": "Be gentle with yourself. Rest is productive too, and tomorrow is another opportunity."
  };

  function handleGenerate() {
    const message = `${moodMessages[mood]} ${categoryMessages[category]}`;

    setGeneratedMessage(message);
    setDisplayedMessage("");
    setIsTyping(true);
  }

  useEffect(() => {
    if (!isTyping || !generatedMessage) {
      return;
    }

    let index = 0;

    const interval = setInterval(() => {
      index++;

      setDisplayedMessage(generatedMessage.slice(0, index));

      if (index >= generatedMessage.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [generatedMessage, isTyping]);

  return (
    <section className="encouragement-card">
      <h2>A Little Kindness for You 💙</h2>

      <p>
        Choose your mood and category, then generate
        a little encouragement for your day.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!mood || !category || isTyping}
      >
        {isTyping ? "Creating your message..." : "Generate My Kind Words ✨"}
      </button>

      {displayedMessage && (
        <div className="generated-message">
          <p>{displayedMessage}</p>
        </div>
      )}
    </section>
  );
}

export default EncouragementCard;
