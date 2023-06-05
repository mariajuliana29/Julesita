new Vue({
    el:"main",
    data:{
        /*/Array general/*/
        myArraObjVeh:[],
        /*/Array de venta/*/
        myArrayObjCar:[],
        /*/Array del historial/*/
        myArregloCarHis:[],
        /*/Array del carrito/*/
        myArrayCarr: [],
        objVeh:{
            codVeh:null,
            modelo:null,
            marca:null,
            linea:null,
            kmsRec:null,
            tipo:null,
            precio:null,
            srcImg:null,
            cantExistencia:null,
            
        },
        
        objCliente:{
            ced:null,
            nom:null,
            nume:null,
            cvv:null,
            dir:null,
            tel:null,
            fecha:null,

        },
        btnValidar:true,
        posAct:null,
        totalVenta: null,
        ocultarDiv:false,
        pos:null,
        cedComprador:null,
        ocultarDivCarrito:false,

    },
    mounted(){
        /*/Local de array general/*/
        if(localStorage.getItem('myArraObjVeh')){
            this.myArraObjVeh =  JSON.parse(localStorage.getItem('myArraObjVeh'));
            console.log(localStorage.getItem('myArraObjVeh'));
        };
        /*/local de array carrito/*/

        if(localStorage.getItem('myArrayCarr')){
            
            this.myArrayCarr =  JSON.parse(localStorage.getItem('myArrayCarr'));
            console.log(localStorage.getItem('myArrayCarr'));
            this.total();
        }
        if(localStorage.getItem('myArregloCarHis')){
            this.myArregloCarHis =  JSON.parse(localStorage.getItem('myArregloCarHis'));
        }
        /*/local de array venta/*/
        if(localStorage.getItem('myArrayObjCar')){
            
            this.myArrayObjCar =  JSON.parse(localStorage.getItem('myArrayObjCar'));
            console.log(localStorage.getItem('myArrayObjCar'));
           
        }
    },
    methods:{
        /*/Venta libros/*/
        habilitarDiv(){
            this.ocultarDiv=true;
          },
        comprafinal(){
             this.cedComprador=this.objCliente.ced;
            let resultado= JSON.parse(JSON.stringify(this.objCliente));
            this.myArrayObjCar.push(resultado );
            for(j in this.myArrayCarr)
            this.myArrayCarr[j].ced=this.cedComprador;
            this.myArrayObjCar.push(this.myArrayCarr);
            this.persist3();
            this.ocultarDiv=false;
            this.ocultarDivCarrito=true;
            this.limpiarCajas2();
            
           
        },
        limpiarCajas2(){
            this.objCliente.ced=null;
            this.objCliente.nom=null;
            this.objCliente.ape=null;
            this.objCliente.dir=null;
            this.objCliente.tel=null;
        },

          confirmarVta(){
            alert("Venta Confirmada")
            for(j in this.myArrayCarr)
           this.myArregloCarHis.push(this.myArrayCarr[j]);
           this.persist4();
          this.myArrayCarr=[];
          this.ocultarDivCarrito=false;
    
          },
          /*/Agregar los libros- Gestion libros/*/
        agregar(){
            let resultado=JSON.parse(JSON.stringify(this.objVeh));
            this.myArraObjVeh.push(resultado);
            this.persist();
            console.log(this.myArraObjVeh);
            this.limpiarCajas();
        },
        limpiarCajas(){
            this.objVeh.codVeh=null;
            this.objVeh.modelo=null;
            this.objVeh.marca=null;
            this.objVeh.linea=null;
            this.objVeh.kmsRec=null;
            this.objVeh.tipo=null;
            this.objVeh.precio=null;
            this.objVeh.srcImg=null;
            this.objVeh.cantExistencia=null;
        },
        
        editar(pos){
            this.posAct=pos;
            this.btnValidar=false;
            this.objVeh.codVeh=this.myArraObjVeh[pos].codVeh; 
            this.objVeh.modelo=this.myArraObjVeh[pos].modelo;  
            this.objVeh.marca=this.myArraObjVeh[pos].marca  ;
            this.objVeh.linea=this.myArraObjVeh[pos].linea  ;
            this.objVeh.kmsRec=this.myArraObjVeh[pos].kmsRec  ;
            this.objVeh.tipo=this.myArraObjVeh[pos].tipo  ;
            this.objVeh.precio=this.myArraObjVeh[pos].precio  ;
            this.objVeh.srcImg=this.myArraObjVeh[pos].srcImg  ;
            this.objVeh.cantExistencia=this.myArraObjVeh[pos].cantExistencia  ;
        },
        eliminar(pos){
            this.myArraObjVeh.splice(pos,1);
            this.persist();
        },
		actualizar(){
            this.btnValidar=true;
            let resultado=JSON.parse(JSON.stringify(this.objVeh));
            this.myArraObjVeh[this.posAct]=resultado;
            this.persist();
            alert("Actualización completada");
            this.limpiarCajas();
		},
        persist(){
            localStorage.setItem('myArraObjVeh', JSON.stringify(this.myArraObjVeh))
       },
        persist3(){
        localStorage.setItem('myArrayObjCar', JSON.stringify(this.myArrayObjCar))
   },
   persist4(){
    localStorage.setItem('myArregloCarHis', JSON.stringify(this.myArregloCarHis));
},
        /*/Agregar al carrito/*/
       addToCart: function (i){
            
        this.myArrayCarr.push(this.myArraObjVeh[i]);
        console.log(this.myArrayCarr);
        this.persist2();
    },

    eliminarCar: function (pos){

        this.myArrayCarr.splice(pos, 1);
        this.persist2();
    },

    total(){
         for(j in this.myArrayCarr){
            this.totalVenta += parseFloat(this.myArrayCarr[j].precio)
         }
    },

    persist2: function(){
        localStorage.setItem('myArrayCarr', JSON.stringify(this.myArrayCarr))
    },
},
})