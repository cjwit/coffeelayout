var buildHeader = function(data) {
	$("title").text("Whole Latte Love - " + data.name);
	$("#breadcrumb-name").text(data.name);
	var header = $("#header-info");

	var category = $("<div></div>").attr("id", "category").text(data.category.toUpperCase());
	header.append(category);

	var name = $("<h1></h1>").attr("id", "name").text(data.name);
	header.append(name);

	// create price information
	var price = $("<div></div>").attr("id", "price");
	var salePrice = $("<span></span>").attr("id", "salePrice").text("$" + String(data.pricing.sale));
	var regularPrice = $("<span></span>").attr("id", "regularPrice").text("regular: $" + String(data.pricing.regular));
	var youSave = $("<span></span>").attr("id", "youSave").text("save $" + String(data.pricing.regular - data.pricing.sale));
	price.append(salePrice).append(regularPrice).append(youSave);
	header.append(price);

	// generate rating stars dynamically from score
	var rating = $("<div></div>").attr("id", "rating");
	var ratingScore = Math.ceil(data.rating.average);
	var numberOfEmptyStars = 5 - ratingScore;
	var stars = ""
	for (i = 0; i < ratingScore; i++) {
		stars += "<span class='glyphicon glyphicon-star aria-hidden='true'></span>";
	}
	for (i = 0; i < numberOfEmptyStars; i++) {
		stars += "<span class='glyphicon glyphicon-star-empty aria-hidden='true'></span>";
	}

	rating.html(stars);
	rating.append(" " + data.rating.reviews + " reviews <a href = '#'>add your own</a>");
	header.append(rating);
}

var buildImages = function(imageLinks) {

	// set up initial image displays
	var images = [];
	imageLinks.map(function(url, index) {
		images.push($("<img />").attr("id", "image-" + index).attr("src", url).addClass("img-responsive"));
	})

	// create thumbnails and mobile thumbnails
	var thumbs = $("#thumbnails");
	var mobileThumbs = $("#mobile-thumbs");
	images.forEach(function(image) {
		thumbs.append(image.clone());
		mobileThumbs.append(image.clone().removeClass("img-responsive"));
	});

	var main = $("#image-main");
	main.append(images[0].clone());

	// build clicker functionality on thumbnails
	$("#thumbnails>img, #mobile-thumbs>img").hover(function(element) {
		main.html($(this).clone().addClass("img-responsive"));
		$(this).addClass('currentImage');
	}, function() {
		main.html($(images[0]).clone());
		$(this).removeClass('currentImage');
	})
}

// add brand image to header
var addBrand = function(url) {
	$("#header").append("<img id = 'brandLogo' class = 'img-responsive' src = '" + url + "' />");
}

var buildProductInfo = function(info) {
	var infoDiv = $("#product-information");
	var productInfo = $("<div></div>").attr("id", "description");

	// generate product info based on incoming data and structure
	var sections = Object.keys(info);
	sections.forEach(function(section) {
		productInfo.append($("<h2></h2>").addClass('product-info-header').text(section));
		var p = info[section].split("\n").join("</p><p>");
		productInfo.append($("<p></p>").html(p));
	});

	// set clicker
	$("#see-overview").click(function() {
		$("#product-menu").children().removeClass("active");
		$(this).addClass("active");
		infoDiv.html(productInfo);
	})

	infoDiv.html(productInfo);
}

var buildReviews = function(reviews) {
	var infoDiv = $("#product-information");

	// generate reviews from incoming data
	var reviewDiv = $("<div></div>").attr("id", "description");
	reviews.forEach(function(review) {
		var header = review.author.toUpperCase();
		header += ": " + review.rating;
		header += " <small>" + new Date(review.date).toLocaleDateString() + "</small>";
		reviewDiv.append($("<h4></h4>").addClass('product-info-header').html(header));
		var p = review.comments.split("\n").join("</p><p>");
		reviewDiv.append($("<p></p>").html(p));
	});

	// set clicker
	$("#see-reviews").click(function() {
		$("#product-menu").children().removeClass("active");
		$(this).addClass("active");
		infoDiv.html(reviewDiv);
	})
}

var buildSpecs = function(spec) {
	// specs built from copy of current webpage
	var infoDiv = $("#product-information");
	var specDiv = $("<div></div>").attr("id", "description").html(spec);

	// set clicker
	$("#see-specs").click(function() {
		$("#product-menu").children().removeClass("active");
		$(this).addClass("active");
		infoDiv.html(specDiv);
	});
}

