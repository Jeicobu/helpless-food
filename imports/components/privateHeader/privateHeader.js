import React from 'react';
import PropTypes from 'prop-types';
import AccountBox from '../accountBox/accountBox';
import AddRecipe from '../AddRecipe';
import { Link } from 'react-router';

import css from './privateHeader.scss';

const PrivateHeader = (props) => {
  return (
    <div className={css.header}>
      <div className={css.title}>{props.title}</div>
      <AddRecipe />
      <AccountBox />
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string
};

export default PrivateHeader;
