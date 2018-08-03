import React from 'react';

import PrivateHeader from './privateHeader/privateHeader';
import RecipeList from './recipe-list';

export default () => {
  return (
    <div>
      <PrivateHeader title="Food For Helpless" />
      <RecipeList />
    </div>
  );
};
