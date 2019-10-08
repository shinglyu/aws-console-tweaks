setTimeout(function() {
    [].forEach.call(document.querySelectorAll("td.bucket"), function(title) {
        console.log(title)
        const copyButton = document.createElement('a')
        copyButton.innerText = "\u2398"
        copyButton.style.fontSize = "24px";
        copyButton.onclick = function(){
            return function() {
                alert(title.querySelector("span.list-view-item-name").innerText)
            }
        }()
        title.prepend(copyButton)
    });
}, 1000);
