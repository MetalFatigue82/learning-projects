/////
// Routing
/////
Router.configure({
    layoutTemplate: "ApplicationLayout"
});

Router.route('/', function () {
    this.render('navbar', {
        to: "navbar"
    });
    this.render('website_list', {
        to: "main"
    });
});

Router.route('/details/:_id', function () {
    this.render('navbar', {
        to: "navbar"
    });
    this.render('website_details', {
        to: "main",
        data: function () {
            var site = Websites.findOne({_id:this.params._id});
            return site;
        }
    });
});

/////
// config
/////
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////
// helper/util functions
/////
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

/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
    websites: function () {
        return Websites.find({}, {
                sort: {
                    upVote: -1,
                    downVote: 1,
                    createdOn: -1,
                }});
    }
});
// Template.website_details.helpers({
//     site: function () {
//         return this;
//     }
// });


// helper function that returns the difference between upvotes and downvotes
Template.website_item.helpers({
    getUsername: getUsername,
    totalVotes: function () {
        var upVote = this.upVote || 0;
        var downVote = this.downVote || 0;
        return upVote-downVote;
    },
    downVotes: function () {
        return this.downVote || 0;
    },
    upVotes: function () {
        return this.upVote || 0;
    }
});

Template.website_comments.helpers({
    getUsername: getUsername
});

/////
// template events 
/////

Template.website_item.events({
    "click .js-upvote": function (event) {
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        var currentUpVote = this.upVote || 0
        Websites.update(website_id, {
            $set: {
                upVote: currentUpVote + 1
            }
        });
        return false;// prevent the button from reloading the page
    },
    "click .js-downvote": function (event) {

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        var currentDownVote = this.downVote || 0;
            
        Websites.update(website_id, {
            $set: {
                downVote: currentDownVote + 1
            }
        });

        return false;// prevent the button from reloading the page
    }
})

Template.website_form.events({
    "change #url":function () {
        //On the client
        var url = event.target.value;
        if (url.indexOf("http://") == -1) {
            url = "http://" + url;
        }
        Meteor.call('remoteGet',url,{
        //...options...
        },function(error,response){
            //if an error happened, error argument contains the details
            if (error) {
                return false;
            }
            //if the request succeeded, the response will contain the response of the server request
            var title = $(response.content).filter('title').text();
            var description = $(response.content).filter('meta[name=description]').attr("content");
            
            $('#title').val(title);
            $('#description').val(description);
        })
    }
});

Template.website_form.events({
    "click .js-toggle-website-form": function (event) {
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form": function (event) {
        var url = event.target.url.value;
        var title, description;

        title = event.target.title.value;
        description = event.target.description.value;
        if (Meteor.user()) {
            Websites.insert({
                title: title,
                url: url,
                description: description,
                createdOn: new Date(),
                createdBy: Meteor.user()._id
            });
        }


        return false;// stop the form submit from reloading the page

    }
});

Template.website_comments.events({
    "submit .js-toggle-website-comment-form": function (event) {
        var userID = Meteor.user() ? Meteor.user()._id : undefined;
        var comment = event.target.comment.value;
        event.target.comment.value='';
        Websites.update(this._id, {
            $push: {
                comments: {
                    comment:comment,
                    postedBy: userID
                }
            }
        });
        return false;
    }
});

//On the client
Meteor.call('remoteGet','http://remoteurl.com/',{
  
},function(error,response){
  //if an error happened, error argument contains the details
  //if the request succeeded, the response will contain the response of the server request
})