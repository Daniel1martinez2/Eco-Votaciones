const candidatos = document.querySelector('.candidatos'); 
const votaciones = document.querySelector('.votaciones'); 
const enviar = document.querySelector('.submit'); 
const submitVote = document.querySelector('.submitVote'); 

const id = document.querySelector('.creado'); 
const nombre = document.querySelector('.nombre'); 

const votado = document.querySelector('.votado'); 

const database = firebase.database(); 

var people= []; 
var votados = []; 
cuento= (user, votos)=>{ 
    
    let urna =[]; 


    user.forEach((u,w)=>{
        urna.push({id:u.id, resul: 0})
     

        votos.forEach(v=>{
            if(v.id == u.id){
                urna[w].resul +=1; 
            }
            
        }); 

    }); 
    console.log(urna); 
    var efe = ''; 
    for(let i = 0; i<people.length; i++){
        efe = (efe+urna[i].id+ ':'+urna[i].resul +'\n'); 
    }
    console.log(efe); 
return efe; 
}

candidatos.addEventListener('click', ()=>{
    let candi = ''; 
    people.forEach(elem =>{
        candi = candi + elem.name +'\n'
    }); 
   console.log(candi);
   alert(candi); 
}); 

votaciones.addEventListener('click', ()=>{
   alert( cuento(people, votados)); 
   
}); 

enviar.addEventListener('click', ()=>{
    people= []; 
    let objeto= {
        id : id.value,
        name: nombre.value
    }; 
    database.ref('users/').push().set(objeto);
    

}); 
submitVote.addEventListener('click',()=>{
    let voto= {
        id : votado.value,
    }; 
    database.ref('Votos/').push().set(voto);
}); 


database.ref('users').on('value', (data)=>{

    data.forEach(element => {
        people.push(element.val()); 
    });
}); 

database.ref('Votos').on('value',(data)=>{
    votados= []; 
    data.forEach(element => {
        votados.push(element.val()); 

    });
}); 


