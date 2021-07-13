new Vue({
    el: '#app',
    data: {
        is_Login: false,
        anothername:'',
        profile_user : '',
        img: [],
        //  avaiable post
        date:'',
        content:'',
        URL:'http://localhost:3000/post',
        dataPost:[],
        isPost : true,
        idToEdit : -1,
        previewImage:'',
        image:''
    },
    methods: {
        login: function(){
            this.profile_user = this.anothername;
            localStorage.setItem('anothername',this.anothername);
            anothername='';
            if(this.profile_user !== ''){
                this.is_Login = true;
                localStorage.setItem('is_Login', this.is_Login);
            }
            
       },
       logout: function(){
           this.is_Login = false;
           localStorage.setItem('is_Login', this.is_Login);

       },
      
       postItem: function(){
            let today = new Date();
            this.date = (today.getDay() + 1) + ', ' + today.getMonth() + ', ' + today.getHours() + ':' + today.getMinutes();

            let anothername = localStorage.getItem('anothername');
            let content = this.content;
            
            window.axios.post(this.URL, {
                "anothername": anothername,
                "content": content,
                "date": this.date
            })
                .then(response => {
                    this.dataPost = response.data;
                    console.log(this.dataPost);
                });
            },
            deleteItem(item) {
                let id = item.id;
                console.log(id);
                window.axios.delete(this.URL +'/'+ id)
                    .then(response=>{
                        this.dataPost = response.data;
                        console.log(this.dataPost);
                    })
            },
            toEdit(item){
                this.isPost = false;
                this.idToEdit = item.id;
                this.content = item.content;
                console.log(item.content);
            },

            editItem(){
                this.isPost = true;
                window.axios.put(this.URL,{"id":this.idToEdit,"content":this.content})
                    .then(response=>{
                        this.dataPost = response.data;
                        console.log(this.dataPost);
                    })
            },
            selectImage(event){
                this.image = event.target.files[0];
                let previewImage = event.target.files[0];
                reader.onload = (e) =>{
                    this.preveiw = e.target.result;

                }
                reader.readAsDataURL(previewImage);
            },
            onSubmit(){
                let 
            }
        
        },
        
    mounted: function() {
        axios.get(this.URL).then(response=>{
            this.dataPost = response.date;
        })
        this.is_Login = localStorage.getItem('is_Login');
        this.$nextTick(function (){
            window.axios.get(this.URL)
            .then(response => {
                this.dataPost = response.data;
                this.anothername = localStorage.getItem('anothername');
            })
        });
    },
})