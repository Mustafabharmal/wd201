const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2), {
    alias: {
        port: "p",
    }
});

const port = args.port || 3000;


let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html", (err, project) => {
    if (err) {
      throw err;
    }
    registrationContent = project;
  });

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  const form_validate=()=>{
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    // const repassword=document.getElementById("rpassword").value;
    const dob=document.getElementById("dob").value;
    const acceptterms=document.getElementById("acceptTerms").checked;
    var Entries;
    // if(password===repassword)
    // {
        
    // }
    // else
    // {
    //     alert("Password didnt match");
    //     preventDefault();
    // }
    if(localStorage.getItem('user-entries')===null)
    Entries=[];
    else
    Entries=JSON.parse(localStorage.getItem('user-entries'))
    Entries.unshift({
    name:name,
    email:email,
    password:password,
    dob:dob,
    acceptterms:acceptterms
    })
    localStorage.setItem('user-entries',JSON.stringify(Entries));
    showdata()
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('password').value="";
    document.getElementById('dob').value="";
    document.getElementById('acceptTerms').value="true";
    }
    const showdata=()=>{
    var Entries;
    if(localStorage.getItem('user-entries')===null)
    Entries=[];
    else
    Entries=JSON.parse(localStorage.getItem('user-entries'))
    
    var html="";
    
    Entries.forEach((element,intex)=>{
    html += "<tr>";
    html += '<td>' + element.name+"</td>";
    html += '<td>' + element.email+"</td>";
    html += '<td>' + element.password+"</td>";
    html += '<td>' + element.dob+"</td>";
    html += '<td>' + element.acceptterms+"</td>";
    html += "</tr>";
    });
    document.querySelector("#regTable tbody").innerHTML=html;
    
    }
    document.onload=showdata();
