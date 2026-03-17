const J1IPAddress = "192.168.100.51";  //IP address
const J1SelftestLevel = 512;       // max 540 to min 512


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Jammer1 = {
    Channel1: "System-1",
    J1M1: "433MHz",
    J1M2: "868MHz",
    J1M3: "915MHz",
    J1M4: "GNSS2",
    J1M5: "GNSS1",
    J1M6: "2.4GHz",
    J1M7: "5.1GHz",
    J1M8: "5.8GHz"
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// document.getElementById('channel1').innerHTML = Jammer1.Channel1;
document.getElementById("J1IPAddress").value = J1IPAddress;
document.getElementById('J1lb1').innerHTML = Jammer1.J1M1;
document.getElementById('J1lb2').innerHTML = Jammer1.J1M2;
document.getElementById('J1lb3').innerHTML = Jammer1.J1M3;
document.getElementById('J1lb4').innerHTML = Jammer1.J1M4;
document.getElementById('J1lb5').innerHTML = Jammer1.J1M5;
document.getElementById('J1lb6').innerHTML = Jammer1.J1M6;
document.getElementById('J1lb7').innerHTML = Jammer1.J1M7;
document.getElementById('J1lb8').innerHTML = Jammer1.J1M8;
J1SelftestLevel < 450 ? J1SelftestLevel = 400 : null;
J1SelftestLevel > 600 ? J1SelftestLevel = 600 : null;
document.getElementById('J1SelftestValueSetting').innerHTML = J1SelftestLevel;
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
