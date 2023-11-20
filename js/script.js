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

async function obterDezenasMegaSena() {
	if (dezenasMegaSena === undefined) {
		await buscarResultadosMegaSena();
	}
	return dezenasMegaSena;
}

async function TodosOsJogos() {
	const dezenas = await obterDezenasMegaSena();
	console.log("Todos os Jogos:", dezenasMegaSena);
}

TodosOsJogos();

function grupoFrequencia(arrays) {
	const ocorrencias = Array(60).fill(0);

	for (const array of arrays) {
		for (const numeroStr of array) {
			const numero = parseInt(numeroStr, 10);
			if (!isNaN(numero) && numero >= 1 && numero <= 60) {
				ocorrencias[numero - 1]++;
			}
		}
	}

	const resultado = ocorrencias.map((quantidade, index) => ({
		numero: index + 1,
		quantidade,
	}));

	resultado.sort((a, b) => b.quantidade - a.quantidade);

	const top10Numeros = resultado.slice(0, 60).map((item) => item.numero);

	const top10Arrays = [];
	let currentArray = [];

	for (let i = 0; i < 61; i++) {
		if (currentArray.length < 6) {
			const num = top10Numeros[i];
			currentArray.push(num);
			ocorrencias[num - 1]--;
		} else {
			top10Arrays.push(currentArray);
			currentArray = [];
			i--;
		}
	}

	// Adicionar os arrays restantes
	for (let i = 0; i < top10Arrays.length; i++) {
		while (top10Arrays[i].length < 6) {
			for (let j = 0; j < ocorrencias.length; j++) {
				if (ocorrencias[j] > 0) {
					top10Arrays[i].push(j + 1);
					ocorrencias[j]--;
				}
			}
		}
	}

	return top10Arrays;
}

async function obtemGrupoFrequencia() {
	const dezenas = await obterDezenasMegaSena();
	const resultado = grupoFrequencia(dezenas);
	console.log("Grupo Frequencia:", resultado);

	// Formatando o resultado para exibição
	const resultadoFormatado = formatarResultado(resultado);

	// Enviando grupo frequência para o Front-End
	const enviarGrupoFrequencia = document.getElementById("frequenceGroup");
	enviarGrupoFrequencia.innerHTML = resultadoFormatado;

	return resultado;
}

// Função para formatar o resultado para exibição no HTML
function formatarResultado(resultado) {
	// Criar uma tabela
	const table = document.createElement("table");

	// Adicionar linhas da tabela
	resultado.forEach((grupo, indice) => {
		const row = table.insertRow();

		// Adicionar a primeira célula com a letra/nome do grupo
		const letraCell = row.insertCell();
		letraCell.textContent = String.fromCharCode(65 + indice) + "=";

		// Adicionar as células com os números do grupo
		for (let i = 0; i < grupo.length; i++) {
			const cell = row.insertCell();
			cell.textContent = grupo[i];
		}
	});

	return table.outerHTML;
}

obtemGrupoFrequencia();

function ListaDeJogos(matrizDeDezenas, letrasSelecionadas) {
	// Verifica se a matriz e as letras foram fornecidas
	if (
		!matrizDeDezenas ||
		!letrasSelecionadas ||
		letrasSelecionadas.length === 0
	) {
		return [];
	}

	// Mapeia as letras para índices de matriz (a: 0, b: 1, ..., j: 9)
	const indices = letrasSelecionadas.map(
		(letra) => letra.charCodeAt(0) - "a".charCodeAt(0)
	);

	// Filtra e concatena as dezenas correspondentes aos índices mapeados
	const dezenasSelecionadas = indices.reduce((dezenas, indice) => {
		if (matrizDeDezenas[indice]) {
			return dezenas.concat(matrizDeDezenas[indice]);
		}
		return dezenas;
	}, []);

	// Remove duplicatas e ordena as dezenas
	const dezenasUnicasOrdenadas = [...new Set(dezenasSelecionadas)].sort(
		(a, b) => a - b
	);

	return dezenasUnicasOrdenadas;
}

async function obtemListaDeJogos() {
	const dezenas = await obterDezenasMegaSena();
	const grupoFrequencias = grupoFrequencia(dezenas);
	const resultado = ListaDeJogos(grupoFrequencias, ["a", "b"]);
	console.log("ListaDeJogos:", resultado);
	return resultado;
}

obtemListaDeJogos();
