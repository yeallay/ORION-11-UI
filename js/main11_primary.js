var J1AmpLevel = document.getElementById('J1SelftestValueSetting').innerHTML; 
document.getElementById('J1SelftestValueSetting').style.display = 'none';
// console.log(J1AmpLevel);

var J1M1H = document.getElementById('J1M1H');
var J1M2H = document.getElementById('J1M2H');
var J1M3H = document.getElementById('J1M3H');
var J1M4H = document.getElementById('J1M4H');
var J1M5H = document.getElementById('J1M5H');
var J1M6H = document.getElementById('J1M6H');
var J1M7H = document.getElementById('J1M7H');
var J1M8H = document.getElementById('J1M8H');

var J1TH  = document.getElementById('J1TH');

const J1TX  = document.getElementById('J1TX');
const J1ST  = document.getElementById('J1ST');

var O11Mutex = true ;

function J1allBtnInit(){
    document.getElementById('J1AUXRL').style.display = "none"
    document.getElementById('J1M1').disabled = true;
    document.getElementById('J1M2').disabled = true;
    document.getElementById('J1M3').disabled = true;
    document.getElementById('J1M4').disabled = true;
    document.getElementById('J1M5').disabled = true;
    document.getElementById('J1M6').disabled = true;
    document.getElementById('J1M7').disabled = true;
    document.getElementById('J1M8').disabled = true;

    document.getElementById('J1M1').checked = false;
    document.getElementById('J1M2').checked = false;
    document.getElementById('J1M3').checked = false;
    document.getElementById('J1M4').checked = false;
    document.getElementById('J1M5').checked = false;
    document.getElementById('J1M6').checked = false;
    document.getElementById('J1M7').checked = false;
    document.getElementById('J1M8').checked = false;

    J1M1H.classList.remove('bg-danger');
    J1M2H.classList.remove('bg-danger');
    J1M3H.classList.remove('bg-danger');
    J1M4H.classList.remove('bg-danger');
    J1M5H.classList.remove('bg-danger');
    J1M6H.classList.remove('bg-danger');
    J1M7H.classList.remove('bg-danger');
    J1M8H.classList.remove('bg-danger');
    J1AUXH.classList.remove('bg-danger');

    J1M1H.classList.remove('bg-success');
    J1M2H.classList.remove('bg-success');
    J1M3H.classList.remove('bg-success');
    J1M4H.classList.remove('bg-success');
    J1M5H.classList.remove('bg-success');
    J1M6H.classList.remove('bg-success');
    J1M7H.classList.remove('bg-success');
    J1M8H.classList.remove('bg-success');
    J1AUXH.classList.remove('bg-success');
     
    document.getElementById('J1TX').disabled = true;
    document.getElementById('J1ST').disabled = false;
    
    document.getElementById('J1STB').disabled= true;
    
    document.getElementById('J1Fan').src="imgs/FanStop.png";
    document.getElementById('J1RfRl_icon').src="imgs/Frequency .png"
    document.getElementById('J1Volt').innerHTML = "__" ;
    document.getElementById('J1Temp').innerHTML = "__";

    document.getElementById('J1systemError').style.display = 'none';


    if(EngineeringMode == true){
        document.getElementById("EngMode").style.display = '';
        document.getElementById('J1AUXRL').style.display = '';
        J1M1H.classList.add('bg-success') ;
        J1M2H.classList.add('bg-success') ;
        J1M3H.classList.add('bg-success') ;
        J1M4H.classList.add('bg-success') ;
        J1M5H.classList.add('bg-success') ;
        J1M6H.classList.add('bg-success') ;
        J1M7H.classList.add('bg-success') ;
        J1M8H.classList.add('bg-success') ;

        document.getElementById('J1M1').disabled = false ;
        document.getElementById('J1M2').disabled = false ;
        document.getElementById('J1M3').disabled = false ;
        document.getElementById('J1M4').disabled = false ;
        document.getElementById('J1M5').disabled = false ;
        document.getElementById('J1M6').disabled = false ;
        document.getElementById('J1M7').disabled = false ;
        document.getElementById('J1M8').disabled = false ;
    }else{
        document.getElementById("EngMode").style.display = 'none';
        document.getElementById('J1AUXRL').style.display = "none";
    } 

}

J1allBtnInit();
var J1IP    = "192.168.1.250" ;
var J1State = 0 ; 

const alloff= "all:0 ";

