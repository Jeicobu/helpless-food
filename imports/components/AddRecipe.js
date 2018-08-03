import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
import Select from 'react-select';

export default class AddRecipe extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      description: '',
      isOpen: false,
      error: '',
      selectedSurovina: '',
    };
  }

  handleSurovina = (selectedSurovina) => {
    this.setState({ selectedSurovina });
    console.log(`Selected: ${selectedSurovina.label}`);
  }

  onSubmit(e) {
    const { name, description } = this.state;

    e.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }

    Meteor.call('recipes.insert', name, process, type, allergens, difficulty, (err, res) => {
      if (!err) {
        {this.handleModalClose()}
      } else {
        this.setState({
          error: err.reason
        });
      }
    });
  }

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

  handleModalClose() {
    this.setState({
      isOpen: false,
      name: '',
      description: '',
      error: ''
    });
  }

  render() {
    return (
      <div>
        <div onClick={() => this.setState({isOpen: true})}>Add Recipe</div>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Recipe"
          onAfterOpen={() => this.refs.name.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
        >
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="Nazev receptu"
              value={this.state.name}
              ref="name"
              onChange={this.onNameChange.bind(this)}
            />
            <div>
              <Select
                name="duration"
                value={this.state.selectedDuration}
                onChange={this.handleDuration}
                options={[
                  { value: 'brambora', label: 'Brambora' },
                  { value: 'ryze', label: 'Ryze' },
                ]}
              />
            </div>
            <div>
              <Select
                name="difficulty"
                value={this.state.selectedDifficulty}
                onChange={this.handleDifficulty}
                options={[
                  { value: 'brambora', label: 'Brambora' },
                  { value: 'ryze', label: 'Ryze' },
                ]}
              />
            </div>
            <textarea
              placeholder="popis"
              value={this.state.description}
              onChange={this.onDescriptionChange.bind(this)}
            />
            <div>Seznam ingredienci</div>
            <div>
              <Select
                name="surovina"
                value={this.state.selectedSurovina}
                onChange={this.handleSurovina}
                options={[
                  { value: 'brambora', label: 'Brambora' },
                  { value: 'ryze', label: 'Ryze' },
                ]}
              />
            </div>
            <button>Add recipe</button>
            <div onClick={this.handleModalClose.bind(this)}>Close</div>
          </form>
        </Modal>
      </div>
    );
  }
}
