jQuery(document).ready(function($){
	$(':input[name="createQuestions"]').click(createQuestions);
	$(':input[name="saveTest"]').click(saveTest);
	
	});
function saveTest(){
	
	var tmp,
		objTest = {},
		i;
		objTest.testName = $(':input[name="name"]').val();
		objTest.questCount = $('.question').length;
		objTest.quests = [],
		objTest.listRightAnswer = {};
		
	for (i = 0; i < objTest.questCount ; i++){
		objTest.quests[i] = new Quest(i);
		var answer = $('.question:eq(' + i + ') > div.answer > div'),
				answerCount = $('.question:eq(' + i + ') > div.answer > div').length,
				t = 0;
		for (l = answerCount ; t < l; t++){
			if(answer[t]){
				objTest.quests[i].answers[t] = new Answer(t,i);
				
				if(objTest.quests[i].answers[t].rightAnswer){
					var q = 'q' + i;
					objTest.listRightAnswer[q] = 'a'+ t;
				}
				
			}
		console.log(t);
		}
	}
	objTest.content = createContent(objTest);
	console.log(objTest.listRightAnswer)
	tmp = JSON.stringify(objTest);
	set_test(objTest.content, tmp , objTest.testName, objTest.listRightAnswer);
	
}
function createContent(objTest){
	var content = "",
		qCount = objTest.questCount,
		title = objTest.testName,
		questsArr = objTest.quests,
		i,
		t,
		quest = [],
		answerLength;
		
	content = "<div id='testName'>" + title + "</div>"
	
	for(i=0; i < qCount; i++){
	
		quest = questsArr[i];
		answerLength = quest.answerLength;
		content += "<div class='question'>";
		content += "<p>вопрос №" + (i+1) + "</p>";
		content += "<p class='questText'>" + quest.text + "</p>";
		for(t = 0; t < answerLength; t++){
			console.log("t=" + t)
			var text = quest.answers[t].text;
			console.log(text);
			content += "<div class='answer'> ";
			content += "<input type='radio' name='a" + (i+1) + "'>";
			content += "<span class='answerText'>" + text + "</span>";
			content += " </div>";
		}
		content +="</div>";
	} 	
	content += " <button id='checkAnswer'>Ответить</button> "
	return content;
}

function set_test(content, data, name, rightAnswer){
		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: {
				action: 'action',
				data: data,
				content: content,
				name:name,
				rightAnswer: JSON.stringify(rightAnswer)
			}
		})
}

function createAnswerOnSelect(){
	var $a = $(this).parent(),
		$b = $a.parent(),
		$c = $b.children('.answer'),
		i = $c.children('div').length + 1,
		t = $b.attr('id');
			$c.append('<div></div>');
			$c.children('div:last').append('<input name="' + t + '" type="radio">');	
			$c.children('div:last').append('<textarea name="answer" id="a' + i + '" cols="60" rows="5"></textarea>');
			$c.children('div:last').append('<input type="button" class="deleteAnswer"> Удалить этот ответ! </button>');
		$('.deleteAnswer').click(function(){
			$(this).parent().remove();
		});
}

function createAnswerComparison(){
		var $a = $(this).parent(),
		$b = $a.parent(),
		$c = $b.children('.answer'),
		i = $c.children('div').length + 1,
		t = $b.attr('id');
		$c.append('<div>Ответет №' + i + ' </div>');
		
}

function createAnswerEnterData(){
		var $a = $(this).parent(),
		$b = $a.parent(),
		$c = $b.children('.answer'),
		i = $c.children('div').length + 1,
		t = $b.attr('id');
		$c.html('<textarea name="answer" id="a' + i + '" cols="60" rows="5"></textarea>');
}

function createQuestions(){
	var numbQuest = $(':input[name="numbQuest"]').val(),
		i;
	$('#step2').html('<p> Шаг 2</p>')
	for (i = 1;i <= numbQuest; i++){
	
		$('#step2').append('<div class="question" id="q' + i + '"></div>')
		$('#step2 > div.question:last').append('<p>Вопрос №' + i + '</p>');
		$('#step2 > div.question:last').append('<div> <textarea name="question" id="q' + i + '" cols="60" rows="5"></textarea> </div>');
		$('#step2 > div.question:last').append('<p>Ответы</p>');
		$('#step2 > div.question:last').append('<div class="answer"> </div>');
		$('#step2 > div.question:last').append('<div class="add_answer">  </div>');
		$('#step2 > div.question:last > .add_answer').append('<input type="button"  name="createAnswerOnSelect" value="Ответ на выбор" class="btn">');
		$('#step2 > div.question:last > .add_answer').append('<input type="button"  name="createAnswerComparison" value="Сопастовление" class="btn">');
		$('#step2 > div.question:last > .add_answer').append('<input type="button"  name="createAnswerEnterData" value="Ввести ответ" class="btn">');
	}
		$(':input[name="createAnswerOnSelect"]').click(createAnswerOnSelect);
		$(':input[name="createAnswerComparison"]').click(createAnswerComparison);
		$(':input[name="createAnswerEnterData"]').click(createAnswerEnterData);

}
function Quest(numb){
	this.numb = numb;
	this.obj = $('.question:eq(' + numb + ')');
	this.text = $('textarea[id="q' + (numb + 1) + '"]').val();
	this.answers = [];
	this.answerLength = $('.question:eq(' + numb + ') > div.answer > div').length ;
}
function Answer (numbQuest, numb){
	this.numb = numb;
	this.obj = $('.question:eq(' + numb + ') > div.answer > div:eq(' + numbQuest + ')');
	this.text = this.obj.children('textarea').val();
	this.rightAnswer = this.obj.children('input').prop('checked');
}