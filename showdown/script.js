$('#convert').click(function(){
  var message = $('#textarea').val();
  // var converter = new showdown.Converter();
  // var output = converter.makeHtml(message);
  var output=lightMarkdown.toHtml(message)
  console.log(output);
  $('#show').html(output);
  });
