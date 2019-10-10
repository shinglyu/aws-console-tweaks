// Utilities ==========``
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


// Tweaks
function createS3PathCopyButton() {
    const breadcrumb = document.querySelector("nav.awsui-breadcrumb-list")
    console.log(breadcrumb)

    const copyButton = document.createElement('a')
    copyButton.innerText = "\u2398"
    copyButton.style.fontSize = "24px"
    copyButton.onclick = function(){
        return function() {

            const regexExtractBucketPath = /https:\/\/s3.console.aws.amazon.com\/s3\/buckets\/([^?]*)\/?.*/
            let found = window.location.href.match(regexExtractBucketPath)
            if (found === null) {
                const regexExtractObjectPath = /https:\/\/s3.console.aws.amazon.com\/s3\/object\/([^?]*)\/?.*/
                found = window.location.href.match(regexExtractObjectPath)
            }
            if (found === null) {
                return
            }
            const path = found[1]

            copyTextToClipboard(path)

            const copied = document.createElement("span")
            copied.innerText = "copied"
            copied.style.fontSize = "10px"
            copyButton.append(copied)

            return false
        }
    }()
    breadcrumb.append(copyButton)
}

// Monitor Angular navigation
let latestUrl = ""
setInterval(function() {
    if (window.location.href != latestUrl) {
        latestUrl = window.location.href

        createS3PathCopyButton()
    }
}, 500)

// Initialize everything once
createS3PathCopyButton()
