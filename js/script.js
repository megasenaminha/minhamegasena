// let dadosDaMegaSena;

// async function buscarDadosMegaSena() {
// 	try {
// 		const resposta = await fetch(
// 			"https://loteriascaixa-api.herokuapp.com/api/megasena"
// 		);

// 		dadosDaMegaSena = await resposta.json();

// 		console.log(dadosDaMegaSena);
// 	} catch (erro) {
// 		console.error(erro);
// 	}
// }

// function usarDados() {
// 	if (dadosDaMegaSena) {
// 		console.log(dadosDaMegaSena);
// 	}
// }

// buscarDadosMegaSena();

//

async function buscarResultadosMegaSena() {
	try {
		const resposta = await fetch(
			"https://loteriascaixa-api.herokuapp.com/api/megasena"
		);

		if (resposta.status === 200) {
			const dados = await resposta.json();
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

buscarResultadosMegaSena().then((dados) => {
	console.log(dados);
	const allGames = document.getElementById("allGames");
	const content = dados
		.map((dado) => `<p>Jogo ${dado.concurso}: ${dado.dezenas.join(", ")}</p>`)
		.join("");
	allGames.innerHTML = content;
});

// function calcularFrequenciaNumeros(dados) {
// 	const todasDezenas = [];

// 	for (const objeto of dados) {
// 		if (objeto.dezenas && Array.isArray(objeto.dezenas)) {
// 			todasDezenas.push(...objeto.dezenas);
// 		}
// 	}

// 	const frequenciaNumeros = {};
// 	for (const numero of todasDezenas) {
// 		const num = parseInt(numero, 10);
// 		if (frequenciaNumeros[num]) {
// 			frequenciaNumeros[num]++;
// 		} else {
// 			frequenciaNumeros[num] = 1;
// 		}
// 	}

// 	return frequenciaNumeros;
// }

// function ordenarPorFrequencia(frequenciaNumeros) {
// 	const numerosOrdenados = Object.keys(frequenciaNumeros).sort((a, b) => {
// 		return frequenciaNumeros[b] - frequenciaNumeros[a];
// 	});
// 	return numerosOrdenados;
// }

// function mostrarFrequenciaNumeros(frequenciaNumeros) {
// 	console.log("Frequência de cada número:");
// 	const numerosOrdenados = ordenarPorFrequencia(frequenciaNumeros);
// 	for (const numero of numerosOrdenados) {
// 		console.log(`Número ${numero}: ${frequenciaNumeros[numero]} vezes`);
// 	}
// }

// function separarNumerosEmGrupos(frequenciaNumeros) {
// 	const numerosFrequencia = Object.keys(frequenciaNumeros).map((numero) => ({
// 		numero: parseInt(numero, 10),
// 		frequencia: frequenciaNumeros[numero],
// 	}));

// 	// Ordene os números por frequência decrescente e, em caso de empate, mantenha a ordem original
// 	numerosFrequencia.sort((a, b) => {
// 		if (b.frequencia === a.frequencia) {
// 			return a.numero - b.numero;
// 		}
// 		return b.frequencia - a.frequencia;
// 	});

// 	const grupos = {
// 		A: [],
// 		B: [],
// 		C: [],
// 		D: [],
// 		E: [],
// 		F: [],
// 		G: [],
// 		H: [],
// 		I: [],
// 		J: [],
// 	};

// 	let grupoAtual = "A";
// 	let numerosAdicionados = 0;
// 	let numeroGrupoAtual = 0;

// 	for (const numeroObj of numerosFrequencia) {
// 		const numero = numeroObj.numero;
// 		const frequencia = numeroObj.frequencia;

// 		if (
// 			numerosAdicionados >= 5 &&
// 			numerosAdicionados <= 7 &&
// 			numeroGrupoAtual < 10
// 		) {
// 			// Se o grupo atual já tem entre 5 e 7 números e o limite de grupos não foi atingido
// 			const ultimoNumeroGrupo =
// 				grupos[grupoAtual][grupos[grupoAtual].length - 1];

// 			if (frequencia === frequenciaNumeros[ultimoNumeroGrupo]) {
// 				// Se o próximo número tem a mesma frequência, adicione-o ao mesmo grupo
// 				grupos[grupoAtual].push(numero);
// 			} else {
// 				// Se o próximo número tem frequência diferente, avance para o próximo grupo
// 				grupoAtual = String.fromCharCode(grupoAtual.charCodeAt(0) + 1);
// 				numeroGrupoAtual++;
// 				grupos[grupoAtual] = [numero]; // Crie um novo grupo com o próximo número
// 			}
// 		} else {
// 			grupos[grupoAtual].push(numero);
// 		}

// 		numerosAdicionados++;
// 	}

// 	return grupos;
// }

// async function main() {
// 	const dados = await buscarResultadosMegaSena();

// 	if (dados) {
// 		const frequenciaNumeros = calcularFrequenciaNumeros(dados);
// 		mostrarFrequenciaNumeros(frequenciaNumeros);
// 		const gruposDeNumeros = separarNumerosEmGrupos(frequenciaNumeros);
// 		console.log("Grupos de números:", gruposDeNumeros);
// 	}
// }

// // Chame a função principal para buscar os resultados da Mega Sena, calcular a frequência e separar os números em grupos
// main();
