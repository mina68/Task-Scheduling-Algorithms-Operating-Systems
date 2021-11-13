let queue_array = []

$(function(){
	$('#add-button').on('click', function(){

		let data = $('#data').val()
		let time = Number($('#time').val())


		if(data && time){
			$('#data').val('')
			$('#time').val('')
			
			queue_array.push({data : data, time : time})
			if(queue_array.length == 1){
				setTimeout(readData, time*1000)
			}

			let html = '<ul class="queue col-md-12" style="border:2px solid #000; padding:10px">'
			for(let i=0; i<queue_array.length; i++){
				html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#fff; border:1px solid #000'>"+queue_array[i]['data']+"</li>"
			}
			html += "</ul>"
			$('#queues').append(html)
		}

	})

	function readData(){
		queue_array.shift()

		let html = '<ul class="queue col-md-12" style="border:2px solid #000; padding:10px">'
		if(queue_array.length > 0){
			for(let i=0; i<queue_array.length; i++){
				html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#fff; border:1px solid #000'>"+queue_array[i]['data']+"</li>"
			}
			html += "</ul>"
			$('#queues').append(html)

			setTimeout(readData, queue_array[0]['time']*1000)
		}
		else
			$('#queues').append('<p class="queue">Queue is empty</p>')
	}
})