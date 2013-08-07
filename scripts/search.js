$(document).ready(function () {

    $("resultsDiv").hide();
    var pageTitle = $(".pageTitle").text();
    var config = {
        apiURL:'https://www.googleapis.com/customsearch/v1',
        apiKey:'AIzaSyCR79snpFgr45ear_SBoqkjQaGa7FHYg4I', // Change this to your site
        cx:'005646302152591029507:wp1h0fve318',
        perPage:10, // A maximum of 10 is allowed by Google
        page:0, // The start page
        pageTitle:pageTitle
    }

   // $('#searchForm').submit(function () {
       // googleSearch();
       // return false;
   // });
    
    
   $('#goBtn').click(function () {
        googleSearch();
        return false;
    });



$('#search').keydown(function(e){
 //enter button in ASCII code
 if(e.keyCode == 13){
  $("#goBtn").click();
  return false;
 }
});




    function successHandler(r) {

    }

    function googleSearch(settings) {

        // If no parameters are supplied to the function,
        // it takes its defaults from the config object above:
        settings = $.extend({}, config, settings);
        settings.term = $('#search').val();

        var resultsDiv = $('#resultsDiv');

        try {
            $.ajax({
                type:'GET',
                url:settings.apiURL,
                dataType:'jsonp',
                data:{q:settings.term,
                    key:settings.apiKey,
                    num:settings.perPage,
                    start:((settings.page * settings.perPage) + 1),
                    cx:settings.cx,
                    alt:'json'},
                success:function (data) {
                    var results = data.items;
                    if (results) {
                        resultsDiv.text('');
                        $(".topicPagination").remove();
                        // If results were returned, add them to a pageContainer div,
                        // after which append them to the #resultsDiv:
                        //var ul = $('<ul>', {className:'documents'});
                        resultsDiv.append("<ul class='documents'></ul>");
                        var topicPaginationHtml = '<ul class="topicPagination">' +
                            '<li class="prev"><a href="#">Previous</a></li>' +
                            '<li class="next"><a href="#">Next</a></li>' +
                            '<div class="clear"></div>' +
                            '</ul><div class="clear"></div>';
                        $(".documents").append(topicPaginationHtml);
                        var ul = $(".documents");
                        for (var i = 0; i < results.length; i++) {
                            // Creating a new result object and firing its toString method:
                            ul.append(new result(results[i]) + '');
                        }
                        ul.hide().appendTo(resultsDiv).fadeIn('slow');
                        resultsDiv.append('<div class="clear"></div>');
                        $(".documents").append(topicPaginationHtml);

                        if (settings.page > 0) {
                            $(".prev").click(function () {
                                googleSearch({append:false, page:settings.page - 1});
                            });
                        } else {
                            $('.prev').bind('click', false);
                        }

                        if (data.queries.request[0].totalResults > (settings.page + 1) * settings.perPage) {
                            $(".next").click(function () {
                                googleSearch({append:false, page:settings.page + 1});
                            });
                        } else {
                            $('.next').bind('click', false);
                        }
                    }
                    else {
                        // No results were found for this search.
                        resultsDiv.empty();
                        $('<p>', {className:'notFound', html:'<h3 class="searchNoResult">Oops, we can\'t find what you were looking for. Try rephrasing your search</h3>'}).hide().appendTo(resultsDiv).fadeIn();
                    }
//            $(".breadcrumbs").click(function() {
//                //$(".breadcrumbs").html('<a href="#">Cloudify Documentation Home</a>');
//                resultsDiv.text('');
//                $(".topicPagination").remove();
//                $("#resultDiv").hide();
//                $("#pageContent").fadeIn();
//            });
                    $("#pageContent").hide(1, function () {
                        $(".pageTitle").text("Search Results");
                        $("#resultDiv").fadeIn();
                        $(".breadcrumb").html('<a href="#">Back to ' + settings.pageTitle + '</a>');
                    });
//

                }
            });
        }
        catch (e) {
            alert(e + '');
        }


    }

    function result(r) {

        // This is class definition. Object of this class are created for
        // each result. The markup is generated by the .toString() method.

        var arr = [
            '<li class="reg">',
            '<a class="docTitle" href="',
            r.link.match(".*/guide/")?r.link.replace(".html", ""):r.link,
            '">'
            , r.title,
            '</a>',
            '<br class="clear"/>',
            r.snippet,'&nbsp;&nbsp;',
            '<a class="rmore" href="', r.link, '" target="_blank">',
            '<span>Read More</span></a></li>'
        ];


        // The toString method.
        this.toString = function () {
            return arr.join('');
        }
    }


})
;
