"use-strict";

$(document).ready(function(){

var questionsList = [];
var questionsUrl = "http://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions";
var serverHealthUrl = "http://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health";

/*Server health*/
function getServerHealth(){
	
	$.ajax({
		type: "GET",
		dataType:"json",
		url: serverHealthUrl, 
        success: function(result){
			var serverHealth = result;
            if(serverHealth.status === 'OK'){
				listQuestions();
			}

        }
    });

}

/*List questions*/
function listQuestions(){

   $.ajax({
		type: "GET",
		dataType:"json",
		url: questionsUrl, 
        success: function(result){
			questionsList = result;
            if(questionsList){
				buildDomList();
			}

        }
    });

}

/*Build Dom With Questions*/
function buildDomList(){

    questionsList.forEach(function(item,index){
		
		 var html = '<div id="questionItem_'+index+'" class="questionsList">';
         html+='<img class="thumb" src="'+item.thumb_url+'" alt="questionThumb_'+index+'">';
         html+='<p class="listQuestion" id="question_'+index+'">'+item.question+'</p></div>';

        $('#questionsListContainer').append(html);

        $('#questionItem_'+index).click(openQuestionDetail);

    });

    $('#loader').hide();

}

/*Open question details*/
function openQuestionDetail(e){

    var itemIndex = e.target.id.split('_')[1];

    $('#detailView p, #detailView #choices').html('');

    $('#detailView #img').attr('src',questionsList[itemIndex].image_url);
    $('#detailView #question').html(questionsList[itemIndex].question);
    $('#detailView #date').html(questionsList[itemIndex].published_at);
    
    for(var i=0; i < questionsList[itemIndex].choices.length; i++){
        $('#detailView #choices').append('<option>'+questionsList[itemIndex].choices[i].choice+'</option>');
    }
    
    $('#detailView').show();

}

/* close details*/
function closeQuestionDetail(){
    $('#detailView').hide();
}

$('#detailView .closeButton').click(closeQuestionDetail);

getServerHealth();

});