J1ONFF.addEventListener('click', function(){
    let inputValue = document.getElementById("J1IPAddress").value; 
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(inputValue.match(ipformat)){
        J1IP = inputValue ;

        //getVersion( );

        if (J1State == 1 ){
            J1State = 0 ;
            document.getElementById('J1STB').disabled = true ;
            document.getElementById('J1TX').disabled = true;
            document.getElementById('J1STB').classList.remove('bg-warning');
            J1allBtnInit();
            J1ONFF.textContent= "connect";
           

        }else{

            fetch( `http://${J1IP}:8081/status:1`)
            .then((response)=>{
                if(response.status >= 200 && response.status <= 299){
                    J1State = 1 ;
                    document.getElementById('J1STB').disabled = false ;
                    document.getElementById('J1TX').disabled = false ;
                    J1ONFF.textContent= "connected";       
                }
            }).catch((error) => {
                // Handle the error
                //console.log(error);
            });
        }

    }else{
        alert("You have entered an invalid IP address!");

    }
});


J1STB.addEventListener('click', function(){
    var xhttp = new XMLHttpRequest();
    var url   = `http://${J1IP}:8081/selftest:1`;

    O11Mutex = false ;

    document.getElementById('J1STB').innerHTML="<span class=\"spinner-border spinner-border-lm\" role=\"status\" aria-hidden=\"true\">&#x23F3;</span>";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            
            var data = JSON.parse(this.responseText);
            //console.log(data);
            data.M1ST > J1AmpLevel ? document.getElementById('J1M1').disabled = false : document.getElementById('J1M1').disabled = true;
            data.M2ST > J1AmpLevel ? document.getElementById('J1M2').disabled = false : document.getElementById('J1M2').disabled = true;
            data.M3ST > J1AmpLevel ? document.getElementById('J1M3').disabled = false : document.getElementById('J1M3').disabled = true;
            data.M4ST > J1AmpLevel ? document.getElementById('J1M4').disabled = false : document.getElementById('J1M4').disabled = true;
            data.M5ST > J1AmpLevel ? document.getElementById('J1M5').disabled = false : document.getElementById('J1M5').disabled = true;
            data.M6ST > J1AmpLevel ? document.getElementById('J1M6').disabled = false : document.getElementById('J1M6').disabled = true;
            data.M7ST > J1AmpLevel ? document.getElementById('J1M7').disabled = false : document.getElementById('J1M7').disabled = true;
            data.M8ST > J1AmpLevel ? document.getElementById('J1M8').disabled = false : document.getElementById('J1M8').disabled = true;
           
            document.getElementById('J1TX').disabled = false;
            
            
            document.getElementById('J1STB').innerHTML="Self Test"

            if(data.M1ST > J1AmpLevel){
                J1M1H.classList.add('bg-success') ;
                J1M1H.classList.remove('bg-warning');
            }else{
                J1M1H.classList.remove('bg-success') ;
                J1M1H.classList.add('bg-warning');
            }  

            if(data.M2ST > J1AmpLevel){
                J1M2H.classList.add('bg-success') ;
                J1M2H.classList.remove('bg-warning');
            }else{
                J1M2H.classList.remove('bg-success') ;
                J1M2H.classList.add('bg-warning');
            } 

            if(data.M3ST > J1AmpLevel){
                J1M3H.classList.add('bg-success') ;
                J1M3H.classList.remove('bg-warning');
            }else{
                J1M3H.classList.remove('bg-success') ;
                J1M3H.classList.add('bg-warning');
            } 

            if(data.M4ST > J1AmpLevel){
                J1M4H.classList.add('bg-success') ;
                J1M4H.classList.remove('bg-warning');
            }else{
                J1M4H.classList.remove('bg-success') ;
                J1M4H.classList.add('bg-warning');
            } 

            if(data.M5ST > J1AmpLevel){
                J1M5H.classList.add('bg-success') ;
                J1M5H.classList.remove('bg-warning');
            }else{
                J1M5H.classList.remove('bg-success') ;
                J1M5H.classList.add('bg-warning');
            } 

            if(data.M6ST > J1AmpLevel){
                J1M6H.classList.add('bg-success') ;
                J1M6H.classList.remove('bg-warning');
            }else{
                J1M6H.classList.remove('bg-success') ;
                J1M6H.classList.add('bg-warning');
            } 
            
            if(data.M7ST > J1AmpLevel){
                J1M7H.classList.add('bg-success') ;
                J1M7H.classList.remove('bg-warning');
            }else{
                J1M7H.classList.remove('bg-success') ;
                J1M7H.classList.add('bg-warning');
            } 

            if(data.M8ST > J1AmpLevel){
                J1M8H.classList.add('bg-success') ;
                J1M8H.classList.remove('bg-warning');
            }else{
                J1M8H.classList.remove('bg-success') ;
                J1M8H.classList.add('bg-warning');
            } 

            O11Mutex = true ;
            
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

});

