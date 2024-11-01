$(document).ready(function() {
    
    $('#Search').on('input', function() {
        let query = $(this).val();

        if (query.length >= 1) {
            $.ajax({
                url: "ajax.php",
                method: "POST",
                dataType: "json",
                data: { query: query },
                success: function(data) {
                    if (data.length > 0) {
                        let suggestions = '';
                        $.each(data, function(index, suggestion) {
                            suggestions += '<li>' + suggestion + '</li>';
                        });
                        $('#suggestions').fadeIn().html(suggestions);
                    } else {
                        $('#suggestions').fadeOut();
                    }
                },
                error: function() {
                    $('#suggestions').fadeOut();
                }
            });
        } else {
            $('#suggestions').fadeOut();
        }
    });

    $(document).on('click', '#suggestions li', function() {
        $('#Search').val($(this).text());
        $('#suggestions').fadeOut();
    });

    $('#searchBtn').click(function() {
        let query = $('#Search').val();

        if (query.length >= 1) {
            $.ajax({
                url: "search.php",
                method: "GET",
                dataType: "json",
                data: { search: query },
                success: function(data) {
                    if (data.message) {
                        $('#results').html(data.message).fadeIn();
                    } else {
                        let resultHtml = '<ul>';
                        $.each(data, function(index, book) {
                            resultHtml += '<li>';
                            resultHtml += '<strong>Title:</strong> ' + book.Title + '<br>';
                            resultHtml += '<strong>Author:</strong> ' + book.Author + '<br>';
                            resultHtml += '<strong>Publisher:</strong> ' + book.Publisher + '<br>';
                            resultHtml += '<strong>ISBN:</strong> ' + book.ISBN + '<br>';
                            resultHtml += '<strong>Published Year:</strong> ' + book.P_Year + '<br>';
                            resultHtml += '<strong>Type:</strong> ' + book.Type + '<br>';
                            resultHtml += '<strong>Access Type:</strong> ' + book.Access_Type + '<br>';
                            resultHtml += '</li>';
                        });
                        resultHtml += '</ul>';
                        $('#results').html(resultHtml).fadeIn();
                    }
                },
                error: function() {
                    $('#results').html("An error occurred while searching.").fadeIn();
                }
            });
        } else {
            $('#results').html("Enter Appropriate Book Title").fadeIn();
        }
    });
});
