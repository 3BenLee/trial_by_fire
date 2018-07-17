// Ajax request

const $itemContainer = $('#item-container');

//make function to parse URl and grab id (use window.location.href)
var url = window.location.href;
function getId(str) {
    return str.split('=')[1];
}
var myId = getId(url);
console.log(myId);
$(function() {

	$.ajax({
		type: 'GET',
		url: 'http://localhost:5000/items',
		success: function(items) {
			const itemsList = JSON.parse(items);
			const merchData = itemsList['data'];
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
//instead of i itll be id 
				const name = merchData[myId]['name'];
				const price = merchData[myId]['price'];
				const image = merchData[myId]['image'];
				const likeCount = merchData[myId]['like_count'];
				const isSoldOut = merchData[myId]['isSoldOut'];
				var heartImage = document.createElement("IMG");
				heartImage.setAttribute("src","./images/like_icon.png");
			
				$itemContainer.append( "<div class= merch-pieces " + " id='"+ myId +"'>" 
					+ "<img class= merch-image src='" + image + "'>"+ "<br/>"
					+ "<h1>" + name + "</h1>"
					+ "<h2>" + price + "</h2>"
			 		 +  '</div>');
			
				if (likeCount) {;
					var h3 = document.createElement("H3");
					var likes = document.createTextNode(likeCount);

					h3.appendChild(likes);
					h3.prepend(heartImage);
					h3.className = "h3tag";
					document.getElementById(myId).appendChild(h3);
				}
				else{
					var empty = document.createElement("H3");
					empty.prepend(heartImage);
					empty.className = "h3TagEmpty";
					document.getElementById(myId).appendChild(empty);
				}
				if (isSoldOut) {
					var x = document.createElement("IMG");
					 x.setAttribute("src","./images/sold_tag.png");
					 x.className = "merch-image-sold";
					 document.getElementById(myId).prepend(x);
				}

			
		
		}
	});
});

// var myRequest = new XMLHttpRequest();
// myRequest.open('GET', 'http://localhost:5000/items')
// myRequest.onLoad = function() {
// 	console.log(myRequest.responseText);
// };
// myRequest.send();

