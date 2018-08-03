import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Recipes } from '../api/recipes';
import RecipeItem from './recipe';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    this.recipesTracker = Tracker.autorun(() => {
      Meteor.subscribe('recipes');
      const recipes = Recipes.find().fetch();
      this.setState({ recipes });
    });
  }

  componentWillUnmout() {
    this.recipesTracker.stop();
  }


  renderRecipeListItems() {
    return this.state.recipes.map((recipe) => {
      return <RecipeItem key={recipe._id} {...recipe} />;
    });
  }

  render() {
    return (
      <div>
        <div>Recipe list</div>
        <div>{this.renderRecipeListItems()}</div>
      </div>
    );
  }
}
