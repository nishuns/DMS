
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