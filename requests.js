const group = 65; // A remover no final da parte 3
let server = "twserver.alunos.dcc.fc.up.pt";
let port = 8008;

async function request(func, init){
    const url = `http://${server}:${port}/${func}`;
    return fetch(url,init);
}

async function ranking(){
    const ranking_init = {
        method: 'POST',
        body: JSON.stringify({})
    };

    let req = await request("ranking",ranking_init);

    return req.json();
}

async function register(nick,password){
    const register_init = {
        method: 'POST',
        body: JSON.stringify({
            "nick": nick,
            "password": password,
        })
    };

    let req = await request("register",register_init);

    return req;
    /*if(req.ok) alert("Bem sucedido");
    else {
        let data = req.json();
        alert(data.error);
    }*/
}

async function join(nick,password,size,initial){
    const join_init = {
        method: 'POST',
        body: JSON.stringify({
            "nick": nick,
            "password": password,
            "group": group,
            "size": size,
            "initial": initial,
        })
    };

    let req = await request("join",join_init);

    return req.json();
}

async function update(game,nick,error,func){
    const url = new URL(`http://${server}:${port}/update`);
    let params = [
        ['nick', nick],
        ['game', game],
    ];
    url.search = new URLSearchParams(params).toString();
    
    const eventSource = new EventSource(url);

    eventSource.onerror = error;
    eventSource.onmessage = func;
    
    return eventSource;
}





