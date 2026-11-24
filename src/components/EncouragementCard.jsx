
import { useState, useEffect } from "react";

function EncouragementCard({ mood, category }) {
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedFavoriteId, setCopiedFavoriteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");

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

   
async function handleGenerate() {
  setIsLoading(true);
  setError("");
  setGeneratedMessage("");
  setDisplayedMessage("");
  setCopied(false);

  try {
    const response = await fetch("http://localhost:3001/api/kind-words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood,
        category,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to generate your message.");
    }

    setGeneratedMessage(data.reply);
    setGeneratedMood(mood);
    setGeneratedCategory(category);
    setIsTyping(true);

  } catch (error) {
    console.error("Error generating kind words:", error);
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
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

async function handleCopyFavorite(message, id) {
  try {
    await navigator.clipboard.writeText(message);
    setCopiedFavoriteId(id);
  } catch (error) {
    console.error("Unable to copy favorite:", error);
    alert("Sorry, we couldn't copy this message.");
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

function handleClearAllFavorites() {
  const confirmed = window.confirm(
    "Are you sure you want to remove all your saved messages?"
  );

  if (confirmed) {
    setFavorites([]);
    setCopiedFavoriteId(null);
  }
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
        disabled={!mood || !category || isTyping || isLoading}
      >
  {isLoading
  ? "Asking AI..."
  : isTyping
  ? "Creating your message..."
  : "Generate My Kind Words ✨"}
</button>

{error && (
  <p className="error-message">{error}</p>
)}

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

{favorites.length > 0 && (
  <button
    type="button"
    className="clear-favorites-button"
    onClick={handleClearAllFavorites}
  >
    Clear All Favorites
  </button>
)}


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
  className="copy-favorite-button"
  onClick={() => handleCopyFavorite(favorite.message, favorite.id)}
>
  {copiedFavoriteId === favorite.id
    ? "Copied! ✓"
    : "Copy Message"}
</button>


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

