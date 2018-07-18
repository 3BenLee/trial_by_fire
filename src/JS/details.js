const $itemContainer = $('#item-container');


// Parses URL and grabs item id number after =  
const url = window.location.href;
function getId(str) {
    return str.split('=')[1];
}
const myId = getId(url);

//Another Ajax
$(function() {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:5000/items/:'+myId,
		success: function(items) {
			const itemsList = JSON.parse(items);
			//const itemsList = itemsList['data'];

			// Variables 
			let commentCount = null ; 
			const name = itemsList['name'];
			const price = itemsList['price'];
			const image = itemsList['image'];
			const likeCount = itemsList['like_count'];
			const isSoldOut = itemsList['isSoldOut'];
			const heartIcon = document.createElement("IMG");
			heartIcon.setAttribute("src","./images/like_icon.png");
			const commentIcon = document.createElement("IMG");
			commentIcon.setAttribute("src","./images/comment_mercari.png");
			
			// Takes care of the different property names comment_count/cot_count
			// No need to loop because there is only one item on display
			if (itemsList['comment_count'])
				 commentCount = itemsList['comment_count'];
			else if (itemsList['cot_count'])
				 commentCount = itemsList['cot_count'];

			// Injects the HTML 
			$itemContainer.append( "<div class= single-item-details" + " id='"+ myId +"'>" 
				+ "<h1>" + name + "</h1>"
				+ "<div id=myImg class= merch-image-details><img id= item-image-details src='" + image + "'></div>"+ "<br/>"
				+ "<h1>" + name + "</h1>"
				+ "<h2>" + "￥" + price + "<br>" + "送料込み" + "</h2>"
		 		+  '</div>');
			
			// Add like count if it's greater than 0
			if (likeCount) {
				const h3Num = document.createElement("H3");
				const h3 = document.createElement("H3");
				const likes = document.createTextNode(likeCount);
				h3Num.appendChild(likes);
				//h3.appendChild(likes);
				h3.prepend("いいね");
				h3.prepend(heartIcon);
				h3.className = "h3tag";
				h3Num.className = "h3NumTag";
				document.getElementById(myId).appendChild(h3);
				document.getElementById(myId).appendChild(h3Num);
			}else{
				const empty = document.createElement("H3");
				empty.prepend(heartIcon);
				empty.className = "h3TagEmpty";
				document.getElementById(myId).appendChild(empty);
			}

			// Add comment count if it's greater than 0
			if (commentCount) {;
				const h3 = document.createElement("H3");
				const h3Num = document.createElement("H3");
				const comment = document.createTextNode(commentCount);
				h3Num.appendChild(comment);
				h3Num.className = "h3NumTag";
				h3.prepend("コメント");
				h3.prepend(commentIcon);
				h3.className = "h3tag";
				document.getElementById(myId).appendChild(h3);
				document.getElementById(myId).appendChild(h3Num);
			}else{
				const empty = document.createElement("H3");
				empty.prepend(commentIcon);
				empty.className = "h3TagEmpty";
				document.getElementById(myId).appendChild(empty);
			}

			// Add sold out tag 
			if (isSoldOut) {
				const x = document.createElement("IMG");
				 x.setAttribute("src","./images/sold_tag.png");
				 x.className = "merch-image-sold-details";
				 document.getElementById("myImg").appendChild(x);
			}
		}
	});
});





