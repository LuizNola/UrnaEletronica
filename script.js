let q = (el) => document.querySelector(el)
let votoPara = q('.d-1-1 span');
let cargo = q('.d-1-2 span')
let numeros = q('.d-1-3')
let descricao = q('.d-1-4')
let aviso = q('.d-2')
let lateral = q('.d-1-right')


let etapaAtual = 0
let numero = ''
let votos = []

let votoBranco = true

function começarEtapa() {

    let etapa = etapas[etapaAtual]

    numero = ''

    let numeroHtml = '';
    votoBranco = false
    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }

    votoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ' '
    lateral.innerHTML = ' '
    numeros.innerHTML = numeroHtml
}
function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        votoPara.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`

        let fotosHtml = ' '
        for (i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        votoPara.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULU</div>'
    }
    console.log(candidato)

}

function clicou(n) {
    let elNumero = q('.numero.pisca')

    if (elNumero !== null) {

        elNumero.innerHTML = n
        elNumero.classList.remove('pisca')

        numero = `${numero}${n}`

        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true
        votoPara.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO BRANCO</div>'
    } else {
        alert('Para votar em branco por favor não digite nenhum numero')
    }
}
function confirmar() {
    
    let etapa = etapas[etapaAtual]

    let votoConfirmado = false
    if (votoBranco == true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })

    } 
    else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
        
    }

    if (votoConfirmado) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            começarEtapa()
        } else {
            q('.tela').innerHTML = '<div class="aviso--enorme pisca">FIM <br/> OBRIGADO POR VOTAR</div>'
            console.log(votos)
        }
    }
}
function corrige() {
    começarEtapa()
}

começarEtapa()