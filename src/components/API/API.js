const COINS_API_URL = process.env.REACT_APP_COINS_API_URL;
const SINGLE_COIN_API_URL = process.env.REACT_APP_SINGLE_COIN_API_URL;

// GET ALL COINS DATA
export const getAllCoins = async () => {
  try {
    const res = await fetch(`${COINS_API_URL}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// GET SINGLE COIN DATA
export const singleCoin = async (id) => {
  try {
    const res = await fetch(
      `${SINGLE_COIN_API_URL}/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
};

// GET HISTORICAL DATA OF A SINGLE COIN
export const historialPriceData = async (id) => {
  try {
    const res = await fetch(
      `${SINGLE_COIN_API_URL}/${id}/market_chart?vs_currency=usd&days=366&interval=daily`
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
};
