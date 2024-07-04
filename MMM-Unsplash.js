Module.register("MMM-Unsplash", {
	defaults: {
		opacity: 0.3,
		collections: "",
		width: 1080,
		height: 1920,
		orientation: "portrait",
		apiKey: "",
		updateInterval: 1800,
		divName: "mmm-unsplash-placeholder",
		showDescription: false,
		userPresenceAction: "none",
	},

	start: function() {
		this.load()
	},

	load: function() {
		var self = this

		var req = new XMLHttpRequest()
		var params = {
			collections: self.config.collections,
			orientation: self.config.orientation,
		}

		req.addEventListener("load", function() {
			if (this.status == 200) {
				var obj = JSON.parse(this.responseText)
				var img1 = document.getElementById(self.config.divName + "1")
				var img2 = document.getElementById(self.config.divName + "2")

				img1.addEventListener("load", function() {
					fade(img1, self.config.opacity, function() {
						img1.id = self.config.divName + "2"
					})

					fade(img2, 0, function() {
						img2.id = self.config.divName + "1"
					})
				})

				img1.src = obj.urls.raw + "&w=" + self.config.width + "&h=" + self.config.height + "&fit=crop"

				if (self.config.showDescription) {
					const descElement = document.getElementById("mmm-unsplash-description");

					if (obj.description && obj.description.length > 0) {
						descElement.innerHTML += obj.description;
					}

					if (obj.location.name && obj.location.name > 0) {
						if (obj.description && obj.description.length > 0) {
							descElement.innerHTML += "<br>";
						}
						descElement.innerHTML += obj.location.name;
					}
				}
			}
		})

		req.open("GET", "https://api.unsplash.com/photos/random" + formatParams(params))
		req.setRequestHeader("Accept-Version", "v1")
		req.setRequestHeader("Authorization", "Client-ID " + this.config.apiKey)
		req.send()

		setTimeout(function() {
			self.load();
		}, (self.config.updateInterval * 1000));
	},

	getDom: function() {
		var wrapper = document.createElement("div")
		wrapper.innerHTML = "<img id=\"" + this.config.divName + "1\" style=\"opacity: 0; height:100%; width:100%; object-fit:cover; position: absolute; top: 0\" /><img id=\"" + this.config.divName + "2\" style=\"opacity: 0; height:100%; width:100%; object-fit:cover; position: absolute; top: 0\" />"

		if (this.config.showDescription) {
			const div = document.createElement("div");
			div.style = "max-width: 640px; margin: 60px; bottom: 0px; right: 0px; position: absolute; text-align: right;";

			var sTitle = document.createElement("p");
			sTitle.style = "margin: 0; padding: 0; line-height: 1;";
			sTitle.innerHTML = "PHOTO DESCRIPTION";
			sTitle.className = "xsmall";

			var divider = document.createElement("hr");
			divider.style = "margin: 0px 0px 4px; padding: 0; border-color: rgba(255, 255, 255, 0.6);";

			var desc = document.createElement("p");
			desc.style = "margin: 0; padding: 0; line-height: 1; text-overflow: ellipsis;";
			desc.id = "mmm-unsplash-description";
			desc.className = "small light bright";

			div.appendChild(sTitle);
			div.appendChild(divider);
			div.appendChild(desc);

			wrapper.appendChild(div);
		}
		return wrapper
	}
	notificationReceived: function(notification, payload, sender) {
                var self = this;
        
                if (notification === "USER_PRESENCE") {
                        if (self.config.userPresenceAction === "show") {
                                payload ? self.show() : self.hide();
                        } else if (self.config.userPresenceAction === "hide") {
                                payload ? self.hide() : self.show();
                        }
                }
        },
})

function formatParams( params ){
	return "?" + Object
		.keys(params)
		.map(function(key){
			return key+"="+encodeURIComponent(params[key])
		})
		.join("&")
}

function fade(elem, target, done) {
	var opacity = parseFloat(elem.style.opacity)
	var out = opacity > target
	if (opacity > target) {
		opacity -= 0.05
	} else if (opacity < target) {
		opacity += 0.05
	}

	elem.style.opacity = opacity

	if ((!out && opacity < target) || (out && opacity > target)) {
		setTimeout(function() { fade(elem, target, done) }, 60)
	} else {
		elem.style.opacity = target
		done()
	}
}
