// //DOM Event Bindings

// var options = [
// 	{
// 		element: '.userSubmit',
// 		binding: 'click',
// 		target: '.modal, .mask',
// 		option: 600
// 	},
// 	{
// 		element: '.dismissModal',
// 		binding: 'click',
// 		target: '.modal, .mask',
// 		option: 400
// 	}
// ]
// var bindings = (function (obj) {
// 	for (var i = 0; i < options.length; i++) {
// 		$(obj[i].element).on(obj[i].binding, function () {
// 			$(obj[i].target).stop().
// 		})
// 	}
// });
// $('.userSubmit').on("click", function () {
// 	$('.modal, .mask').stop().fadeIn(600);
// });
// $('.dismissModal').on("click", function () {
// 	$('modal, .mask').stop().fadeOut(400);
// });


// var myRevealingModule = (function () {
 
//         var privateVar = "Ben Cherry",
//             publicVar  = "Hey there!";
 
//         function privateFunction() {
//             console.log( "Name:" + privateVar );
//         }
 
//         function publicSetName( strName ) {
//             privateVar = strName;
//         }
 
//         function publicGetName() {
//             privateFunction();
//         }
 
 
//         // Reveal public pointers to
//         // private functions and properties
 
//         return {
//             setName: publicSetName,
//             greeting: publicVar,
//             getName: publicGetName
//         };
 
//     })();
 
// myRevealingModule.setName( "Paul Kinlan" );