import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FilesCollection } from 'meteor/ostrio:files';
import PrivateHeader from './privateHeader/privateHeader';
import Checkbox from './checkbox';
import duration from '../const/recipe-duration';
import type from '../const/recipe-type';
import allergens from '../const/recipe-allergens';
import badges from '../const/recipe-badges';

export default class Settings extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      description: '',
      process: '',
      type: '',
      difficulty: '',
      error: '',
      selectedSurovina: '',
    };
  }

  componentWillMount = () => {
    this.allergensSelectedCheckboxes = new Set();
    this.badgesSelectedCheckboxes = new Set();
  }

  renderDuration() {
    return duration.duration.map((item) => {
      return <option key={item.id} value={item.id}>{item.value}</option>;
    });
  };

  renderType() {
    return type.type.map((item) => {
      return <option key={item.id} value={item.id}>{item.value}</option>;
    });
  };

  toggleAllergensCheckbox = label => {
    if (this.allergensSelectedCheckboxes.has(label)) {
      this.allergensSelectedCheckboxes.delete(label);
    } else {
      this.allergensSelectedCheckboxes.add(label);
    }
  }

  toggleBadgesCheckbox = label => {
    if (this.badgesSelectedCheckboxes.has(label)) {
      this.badgesSelectedCheckboxes.delete(label);
    } else {
      this.badgesSelectedCheckboxes.add(label);
    }
  }

  createAllergensCheckbox = label => (
    <Checkbox
      label={label.value}
      handleCheckboxChange={this.toggleAllergensCheckbox}
      key={label.id}
    />
  )

  createBadgesCheckbox = label => (
    <Checkbox
      label={label.value}
      handleCheckboxChange={this.toggleBadgesCheckbox}
      key={label.id}
    />
  )

  createAllergensCheckboxes = () => (
    allergens.allergens.map(this.createAllergensCheckbox)
  )

  createBadgesCheckboxes = () => (
    badges.badges.map(this.createBadgesCheckbox)
  )

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  onDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }

  onProcessChange(e) {
    this.setState({
      process: e.target.value
    });
  }

  onTypeChange(e) {
    this.setState({
      type: e.target.value
    });
  }

  onDifficultyChange(e) {
    this.setState({
      difficulty: e.target.value
    });
  }

  onSubmit(e) {
    const { name, description, process, type, difficulty } = this.state;
    const allergens = [];
    const badges = [];

    e.preventDefault();

    for (const checkbox of this.allergensSelectedCheckboxes) {
      allergens.push(checkbox);
    }

    for (const checkbox of this.badgesSelectedCheckboxes) {
      badges.push(checkbox);
    }

    Meteor.call('recipes.insert', name, description, process, type, difficulty, allergens, badges, (err, res) => {
      if (!err) {
        console.log('chm');
      } else {
        this.setState({
          error: err.reason
        });
      }
    });
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Settings" />
        <form onSubmit={this.onSubmit.bind(this)}>
          <input onChange={this.onNameChange.bind(this)} type="text" placeholder="Nazev"/><br />
          <textarea onChange={this.onDescriptionChange.bind(this)} placeholder="Popis" /><br />
          <textarea onChange={this.onProcessChange.bind(this)} placeholder="Postup" /><br />
          <select onChange={this.onDifficultyChange.bind(this)}>
            <option value="" defaultValue>Casova narocnost</option>
            {this.renderDuration()}
          </select><br />
          <select onChange={this.onTypeChange.bind(this)}>
            <option value="" defaultValue>Typ receptu</option>
            {this.renderType()}
          </select><br />
          {this.createAllergensCheckboxes()}
          <br />
          <br />
          {this.createBadgesCheckboxes()}
          <button>Add recipe</button>
        </form>
      </div>
    );
  }
}
