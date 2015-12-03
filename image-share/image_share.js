/* global Images */
//Global (Server & CLient code)
Images = new Mongo.Collection("images")

if (Meteor.isClient) {
  //the name given to the property must match the name on the each object in the template "i"
  Template.images.helpers({ i: Images.find() });
  //Events for a given template
  Template.images.events({
    'click .js-image': function (event) {
      if ($(event.target).css('width') == "50px")
        $(event.target).css('width', "");
      else
        $(event.target).css('width', "50px");

    },
    'click .js-del-image': function (event) {
      var imageID = this._id;
      $('#' + imageID).hide("slow", function () {
        console.log("deleted image: " + imageID);
        Images.remove({ "_id": imageID });
      });
    }
  });
}