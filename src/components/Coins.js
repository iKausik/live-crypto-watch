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
    <Container maxWidth="lg">
      <h1>All Coins</h1>
      <div className="coinList">
        {data &&
          data.map((item) => {
            return (
              <div key={item.id}>
                <Link to={`/coins/${item.id}`}>
                  <div className="coinItem">
                    {/* COIN CHART */}
                    <div className="coinChart"></div>

                    {/* COIN INFO */}
                    <div className="coinInfo">
                      <img src={item.image} alt={item.name} width="50" />
                      <p
                        style={{
                          fontFamily: "OpenSans-Bold",
                          letterSpacing: "1px",
                          fontSize: "1.2em",
                        }}
                      >
                        {item.symbol.toUpperCase()}
                      </p>
                      <p
                        style={{
                          fontFamily: "OpenSans-Light",
                          letterSpacing: "1px",
                          fontSize: "0.9em",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "OpenSans-Regular",
                          letterSpacing: "2px",
                          fontSize: "1.2em",
                        }}
                      >
                        ${item.current_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </Container>
  );
};

export default Coins;
