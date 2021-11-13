processes_Array = new Array()

$(function(){

	let name = prompt("Type process name");
	let execution_time = Number(prompt("Type process execution time"));
	let period = Number(prompt("Type process period"));
	processes_Array.push({name:name, execution_time:execution_time, period:period, times_execcuted:0, in_progress_time:0, missed_deadlines:0})

	while(1){
		if(confirm("Do you want to add another process ?")){
			name = prompt("Type process name");
			execution_time = Number(prompt("Type process execution time"));
			period = Number(prompt("Type process period"));
			processes_Array.push({name:name, execution_time:execution_time, period:period, times_execcuted:0, in_progress_time:0, missed_deadlines:0})
		}
		else
			break;
	}

	processes_Array.sort(function(a, b){
	    var periodA = a.period,
	        periodB = b.period;

	    if(periodA < periodB) return -1;
	    if(periodA > periodB) return 1;
	    return 0;
	});

	let max_lcm = 1
	for(var i=0; i<processes_Array.length; i++){
		max_lcm *= processes_Array[i]['period']
	}

	let max_period = processes_Array[processes_Array.length-1]['period']
	let lcm = max_lcm
	for(var i=max_period; i<max_lcm; i+=max_period){
		let is_lcm = 1
		for(var j=0; j<processes_Array.length; j++){
			if(i%processes_Array[j]['period'] !== 0){
				is_lcm = 0
				break
			}
		}
		if(is_lcm){
			lcm = i
			break
		}
	}

	let time_table = new Array()
	for(var i=0; i<lcm; i++){

		time_table[i] = {running_process:'', deadlines:new Array()};
		let running = 0
		for(var j=0; j<processes_Array.length; j++){
			if((i/processes_Array[j]['period'] >= processes_Array[j]['times_execcuted']+processes_Array[j]['missed_deadlines']) && !running){
				time_table[i]['running_process'] = processes_Array[j]['name']
				processes_Array[j]['in_progress_time'] += 1
				running = 1
				if(processes_Array[j]['in_progress_time'] == processes_Array[j]['execution_time']){
					processes_Array[j]['in_progress_time'] = 0
					processes_Array[j]['times_execcuted'] += 1
				}
			}
			if(i%processes_Array[j]['period'] == processes_Array[j]['period']-1){
				time_table[i]['deadlines'].push(processes_Array[j]['name'])
				processes_Array[j]['in_progress_time'] = 0
				if((i/processes_Array[j]['period'] > processes_Array[j]['times_execcuted']+processes_Array[j]['missed_deadlines'])){
					processes_Array[j]['missed_deadlines'] += 1
				}
			}
		}
	}

	let HTMLTable = "<table class='table' id='time-table'><thead><tr><th class='text-center'>Time</th><th class='text-center'>Running Process</th><th class='text-center'>Deadlines</th></tr></thead><tbody>"
	for(var i=0; i<time_table.length; i++){
		let deadlines = time_table[i]['deadlines'].join(', ')
		HTMLTable += "<tr><td class='text-center'>"+i+"</td><td class='text-center'>"+time_table[i]['running_process']+"</td><td class='text-center'>"+deadlines+"</td></tr>"
	}
	HTMLTable += "</tbody></table>"
	$('#table').append(HTMLTable)

	for(var i=0; i<processes_Array.length; i++){
		$('#calculations').append('<div class="row text-center" style="margin:10px 0; background-color:#fafafa"><h3 class="col-md-2">'+processes_Array[i]['name']+'</h3><div class="col-md-3"><label>Execution Time : </label><span>'+processes_Array[i]['execution_time']+'</span></div><div class="col-md-2"><label>Period : </label><span>'+processes_Array[i]['period']+'</span></div><div class="col-md-2"><label>Times Executed : </label><span>'+processes_Array[i]['times_execcuted']+'</span></div><div class="col-md-3"><label>Missed Deadlines : </label><span>'+processes_Array[i]['missed_deadlines']+'</span></div></div>')
	}
})