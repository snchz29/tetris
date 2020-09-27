class Cookie {
    static setName() {
        document.cookie = "name=" + document.getElementById("name").value
    }

    static getCookie(param) {
        let cookieArr = decodeURIComponent(document.cookie).split(';')
        for (let i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i].startsWith(param)) {
                return cookieArr[i]
            }
        }
        return ""
    }

    static getName() {
        return this.getCookie('name').substring(5)
    }

    static getLeaderboard(){
        let arrLB = this.getCookie(' leaderboard')
        if (arrLB)
            return JSON.parse(arrLB.substring(13)).sort((a,b)=>{
                return b.score - a.score
            })
        else{
            return []
        }
    }

    static addLeader(player, score){
        let arrLB = this.getLeaderboard()
        for (let i = arrLB.length-1; i >= 0; --i) {
            if (arrLB[i].score <= score){
                if (i < 4){
                    arrLB[i + 1] = {name:arrLB[i].name, score:arrLB[i].score}
                }
                arrLB[i] = {name:player, score:score}
            }
        }
        if (arrLB.length === 0){
            arrLB[0] = {name:player, score:score}
        }
        document.cookie = 'leaderboard=' + JSON.stringify(arrLB)
        console.log(this.getLeaderboard())
    }

    static setLeaderBoard(){
        let divLB = document.querySelector('div.leaderboard')
        let ul = document.createElement('ul')
        const arrLB = this.getLeaderboard()
        for (const elem of arrLB) {
            let li = document.createElement('li')
            li.textContent = elem.name + " " + elem.score
            ul.appendChild(li)
        }
        let header = document.createElement('h5')
        header.textContent = "Таблица лучших игроков"
        divLB.appendChild(header)
        divLB.appendChild(ul)
    }
}