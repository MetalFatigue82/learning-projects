if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Images.find().count() == 0) {
			Images.insert(
				{
					img_src: "TheWitcher3Skyrim-600x250.jpg",
					img_alt: "witcher atchim away"
				}
			)
			Images.insert(
				{
					img_src: "TheWitcher3Skyrim-600x250.jpg",
					img_alt: "witcher axing away"
				}
			)
		}
	}) 
}