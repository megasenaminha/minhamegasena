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

// TodosOsJogos();


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
  
	const top10Numeros = resultado.slice(0, 60).map(item => item.numero);
  
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
	console.log("Grupo Frequencia:",resultado);
	return resultado
}

// obtemGrupoFrequencia()


function ListaDeJogos(selectedArrays, selectedLetters) {
	const combinations = [];
	const selectedIndices = selectedLetters.map(letter => letter.charCodeAt(0) - 'a'.charCodeAt(0));
  
	function generateUniqueCombinations(currentCombination, currentIndex) {
	  if (combinations.length >= 10) {
		return; // Limitar a 10 combinações
	  }
  
	  if (currentCombination.length === 6) {
		combinations.push([...currentCombination]);
		return;
	  }
  
	  for (let i = currentIndex; i < selectedArrays.length; i++) {
		const currentArray = selectedArrays[i];
		for (const number of currentArray) {
		  if (!currentCombination.includes(number)) {
			currentCombination.push(number);
			generateUniqueCombinations(currentCombination, i);
			currentCombination.pop();
		  }
		}
	  }
	}
  
	generateUniqueCombinations([], 0);
  
	return combinations;
  }


async function obtemListaDeJogos() {
	const dezenas = await obterDezenasMegaSena();
	const grupoFrequencias = grupoFrequencia(dezenas);
	const resultado = ListaDeJogos(grupoFrequencias, ['a', 'b']);
	console.log("ListaDeJogos:",resultado);
	return resultado
}

obtemListaDeJogos()