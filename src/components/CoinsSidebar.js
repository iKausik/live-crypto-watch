import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { subDays } from "date-fns";

import { getAllCoins, historialPriceData } from "./API/API";

const CoinsSidebar = () => {
  const { data } = useQuery("AllCoins", getAllCoins, {
    refetchInterval: 1000 * 60,
  });

  const historicalPrice1 = useQuery(
    ["HistoricalData1", localStorage.getItem(0)],
    () => historialPriceData(localStorage.getItem(0))
  );
  const historicalPrice2 = useQuery(
    ["HistoricalData2", localStorage.getItem(1)],
    () => historialPriceData(localStorage.getItem(1))
  );
  const historicalPrice3 = useQuery(
    ["HistoricalData3", localStorage.getItem(2)],
    () => historialPriceData(localStorage.getItem(2))
  );
  const historicalPrice4 = useQuery(
    ["HistoricalData4", localStorage.getItem(3)],
    () => historialPriceData(localStorage.getItem(3))
  );
  const historicalPrice5 = useQuery(
    ["HistoricalData5", localStorage.getItem(4)],
    () => historialPriceData(localStorage.getItem(4))
  );
  const historicalPrice6 = useQuery(
    ["HistoricalData6", localStorage.getItem(5)],
    () => historialPriceData(localStorage.getItem(5))
  );
  const historicalPrice7 = useQuery(
    ["HistoricalData7", localStorage.getItem(6)],
    () => historialPriceData(localStorage.getItem(6))
  );
  const historicalPrice8 = useQuery(
    ["HistoricalData8", localStorage.getItem(7)],
    () => historialPriceData(localStorage.getItem(7))
  );
  const historicalPrice9 = useQuery(
    ["HistoricalData9", localStorage.getItem(8)],
    () => historialPriceData(localStorage.getItem(8))
  );
  const historicalPrice10 = useQuery(
    ["HistoricalData10", localStorage.getItem(9)],
    () => historialPriceData(localStorage.getItem(9))
  );
  const historicalPrice11 = useQuery(
    ["HistoricalData11", localStorage.getItem(10)],
    () => historialPriceData(localStorage.getItem(10))
  );
  const historicalPrice12 = useQuery(
    ["HistoricalData12", localStorage.getItem(11)],
    () => historialPriceData(localStorage.getItem(11))
  );
  const historicalPrice13 = useQuery(
    ["HistoricalData13", localStorage.getItem(12)],
    () => historialPriceData(localStorage.getItem(12))
  );
  const historicalPrice14 = useQuery(
    ["HistoricalData14", localStorage.getItem(13)],
    () => historialPriceData(localStorage.getItem(13))
  );
  const historicalPrice15 = useQuery(
    ["HistoricalData15", localStorage.getItem(14)],
    () => historialPriceData(localStorage.getItem(14))
  );

  const allHistoricalData1 = historicalPrice1.data;
  const allHistoricalData2 = historicalPrice2.data;
  const allHistoricalData3 = historicalPrice3.data;
  const allHistoricalData4 = historicalPrice4.data;
  const allHistoricalData5 = historicalPrice5.data;
  const allHistoricalData6 = historicalPrice6.data;
  const allHistoricalData7 = historicalPrice7.data;
  const allHistoricalData8 = historicalPrice8.data;
  const allHistoricalData9 = historicalPrice9.data;
  const allHistoricalData10 = historicalPrice10.data;
  const allHistoricalData11 = historicalPrice11.data;
  const allHistoricalData12 = historicalPrice12.data;
  const allHistoricalData13 = historicalPrice13.data;
  const allHistoricalData14 = historicalPrice14.data;
  const allHistoricalData15 = historicalPrice15.data;

  const historicalDataList = [
    allHistoricalData1,
    allHistoricalData2,
    allHistoricalData3,
    allHistoricalData4,
    allHistoricalData5,
    allHistoricalData6,
    allHistoricalData7,
    allHistoricalData8,
    allHistoricalData9,
    allHistoricalData10,
    allHistoricalData11,
    allHistoricalData12,
    allHistoricalData13,
    allHistoricalData14,
    allHistoricalData15,
  ];

  const coinChart = (id) => {
    try {
      let allHistoricalData = historicalDataList[id];

      let priceData = [];
      allHistoricalData &&
        allHistoricalData.prices.map((layer1) => {
          return layer1.map((num) => {
            return !Number.isInteger(num) ? priceData.push(num) : null;
          });
        });

      const dataReverse = priceData.reverse();

      // 365 DAYS
      let allData365 = [];
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

  return (
    <div>
      <div className="coinList">
        {data &&
          data.map((item) => {
            return (
              <div key={item.id}>
                {localStorage.setItem(data.indexOf(item), item.id)}
                <Link to={`/coins/${item.id}`}>
                  <div className="coinItem">
                    {/* COIN CHART */}
                    <div className="coinChart">
                      {/* 365 DAYS */}
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={coinChart(data.indexOf(item))}>
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
                                stopColor="#f6f6f6"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="75%"
                                stopColor="f6f6f6"
                                stopOpacity={0.6}
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            dataKey="value"
                            stroke="#000000"
                            fill="url(#color)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
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
    </div>
  );
};

export default CoinsSidebar;
