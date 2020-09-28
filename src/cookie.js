class Cookie {
    static setName() {
        document.cookie = "name=" + document.getElementById("name").value
    }

    static getCookie(param) {
        let cookieArr = decodeURIComponent(document.cookie).split(';')
        for (let i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i].indexOf(param) !== -1) {
                return cookieArr[i]
            }
        }
        return ""
    }

    static getName() {
        let name = this.getCookie('name=')
        return name.substring(name.indexOf("=")+1)
    }

    static getLeaderboard(){
        let arrLB = this.getCookie('leaderboard=')
        if (arrLB[arrLB.length-1] != "=")
            return JSON.parse(arrLB.substring(arrLB.indexOf("=")+1)).sort((a,b)=>{
                return b.score - a.score
            })
        else{
            return []
        }
    }

    static addLeader(player, score){
        let arrLB = this.getLeaderboard()
        arrLB.push({name:player, score:score})
        arrLB.sort((a,b)=>{
            return b.score - a.score
        })
        document.cookie = 'leaderboard=' + JSON.stringify(arrLB)
        console.log(this.getLeaderboard())
    }

    static setLeaderBoard(){
        let div = document.querySelector('div.leaderboard')
        const arrLB = this.getLeaderboard()
        let ul = document.querySelector('ul#best')
        ul.remove()
        ul = document.createElement('ul')
        ul.id = "best"
        for (let i = 0; i < arrLB.length && i < 5; ++i) {
            let li = document.createElement('li')
            li.textContent = arrLB[i].name + " " + arrLB[i].score
            ul.appendChild(li)
        }
        div.appendChild(ul)
    }
}