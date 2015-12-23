/* global Images */
//Global (Server & CLient code)
Images = new Mongo.Collection("images");

//set up security on Images collection
Images.allow({
  insert: function(userId, doc) {
    console.log('teste security');
    if (Meteor.user()) { //logged in
      if (doc.createdBy != userId) { //userid the same of the document
        return false;
      }
    }
    else {
      return false;
    }
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
})