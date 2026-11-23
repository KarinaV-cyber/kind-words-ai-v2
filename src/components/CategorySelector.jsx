
function CategorySelector({ selectedCategory, onCategoryChange }) {
  const categories = [
    "Work Stress",
    "Confidence",
    "Relationships",
    "Personal Growth",
    "Motivation",
    "Difficult Day"
  ];

  return (
    <section className="category-selector">
      <h2>What would you like encouragement for?</h2>
      <p>Choose a topic that's on your mind.</p>

      <div className="category-options">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <p>Your selected category: {selectedCategory}</p>
      )}
    </section>
  );
}

export default CategorySelector;