J1ST.addEventListener('click', () => {
    var xhttp = new XMLHttpRequest();
    var url = `http://${J1IP}:8081/${alloff}`;

    O11Mutex = true ;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("J1RFRL2").disabled=false;
            document.getElementById("J1AUXRL").disabled=false;
            document.getElementById("J1RFRL").disabled=false;
            O11Mutex = true ;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    // console.log(url)
});


J1TX.addEventListener('click', () => {
    const J1api = J1chkAPI( );
    var xhttp = new XMLHttpRequest();
    var url = `http://${J1IP}:8081/${J1api}`;


    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Transmit -> "+url);
            document.getElementById("J1RFRL2").disabled=true;
            document.getElementById("J1RFRL").disabled=true;
            document.getElementById("J1AUXRL").disabled=true;
                      
            
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    // console.log(url);
});

setInterval(function () {
    if(J1State == 1 ){
        if( O11Mutex == true){
            getDataO11(); 
        }       
    }else{
        var _J1ONFF = document.getElementById('J1ONFF');
        if(_J1ONFF.textContent == "connected"){
            _J1ONFF.click();
        }
        J1allBtnInit();
    }
}, 1500); 

setInterval(function () {
    if(J1State == 1 ){ 
        
        if( O11Mutex == true){
            J1monitor();
        }
    }
}, 2900); 

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


async function fetchWithTimeout(resource, options) {
    const { timeout = 8000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);

    return response;
  }

