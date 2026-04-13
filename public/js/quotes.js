document.querySelector("#closeModal").addEventListener("click", () => { document.querySelector("#authorModal").close() })
let authorLinks = document.querySelectorAll(".authorName");
for (let i of authorLinks) {
    i.addEventListener("click", displayAuthorInfo);
}

async function displayAuthorInfo() {
    let authorId = this.getAttribute("authorId");
    // alert(authorId);
    let url = "/api/author/" + authorId;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data[0].firstName);
    // alert(this.id);

    document.querySelector("#authorName").textContent = data[0].firstName + " " + data[0].lastName;
    document.querySelector("#authorPicture").src = data[0].portrait;
    document.querySelector("#authorDOD").textContent = data[0].dod.substring(0, 10);
    document.querySelector("#authorDOB").textContent = data[0].dob.substring(0, 10);
    document.querySelector("#authorSex").textContent = data[0].sex;
    document.querySelector("#authorProfession").textContent = data[0].profession;
    document.querySelector("#authorCountry").textContent = data[0].country;
    document.querySelector("#authorBio").textContent = data[0].biography;

    //enable the modal
    document.querySelector("#authorModal").showModal();
}