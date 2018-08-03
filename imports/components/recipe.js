import React from 'react';

export default class RecipeItem extends React.Component {
  render() {
    return (
      <div>
        <div><img /></div>
        <div>{this.props.name}</div>
        <div>{this.props.description}</div>
        <div>{this.props.type}</div>
        <div>{this.props.difficulty}</div>
        <div>{this.props.badges}</div>
        <div>{this.props.allergens}</div>
      </div>
    )
  }
}
