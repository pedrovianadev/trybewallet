export const GET_CURRENCIES = 'GET_CURRENCIES';

const url = 'https://economia.awesomeapi.com.br/json/all';

export function getCurrencies(currencies) {
  return {
    type: GET_CURRENCIES,
    payload: currencies,
  };
}

export function fetchCurrencies() {
  return (dispatch) => (
    fetch(url)
      .then((response) => response.json())
      .then((currencies) => {
        const curFiltered = Object.keys(currencies).filter((coin) => coin !== 'USDT');
        dispatch(getCurrencies(curFiltered));
      })
  );
}
