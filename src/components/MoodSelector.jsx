
function MoodSelector({ selectedMood, onMoodChange }) {
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
            onClick={() => onMoodChange(mood)}
            aria-pressed={selectedMood === mood}
          >
            {mood}
          </button>
        ))}
      </div>

      {selectedMood && <p>You selected: {selectedMood}</p>}
    </section>
  );
}

export default MoodSelector;
