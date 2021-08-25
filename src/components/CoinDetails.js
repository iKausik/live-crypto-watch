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
import { format, parseISO, subDays } from "date-fns";
import { Container } from "@material-ui/core";

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

  let priceData = [];
  allHistoricalData &&
    allHistoricalData.prices.map((layer1) => {
      return layer1.map((num) => {
        return !Number.isInteger(num) ? priceData.push(num) : null;
      });
    });

  const dataReverse = priceData.reverse();

  // 7 DAYS
  let allData7 = [];
  for (let d = 7; d >= 0; d--) {
    allData7.push({
      date: subDays(new Date(), d).toISOString().substr(0, 10),
      value: dataReverse.slice(0, 8)[d],
    });
  }
  // 30 DAYS
  let allData30 = [];
  for (let d = 30; d >= 0; d--) {
    allData30.push({
      date: subDays(new Date(), d).toISOString().substr(0, 10),
      value: dataReverse.slice(0, 31)[d],
    });
  }
  // 90 DAYS
  let allData90 = [];
  for (let d = 90; d >= 0; d--) {
    allData90.push({
      date: subDays(new Date(), d).toISOString().substr(0, 10),
      value: dataReverse.slice(0, 91)[d],
    });
  }
  // 180 DAYS
  let allData180 = [];
  for (let d = 180; d >= 0; d--) {
    allData180.push({
      date: subDays(new Date(), d).toISOString().substr(0, 10),
      value: dataReverse.slice(0, 181)[d],
    });
  }
  // 365 DAYS
  let allData365 = [];
  for (let d = 365; d >= 0; d--) {
    allData365.push({
      date: subDays(new Date(), d).toISOString().substr(0, 10),
      value: dataReverse.slice(0, 366)[d],
    });
  }

  // console.log(dataReverse.slice(0, 31));
  // console.log(priceData);
  // console.log(allData);
  //   console.log(allHistoricalData && allHistoricalData.prices);

  return (
    <Container maxWidth="fixed">
      {data && (
        <div>
          <h2>Coin Details</h2>
          <div>{data.name}</div>
          <div>{data.symbol}</div>
          <div>{data.market_data.current_price.usd}</div>
        </div>
      )}

      {/* 7 DAYS */}
      <div>
        <h2>1 WEEK</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={allData7}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00cc00" stopOpacity={0.4} />
                <stop offset="75%" stopColor="00cc00" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#00cc00" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 1 === 0) {
                  return format(date, "MMM, d");
                }
                return "";
              }}
            />

            <YAxis
              dataKey="value"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(0)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <br />
      <br />

      {/* 30 DAYS */}
      <div>
        <h2>1 MONTH</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={allData30}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00cc00" stopOpacity={0.4} />
                <stop offset="75%" stopColor="00cc00" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#00cc00" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 7 === 0) {
                  return format(date, "MMM, d");
                }
                return "";
              }}
            />

            <YAxis
              dataKey="value"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(0)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <br />
      <br />

      {/* 90 DAYS */}
      <div>
        <h2>3 MONTHS</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={allData90}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00cc00" stopOpacity={0.4} />
                <stop offset="75%" stopColor="00cc00" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#00cc00" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 30 === 0) {
                  return format(date, "MMM, d");
                }
                return "";
              }}
            />

            <YAxis
              dataKey="value"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(0)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <br />
      <br />

      {/* 180 DAYS */}
      <div>
        <h2>6 MONTHS</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={allData180}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00cc00" stopOpacity={0.4} />
                <stop offset="75%" stopColor="00cc00" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#00cc00" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 30 === 0) {
                  return format(date, "MMM, d");
                }
                return "";
              }}
            />

            <YAxis
              dataKey="value"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(0)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <br />
      <br />

      {/* 365 DAYS */}
      <div>
        <h2>1 YEAR</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={allData365}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00cc00" stopOpacity={0.4} />
                <stop offset="75%" stopColor="00cc00" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#00cc00" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 30 === 0) {
                  return format(date, "MMM, d");
                }
                return "";
              }}
            />

            <YAxis
              dataKey="value"
              axisLine={false}
              tickLine={false}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(0)}`}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

// CUSTOM TOOLTIP
const CustomTooltip = ({ active, payload, label }) => {
  try {
    if (active) {
      return (
        <div className="tooltip">
          <h5>{format(parseISO(label), "eeee, d MMM, yyy")}</h5>
          <p>${payload[0].value.toFixed(2)} USD</p>
        </div>
      );
    }
    return null;
  } catch (err) {
    console.error(err.message);
  }
};

export default CoinDetails;
