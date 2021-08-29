import React, { useState } from "react";
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
import { Container, Tabs, Tab, Typography, Box } from "@material-ui/core";
import PropTypes from "prop-types";

import { singleCoin, historialPriceData } from "./API/API";

//
// TABS
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
//
//

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

const CoinDetails = () => {
  const params = useParams();
  const [value, setValue] = useState(0);
  const { data } = useQuery(
    ["SingleCoinDetails", params.id],
    () => singleCoin(params.id),
    { refetchInterval: 1000 * 60 }
  );
  const historicalPrice = useQuery(["HistoricalData", params.id], () =>
    historialPriceData(params.id)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <Container maxWidth="lg">
      <div className="mainContainer">
        <div className="section1">
          {/* ALL DETAILS */}
          <div className="allDetails">
            {data && (
              <div className="allInfo">
                <div className="infoDetail">
                  <div className="info1">
                    <img
                      src={data.image.large}
                      alt={data.name}
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
                      {data.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "OpenSans-Light",
                        letterSpacing: "2px",
                        fontSize: "1em",
                      }}
                    >
                      {data.symbol.toUpperCase()}
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
                  ${data.market_data.current_price.usd}
                </div>
              </div>
            )}
          </div>

          {/* ALL CHARTS */}
          <div className="allCharts">
            {/* TOGGLE BUTTON */}
            <div className="allBtns">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs"
              >
                <Tab label="1W" {...a11yProps(0)} />
                <Tab label="1M" {...a11yProps(1)} />
                <Tab label="3M" {...a11yProps(2)} />
                <Tab label="6M" {...a11yProps(3)} />
                <Tab label="1Y" {...a11yProps(4)} />
              </Tabs>
            </div>
            {/* 7 DAYS */}
            <TabPanel value={value} index={0}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={allData7}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0000ff" stopOpacity={0.4} />
                      <stop offset="75%" stopColor="0000ff" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>

                  <Area dataKey="value" stroke="#0000ff" fill="url(#color)" />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickFormatter={(str) => {
                      const date = parseISO(str);
                      if (date.getDate() % 1 === 0) {
                        return format(date, "d MMM yy");
                      }
                      return "";
                    }}
                  />

                  <YAxis
                    dataKey="value"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickCount={6}
                    tickFormatter={(number) => `$${number.toFixed(0)}`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </TabPanel>

            {/* 30 DAYS */}
            <TabPanel value={value} index={1}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={allData30}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0000ff" stopOpacity={0.4} />
                      <stop offset="75%" stopColor="0000ff" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>

                  <Area dataKey="value" stroke="#0000ff" fill="url(#color)" />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickFormatter={(str) => {
                      const date = parseISO(str);
                      return format(date, "d MMM yy");
                    }}
                  />

                  <YAxis
                    dataKey="value"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickCount={6}
                    tickFormatter={(number) => `$${number.toFixed(0)}`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </TabPanel>

            {/* 90 DAYS */}
            <TabPanel value={value} index={2}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={allData90}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0000ff" stopOpacity={0.4} />
                      <stop offset="75%" stopColor="0000ff" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>

                  <Area dataKey="value" stroke="#0000ff" fill="url(#color)" />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickFormatter={(str) => {
                      const date = parseISO(str);
                      return format(date, "d MMM yy");
                    }}
                  />

                  <YAxis
                    dataKey="value"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickCount={6}
                    tickFormatter={(number) => `$${number.toFixed(0)}`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </TabPanel>

            {/* 180 DAYS */}
            <TabPanel value={value} index={3}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={allData180}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0000ff" stopOpacity={0.4} />
                      <stop offset="75%" stopColor="0000ff" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>

                  <Area dataKey="value" stroke="#0000ff" fill="url(#color)" />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickFormatter={(str) => {
                      const date = parseISO(str);
                      return format(date, "d MMM yy");
                    }}
                  />

                  <YAxis
                    dataKey="value"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickCount={6}
                    tickFormatter={(number) => `$${number.toFixed(0)}`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </TabPanel>

            {/* 365 DAYS */}
            <TabPanel value={value} index={4}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={allData365}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0000ff" stopOpacity={0.4} />
                      <stop offset="75%" stopColor="0000ff" stopOpacity={0.5} />
                    </linearGradient>
                  </defs>

                  <Area dataKey="value" stroke="#0000ff" fill="url(#color)" />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickFormatter={(str) => {
                      const date = parseISO(str);
                      return format(date, "d MMM yy");
                    }}
                  />

                  <YAxis
                    dataKey="value"
                    axisLine={false}
                    tickLine={false}
                    fontSize="0.8em"
                    tickCount={6}
                    tickFormatter={(number) => `$${number.toFixed(0)}`}
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </TabPanel>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="section2">
          <h3>Select to Compare</h3>
        </div>
      </div>
    </Container>
  );
};

export default CoinDetails;
