import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchPrices } from '../redux/actions';

const INITIAL_STATE = {
  description: '',
  tag: 'Alimentação',
  value: '',
  method: 'Dinheiro',
  currency: 'USD',
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleInputs = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchPrices(this.state));
    this.setState({
      ...INITIAL_STATE,
    });
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleInputs }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleInputs }
            >
              {
                currencies.map(
                  (coin) => (<option key={ coin } value={ coin }>{ coin }</option>),
                )
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleInputs }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleInputs }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleInputs }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
