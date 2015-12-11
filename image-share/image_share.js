/* global Images */
//Global (Server & CLient code)
Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });
  //the name given to the property must match the name on the each object in the template "i"
  Template.images.helpers({
    i: Images.find({}, {
      sort: {
        createdOn: -1,
        rating: -1
      }
    }),
    getUsername: function(user_id) {
      var user = Meteor.users.findOne({_id: user_id});
      if (user) {
        return user.username;
      }
      else {
        return "anon";
      }
    }
  });

  Template.body.helpers({
    username: function() {
      if (Meteor.user()) {
        return Meteor.user().username;
        // return Meteor.user().emails[0].address;
      }
      else {
        return "who are you?";
      }
    }
  });

  //Events for a given template
  Template.images.events({
    'click .js-image': function(event) {
      if ($(event.target).css('width') == "50px")
        $(event.target).css('width', "");
      else
        $(event.target).css('width', "50px");

    },
    'click .js-del-image': function(event) {
      var imageID = this._id;
      $('#' + imageID).hide("slow", function() {
        console.log("deleted image: " + imageID);
        Images.remove({
          "_id": imageID
        });
      });
    },
    'click .js-rate-image': function(event) {
      var rating = $(event.currentTarget).data('userrating');
      Images.update(this["data-id"], {
        $set: {
          "rating": rating
        }
      });
      console.log('star clicked ' + rating);
    },
    'click .js-new-image': function(event) {
      $('#images_add_form').modal('show');
    }
  });
  Template.images_add_form.events({
    'submit .js-save': function(event) {
      var img_src, img_alt;

      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      if (Meteor.user()) {
        Images.insert({
          img_src: img_src,
          img_alt: img_alt,
          createdOn: new Date(),
          createdBy: Meteor.user()._id
        });
      }
      $('#images_add_form').modal('hide');
      console.log("src: " + img_src + " alt: " + img_alt);
      return false;
    }
  });

  // Template.images_add_form.helpers({ i: 
  //     Images.find({}, {sort: {rating: -1}}) 
  //   });
}