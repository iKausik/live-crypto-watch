const COINS_API_URL = process.env.REACT_APP_COINS_API_URL;

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
