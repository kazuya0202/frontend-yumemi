import Chart from "@/features/PopulationChart";
import Prefectures from "@/features/Prefectures";

import "./App.scss";

function App() {
  return (
    <>
      <header className="header">
        <h1>都道府県別の総人口・人口構成</h1>
      </header>

      <div className="container">
        <main>
          <Prefectures />
          <Chart />
        </main>
      </div>
    </>
  );
}

export default App;
