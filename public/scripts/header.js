// $(document).ready(function() {
//   createHeaderDiv('');
//   $('#login-button').click(function(event) {
//     console.log('login button clicked');
//     $.ajax({ method: "GET", url: "/login/1"})
//       .then(function() {
//         createHeaderDiv('Alice Le');
//       });
//   });
//   $('#logout-button').click(function(event) {
//     console.log('logout button clicked');
//     $.ajax({ method: "GET", url: "/logout"})
//       .then(function() {
//         createHeaderDiv('');
//       });
//   });
// });

// const createHeaderDiv  = (userName) => {
//   $("#header").empty();
//   const $logo = $(`<i class="fas fa-check-circle"></i>`);
//   $('#header').append($logo);
//   if (userName) {
//     const $div = $(`
// 			<div>
// 				<h1>${userName}</h1>
// 				<button id="logout-button"><i class="fas fa-sign-out-alt"></i></button>
// 			</div>
// 		`);
//     $('#header').append($div);
//   } else {
//     const $div = $(`
// 			<div>
// 			<button id="login-button">Login</button>
// 			</div>
// 		`);
//     $('#header').append($div);
//   }
// };