var buildVideos = function() {
	var infoDiv = $("#product-information");
	var videoDiv = $("<div></div>").attr("id", "description");

	// create mock videos and link them to modal displays
	for (i = 0; i < 10; i++) {
		var thumb = $("<div></div>").addClass("video-thumb");
		thumb.append($("<div />").addClass("mock-video")).attr({"data-toggle": "modal", "data-target": "#watch-video"});
		thumb.append($("<div></div>").addClass("video-description text-center").text("Great video title!"));
		videoDiv.append(thumb);
	}

	var modal = $("<div class = 'modal fade' id = 'watch-video' tabindex = '-1' role = 'dialog' aria-labelledby = 'watch-video-label'></div>");
	modal.append($("<div class = 'modal-dialog' role = 'document'><div class = 'modal-content'><iframe width='560' height='315' src='https://www.youtube.com/embed/PPJVjJDptpY' frameborder='0' allowfullscreen></iframe></div></div>"));
	videoDiv.append(modal);

	// set clicker
	$("#see-videos").click(function() {
		$("#product-menu").children().removeClass("active");
		$(this).addClass("active");
		infoDiv.html(videoDiv);
	});
}

var buildRelated = function() {
	var infoDiv = $("#product-information");
	var relatedDiv = $("<div></div>").attr("id", "related-items");

	// create mock related items
	for (i = 0; i < 3; i++) {
		var itemRow = $("<div />").addClass("row");
		for (j = 0; j < 3; j++) {
			var thumb = $("<div></div>").addClass("item-thumb col-sm-4");
			thumb.append($("<img src = 'resources/coffeegrinder.jpg'/>").addClass("item-photo img-responsive"));
			thumb.append($("<div></div>").addClass("item-title text-center").text("Coffee thinger"));
			thumb.append($("<div></div>").addClass("item-price text-center").html("<span class='glyphicon glyphicon-tag' aria-hidden='true'></span> $14.99"));
			itemRow.append(thumb);
		}
		relatedDiv.append(itemRow);
	}

	// set clicker
	$("#see-related").click(function() {
		$("#product-menu").children().removeClass("active");
		$(this).addClass("active");
		infoDiv.html(relatedDiv);
	});
}

// largely identical to previous function, but separate for potential later formatting decisions
var buildAlsoBought = function() {
	var infoDiv = $("#product-information");
	var relatedDiv = $("<div></div>").attr("id", "also-bought-items");

	for (i = 0; i < 3; i++) {
		var itemRow = $("<div />").addClass("row");
		for (j = 0; j < 3; j++) {
			var thumb = $("<div></div>").addClass("item-thumb col-sm-4");
			thumb.append($("<img src = 'resources/glen-edith.png'/>").addClass("item-photo img-responsive"));
			thumb.append($("<div></div>").addClass("item-title text-center").text("Thing for Coffee"));
			thumb.append($("<div></div>").addClass("item-price text-center").html("<span class='glyphicon glyphicon-tag' aria-hidden='true'></span> $14.99"));
			itemRow.append(thumb);
		}
		relatedDiv.append(itemRow);
	}

	// set clicker
	$("#see-also-bought").click(function() {
		$("#product-menu").children().removeClass("active");
		$(this).addClass("active");
		infoDiv.html(relatedDiv);
	});
}

