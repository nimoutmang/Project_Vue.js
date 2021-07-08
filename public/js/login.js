let login = (event) =>{
    event.preventDefault();
    let userName = document.querySelector(".input_user").value;
   console.log(userName)
//     let URL = rootEndpoinde + "/post";
//     axios
//         .get(URL)
//         .then(res =>{
//             let users = res.data;
//             console.log(users)
//             let islogin = false;
//             for (let user of users){
//                 if (user.authorname === userName && !islogin){
//                     localStorage.setItem("name", user.authorname);
//                     islogin = true;
//                 }
//             }
//             if(islogin){
//                 alert("Login success!")
//                 window.location.href = rootEndpoinde + "/index.html";
//             }
//         })
 }


const btnLogin = document.querySelector("#button");
// const rootEndpoinde = "http://localhost:3000";
btnLogin.addEventListener("click", login);