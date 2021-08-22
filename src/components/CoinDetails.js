import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

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

  // console.log(chartDataLength);
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
        <AreaChart></AreaChart>
      </div>
    </>
  );
};

export default CoinDetails;
