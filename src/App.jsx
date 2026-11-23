
import Header from "./components/Header";
import MoodSelector from "./components/MoodSelector";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <h2>How are you feeling today?</h2>
        <p>Take a moment for yourself. We're here to help.</p>
        <MoodSelector/>
      </main>
    </div>
  );
}

export default App;

