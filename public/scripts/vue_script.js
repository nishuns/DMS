const createdbs=new Vue({
    el: "#createdbs",
    data:{
        style:{
            display: "none"
        },
        loading:{
            display: 'none'
        } ,
        databasename: 'Choose...',
        databasefiletype: 'Choose...',
        spreadsheet: [],
        addfile_button:{
            disabled: true
        },
        create_button: {
            disabled: true
        }
    },
    computed:{
        createdbsemptycheck: function(){
            if(this.databasename=='students' && this.databasefiletype=='.xlsx'){
                this.create_button.disabled=false;
            }else{
                this.create_button.disabled=true;
            }
        },
        addfileemptycheck:function(){
            if(this.databasefiletype=='.xlsx'){
                this.addfile_button.disabled=false;
            }else{
                this.addfile_button.disabled=true;
            }
        }
    },
    methods:{
        createdatabsemenuclose: function(){
            this.style.display="none";
        },
        createspreadsheet: function(){
            this.loading.display="block";
            this.post();
        },
        post: function(){
            var self=this;
            axios.post('/savespreadsheet', {
                spreadsheet: this.spreadsheet,
                table: this.databasename
            }).then((response)=>{
                let output=response.data;
                if(output.status=='success'){
                    app.spreadsheets=output.spreadsheets;
                    showit.spreadsheets=output.spreadsheets;
                    self.style.display="none";
                    self.loading.display="block";
                }
            })
        }
    }
})

const app=new Vue({
    el: "#app",
    data: {
        style: {
            display: 'block'
        },
        search: '',
        search_button: {
            disabled: true,
        },
        createdbs_button: {
            disabled: false,
        },
        searchdbs: '',
        spreadsheets: [],
    },
    computed:{
        loadspreadsheets: function(){
            this.get();
        },
        searchemptycheck: function(){
            if(this.searchdbs.length>0){
                this.search_button.disabled=false;
            }else{
                this.search_button.disabled=true;
            }
        }
    },
    methods: {
        createdatabasemenuopen: function(){
            createdbs.style.display="block";
        },
        searchdatabase: function(){
            
        },
        showspreadsheet:function(){
            showit.style.display="block";
        },  
        get: function(){
            var self=this;
            axios.get('/getspreasheets').then((response)=>{
                let output=response.data;
                console.log(output);
                if(output.status=="success"){
                    self.spreadsheets=output.spreadsheets;
                    showit.spreadsheets=self.spreadsheets;
                }
            })
        }
    },
})

var showit=new Vue({
    el: "#view",
    data:{
        style:{
            display: "none"
        },
        searchoption: 'Choose...',
        searchbar: '',
        spreadsheets:[],
        datasheets: []
    },
    computed:{
        searchemptycheck: function(){
            if(this.searchbar.length>0){
                if(this.searchoption=="Name"){
                    for(let each in this.spreadsheets){
                        if(this.spreadsheets[each].name==this.searchbar){
                            this.datasheets=[this.spreadsheets[each]];
                            console.log(this.datasheets);
                        }
                    }
                }
                else if(this.searchoption=="Roll no"){
                    for(let each in this.spreadsheets){
                        if(this.spreadsheets[each].roll_no==this.searchbar){
                            this.datasheets=[this.spreadsheets[each]];
                        }
                    }
                }
                else{
                    this.datasheets=[];
                }
            }else{
                this.datasheets=this.spreadsheets;
            }
        }
    },
    methods:{
        closeit:function(){
            this.style.display="none";
        }
    }
})