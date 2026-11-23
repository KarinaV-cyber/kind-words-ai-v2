
function EncouragementCard({ mood, category }) {
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

  return (
    <section className="encouragement-card">
      <h2>A Little Kindness for You 💙</h2>

      {!mood || !category ? (
        <p>
          Select your mood and an encouragement category
          to receive your personalized message.
        </p>
      ) : (
        <div>
          <p>{moodMessages[mood]}</p>
          <p>{categoryMessages[category]}</p>
        </div>
      )}
    </section>
  );
}

export default EncouragementCard;
