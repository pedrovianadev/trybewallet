import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    currency: 'BRL',
    total: 0,
  };

  render() {
    const {
      currency,
      total,
    } = this.state;
    const { email } = this.props;

    return (
      <div>
        <div>
          <p>
            Total de despesas:
          </p>
          <p data-testid="total-field">
            { total }
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
});

export default connect(mapStateToProps)(Header);
