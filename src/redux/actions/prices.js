export const GET_PRICES = 'GET_PRICES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

const url = 'https://economia.awesomeapi.com.br/json/all';

export function getPrices(expense, prices) {
  return {
    type: GET_PRICES,
    payload: {
      exchangeRates: prices,
      ...expense,
    },
  };
}

export function fetchPrices(expense) {
  return (dispatch) => (
    fetch(url).then((response) => response.json())
      .then((prices) => {
        delete prices.USDT;
        dispatch(getPrices(expense, prices));
      })
  );
}

export function deleteExpenses(payload) {
  return {
    type: DELETE_EXPENSES,
    payload,
  };
}
