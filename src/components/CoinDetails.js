import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { singleCoin, historialPriceData } from "./API/API";

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

      {allHistoricalData &&
        allHistoricalData.prices.map((layer1) => {
          return (
            <>
              {layer1 &&
                layer1.map((num) => {
                  return (
                    <>
                      <div>
                        {!Number.isInteger(num) ? num.toFixed(2) : null}
                      </div>
                    </>
                  );
                })}
            </>
          );
        })}
    </>
  );
};

export default CoinDetails;
