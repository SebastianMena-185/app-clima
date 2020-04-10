  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var provincia=[];
var valorCiudad='';
var valorProvincia='';
var a=false,b=false,j=false;


    var camposVacios = app.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Clima.apps',
  //titleRightText: 'now',
  subtitle: 'Campos vacios',
  text: 'Por favor, complete los campos',
  closeTimeout: 3000,
});
    var noCoinciden = app.notification.create({
  icon: '<i class="icon demo-icon">7</i>',
  title: 'Clima.apps',
  //titleRightText: 'now',
  subtitle: 'La localidad no coincide con la provincia',
  text: 'Por favor, revea los campos',
  closeTimeout: 3000,
});


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
 
 
    console.log("Device is ready!");
     var url="https://ws.smn.gob.ar/map_items/forecast/1"; 
    app.request.json(url, function(datosDevueltoss) {                
            
            for (i=0; i<datosDevueltoss.length; i++){
             provincia[i]=datosDevueltoss[i].province;
           
        
           $$('#select1').append(`<option  value="${datosDevueltoss[i].name}">${datosDevueltoss[i].name}</option>`).addClass('.selectores');
                
              
            }
           
       });
            $$('#cuidad').on('click', function(){
           b=true;
            })
         $$('#provincia').on('click', function(){
            a=true;
            
            
         var provinciasSinCopias = [...new Set(provincia)];
         for (var i = 0; i < provinciasSinCopias.length; i++) {
        $$('#select2').append(`<option  value="${provinciasSinCopias[i]}">${provinciasSinCopias[i]}</option>`);
        
         }
              
        }); 
        function coinciden(n,m){
         var url="https://ws.smn.gob.ar/map_items/forecast/1"; 
         app.request.json(url, function(datosDevueltoss){
                    for (i=0; i<datosDevueltoss.length; i++){
                      if (datosDevueltoss[i].name == n && datosDevueltoss[i].province == m) {
                      j=true;  
                      return $$('#iniciar').attr('href','/about/');
                    }
                    }
                });
     }

         $$('#iniciar').on('click', function(){
            valorCiudad= $$('#select1').val();
            console.log(valorCiudad);
            valorProvincia= $$('#select2').val();            
            console.log(valorProvincia);
            coinciden(valorCiudad, valorProvincia);
            console.log(j);
         
          if (a==false && b==false) {camposVacios.open();}
         else if (j==false) {noCoinciden.open();}
          
            //var url="https://ws.smn.gob.ar/map_items/forecast/1"; 
            
            });
        });
       


        

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
    
    var url="https://ws.smn.gob.ar/map_items/forecast/1"; 
    app.request.json(url, function(datosDevueltos) {                
        

        for (i=0; i<datosDevueltos.length; i++) {
            if (datosDevueltos[i].name == valorCiudad && datosDevueltos[i].province == valorProvincia) {
                ciudad = datosDevueltos[i].name;
                $$('#localidad').html(ciudad);
                provincia = datosDevueltos[i].province;
                $$('#provincia').html(provincia);

                temp_ma = datosDevueltos[i].weather.morning_temp;
                $$('#temp_m').html(temp_ma+'º');
                desc_ma = datosDevueltos[i].weather.morning_desc;
                $$('#desc_m').html(desc_ma);
                icono_id_ma = datosDevueltos[i].weather.morning_id;
                icono_ma = "http://l.yimg.com/a/i/us/we/52/"+icono_id_ma+".gif";
                $$('#img_m').attr('src', icono_ma);

                temp_ta = datosDevueltos[i].weather.afternoon_temp;
                $$('#temp_t').html(temp_ta+'º');
                desc_ta = datosDevueltos[i].weather.afternoon_desc;
                $$('#desc_t').html(desc_ta);
                icono_id_ta = datosDevueltos[i].weather.afternoon_id;
                icono_ta = "http://l.yimg.com/a/i/us/we/52/"+icono_id_ta+".gif";
                //$$('#img_t').attr('src', icono_ta);

            }



        }



    });


})


/** FUNCIONES PROPIAS **/




