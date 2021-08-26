import { Container } from "@material-ui/core";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";
import { subDays } from "date-fns";

import { getAllCoins, historialPriceData } from "./API/API";

const Coins = () => {
  const { data } = useQuery("AllCoins", getAllCoins, {
    refetchInterval: 1000 * 60,
  });

  // const coinId = data && data.map((item) => item.id);

  // let a = [];
  // data &&
  //   data.map((item) => {
  //     return item.id === "bitcoin" ? a.push(item.id) : null;
  //   });

  // console.log(a[0]);

  const coinChart = (currentId) => {
    try {
      // let historicalPrice;
      let storeId = [];
      let allHistoricalData = historialPriceData(currentId);
      let priceData = [];

      data &&
        data.map((item) => {
          item.id === currentId && storeId.push(item.id);
          return storeId[0] === currentId
            ? allHistoricalData &&
                allHistoricalData.prices.map((layer1) => {
                  return layer1.map((num) => {
                    return !Number.isInteger(num) ? priceData.push(num) : null;
                  });
                })
            : null;
        });

      // 365 DAYS
      let allData365 = [];
      let dataReverse = priceData.reverse();
      for (let d = 365; d >= 0; d--) {
        allData365.push({
          date: subDays(new Date(), d).toISOString().substr(0, 10),
          value: dataReverse.slice(0, 366)[d],
        });
      }

      return allData365;
    } catch (err) {
      console.error(err.message);
    }
  };

  // console.log(coinChart());

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
                    <div className="coinChart">
                      {/* 365 DAYS */}
                      <>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={coinChart(item.id)}>
                            <defs>
                              <linearGradient
                                id="color"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#00cc00"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="75%"
                                  stopColor="00cc00"
                                  stopOpacity={0.5}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              dataKey="value"
                              stroke="#00cc00"
                              fill="url(#color)"
                            />
                            <CartesianGrid opacity={0.1} vertical={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </>
                    </div>

                    {/* COIN INFO */}
                    <div className="coinInfo">
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          width="50"
                          height="50"
                        />
                        <div style={{ marginLeft: "1em", textAlign: "left" }}>
                          <div
                            style={{
                              fontFamily: "OpenSans-Bold",
                              letterSpacing: "1px",
                              fontSize: "1.2em",
                            }}
                          >
                            {item.symbol.toUpperCase()}
                          </div>
                          <div
                            style={{
                              fontFamily: "OpenSans-Light",
                              letterSpacing: "1px",
                              fontSize: "0.9em",
                            }}
                          >
                            {item.name}
                          </div>
                        </div>
                      </div>
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
