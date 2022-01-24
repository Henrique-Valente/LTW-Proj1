const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
// const hash = crypto.createHash("md5").update(value).digest("hex");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((request, response) => {
  let body = "";

  request
    .on("error", (err) => {
      console.error(err);
    })
    .on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    })
    .on("end", () => {
      switch (request.url) {
        case "/ranking":
          ranking(request, response, body);
          break;
        case "/register":
          register(request, response, body);
          break;
        default:
          response404(response);
          break;
      }
    });
});

function ranking(request, response, body) {
  console.log(request.url);
}

function register(request, response, body) {
  var parameters = JSON.parse(body);
  //dar hash da password
  const hash = crypto
    .createHash("md5")
    .update(parameters["password"])
    .digest("hex");
  var count = Object.keys(parameters).length;

  //verificar o tamanho
  if (count == 2) {
    // verificar se nick e password sao os dois parametros do request
    if ("nick" in parameters && "password" in parameters) {
      var storeData = readFile("register");
      var register = 1;
      storeData.forEach((element) => {
        //verficar se o nick do request ja existe, como verificarmos anteriormente o tamanho sendo 2,
        // e ambos os parametros terem de ser nick
        if (element["nick"] == parameters["nick"]) {
          //comparar com a do ficheiro
          if (element["password"] == hash) {
            response200(response); //login bem sucedido
            register = 0;
            return;
          } else {
            response401(response); //falha na verficacao da password
            register = 0;
            return;
          }
        }
      });
      if(register == 1){
          //se chegar aqui quer dizer que nao existe um utilizador com este registo, meter no ficheiro
          storeData.push({ nick: parameters["nick"], password: `${hash}` });
          const storeDatajson = JSON.stringify(storeData);
          writeFile("register", storeDatajson);
          response200(response); //registo bem sucedido
          return;
      }
    } else {
      response400(response);
      return;
    }
  } else {
    response400(response);
    return;
  }

}

function readFile(file) {
  //ler o ficheiro json com os registos
  var storeData = fs.readFileSync(`./data/${file}.json`, (err, data) => {
    if (err) throw err;
  });
  var dataParsed = JSON.parse(storeData);

  return dataParsed;
}

function writeFile(file, data) {
  fs.writeFile(`./data/${file}.json`, data, "utf8", (err) => {
    if (err) throw err;

    //Everything went OK!
  });
}

function response200(response) {
  response.statusCode = 200;
  response.write("");
  response.end();
}

function response400(response) {
  response.statusCode = 400;
  response.write("Bad arguments");
  response.end();
}

function response401(response) {
  response.statusCode = 401;
  response.write("User registered with a different password");
  response.end();
}
function response404(response) {
  response.statusCode = 404;
  response.write("Unknown Request");
  response.end();
}
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
