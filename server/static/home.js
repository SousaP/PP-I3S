//DropzoneJS snippet - js

$.getScript('/static/dropzone.min.js',function(){
  // instantiate the uploader
  $('#file-dropzone').dropzone({ 
    url: "/upload",
    maxFilesize: 100,
    paramName: "file",
    maxThumbnailFilesize: 5,
    init: function() {
      
      this.on('success', function(file, json) {
      });
      
      this.on('addedfile', function(file) {
        
      });
      
      this.on('drop', function(file) {
        //alert('file');
      }); 
    }
  });
});

$(document).ready(function() {});