import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  calculateTotal = () => {
    const { expenses } = this.props;
    let total = 0;
    total = expenses.reduce((account, current) => {
      const value = current.value * current.exchangeRates[current.currency].ask;
      const actualValue = parseFloat(value) + parseFloat(account);
      return actualValue.toFixed(2);
    }, 0);
    return total;
  };

  render() {
    const {
      currency,
    } = this.state;
    const { email } = this.props;

    return (
      <div>
        <div>
          <p>
            Total de despesas:
          </p>
          <p data-testid="total-field">
            { this.calculateTotal() }
          </p>
          <p data-testid="header-currency-field">
            { currency }
          </p>
          <p data-testid="email-field">
            { email }
          </p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  currency: '',
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
