document.addEventListener('DOMContentLoaded', function(){
    //nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    
//    //dropdown
//    var triggers = document.querySelectorAll('.dropdown-trigger');
//    
//    var options = {
//        'closeOnClick': true,
//        'hover':true
//    }
//    
//    var instances = M.Dropdown.init(triggers, options);
}); 
