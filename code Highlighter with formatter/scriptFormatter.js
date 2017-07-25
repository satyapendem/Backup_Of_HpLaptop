var sessionID = randomString(), started = 0, attempts = 10, allowProcessing = null, progressImg = "button-progress.gif",
    optfields = 0, progress = -1, fileID = randomString(), pImgFor, editor;

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: false,
  highlightMatches: true,
  stylesheet: "lib/jscolors.css",
  autofocus: true,
  autoEnabled: true,
  styleActiveLine: true,
  indentUnit: 4
});
editor.focus();
    window.lastpo=localStorage.getItem("valueofcursor");
    editor.setCursor({line: 0, ch: window.lastpo});
//editor.setCursor();
editor.setSize(560, 200);
var editor1 = CodeMirror.fromTextArea(document.getElementById("code_update"), {
  lineNumbers: false,
  highlightMatches: true,
   autoEnabled: true,
  stylesheet: "lib/jscolors.css",
  autofocus: true,
  styleActiveLine: true,
  indentUnit: 4
});
CodeMirror.commands["selectAll"](editor1);
editor1.focus();
    window.lastpo=localStorage.getItem("valueofcursor");
    editor1.setCursor({line: 0, ch: window.lastpo});
editor1.setSize(560, 200);
   file_name=document.getElementById('fileName').value;
    console.log(file_name)
   //Adding code to div
   //$("#save").hide();
   //$("#edit").hide();
   // $('#buttons').hide();

   $(document).on('mouseenter', '.code', function () {
    $(this).find(".pre_icons").show();
  });
   $(document).on("mouseleave", ".code", function() {
     $(this).find(".pre_icons").hide();
   });
   $("#show").click(function(event){
     $('#myModal').modal('hide');
     //$("#save").show();
     //$("#edit").show();
     // $('#buttons').show();
      startConvert();
      function startConvert() {
          allowProcessing = 1;
          //progressOn();
          x_ajax({
              "req" : {
                  "url"       : "http://htmlformatter.com/convert/" + sessionID + "/" + fileID,
                  "type"      : "POST",
                  "data"      : { "code" : editor.getValue() },
                  "dataType"  : "json"
              },
              "onData" : function(data) {

                  getStatus();
              },
              "onError" : function(data) {
                 // progressOff();
                  if (typeof(data.details) == "string") x_prettyError(data.details);
                  else x_prettyError("Unexpected error.");
              },
              "onFail" : function() {
                  //progressOff();
                  x_prettyError("Unexpected error.");
              }
          });
      }

      function getStatus() {
          x_ajax({
              "req" : {
                  "url"       : "http://htmlformatter.com/status/" + sessionID + "/" + fileID,
                  "type"      : "GET",
                  "dataType"  : "json"
              },
              "onData" : function(data) {
                  if (allowProcessing) {
                      allowProcessing = null;
                     // progressOff();
                      editor.setValue("");
                      if (data.format) {
                          var newFormat;
                          if (data.format == "JS") newFormat = "javascript";
                          else if (data.format == "CSS") newFormat = "css";
                          else if (data.format == "HTML") newFormat = "htmlmixed";
                          editor.setOption("mode", newFormat);
                      }
                      program=data.result;
                      //editor.focus();
                  }
              },
              "onError" : function(data) {
                  if (allowProcessing) {
                   //   progressOff();
                      if (typeof(data.details) == "string") x_prettyError(data.details);
                      else x_prettyError("Unexpected error.");
                  }
              },
              "onFail" : function() {
                  //progressOff();
                  x_prettyError("Unexpected error.");
              },
              "silent" : 1
          });
      }

     var code_div = $(".code");
     var icon = $("#buttons");
     if($(code_div).children().length<1){
      $(code_div).append(program);
      console.log("append");
    }
    else{
      code_div = document.createElement('div');
      code_div.setAttribute('class','code');
      // code_div.setAttribute('id',ids);
      code_div.innerHTML = program;
      //debugger;
      $(".code").last().after(code_div);
      // $("#"+ids).append(new_ele);
      console.log("create new div");
    }
    $(code_div).each(function() {

      var $this = $(this),
      $code = $this.html(),
      $unescaped = $('<div/>').html($code).text();
      $this.empty();
      CodeMirror(this, {
        value: $unescaped,
        lineNumbers: true,
        theme: "neo",
        readOnly: "nocursor"
      });
    });

    new_ele = $('.pre_icons').clone();
     //new_ele.removeAttr('id');
     $(code_div).append(new_ele);
     type=document.getElementById('language');
     type=type.options[type.selectedIndex].value;
     file_name=document.getElementById('fileName').value;
     editor.setValue("");
   });

     $(document).on('click','.edit', function(event){
      $('#edit_modal').modal('show');
      editor1.setValue("");
      for_update=$(this).parents(".code");
       edit_div=$(for_update).find('div.CodeMirror-code');
       edit_code = $(edit_div).clone();
      document.getElementById("Up_fileName").value=file_name;
       content_code = $(edit_code).find('div.CodeMirror-linenumber').remove();
       txt_for_update=$(edit_code).text();
       console.log(txt_for_update);
       editor1.setValue("");
       editor1.setValue(txt_for_update);
       var formt=document.getElementById("code_update");
       formt.addEventListener('mouseenter',autoFormatSelection);
       function getSelectedRange() {
               return { from: editor1.getCursor(true), to: editor1.getCursor(false) };
             }
             function autoFormatSelection() {
               var range = getSelectedRange();
               editor.autoFormatRange(range.from, range.to);
             }

      });

      $('#update_code').click(function(){
        $('#edit_modal').modal('hide');
        //debugger;
        type=document.getElementById('language');
        type=type.options[type.selectedIndex].value;
        file_name=document.getElementById('fileName').value;
        updated_text=editor1.getValue();
        debugger;
        $(for_update).find('.CodeMirror').remove();
        update_div = document.createElement('div');
        update_div.innerHTML = updated_text;

         //for_update = $(edit_div).parents().find('.code');
         $(for_update).prepend(update_div);
        //$(edit_div).html(updated_text);
           //$(code_div).innerHTML(txt_for_update);
           $(update_div).each(function() {
         var $this = $(this),
         $code = $this.html(),
         $unescaped = $('<div/>').html($code).text();
         $this.empty();
         CodeMirror(this, {
          value: $unescaped,
          lineNumbers: true,
          theme: "neo",
          readOnly: "nocursor"
        });
       });

    });
     $(document).on('click','.save',function(){
      for_down=$(this).parents(".code");
      down_div=$(for_down).find('div.CodeMirror-code');
      down_code = $(down_div).clone();
      console.log(down_code);
      content_code = $(down_code).find('div.CodeMirror-linenumber').remove();
      txt_for_down=$(down_code).text();
      console.log(txt_for_down);

      console.log(file_name);
      if(file_name==""){
        file_para="program";
      }
      else{
        file_para=file_name;
      }
      switch(type){
        case "c": saveTextAsFile(file_para,"c");
        break;
        case "java": saveTextAsFile(file_para,"java");
        break;
        case "c++": saveTextAsFile(file_para,"cpp");
        break;
        case "php": saveTextAsFile(file_para,"php");
        break;
        case "markdown": saveTextAsFile(file_para,"md");
        break
        case "plaintext": saveTextAsFile(file_para,"txt");
        break

      }
      function saveTextAsFile(file,type){
        var textToWrite = txt_for_down;
        var textFileAsBlob = new Blob([textToWrite],{
          type:'text/plain'
        });
        var fileNameToSaveAs =file+"."+type;
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.URL != null){
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        }
        else{
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
        }
        downloadLink.click();
       }
     });
