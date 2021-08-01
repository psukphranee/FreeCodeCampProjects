var quotesData;
var currentAuthor = '', currentQuote = '';

var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

function getQuotes(){
    return $.ajax(
        {
            headers: {Accept: 'application/json'},
            url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            success: function(jsonQuotes){
                if(typeof jsonQuotes == 'string'){
                    quotesData = JSON.parse(jsonQuotes);
                    console.log("quotesData");
                    console.log(quotesData);
                }
            }
        }
    );
}

function getRandomQuote(){
    let randomQuoteIndex = Math.floor(Math.random() * quotesData.quotes.length); //random index for selecting quote
    return quotesData.quotes[randomQuoteIndex];
}

function getQuote(){
    
    let randomColorIndex = Math.floor(Math.random() * colors.length); //random index for selecting colors

    let quote = getRandomQuote();
    currentQuote = quote.quote;
    currentAuthor = quote.author;

    //fade out old quote by animating the enitre quote-text div
    $('.quote-text').animate({opacity: 0}, 500, function(){
        $(this).animate({opacity: 1}, 500);
        $('#text').text(currentQuote);
    });
    //fade out old author by animating the enitre quote-author div
    $('.quote-author').animate({opacity: 0}, 500, function(){
        $(this).animate({opacity: 1}, 500);
        $('#author').text(currentAuthor);
    });
    $('html body').animate({
        backgroundColor: colors[randomColorIndex],
        color: colors[randomColorIndex]
    }, 1000);
    $('.button').animate({
        backgroundColor: colors[randomColorIndex]
    }, 1000);
}

$(document).ready(
    function(){
        getQuotes().then(() => {
            getQuote();
            }
        );
        $('#new-quote').on('click', getQuote);
    }
);