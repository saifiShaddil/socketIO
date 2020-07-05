document.addEventListener('DOMContentLoaded', () => {

//connect to websocket server
  // var socket = io.connect(location.protocol + '//' + location.domain + ':' + location.port);
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  //when connected
  socket.on('connect', () => {
      // each button should emit a "submit vote" event
      document.querySelectorAll('button').forEach(button => {
          button.onclick = () => {
            const selection = button.dataset.value;
            socket.emit('submit vote', {'selection': selection});
          };
      });
  });


  // when a vote is accounced, add it to order list
  socket.on('announce vote', data => {
     const li = document.createElement('li');
     li.innerHTML = `Vote Recorded: ${data.selection}`;
     document.querySelector('#votes').append(li);
  });
});