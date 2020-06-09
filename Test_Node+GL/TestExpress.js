var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
const Web3 = require('web3');
const Admin =require('web3-eth-admin').Admin;


var provider = 'http://localhost:8545';
var web3 = new Web3(new Web3.providers.HttpProvider(provider))
const options = {
    defaultAccount: '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73',
    defaultBlock: 'latest',
    defaultGas: 1,
    defaultGasPrice: 0,
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 24,
    transactionPollingTimeout: 480,
};

const admin = new Admin(provider, null, options);

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))


    /* S'il n'y a pas de todolist dans la session,
    on en crée une vide sous forme d'array avant la suite */
    .use(function(req, res, next){
        if (typeof(req.session.nodelist) == 'undefined') {
            req.session.nodelist = [];
        }
        next();
    })

    /* On affiche la todolist et le formulaire */
    .get('/nodes', function(req, res) {
        res.render('nodes.ejs', {nodelist: req.session.nodelist});
    })
    .get('', function(req, res) {
        res.render('home.ejs', {nodelist: req.session.nodelist});
    })

    /* On ajoute un élément à la todolist */
    .get('/nodes/refresh/', async (req, res) => {
        let PeerCount = await web3.eth.net.getPeerCount();
        console.log(PeerCount)
        let peers = await admin.getPeers();
        req.session.nodelist =[];
        for(let i=0; i<PeerCount; i++) {
            req.session.nodelist.push(peers[i].id);
        }
        res.redirect('/nodes');
    })

    /* On redirige vers la todolist si la page demandée n'est pas trouvée */
    .use(function(req, res, next){
        res.redirect('/nodes');
    })

    .listen(8080);