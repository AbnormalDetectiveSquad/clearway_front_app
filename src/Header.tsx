import React from "react";
import CountdownTimer from "./CountDownTimer.tsx";
import useTrafficData from "./useGetTraffic.tsx";

const Header = () => {
  const {data} = useTrafficData();


  return (
    <>
      <h1 className="title" style={{ textAlign: "center", margin: "20px 0" }}>
        Clear Way
      </h1>
      <div>
        <CountdownTimer />
      </div>
 
    </>
  );
};

export default Header;
