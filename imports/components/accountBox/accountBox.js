import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router';

import css from './accountBox.scss';

export default class accountBox extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <div>
        <div className={css.navigationAccount} onClick={() => this.setState({isOpen: true})}>
          <img className={css.navigationAvatar} src="" />
          <div className={css.navigationName}>Jakub Simecek</div>
        </div>
        {this.state.isOpen ? (
          <div className={css.dropdownWrapper}>
            <div className={css.dropdown}>
              <div className={css.account}>
                <img className={css.avatar} src="" />
                <div className={css.accountName}>Jakub Simecek</div>
              </div>
              <Link className={css.link} to="/settings">Settings</Link>
              <div className={css.logout} onClick={() => Accounts.logout()}>Odhlasit</div>
            </div>
            <div className={css.overlay} onClick={() => this.setState({isOpen: false})}/>
          </div>
        ) : null}
      </div>
    );
  }
}
