function setCookie(){
    document.cookie="name="+document.getElementById("name").value
}

function getName(){
    let cookieArr = decodeURIComponent(document.cookie).split(';')
    for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].startsWith("name")){
            return cookieArr[i].substring(5)
        }
    }
    return ""
}