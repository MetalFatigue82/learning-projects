if (Meteor.isServer) {
	Meteor.startup(function () {
		var numberImages = Images.find().count();
		if (numberImages == 0) {
			for (var i = 1; i < 23; i++) {
				Images.insert(
					{
						img_src: "img_" + i + ".jpg",
						img_alt: "image number " + i
					}
					)
			}
		}
		console.log("startup.js says: " + Images.find().count());
	})
}