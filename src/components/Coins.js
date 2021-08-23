import { Container } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { getAllCoins } from "./API/API";

const Coins = () => {
  const { data } = useQuery("AllCoins", getAllCoins, {
    refetchInterval: 1000 * 60,
  });

  //   console.log(data);

  return (
    <Container>
      <h1>All Coins</h1>
      {data &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/coins/${item.id}`}>
                <img src={item.image} alt={item.name} width="50" />
                <h3>{item.name}</h3>
                <div>{item.symbol}</div>
                <div>
                  <b> {item.current_price}</b>
                </div>
                <br />
                <br />
              </Link>
            </div>
          );
        })}
      {}
    </Container>
  );
};

export default Coins;
