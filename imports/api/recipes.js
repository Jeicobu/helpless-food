import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
  Meteor.publish('recipes', function () {
    return Recipes.find({userId: this.userId});
  });
}

Meteor.methods({
  'recipes.insert'(name, description, process, type, difficulty, allergens, badges, favorite) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      name: {
        type: String,
        label: 'Nazev receptu',
        max: 200,
        min: 3,
        required: true
      },
      description: {
        type: String,
        label: 'Popis',
        max: 300,
        required: false
      },
      process: {
        type: String,
        label: 'Postup',
      },
    }).validate({ name, process });

    Recipes.insert({
      name,
      description,
      process,
      type,
      difficulty,
      allergens,
      badges,
      favorite: false,
      userId: this.userId,
    });
  },
});
