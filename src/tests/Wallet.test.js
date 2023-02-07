import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes da Wallet', () => {
  test('Testa renderização', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    screen.getByRole('button', { name: /adicionar despesa/i });
  });

  test('testa o fetch da API', async () => {
    jest.spyOn(global, 'fetch');
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
