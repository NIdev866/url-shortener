$('#myButton').on('click', function(){

  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val()},
    success: function(data){
        const resultHTML = '<a href="' + data.shortUrl + '">'
            + data.shortUrl + '</a>';
        $('#link').html(resultHTML);
    }
  });

});
