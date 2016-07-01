var buildHeader = function(data) {
	$("title").text("Whole Latte Love - " + data.name);
	$("#breadcrumb-name").text(data.name);
	var header = $("#header-info");

	var category = $("<div></div>").attr("id", "category").text(data.category.toUpperCase());
	header.append(category);

	var name = $("<h1></h1>").attr("id", "name").text(data.name);
	header.append(name);

	var price = $("<div></div>").attr("id", "price")
	var salePrice = $("<span></span>").attr("id", "salePrice").text("$" + String(data.pricing.sale));
	var regularPrice = $("<span></span>").attr("id", "regularPrice").text("regular: $" + String(data.pricing.regular));
	var youSave = $("<span></span>").attr("id", "youSave").text("save $" + String(data.pricing.regular - data.pricing.sale));
	price.append(salePrice).append(regularPrice).append(youSave);
	header.append(price);

	var rating = $("<div></div>").attr("id", "rating");
	var ratingScore = 3 // Math.ceil(data.rating.average);
	var numberOfEmptyStars = 5 - ratingScore;
	var stars = ""
	for (i = 0; i < ratingScore; i++) {
		stars += "<span class='glyphicon glyphicon-star aria-hidden='true'></span>";
	}
	for (i = 0; i < numberOfEmptyStars; i++) {
		stars += "<span class='glyphicon glyphicon-star-empty aria-hidden='true'></span>";
	}

	rating.html(stars);
	rating.append(" " + data.rating.reviews + " reviews <a href = '#'>add your own</a>")
	header.append(rating);
}

var buildImages = function(imageLinks) {

	// set up initial image displays
	var images = [];
	imageLinks.map(function(url, index) {
		images.push($("<img />").attr("id", "image-" + index).attr("src", url).addClass("img-responsive"));
	})

	var thumbs = $("#thumbnails");
	images.forEach(function(image) {
		thumbs.append(image.clone());
	});

	var main = $("#image");
	main.append(images[0].clone());

	// build clicker functionality on thumbnails
	$("#thumbnails>img").hover(function(element) {
		main.html($(this).clone());
		$(this).addClass('currentImage');
	}, function() {
		main.html($(images[0]).clone());
		$(this).removeClass('currentImage');
	})

	// build zoom functionality on featured
}

var buildProductInfo = function(info) {
	var productInfo = $("#product-information")
	var sections = Object.keys(info);
	sections.forEach(function(section) {
		productInfo.append($("<h2></h2>").addClass('product-info-header').text(section))
		var p = info[section].split("\n").join("</p><p>")
		productInfo.append($("<p></p>").html(p))
	});
}

var addBrand = function(url) {
	$("#header").append("<img id = 'brandLogo' class = 'img-responsive' src = '" + url + "' />");
}

var populateData = function(data) {
	buildHeader(data);
	buildImages(data.images);
	addBrand(data.brandLogoURL)
	buildProductInfo(data.description)
}

$.ajax({
	url: "src/mockAPI.js",
	dataType: "text",
	success: function(incoming) {
		var data = JSON.parse(incoming);
		populateData(data);
	}
});
