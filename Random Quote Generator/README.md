# Random Quote Generator

## About

This project generates random quotes and displays them with random colors. It uses a basic front end code: HTML, CSS, and Javascript. The HTML file contains containers to be used by Javascript for rendering. After the document is loaded and ready, an Ajax request is performed and requests a JSON object of quotes and their authors. Upon success of the requres, the object is parsed and stored globally. Since the Ajax request is asynchronous, pulling an intial quote is done afrer a successful Promise. When pulling a quote, a random index is generated for both the quote array and color array (used to generate random background and text colors). The quote and its author are rendered in their corresponding html element. This rendering is done using jQuery. The placement of the jQuery function call that assigns the elements their texts is passed as a parameter in an chain of .animate() calls. The .animate() calls fades elements in and out of opacity. Upon success of the fading effect, the texts change. 

