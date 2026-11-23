

import { useState } from "react";
import Header from "./components/Header";
import MoodSelector from "./components/MoodSelector";
import CategorySelector from "./components/CategorySelector";
import EncouragementCard from "./components/EncouragementCard";
import "./App.css";

function App() {
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="app">
      <Header />

      <main>
        <MoodSelector
          selectedMood={selectedMood}
          onMoodChange={setSelectedMood}
        />

        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <EncouragementCard
          mood={selectedMood}
          category={selectedCategory}
        />
      </main>
    </div>
  );
}

export default App;