async function getDataO11() {
    try {
        //const response = await fetch( `http://${J1IP}:8081/status:1`);
        const response = await fetchWithTimeout(`http://${J1IP}:8081/status:1`,{timeout: 2000});
        const data = await response.json();
    
        document.getElementById('J1Volt').innerHTML = parseInt(data.DCV)/10 ;
        document.getElementById('J1Temp').innerHTML = parseInt(data.Temp);
        parseInt(data.Temp) > 55 ? J1TH.classList.add('bg-danger') : J1TH.classList.remove('bg-danger');

        data.FAN == 1 ? document.getElementById('J1Fan').src="imgs/Fan.gif" : document.getElementById('J1Fan').src="imgs/FanStop.png";

        data.M1 == 1  ? J1M1H.classList.add('bg-danger') : J1M1H.classList.remove('bg-danger');
        data.M2 == 1  ? J1M2H.classList.add('bg-danger') : J1M2H.classList.remove('bg-danger');
        data.M3 == 1  ? J1M3H.classList.add('bg-danger') : J1M3H.classList.remove('bg-danger');
        data.M4 == 1  ? J1M4H.classList.add('bg-danger') : J1M4H.classList.remove('bg-danger');
        data.M5 == 1  ? J1M5H.classList.add('bg-danger') : J1M5H.classList.remove('bg-danger');
        data.M6 == 1  ? J1M6H.classList.add('bg-danger') : J1M6H.classList.remove('bg-danger');
        data.M7 == 1  ? J1M7H.classList.add('bg-danger') : J1M7H.classList.remove('bg-danger');
        data.M8 == 1  ? J1M8H.classList.add('bg-danger') : J1M8H.classList.remove('bg-danger');

        //data.RFRelay == 1 ? J1RFRLH.classList.add('bg-danger') : J1RFRLH.classList.remove('bg-danger'); 
        data.AUXRelay == 1 ? J1AUXH.classList.add('bg-danger') : J1AUXH.classList.remove('bg-danger');

        var j1RFRL = document.getElementById('J1RFRL').checked;
        j1RFRL == 1 ? document.getElementById('J1RfRl_icon').src="imgs/Frequency .png" : document.getElementById('J1RfRl_icon').src="imgs/Circle.png" ;
        
        if(data.M1 == 1 || data.M2 == 1 || data.M3 == 1 || data.M4 == 1 || data.M5 == 1 || data.M6 == 1 || data.M7 == 1 || data.M8 == 1 ){

            data.RFRelay == 1 ? document.getElementById('J1RfRl_icon').src="imgs/Frequency.gif" : document.getElementById('J1RfRl_icon').src="imgs/Red Circle.gif";
            var myAudio = new Audio('audio/Defeat.wav');
            myAudio.play();

        }
        return data;
    } catch (error) {
        console.log(error);
        // if(error != undefined && error!=""){
        //     console.log("Error: "+error.name);
        //     if(error.name=="AbortError"){
        //         J1State=0;
        //         J1ONFF.textContent= "connect";
        //     }
        // }
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function J1chkAPI( ){
    var J1API = '';
    var j1m1 = document.getElementById('J1M1').checked; j1m1 == true? J1API+="M1:1" : J1API +="M1:0" ; J1API+=",";
    var j1m2 = document.getElementById('J1M2').checked; j1m2 == true? J1API+="M2:1" : J1API +="M2:0" ; J1API+=",";
    var j1m3 = document.getElementById('J1M3').checked; j1m3 == true? J1API+="M3:1" : J1API +="M3:0" ; J1API+=",";
    var j1m4 = document.getElementById('J1M4').checked; j1m4 == true? J1API+="M4:1" : J1API +="M4:0" ; J1API+=",";
    var j1m5 = document.getElementById('J1M5').checked; j1m5 == true? J1API+="M5:1" : J1API +="M5:0" ; J1API+=",";
    var j1m6 = document.getElementById('J1M6').checked; j1m6 == true? J1API+="M6:1" : J1API +="M6:0" ; J1API+=",";
    var j1m7 = document.getElementById('J1M7').checked; j1m7 == true? J1API+="M7:1" : J1API +="M7:0" ; J1API+=",";
    var j1m8 = document.getElementById('J1M8').checked; j1m8 == true? J1API+="M8:1" : J1API +="M8:0" ; J1API+=",period:";
    J1API += getJ1Interval();

    J1API+=",";

    var j1RFRL = document.getElementById('J1RFRL').checked;   j1RFRL == true ? J1API +="RFRL:1" : J1API +="RFRL:0" ; J1API+=",";
    var j1AUXRL= document.getElementById('J1AUXRL').checked;  j1AUXRL== true ? J1API +="AUXRL:1": J1API +="AUXRL:0"; 
  
    // console.log(J1API);
    return J1API;
}

function getJ1Interval(){
    var interval = document.getElementById('J1setInterval').selectedIndex;
    return interval;
 }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function J1monitor(){
    const response = await fetch( `http://${J1IP}:8081/monitor:1`);
    const data = await response.json();

   if(data.M1 == 1)  { J1M1H.classList.add('bg-danger') ;}
   if(data.M2 == 1)  { J1M2H.classList.add('bg-danger') ;}
   if(data.M3 == 1)  { J1M3H.classList.add('bg-danger') ;}
   if(data.M4 == 1)  { J1M4H.classList.add('bg-danger') ;}
   if(data.M5 == 1)  { J1M5H.classList.add('bg-danger') ;}
   if(data.M6 == 1)  { J1M6H.classList.add('bg-danger') ;}
   if(data.M7 == 1)  { J1M7H.classList.add('bg-danger') ;}
   if(data.M8 == 1)  { J1M8H.classList.add('bg-danger') ;}


    if(data.M1 == 1 || data.M2 == 1 || data.M3 == 1 || data.M4 == 1 || data.M5 == 1 || data.M6 == 1 || data.M7 == 1 || data.M8 == 1 ){
        var myAudio = new Audio('audio/ErrorTx.wav');
        myAudio.play();
        document.getElementById('J1systemError').style.display = 'block';
    }else{
        document.getElementById('J1systemError').style.display = 'none';
        // var myAudio = new Audio('audio/ErrorTx.wav');
        // myAudio.play();
        // document.getElementById('J1systemError').style.display = 'block';
    }
    
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++      
async function getVersion( ){     
    const response = await fetch( `http://${J1IP}:8081/version:1`);
    const data = await response.json();
    console.log(data.Version); 
}

// J1RFRL.addEventListener('click', () => {
//     var j1RFRL = document.getElementById('J1RFRL').checked;
//     j1RFRL == 0 ? document.getElementById('J1RfRl_icon').src="imgs/Frequency .png" : document.getElementById('J1RfRl_icon').src="imgs/Circle.png";
    
// });

function change_RFRLG(rdo){
    console.log(rdo.id);
    if(rdo.id=="J1RFRL"){
        document.getElementById('J1RfRl_icon').src="imgs/Frequency .png";   
    }
    else{
        
        document.getElementById('J1RfRl_icon').src="imgs/Circle.png";
    }
}