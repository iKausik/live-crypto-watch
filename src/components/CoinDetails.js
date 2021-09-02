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
import { Container, Tabs, Tab, Box } from "@material-ui/core";
import PropTypes from "prop-types";

import { singleCoin, historialPriceData } from "./API/API";
import CoinsSidebar from "./CoinsSidebar";
import {
  Coin1ToCompare,
  Coin2ToCompare,
  Coin3ToCompare,
} from "./CoinsToCompare";

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
          <span>{children}</span>
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
          {payload[1] ? <p>${payload[1].value.toFixed(2)} USD</p> : null}
          {payload[2] ? <p>${payload[2].value.toFixed(2)} USD</p> : null}
          {payload[3] ? <p>${payload[3].value.toFixed(2)} USD</p> : null}
        </div>
      );
    }
    return null;
  } catch (err) {
    console.error(err.message);
  }
};

// ID TO COMPARE
let idList = [];

const CoinDetails = () => {
  const params = useParams();
  const [value, setValue] = useState(0);

  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [select3, setSelect3] = useState();

  const { data } = useQuery(
    ["SingleCoinDetails", params.id],
    () => singleCoin(params.id),
    { refetchInterval: 1000 * 60 }
  );

  // const [coinOne, setCoinOne] = useState();
  // const [coinTwo, setCoinTwo] = useState(coinForCompare2(compareCoin2));
  // const [coinThree, setCoinThree] = useState(coinForCompare3(compareCoin3));

  const historicalPrice = useQuery(["HistoricalData", params.id], () =>
    historialPriceData(params.id)
  );
  const historicalPrice1 = useQuery(["HistoricalData1", select1], () =>
    historialPriceData(select1)
  );
  const historicalPrice2 = useQuery(["HistoricalData2", select2], () =>
    historialPriceData(select2)
  );
  const historicalPrice3 = useQuery(["HistoricalData3", select3], () =>
    historialPriceData(select3)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const allHistoricalData = historicalPrice.data;
  const allHistoricalData1 = historicalPrice1.data;
  const allHistoricalData2 = historicalPrice2.data;
  const allHistoricalData3 = historicalPrice3.data;

  let priceData = [];
  allHistoricalData &&
    allHistoricalData.prices.map((layer1) => {
      return layer1.map((num) => {
        return !Number.isInteger(num) ? priceData.push(num) : null;
      });
    });

  let priceData1 = [];
  try {
    allHistoricalData1 &&
      allHistoricalData1.prices.map((layer1) => {
        return layer1.map((num) => {
          return !Number.isInteger(num) ? priceData1.push(num) : null;
        });
      });
  } catch (err) {
    console.error(err.message);
  }

  let priceData2 = [];
  try {
    allHistoricalData2 &&
      allHistoricalData2.prices.map((layer1) => {
        return layer1.map((num) => {
          return !Number.isInteger(num) ? priceData2.push(num) : null;
        });
      });
  } catch (err) {
    console.error(err.message);
  }

  let priceData3 = [];
  try {
    allHistoricalData3 &&
      allHistoricalData3.prices.map((layer1) => {
        return layer1.map((num) => {
          return !Number.isInteger(num) ? priceData3.push(num) : null;
        });
      });
  } catch (err) {
    console.error(err.message);
  }

  const dataReverse = priceData.reverse();
  const dataReverse1 = priceData1.reverse();
  const dataReverse2 = priceData2.reverse();
  const dataReverse3 = priceData3.reverse();

  // 7 DAYS
  let allData7 = [];
  for (let d = 7; d >= 0; d--) {
    allData7.push({
      date: subDays(new Date(), d).toISOString().substr(0, 10),
      value: dataReverse.slice(0, 8)[d],
      value1: dataReverse1.slice(0, 8)[d],
      value2: dataReverse2.slice(0, 8)[d],
      value3: dataReverse3.slice(0, 8)[d],
    });
  }

  // console.log(allData7);

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

  // TOGGLE COMPARE COINS
  const handleToggleToCompare = (itemId) => {
    try {
      const item = document.getElementById(`displayNone${itemId}`);
      const instruction = document.getElementById("selectInstruction");

      if (idList.length < 3 && item.className === "displayNone") {
        item.className = "toggleDiv";
        idList.push(itemId);
      } else if (item.className === "toggleDiv") {
        item.className = "displayNone";
        idList.splice(idList.indexOf(itemId), 1);
      }

      if (idList.length === 1) {
        instruction.innerHTML = "You have 2 left";
      } else if (idList.length === 2) {
        instruction.innerHTML = "You have 1 left";
      } else if (idList.length === 3) {
        instruction.innerHTML = "You have 0 left";
      } else {
        instruction.innerHTML = "You can select max 3";
      }

      setSelect1(idList[0]);
      setSelect2(idList[1]);
      setSelect3(idList[2]);

      // console.log(idList);
    } catch (err) {
      console.error(err.message);
    }
  };

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

            {/* ADD COIN TO COMPARE */}
            {select1 && <Coin1ToCompare coinOneId={select1} />}
            {select2 && <Coin2ToCompare coinTwoId={select2} />}
            {select3 && <Coin3ToCompare coinThreeId={select3} />}
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
                  <Area dataKey="value1" stroke="#6600ff" fill="url(#color)" />
                  <Area dataKey="value2" stroke="#ff00ff" fill="url(#color)" />
                  <Area dataKey="value3" stroke="#ff0066" fill="url(#color)" />

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
                    dataKey={Math.max("value", "value1", "value2", "value3")}
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
          <h3
            style={{
              color: "#cccccc",
              letterSpacing: "1px",
              marginBottom: "0",
            }}
          >
            SELECT TO COMPARE
          </h3>
          <p id="selectInstruction">You can select max 3</p>
          <div className="sidebarContent">
            <CoinsSidebar
              currentPage={params.id}
              handleToggle={(id) => handleToggleToCompare(id)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoinDetails;
