//Importando as dependencias
const bip39 = require('bip39')
const bip32 = require('bip32')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//derivaçao de carteiras HD
//depois do 49'/ o 0 seria a rede principal e 1 rede de test
const path = `m/49'/1'/0'/0` 

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta
let account = root.derivePath(path)
let node = account.derive(0).derive(0) // gera um nó, uma conta nó apartir de uma carteira raiz

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log("Carteira Gerada")
console.log("Endereço: ", btcAdress)
console.log("Chave Privada: ", node.toWIF()) //toWIF "wallet import format", ele formata a chave privada para que eu consigo importar para um software gerenciador de carteira
console.log("Seed: ", mnemonic)
