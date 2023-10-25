let dezenasMegaSena;

async function buscarResultadosMegaSena() {
	try {
		const resposta = await fetch(
			"https://loteriascaixa-api.herokuapp.com/api/megasena"
		);

		if (resposta.status === 200) {
			const dados = await resposta.json();
			dezenasMegaSena = dados.map((item) => item.dezenas);
			return dados.map((item) => {
				return { concurso: item.concurso, dezenas: item.dezenas };
			});
		} else {
			console.error("Falha ao buscar resultados da Mega Sena.");
			return null;
		}
	} catch (erro) {
		console.error("Erro na solicitação:", erro);
		return null;
	}
}

async function obterDezenasMegaSena() {
	if (dezenasMegaSena === undefined) {
		await buscarResultadosMegaSena();
	}
	return dezenasMegaSena;
}

async function TodosOsJogos() {
	const dezenas = await obterDezenasMegaSena();
	if (dezenas) {
		console.log("Dezenas da Mega Sena:", dezenasMegaSena);
	} else {
		console.log("Não foi possível obter os resultados da Mega Sena.");
	}
}

TodosOsJogos();

// let dezenasMegaSena;

// async function buscarResultadosMegaSena() {
// 	try {
// 		const resposta = await fetch(
// 			"https://loteriascaixa-api.herokuapp.com/api/megasena"
// 		);

// 		if (resposta.status === 200) {
// 			const dados = await resposta.json();
// 			dezenasMegaSena = dados.map((item) => item.dezenas);
// 			return dados.map((item) => {
// 				return { concurso: item.concurso, dezenas: item.dezenas };
// 			});
// 		} else {
// 			console.error("Falha ao buscar resultados da Mega Sena.");
// 			return null;
// 		}
// 	} catch (erro) {
// 		console.error("Erro na solicitação:", erro);
// 		return null;
// 	}
// }

// buscarResultadosMegaSena()

// console.log(dezenasMegaSena)

// buscarResultadosMegaSena().then((dados) => {
// 	console.log(dados);
// 	// exibe todos os jogos na tela
// 	// const allGames = document.getElementById("allGames");
// 	// const content = dados
// 	// 	.map((dado) => `<p>Jogo ${dado.concurso}: ${dado.dezenas.join(", ")}</p>`)
// 	// 	.join("");
// 	// allGames.innerHTML = content;
// 	console.log(dezenasMegaSena);
// });
