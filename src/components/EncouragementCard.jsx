
import { useState, useEffect } from "react";

function EncouragementCard({ mood, category }) {
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load saved favorites from Local Storage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("kindWordsFavorites");
      const parsedFavorites = savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch (error) {
      console.error("Unable to load favorites:", error);
      return [];
    }
  });

  // Remember the mood and category used for the generated message
  const [generatedMood, setGeneratedMood] = useState("");
  const [generatedCategory, setGeneratedCategory] = useState("");

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
    setGeneratedMood(mood);
    setGeneratedCategory(category);
    setCopied(false);
    setIsTyping(true);
  }

  // Typewriter effect
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

  // Save favorites to Local Storage
  useEffect(() => {
    try {
      localStorage.setItem(
        "kindWordsFavorites",
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.error("Unable to save favorites:", error);
    }
  }, [favorites]);

  // Copy message
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
    } catch (error) {
      console.error("Unable to copy message:", error);
      alert("Sorry, we couldn't copy your message.");
    }
  }

  // Add or remove a favorite
  function handleToggleFavorite() {
    const existingFavorite = favorites.find(
      (favorite) =>
        favorite.message === generatedMessage &&
        favorite.mood === generatedMood &&
        favorite.category === generatedCategory
    );

    if (existingFavorite) {
      setFavorites((previousFavorites) =>
        previousFavorites.filter(
          (favorite) => favorite.id !== existingFavorite.id
        )
      );
    } else {
      const newFavorite = {
        id: Date.now(),
        mood: generatedMood,
        category: generatedCategory,
        message: generatedMessage
      };

      setFavorites((previousFavorites) => [
        ...previousFavorites,
        newFavorite
      ]);
    }
  }

  // Remove a saved favorite
  function handleRemoveFavorite(id) {
    setFavorites((previousFavorites) =>
      previousFavorites.filter((favorite) => favorite.id !== id)
    );
  }

  const isFavorite = favorites.some(
    (favorite) =>
      favorite.message === generatedMessage &&
      favorite.mood === generatedMood &&
      favorite.category === generatedCategory
  );

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
        {isTyping
          ? "Creating your message..."
          : "Generate My Kind Words ✨"}
      </button>

      {displayedMessage && (
        <div className="generated-message">
          <p>{displayedMessage}</p>

          {!isTyping && (
            <div className="message-actions">
              <button
                type="button"
                className="copy-button"
                onClick={handleCopy}
              >
                {copied ? "Copied! ✓" : "Copy Message"}
              </button>

              <button
                type="button"
                className={`favorite-button ${isFavorite ? "is-saved" : ""}`}
                onClick={handleToggleFavorite}
              >
                {isFavorite
                  ? "♥ Saved to Favorites"
                  : "♡ Save to Favorites"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Saved favorites */}
      <section className="favorites-section">
        <h3>⭐ Your Saved Kind Words</h3>

        {favorites.length === 0 ? (
          <p className="empty-favorites">
            Your favorite messages will appear here.
          </p>
        ) : (
          <div className="favorites-list">
            {favorites.map((favorite) => (
              <article className="favorite-item" key={favorite.id}>
                <p className="favorite-details">
                  {favorite.mood} · {favorite.category}
                </p>

                <p>{favorite.message}</p>

                <button
                  type="button"
                  className="remove-favorite-button"
                  onClick={() => handleRemoveFavorite(favorite.id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default EncouragementCard;

