var current_state = 'IDLE';
var buzzer = new Audio('audio/buzzer.mp4');

$(function(){

	$('#action-selection').on('change', function(){
		let action = $(this).val();

		switch(current_state){
			case 'IDLE':
				if(action == 'set'){
					current_state = 'SEAT'
					setTimeout(checkBelt, 3000)
					$('#action-selection').html("<option value=''>Choose Action</option><option value='belt'>Belt</option><option value='leave'>Leave Seat</option>")
				}
				break;

			case 'SEAT':
				if(action == 'belt'){
					current_state = 'BELTED'
					$('#action-selection').empty()
					$('#action-selection').html("<option value=''>Choose Action</option><option value='leave'>Leave Seat</option><option value='unbelt'>Release Belt</option>")
				}
				else if(action == 'leave'){
					current_state = 'IDLE'
					$('#action-selection').html("<option value=''>Choose Action</option><option value='set'>Set</option>")
				}
				break;

			case 'BELTED':
				if(action == 'leave'){
					current_state = 'IDLE'
					$('#action-selection').html("<option value=''>Choose Action</option><option value='set'>Set</option>")
				}
				else if(action == 'unbelt'){
					current_state = 'SEAT'
					setTimeout(checkBelt, 3000)
					$('#action-selection').html("<option value=''>Choose Action</option><option value='belt'>Belt</option><option value='leave'>Leave Seat</option>")
				}
				break;

			case 'BUZZER':
				if(action == 'leave'){
					current_state = 'IDLE'
					$('#action-selection').html("<option value=''>Choose Action</option><option value='set'>Set</option>")
					buzzer.pause()
					buzzer.currentTime = 0
				}
				else if(action == 'belt'){
					current_state = 'BELTED'
					$('#action-selection').html("<option value=''>Choose Action</option><option value='leave'>Leave Seat</option><option value='unbelt'>Release Belt</option>")
					buzzer.pause()
					buzzer.currentTime = 0
				}
				break;

		}

		$('#current-state').text(current_state)
	})

	function checkBelt(){
		if(current_state == 'SEAT'){
			current_state = 'BUZZER'
			$('#current-state').text(current_state)
			buzzer.play()
		}
	}
})