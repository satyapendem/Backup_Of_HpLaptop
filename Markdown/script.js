$('#convert').click(function(){
var message = $('#textarea').val();
var converter = new Markdown.Converter();
var output = converter.makeHtml(message);
console.log(output);      
$('#show').html(output);    	
});
