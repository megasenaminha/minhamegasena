# megaSenaLeonidio

Projeto destinado a estudar os números da Mega Sena.

# Objetivos:

- Desenvolver uma aplicação WEB com login único com base nos estudos desenvolvidos pelo cliente.

# Funconalidades:

\\ Todos os Jogos

- Banco de dados contendo todos os jogos atualizados a cada novo jogo.
- API, ou outra forma mais viável/ confiável.

\\ Grupo Frequência

- Identificar a frequência que cada número é sorteado e dividí-los em 10 grupos(entre 5 a 7 números em cada grupo).

\\ Grupo Atraso

- Identificar o "atraso" dos números e dividi-los em 6 grupos da seguinte forma:

  - O novo jogo é incorporado ao grupo 6 e altera a posição dos números dos jogos anteriores.

  - Por exemplo:
    jogo x - 05 16 38 42 43 48
    jogo y - 01 02 10 32 34 59
    jogo z - 09 30 34 45 54 55 // novo jogo

  - Os jogos acima x e y estavam no grupo 6. Com o sorteiro do jogo z, ele acaba retirando o jogo y do grupo 6 enviando ele para o grupo 5, pois o número 34 foi sorteado no jogo z.

\\ Lista de Jogos

- De posse desses grupos(frequência e atraso) o usuário da aplicação vai poder escolher as letras do grupo de frequência para realizar um jogo e obter todas as combinações possíveis:
  Ex.: B B C D E J

- Depois disso com base no grupo de atraso ele pode aplicar filtros nos que podem ser por números (excluindo todos os jogos que contém algum número expecífico) ou por grupo(atraso).

# Conclusão:

- Inicialmente são essas funcionalidades, posteriormente novos filtros podem ser inseridos na aplicação.