// initialize the DOM manipulation
var populateData = function(data) {
	buildHeader(data);
	buildImages(data.images);
	addBrand(data.brandLogoURL);
	buildProductInfo(data.description);
	buildReviews(data.reviews);
	var specHTML = "<table class='table table-striped style-01'><tbody><tr><td colspan='2' class='t-head'>Misc Data</td></tr><tr><td>Manufacturer:</td><td>Gaggia</td></tr><tr><td>Model:</td><td>1003380</td></tr><tr><td colspan='2' class='t-head'>Specifications</td></tr><tr><td>Dimension - Width (Inches):</td><td>11</td></tr><tr><td>Dimension - Height (Inches):</td><td>15.2</td></tr><tr><td>Dimension - Depth (Inches):</td><td>16.8</td></tr><tr><td>Weight (lbs):</td><td>43</td></tr><tr><td>Watts:</td><td>1500</td></tr><tr><td>Volts:</td><td>120</td></tr><tr><td colspan='2' class='t-head'>Housing</td></tr><tr><td>Housing Materials:</td><td>Stainless Steel/Plastic</td></tr><tr><td>Bean Hopper Material:</td><td>Plastic</td></tr><tr><td>Drip Tray Material:</td><td>Plastic</td></tr><tr><td>Drip Tray Cover Material:</td><td>StainlessSteel</td></tr><tr><td>Removable Hopper:</td><td>No</td></tr><tr><td>Drip Tray Capacity (Oz):</td><td>10</td></tr><tr><td>Ground Coffee Container Material:</td><td>Plastic</td></tr><tr><td>Drain Line Adaptable:</td><td>No</td></tr><tr><td>Spent Coffee Capacity (Dregs Drawer):</td><td>15</td></tr><tr><td>Easy To Rotate:</td><td>No</td></tr><tr><td>TallLegs:</td><td>No</td></tr><tr><td>Power Cord Length (Inches):</td><td>36</td></tr><tr><td colspan='2' class='t-head'>Cup Height</td></tr><tr><td>Adjustable Height:</td><td>Yes</td></tr><tr><td>High (Inches):</td><td>6.5</td></tr><tr><td>Low (Inches):</td><td>3</td></tr><tr><td colspan='2' class='t-head'>One Touch cappuccino</td></tr><tr><td>One Touch Cappuccino:</td><td>Yes</td></tr><tr><td>One Touch Cappuccino Or Milk Carafe:</td><td>Milk Carafe</td></tr><tr><td>Adjustable Froth Quality:</td><td>Yes</td></tr><tr><td>Height (Inches):</td><td>5.5</td></tr><tr><td>Separate Manual Steam Wand:</td><td>Yes</td></tr><tr><td>Programmable:</td><td>Yes</td></tr><tr><td>Milk Carafe Type:</td><td>Plastic Attachable</td></tr><tr><td>Self-Cleaning:</td><td>Yes</td></tr><tr><td>Dishwasher Safe:</td><td>No</td></tr><tr><td colspan='2' class='t-head'>Frothing Wand</td></tr><tr><td>Material:</td><td>Plastic</td></tr><tr><td>Steam Wand Style:</td><td>Commercial Style</td></tr><tr><td>Wand Movement:</td><td>Pivot Side to Side</td></tr><tr><td>Usable Length (Inches):</td><td>2.5</td></tr><tr><td>Height Off Counter (Inches):</td><td>5</td></tr><tr><td>Optional Cappucinotore:</td><td>No</td></tr><tr><td>Number Of Holes:</td><td>1</td></tr><tr><td>No Burn Wand:</td><td>Yes</td></tr><tr><td>Optional Steam Tips Or Wands:</td><td>No</td></tr><tr><td colspan='2' class='t-head'>Water Source</td></tr><tr><td>Reservoir Or Plumbed:</td><td>Reservoir</td></tr><tr><td>Water Filter Type:</td><td>Mavea</td></tr><tr><td>Reservoir Capacity (Oz):</td><td>54</td></tr><tr><td>Reservoir Material:</td><td>Plastic</td></tr><tr><td>Reservoir Access:</td><td>Top</td></tr><tr><td>Reservoir Removable:</td><td>Yes</td></tr><tr><td>Water Level Visible:</td><td>No</td></tr><tr><td>Water Filter:</td><td>Mavea</td></tr><tr><td colspan='2' class='t-head'>Controls</td></tr><tr><td>Adjustable Coffee Strength:</td><td>Yes</td></tr><tr><td>Number Of Grind Settings:</td><td>10</td></tr><tr><td>Type Of Controls:</td><td>Push Button</td></tr><tr><td>Display Type:</td><td>LCD</td></tr><tr><td>Programmable Brewing:</td><td>Yes</td></tr><tr><td>Temperature Control:</td><td>Yes</td></tr><tr><td>Adjustable Coffee Dosage:</td><td>Yes</td></tr><tr><td>Digital Display:</td><td>Yes</td></tr><tr><td>Clock / Timer:</td><td>Yes</td></tr><tr><td>Coffee Dosage Quantity:</td><td>7-10.5</td></tr><tr><td>Cup Volume Control:</td><td>Yes</td></tr><tr><td>Aroma / Flow Control:</td><td>Yes</td></tr><tr><td>Auto Shut Off:</td><td>Yes</td></tr><tr><td>Bypass Doser:</td><td>Yes</td></tr><tr><td>Pre-Infusion:</td><td>Yes</td></tr><tr><td>Low Water Warning:</td><td>Yes</td></tr><tr><td>Energy Savings:</td><td>Yes</td></tr><tr><td>Decalcification Warning Indicator:</td><td>Yes</td></tr><tr><td>Multiple Programmability:</td><td>Yes</td></tr><tr><td>Pressure Gauges:</td><td>No</td></tr><tr><td>Brew Temperature Display:</td><td>No</td></tr><tr><td colspan='2' class='t-head'>Cup Warmer</td></tr><tr><td>Material:</td><td>StainlessSteel</td></tr><tr><td>Size (Inches):</td><td>4x6</td></tr><tr><td>Passive / Active:</td><td>Active</td></tr><tr><td colspan='2' class='t-head'>Brew Group</td></tr><tr><td>Material:</td><td>Plastic</td></tr><tr><td>Type:</td><td>Automatic</td></tr><tr><td>Preheat:</td><td>No</td></tr><tr><td>Removable:</td><td>Yes</td></tr><tr><td>Self-Cleaning:</td><td>Yes</td></tr><tr><td colspan='2' class='t-head'>Boiler Data</td></tr><tr><td>Number Of Boilers:</td><td>2</td></tr><tr><td>Brew And Steam Simultaneously:</td><td>No</td></tr><tr><td>Rapid Steam:</td><td>Yes</td></tr><tr><td colspan='2' class='t-head'>Brew Boiler Data</td></tr><tr><td>Brew Boiler Type:</td><td>Thermoblock</td></tr><tr><td>Brew Boiler Watts:</td><td>1400</td></tr><tr><td>Brew boiler Volume (Oz):</td><td>Low</td></tr><tr><td>Brew Boiler Material:</td><td>Stainless Steel Lined Aluminum</td></tr><tr><td>Brew Boiler Heater Location:</td><td>External</td></tr><tr><td>Insulated:</td><td>No</td></tr><tr><td colspan='2' class='t-head'>Steam Boiler Data</td></tr><tr><td>Insulated:</td><td>No</td></tr><tr><td>Steam Boiler Type:</td><td>Thermoblock</td></tr><tr><td>Steam Boiler Watts:</td><td>1400</td></tr><tr><td>Steam Boiler Volume (Oz):</td><td>Low</td></tr><tr><td>Steam Boiler Material:</td><td>Stainless Steel Lined Aluminum</td></tr><tr><td>Steam Boiler Heater Location:</td><td>External</td></tr><tr><td colspan='2' class='t-head'>Pump Data</td></tr><tr><td>Pump Type:</td><td>Vibration</td></tr><tr><td>Maximum Pressure (Bar):</td><td>15</td></tr><tr><td>Self Priming Pump:</td><td>Yes</td></tr><tr><td colspan='2' class='t-head'>Grinder Data</td></tr><tr><td>Number Of Grind Settings:</td><td>8</td></tr><tr><td>Hopper Capacity (Oz):</td><td>12</td></tr><tr><td>Burr Type:</td><td>Flat</td></tr><tr><td>Burr Material:</td><td>Ceramic</td></tr><tr><td>Freshness Lid:</td><td>Yes</td></tr><tr><td colspan='2' class='t-head'>Performance</td></tr><tr><td>Initial Heat Up (Seconds):</td><td>72</td></tr><tr><td>Recommended Heat Up Time (Seconds):</td><td>72</td></tr><tr><td>Brew Temp (F) (2 Oz Shot In Paper Cup):</td><td>167</td></tr><tr><td>Brew Time for 2 Oz:</td><td>18</td></tr><tr><td>Brew Temp (F) (8 Oz Shot In Paper Cup):</td><td>167</td></tr><tr><td>Brew Temp for 8 Oz:</td><td>57</td></tr><tr><td>Time To Produce Steam (Seconds):</td><td>15</td></tr><tr><td>Time To Steam 8 Oz Milk (Seconds):</td><td>81</td></tr><tr><td>Maximum Effective Frothing Duration With Stock Steam Tip (Seconds):</td><td>120</td></tr><tr><td>Hot Water Temp 8 Oz (F):</td><td>165</td></tr><tr><td>Hot Water Time 8 Oz (Seconds):</td><td>53</td></tr><tr><td>Hot Water Recovery Time (Seconds):</td><td>0</td></tr><tr><td>Sound Level - Brewing (Db):</td><td>66</td></tr><tr><td>Sound Level - Grinding (Db):</td><td>70</td></tr><tr><td colspan='2' class='t-head'>Maintenance</td></tr><tr><td>Maintenance Alerts:</td><td>Yes</td></tr><tr><td>Descaler Used:</td><td>Gaggia Descaler</td></tr><tr><td>Water Filter:</td><td>Mavea</td></tr><tr><td colspan='2' class='t-head'>Details</td></tr><tr><td>Warranty (Years):</td><td>1</td></tr><tr><td>Country Of Manufacture:</td><td>Italy</td></tr><tr><td>NSF Certified:</td><td>No</td></tr><tr><td>Recommended Applications:</td><td>Home Use/Office</td></tr><tr><td>Available Internationally:</td><td>Yes</td></tr><tr><td colspan='2' class='t-head'>Service provided</td></tr><tr><td>Repairs By:</td><td>Whole Latte Love</td></tr><tr><td>Contact Number:</td><td>1-888-411-5282</td></tr></tbody></table>"
	buildSpecs(specHTML);
	buildRelated();
	buildAlsoBought();
	buildVideos();
}

// get the info!
$.ajax({
	url: "src/mockAPI.js",
	dataType: "text",
	success: function(incoming) {
		var data = JSON.parse(incoming);
		populateData(data);
	}
});
