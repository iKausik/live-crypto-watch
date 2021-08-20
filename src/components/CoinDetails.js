import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";

import { singleCoin, historialPriceData } from "./API/API";

let chartData = [];
let chartDataLength = [];

const CoinDetails = () => {
  const params = useParams();
  const { data } = useQuery(
    ["SingleCoinDetails", params.id],
    () => singleCoin(params.id),
    { refetchInterval: 1000 * 60 }
  );

  const historicalPrice = useQuery(["HistoricalData", params.id], () =>
    historialPriceData(params.id)
  );
  const allHistoricalData = historicalPrice.data;

  allHistoricalData &&
    allHistoricalData.prices.map((layer1) => {
      return layer1.map((num) => {
        return !Number.isInteger(num) ? chartData.push(num) : null;
      });
    });

  const dataLength = chartData.length;

  for (let i = 0; i <= dataLength; i++) {
    chartDataLength.push(i);
  }

  console.log(chartDataLength);
  // console.log(dataLength);

  //   console.log(data);
  //   console.log(allHistoricalData && allHistoricalData.prices);

  return (
    <>
      {data && (
        <div>
          <h2>Coin Details</h2>
          <div>{data.name}</div>
          <div>{data.symbol}</div>
          <div>{data.market_data.current_price.usd}</div>
        </div>
      )}

      <div>
        <Line
          width={400}
          height={400}
          data={{
            labels: chartDataLength,
            datasets: [
              {
                label: "Price",
                data: chartData,
                backgroundColor: [
                  // "rgba(75, 192, 192, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  // "rgba(54, 162, 235, 0.2)",
                  // "rgba(255, 206, 86, 0.2)",
                  // "rgba(153, 102, 255, 0.2)",
                  // "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  // "rgba(75, 192, 192, 1)",
                  "rgba(255, 206, 86, 1)",
                  // "rgba(54, 162, 235, 1)",
                  // "rgba(255, 99, 132, 1)",
                  // "rgba(153, 102, 255, 1)",
                  // "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                // alignToPixels: true,
              },
              x: {},
            },
          }}
        />
      </div>
    </>
  );
};

export default CoinDetails;
