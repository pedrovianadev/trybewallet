import { screen } from '@testing-library/react';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import rootReducer from '../redux/reducers';
import App from '../App';

const emailInvalid = 'testandoele';
const passInvalid = '12312';
const emailValid = 'pedroviana.developer13@gmail.com';
const passValid = '123123';
const emailInput = 'email-input';
const passInput = 'password-input';

describe('Testes da tela de login', () => {
  test('Teste dos elementos', () => {
    const initialEntries = ['/'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    expect(screen.getByTestId(emailInput)).toBeInTheDocument();
    expect(screen.getByTestId(passInput)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('Testa se o botão fica disabled', () => {
    const initialEntries = ['/'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passInput);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, emailInvalid);
    userEvent.type(password, passInvalid);
    userEvent.clear(email);
    userEvent.clear(password);
    expect(button).toBeDisabled();

    userEvent.type(email, emailValid);
    userEvent.type(password, passValid);
    expect(button).toBeEnabled();
  });

  test('Testa se a store recebe o email', () => {
    const initialEntries = ['/'];
    const initialState = {
      user: {
        email: '',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries, store });
    const inputEmail = screen.getByTestId(emailInput);
    const inputPassword = screen.getByTestId(passInput);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, emailValid);
    userEvent.type(inputPassword, passValid);
    expect(button).toBeEnabled();

    userEvent.click(button);
    const currentState = store.getState();
    expect(currentState.user).toEqual({ email: emailValid });
    expect(history.location.pathname).toBe('/carteira');
  });
});
