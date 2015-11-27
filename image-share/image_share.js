if (Meteor.isClient) {
  var img_data = [{
    img_src: "TheWitcher3Skyrim-600x250.jpg",
    img_alt: "witcher atchim away"
  },
  {
    img_src: "TheWitcher3Skyrim-600x250.jpg",
    img_alt: "witcher axing away"
  },
  {
    img_src: "TheWitcher3Skyrim-600x250.jpg",
    img_alt: "witcher swording away"
  }]
  //the name given to the property must match the name on the each object in the template "i"
  Template.images.helpers({i:img_data})
  //Events for a given template
  Template.images.events({
    'click .js-image':function (events) {
      if($(event.target).css('width') == "50px")
        $(event.target).css('width', "")
      else
        $(event.target).css('width', "50px")
    }
  })
}

if (Meteor.isServer) {
  
}
