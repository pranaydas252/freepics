$(document).ready(function(){

	const client_id = "33ac7d8d1b2a0cce79bd718911215aa60641977b8f886dbb3b1b5106fa3cd663";

	var query = "";
	var page = 1;

	$("#form").submit(function(){
		query = $("#search").val();
		req(query);
		return false;
	});

	function req(query)
	{
		var q = "https://api.unsplash.com/search/collections?&client_id="+client_id+"&page="+page+"&query="+query;
		$.get(q,function(data,status){

			var length = data.results.length;

			if (length==0)
			{
				var err = $('<img src="images/error.jpg" id="error" class="img-thumbnail">');
				err.appendTo("#photos");
			}
			else
			{
				for (var i = 0; i < length; i++) 
				{
					var thumb = data.results[i].cover_photo.urls.small;
					var down = data.results[i].cover_photo.links.download;
					
					var img = $('<img id="dynamic" class="float-left img-thumbnail">');

					img.attr("src",thumb);
					img.appendTo("#photos");

					img.click(function(){
						window.open(down,"_blank");
					});
				}

				page = page + 1;
			}

		});

		$(window).scroll(function() {
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		       req(query);
		   }
		});
	}

	$("#search").change(function(){
		$("#photos").empty();
	});
});