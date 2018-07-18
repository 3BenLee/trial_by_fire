// Ajax request

const $merchContainer = $('#merch-container');

$(function() {

	$.ajax({
		type: 'GET',
		url: 'http://localhost:5000/items',
		success: function(items) {
			const itemsList = JSON.parse(items);
			const merchData = itemsList['data'];

			// Loop through JSON and create variables
			$.each(merchData, function(i, merch){
				const name = merchData[i]['name'];
				const price = merchData[i]['price'];
				const image = merchData[i]['image'];
				const likeCount = merchData[i]['like_count'];
				////////////////////const commentCount = merchData[i]['comment_count'];
				const isSoldOut = merchData[i]['isSoldOut'];
				const heartIcon = document.createElement("IMG");
				heartIcon.setAttribute("src","./images/like_icon.png");
				
				// Create a new div and add merchandise data 
				$merchContainer.append( "<div class= merch-pieces " + " id='"+ i +"'>" 
					+ "<img class= merch-image src='" + image + "'>"
					+ "<h1>" + name + "</h1>"
					+ "<h2>" + "￥" + price + "</h2>"
			 		 +  '</div>');
					// $merchContainer.append("<div class= merch-pieces " + " id='"+ i +"'>" 
					// + "<img class= merch-image src='" + image + "'>"+ "<br/>"
					// + "<h1>" + name + "</h1>"
					// + "<h2>" + price + "</h2>"
			 	// 	+ '</div>');
				
				// Handles like counts (if count is 0 do not display) 
				if (likeCount) {;
					const h3 = document.createElement("H3");
					const likes = document.createTextNode(likeCount);

					h3.appendChild(likes);
					h3.prepend(heartIcon);
					h3.className = "h3tag";
					document.getElementById(i).appendChild(h3);
				}else{
					const empty = document.createElement("H3");
					empty.prepend(heartIcon);
					empty.className = "h3TagEmpty";
					document.getElementById(i).appendChild(empty);
				}

				// Adds red corner tag to sold out items
				if (isSoldOut) {
					const x = document.createElement("IMG");
					 x.setAttribute("src","./images/sold_tag.png");
					 x.className = "merch-image-sold";
					 document.getElementById(i).prepend(x);
				}

				// Connects the correct home page item to detail page
				$(document).ready(function(){
					$(document.getElementById(i)).on('click',function(){
						window.open("./detail_page.html?id="+i);	
					});
				});
			});
		}
	});
});

  // "id": "1",
  //     "name": "men1",
  //     "description": "size free 1",
  //     "like_count": 91,
  //     "comment_count": 59,
  //     "price": 51,
  //     "isSoldOut": false,
  //     "shippingFee": "送料込み",
  //     "image": "http://dummyimage.com/400x400/000/fff?text=men1"
  //   },


