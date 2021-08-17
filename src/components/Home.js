import React from "react";
import { useQuery } from "react-query";

import { getAllCoins } from "./API/API";

const Home = () => {
  const { data } = useQuery("Coins", getAllCoins);

  //   console.log(data);

  return (
    <div>
      <h1>Home</h1>
      {data &&
        data.map((item) => {
          return (
            <>
              <div key={item.id}>
                <img src={item.image} alt={item.name} width="50" />
                <h3>{item.name}</h3>
                <div>{item.symbol}</div>
                <div>
                  <b> {item.current_price}</b>
                </div>
              </div>
              <br />
              <br />
            </>
          );
        })}
      {}
    </div>
  );
};

export default Home;
