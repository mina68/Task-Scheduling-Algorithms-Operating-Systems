let buffer_size = 10
let buffer_array = []
let write_pointer = 0
let read_pointer = 0

$(function(){
	$('#add-button').on('click', function(){
		let data = $('#data').val()
		let time = Number($('#time').val())

		if(!buffer_array[write_pointer] || buffer_array[write_pointer]['processed'] == 1){
			$('#data').val('')
			$('#time').val('')

			buffer_array[write_pointer] = {data : data, time : time, processed : 0}
			if(write_pointer == read_pointer){
				setTimeout(readNextData, time*1000)
			}

			write_pointer = (write_pointer+1)%buffer_size

			let html = '<ul class="buffer col-md-12" style="border:2px solid #000; padding:10px">'
			for(let i=0; i<10; i++){
				if(buffer_array[i] != undefined){
					if(read_pointer == i)
						html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#0f0; border:1px solid #000'>"+buffer_array[i]['data']+"</li>";
					else
						html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#fff; border:1px solid #000'>"+buffer_array[i]['data']+"</li>";
				}
				else
					html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#fff; border:1px solid #000'></li>";
			}
			html += "</ul>"
			$('#buffers').append(html)
		}
		else{
			alert('Please Wait For Unprocessed Data To Be Processed!')
		}
	})

	function readNextData(){
		buffer_array[read_pointer]['processed'] = 1

		read_pointer = (read_pointer+1)%buffer_size

		let html = '<ul class="buffer col-md-12" style="border:2px solid #000; padding:10px">'
		for(let i=0; i<10; i++){
			if(buffer_array[i] != undefined){
				if(read_pointer == i && buffer_array[i]['processed'] == 0)
					html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#0f0; border:1px solid #000'>"+buffer_array[i]['data']+"</li>";
				else if(read_pointer == i && buffer_array[i]['processed'] == 1)
					html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#ff0; border:1px solid #000'>"+buffer_array[i]['data']+"</li>";
				else
					html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#fff; border:1px solid #000'>"+buffer_array[i]['data']+"</li>";
			}
			else
				html += "<li class='text-center' style='display:inline-block; width:10%; padding:10px; background-color:#fff; border:1px solid #000'></li>";
		}
		html += "</ul>"
		$('#buffers').append(html)

		if(read_pointer != write_pointer){
			setTimeout(readNextData, buffer_array[read_pointer]['time']*1000)
		}
	}
})