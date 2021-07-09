
let app = new Vue({
    el: "#app",
    data: {
        newName: ""
    },
    methods: {
        addName () {
            this.newName;
            localStorage.setItem("name",this.newName);
            window.location.href = "/app.html";  
    },
    logout(){
        window.location.href = "/index.html";
    }
}

            
})