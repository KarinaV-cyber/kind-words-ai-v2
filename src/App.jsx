
import Header from "./components/Header";
import MoodSelector from "./components/MoodSelector";
import CategorySelector from "./components/CategorySelector";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <MoodSelector />
        <CategorySelector />
      </main>
    </div>
  );
}

export default App;


