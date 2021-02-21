
// Navbar Button Resizing ---
if(window.innerWidth<=768){
    document.querySelector('.create-new-database').innerHTML="<i class='fas fa-plus'></i>";
    document.querySelector('.nav-search-button').innerHTML="<i class='fas fa-search'></i>";
}else{
    document.querySelector('.create-new-database').innerHTML="<i class='fas fa-plus'></i> Create New Database";
    document.querySelector('.nav-search-button').innerHTML="<i class='fas fa-search'></i> Search";
}

document.body.onresize=()=>{
    if(window.innerWidth<=768){
        document.querySelector('.create-new-database').innerHTML="<i class='fas fa-plus'></i>";
        document.querySelector('.nav-search-button').innerHTML="<i class='fas fa-search'></i>";
    }else{
        document.querySelector('.create-new-database').innerHTML="<i class='fas fa-plus'></i> Create New Database";
        document.querySelector('.nav-search-button').innerHTML="<i class='fas fa-search'></i> Search";
    }
}

function openFile(){
    document.getElementById('getinputfile').click();
}

var input = document.getElementById('getinputfile');
var dbs=[];
input.addEventListener('change', () => {
    readXlsxFile(input.files[0]).then((rows) => {
        let keys=[];
        for(let col of rows[0]) keys.push(col);
        for(let i=1;i<rows.length;i++){
            let temp={};
            for(let each in rows[i]){
                temp[keys[each]]=rows[i][each];
            }
            dbs.push(temp);
            temp="";
        }
        console.log(dbs);
      // `rows` is an array of rows
      // each row being an array of cells.
    });
  })
