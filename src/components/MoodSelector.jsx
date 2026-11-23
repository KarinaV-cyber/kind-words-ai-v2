
import { useState } from "react";

function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState("");

  const moods = [
    "Happy",
    "Stressed",
    "Overwhelmed",
    "Anxious",
    "Sad",
    "Hopeful"
  ];

  return (
    <section className="mood-selector">
      <h2>How are you feeling today?</h2>
      <p>Choose the feeling that best describes your day.</p>

      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => setSelectedMood(mood)}
            aria-pressed={selectedMood === mood}
          >
            {mood}
          </button>
        ))}
      </div>

      {selectedMood && (
        <p>You selected: <strong>{selectedMood}</strong></p>
      )}
    </section>
  );
}

export default MoodSelector;
