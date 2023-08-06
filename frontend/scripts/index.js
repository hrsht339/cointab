let fbutton = document.querySelector("#fetch")
let dbutton = document.querySelector("#delete")

fbutton.addEventListener("click", () => {
    fetch("https://randomuser.me/api/?results=50")
        .then((res) => {
            return res.json()
        }).then((result) => {
            let data = result.results
            let arr = data.map((elem) => {
                let user = {
                    "name": elem.name.first + " " + elem.name.last,
                    "email": elem.email,
                    "gender": elem.gender,
                    "dob": elem.dob.date,
                    "location": elem.location.city,
                    "cell": elem.cell
                }

                return user
            })

            fetch("http://localhost:4500/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(arr)
                }).then((res) => {
                    alert("50 users have been inserted")
                }).catch((err) => {
                    console.log(err)
                })
            // console.log(arr)

        }).catch((err) => {
            console.log(err)
        })
})

dbutton.addEventListener("click", () => {
    fetch("http://localhost:4500/delete", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then((res) => {
                    alert("all the users have been deleted")
                }).catch((err) => {
                    console.log(err)
                })
})