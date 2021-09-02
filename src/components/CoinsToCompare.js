import React from "react";
import { useQuery } from "react-query";

import { singleCoin } from "./API/API";

export const Coin1ToCompare = ({ coinOneId }) => {
  const compareCoin1 = useQuery(
    ["CompareCoinDetails1", coinOneId],
    () => singleCoin(coinOneId),
    { refetchInterval: 1000 * 60 }
  );

  const coin1 = compareCoin1.data;

  return (
    <>
      {coin1 && (
        <div className="allInfo">
          <div className="infoDetail">
            <div className="info1">
              <img
                src={coin1.image.large}
                alt={coin1.name}
                width={60}
                height={60}
              />
            </div>
            <div className="info2">
              <p
                style={{
                  fontFamily: "OpenSans-Bold",
                  letterSpacing: "2px",
                  fontSize: "1.6em",
                }}
              >
                {coin1.name}
              </p>
              <p
                style={{
                  fontFamily: "OpenSans-Light",
                  letterSpacing: "2px",
                  fontSize: "1em",
                }}
              >
                {coin1.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <div
            style={{
              fontFamily: "OpenSans-Bold",
              letterSpacing: "2px",
              fontSize: "1.6em",
            }}
          >
            ${coin1.market_data.current_price.usd}
          </div>
        </div>
      )}
    </>
  );
};

export const Coin2ToCompare = ({ coinTwoId }) => {
  const compareCoin2 = useQuery(
    ["CompareCoinDetails2", coinTwoId],
    () => singleCoin(coinTwoId),
    { refetchInterval: 1000 * 60 }
  );

  const coin2 = compareCoin2.data;

  return (
    <>
      {/* COIN TWO */}
      {coin2 && (
        <div className="allInfo">
          <div className="infoDetail">
            <div className="info1">
              <img
                src={coin2.image.large}
                alt={coin2.name}
                width={60}
                height={60}
              />
            </div>
            <div className="info2">
              <p
                style={{
                  fontFamily: "OpenSans-Bold",
                  letterSpacing: "2px",
                  fontSize: "1.6em",
                }}
              >
                {coin2.name}
              </p>
              <p
                style={{
                  fontFamily: "OpenSans-Light",
                  letterSpacing: "2px",
                  fontSize: "1em",
                }}
              >
                {coin2.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <div
            style={{
              fontFamily: "OpenSans-Bold",
              letterSpacing: "2px",
              fontSize: "1.6em",
            }}
          >
            ${coin2.market_data.current_price.usd}
          </div>
        </div>
      )}
    </>
  );
};

export const Coin3ToCompare = ({ coinThreeId }) => {
  const compareCoin3 = useQuery(
    ["CompareCoinDetails3", coinThreeId],
    () => singleCoin(coinThreeId),
    { refetchInterval: 1000 * 60 }
  );

  const coin3 = compareCoin3.data;

  return (
    <>
      {/* COIN THREE */}
      {coin3 && (
        <div className="allInfo">
          <div className="infoDetail">
            <div className="info1">
              <img
                src={coin3.image.large}
                alt={coin3.name}
                width={60}
                height={60}
              />
            </div>
            <div className="info2">
              <p
                style={{
                  fontFamily: "OpenSans-Bold",
                  letterSpacing: "2px",
                  fontSize: "1.6em",
                }}
              >
                {coin3.name}
              </p>
              <p
                style={{
                  fontFamily: "OpenSans-Light",
                  letterSpacing: "2px",
                  fontSize: "1em",
                }}
              >
                {coin3.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <div
            style={{
              fontFamily: "OpenSans-Bold",
              letterSpacing: "2px",
              fontSize: "1.6em",
            }}
          >
            ${coin3.market_data.current_price.usd}
          </div>
        </div>
      )}
    </>
  );
};
