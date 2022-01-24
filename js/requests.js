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

    let req = request("ranking",ranking_init);

    return req;
}

async function register(nick,password){
    const register_init = {
        method: 'POST',
        body: JSON.stringify({
            "nick": nick,
            "password": password,
        })
    };

    let req = request("register",register_init);

    return req;
}

async function join(nick,password,size,initial){
    const join_init = {
        method: 'POST',
        body: JSON.stringify({
            "nick": nick,
            "password": password,
            "size": size,
            "initial": initial,
        })
    };

    let req = request("join",join_init);

    return req;
}

async function leave(nick,password,game){
    const leave_init = {
        method:'POST',
        body: JSON.stringify({
            "nick": nick,
            "password": password,
            "game": game,
        })
    };

    let req = request("leave",leave_init);

    return req;
}

async function notify(nick,password,game,move){
    const notify_init = {
        method:'POST',
        body: JSON.stringify({
            "nick": nick,
            "password": password,
            "game": game,
            "move": move,
        })
    };

    let req = await request("notify",notify_init);

    return req;
}

async function update(game,nick,func){
    const url = new URL(`http://${server}:${port}/update`);
    let params = [
        ['nick', nick],
        ['game', game],
    ];
    url.search = new URLSearchParams(params).toString();
    
    const eventSource = new EventSource(url);

    eventSource.onmessage = func;
    
    return eventSource;
}