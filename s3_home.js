// credit: https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

setTimeout(function() { // TODO: retry until the elements appear
    [].forEach.call(document.querySelectorAll("td.bucket"), function(title) {
        console.log(title)
        const copyButton = document.createElement('a')
        copyButton.innerText = "\u2398"
        copyButton.style.fontSize = "24px";
        copyButton.onclick = function(){
            return function() {
                copyTextToClipboard(title.querySelector("span.list-view-item-name").innerText)
            }
        }()
        title.prepend(copyButton)
    });
}, 1000);
