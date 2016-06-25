jQuery(document).ready(function($){
	$('#checkAnswer').click(function(){
		creatAnswerTable();
		
	});
});
function creatAnswerTable(){
	var qLength = $('.question').length,
		answers = {},
		name = $('#testName').html(),
		i;
	for (i = 0; i < qLength; i++){
		
		var quest = $('.question:eq(' + i + ')'),
			aLength = $('.question:eq(' + i + ') > .answer').length,
			t;
		
		for(t = 0; t < aLength; t++){
			var answer = $('.question:eq(' + i + ') > .answer:eq(' + t + ') > input').prop('checked');
			if (answer){
				var q = "q" + i, a = 'a' + t;
				answers[q] = a;
			}
		} 
	}
	console.log(name);
	set_test(answers, name);
}
function set_test(answers, name){
		$.ajax({
			type: "POST",
			url: myajax.ajaxurl,
			data: {
				action: 'check',
				answers: answers,
				name: name
			},
			success: function(data){
							var dl = data.length,
								data = data.substring(0, dl-1);
							alert(data)
					 }
		})
}