import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  verifyInputs = () => {
    const { email, password } = this.state;
    const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    const passLenght = 6;
    return regexEmail.test(email) && password.length >= passLenght;
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isDisabled: !this.verifyInputs(),
      });
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    if (this.verifyInputs()) {
      dispatch(userEmail(email));
      history.push('/carteira');
    }
  };

  render() {
    const {
      email,
      password,
      isDisabled,
    } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="email-input"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              placeholder="Coloque seu Email"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              placeholder="Defina sua senha"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
