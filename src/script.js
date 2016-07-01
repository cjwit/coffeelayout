var buildHeader = function(data) {

	$("#breadcrumb-name").text(data.name);

	var header = $("#header-info");

	var category = $("<div></div>").attr("id", "category").text(data.category.toUpperCase());
	header.append(category);

	var name = $("<h1></h1>").attr("id", "name").text(data.name);
	header.append(name);

	var price = $("<div></div>").attr("id", "price")
	var salePrice = $("<span></span>").attr("id", "salePrice").text("$" + String(data.pricing.sale));
	var regularPrice = $("<span></span>").attr("id", "regularPrice").text("regular: $" + String(data.pricing.regular));
	var youSave = $("<span></span>").attr("id", "youSave").text("you save $" + String(data.pricing.regular - data.pricing.sale));
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

var populateData = function(data) {
	buildHeader(data);
}

$.ajax({
	url: "src/mockAPI.js",
	dataType: "text",
	success: function(incoming) {
		var data = JSON.parse(incoming);
		populateData(data);
	}
});
