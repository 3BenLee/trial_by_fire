// Ajax request

const $merchContainer = $('#merch-container');

$(function() {

	$.ajax({
		type: 'GET',
		url: 'http://localhost:5000/items',
		success: function(items) {
			const itemsList = JSON.parse(items);
			const merchData = itemsList['data'];
			//console.log(itemsList['data'][1]['price'])
			//$.each(itemsList['data'], function(i, info){
			//$merch.append(itemsList['data'][1]['price']);
			//$merchContainer.append($('<h3/>').append(itemsList['data'][1]['price']));
			//console.log(merchData);
			$.each(merchData, function(i, merch){
				$merchContainer.append('<div id="merch-pieces">' + merchData[i]['price'] + '</div>');
			});
		}
	});
});

// var myRequest = new XMLHttpRequest();
// myRequest.open('GET', 'http://localhost:5000/items')
// myRequest.onLoad = function() {
// 	console.log(myRequest.responseText);
// };
// myRequest.send();

