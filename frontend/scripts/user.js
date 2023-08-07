let tbody = document.querySelector("tbody")

function display(data) {
    tbody.innerHTML = null
    data.forEach((user) => {
        row = document.createElement("tr")

        id = document.createElement("td")
        id.innerText = user.id

        naam = document.createElement("td")
        naam.innerText = user.name

        email = document.createElement("td")
        email.innerText = user.email

        gender = document.createElement("td")
        gender.innerText = user.gender

        dob = document.createElement("td")
        dob.innerText = user.dob

        loc = document.createElement("td")
        loc.innerText = user.location

        cell = document.createElement("td")
        cell.innerText = user.cell

        createdAt = document.createElement("td")
        createdAt.innerText = user.createdAt

        updatedAt = document.createElement("td")
        updatedAt.innerText = user.updatedAt

        row.append(id, naam, email, gender, dob, loc, cell, createdAt, updatedAt)
        tbody.append(row)
    })
}

let arr

let counter = 1

async function fetcher() {
    try {
        let res = await fetch(`http://localhost:4500/get/${counter}`)
        let result = await res.json()
        if (result.msg != "out of range") {
            arr = result
            display(arr)
            return true
        }
        else {
            display(arr)
            return false
        }
    }
    catch(err){
        console.log(err)
    }
   
}



let prev = document.querySelector("#prev")
let next = document.querySelector("#next")
let pageno = document.querySelector("#page")

pageno.innerText = counter

next.addEventListener("click", async() => {
    counter++
    if (await fetcher()) {
        pageno.innerText = counter
    }
    else{
        counter--
        pageno.innerText = counter
    }
    console.log(counter)

})

prev.addEventListener("click", async() => {
    counter--
    if (await fetcher()) {
        pageno.innerText = counter
    }
    else {
        counter++
        pageno.innerText = counter
    }
})



let search = document.querySelector("#search")
let sort = document.querySelector("#sort")


search.addEventListener("input", (e) => {
    let inp = e.target.value
    let farr = arr.filter((user) => {
        return user.name.toLowerCase().includes(inp.toLowerCase())
    })
    display(farr)
})


sort.addEventListener("change", (e) => {
    let mapp = arr.map((elem) => {
        elem.dob = new Date(elem.dob)
        return elem
    })
    console.log(mapp)
    if (e.target.value == "low to high") {
        let farr = mapp.sort((a, b) => { return a.dob - b.dob })
        // display(farr)
        display(farr)
    }
    else if (e.target.value == "high to low") {
        let farr = mapp.sort((a, b) => { return b.dob - a.dob })
        // display(farr)
        display(farr)
    }
})


fetcher()