///Routing
Router.configure({
    layoutTemplate: "ApplicationLayout"
});

Router.route('/', function() {
    this.render('welcome',{
        to:"main"
    });
});

Router.route('/images', function() {
    this.render('navbar',{
        to:"navbar"
    });
    this.render('images',{
        to:"main"
    });
});

Router.route('/image/:_id', function() {
    this.render('navbar',{
        to:"navbar"
    });
    this.render('image',{
        to:"main",
        data: function () {
            return Images.findOne({_id:this.params._id})
        }
    });
});

//  Infinity scroll
Session.set("imageLimit", 8);
var lastScrollTop = 0;
var $window = $(window);
var $document = $(document);
$window.scroll(function() {

    //we are near the end of window
    if ($window.scrollTop() + $window.height() > $document.height() - 100) {
        //Where are we in the page
        var scrollTop = $(this).scrollTop();
        //test if we are going down
        if (scrollTop > lastScrollTop) {
            Session.set("imageLimit", Session.get("imageLimit") + 4);
        }
        lastScrollTop = scrollTop;
    }
});


//config
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});

function getUsername(user_id) {
    var user = Meteor.users.findOne({
        _id: user_id
    });
    if (user) {
        return user.username;
    }
    else {
        return "anon";
    }
}
//the name given to the property must match the name on the each object in the template "i"
Template.images.helpers({
    i: function() {
        if (Session.get("userFilter")) {
            return Images.find({
                createdBy: Session.get("userFilter")
            }, {
                sort: {
                    createdOn: -1,
                    rating: -1
                },
                limit: Session.get("imageLimit")
            })
        }
        else {
            return Images.find({}, {
                sort: {
                    createdOn: -1,
                    rating: -1
                },
                limit: Session.get("imageLimit")
            })
        }
    },
    getUsername: getUsername,
    getFilterUsername: function() {
        return getUsername(Session.get("userFilter"));
    },
    filtering_images: function() {
        if (Session.get("userFilter")) {
            return true;
        }
        else {
            return false;
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
    },
    'click .js-set-image-filter': function(event) {
        Session.set("userFilter", this.createdBy);
    },
    'click .js-unset-image-filter': function() {
        Session.set("userFilter", undefined);
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