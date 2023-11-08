let dezenasMegaSena;
// let frequencia = {};
// let grupos = {};

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

buscarResultadosMegaSena();

// async function frequenciaNumeros() {
// 	await buscarResultadosMegaSena();

// 	// Verifica se dezenasMegaSena foi definido corretamente
// 	if (dezenasMegaSena) {
// 		// Inicializa um objeto para armazenar a frequência dos números
// 		frequencia = {};

// 		// Itera sobre cada conjunto de dezenas
// 		dezenasMegaSena.forEach((conjunto) => {
// 			conjunto.forEach((numero) => {
// 				frequencia[numero] = (frequencia[numero] || 0) + 1;
// 			});
// 		});

// 		if (Object.keys(frequencia).length !== 0) {
// 			const chavesOrdenadas = Object.keys(frequencia).sort(
// 				(a, b) => frequencia[b] - frequencia[a]
// 			);
// 			console.log(chavesOrdenadas);
// 			return chavesOrdenadas;
// 		} else {
// 			console.log("O objeto de frequência está vazio.");
// 			return null;
// 		}
// 	} else {
// 		console.log("Não foi possível obter os números ordenados.");
// 		return null;
// 	}
// }

// async function criarGrupos() {
// 	const chavesOrdenadas = await frequenciaNumeros();
// 	if (chavesOrdenadas) {
// 		// Lógica para dividir os números em 10 grupos, do grupoA até o grupoJ
// 		const numGrupos = 10;
// 		const elementosPorGrupo = Math.ceil(chavesOrdenadas.length / numGrupos);

// 		for (let i = 0; i < numGrupos; i++) {
// 			const grupo = chavesOrdenadas.slice(
// 				i * elementosPorGrupo,
// 				(i + 1) * elementosPorGrupo
// 			);
// 			const grupoComFrequencia = grupo.map((numero) => {
// 				return { numero: numero, frequencia: frequencia[numero] };
// 			});
// 			grupos["grupo" + String.fromCharCode(65 + i)] = grupoComFrequencia;
// 		}
// 		console.log(grupos);
// 	} else {
// 		console.log("Não foi possível criar os grupos.");
// 	}
// 	let groupHTML = "";

// 	// percorrendo os grupos e formatando o HTML
// 	for (let key in grupos) {
// 		groupHTML += `<div><h3>${key}</h3><ul style="display: flex; list-style-type: none;">`;
// 		grupos[key].forEach((item, index) => {
// 			if (index > 0) {
// 				groupHTML += ", ";
// 			}
// 			groupHTML += `${item.numero} (${item.frequencia})`;
// 		});
// 		groupHTML += "</ul></div>";
// 	}

// 	// definindo o conteúdo da div com o HTML formatado
// 	const div = document.getElementById("frequenceGroup");
// 	div.innerHTML = groupHTML;
// }

// criarGrupos();
