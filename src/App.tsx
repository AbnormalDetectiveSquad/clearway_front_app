import React, { useState } from "react";
import Map from "./Map.jsx";

import "./App.css";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import ThresholdSlider from "./ThresholdSlider.tsx";

const App = () => {
  const [value, setValue] = useState<number>(3); // 초기값 5

  // 슬라이더 값 변경 핸들러
  const handleChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ margin: "1.5rem auto 0", width: "60%" }}>
        <ThresholdSlider value={value} handleChange={handleChange} />
      </div>
      <Map value={value}/>
      <Footer />
    </div>
  );
};

export default App;
