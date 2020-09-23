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
        return JSON.parse(arrLB.substring(13)).sort((a,b)=>{
            return b.score - a.score
        })
    }

    static addLeader(player="afgdsgdsfg", score = 1230){
        let arrLB = this.getLeaderboard()
        for (let i = arrLB.length - 1; i >= 0; --i) {
            if (arrLB[i].score <= score){
                if (i < arrLB.length - 1){
                    arrLB[i + 1].name = arrLB[i].name
                    arrLB[i + 1].score = arrLB[i].score
                }
                arrLB[i].name = player
                arrLB[i].score = score
            }
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