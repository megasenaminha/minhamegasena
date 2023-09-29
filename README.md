# MEGA SENA - LEONÍDIO

---

# Objetivos:

- Desenvolver uma aplicação WEB com login único tendo como base os estudos desenvolvidos pelo cliente sobre os resultados da Mega Sena.

---

# Funcinalidades:

## Todos os Jogos

- Banco de dados contendo todos os jogos atualizados a cada novo jogo.
  - API, ou outra forma mais viável/ confiável.

## Grupo Frequência

- Identificar a frequência que cada número é sorteado e dividi-los em **10 grupos** de **'A'** até **'J'**(entre 5 a 7 números em cada grupo).

## Grupo Atraso

- Identificar o 'atraso' dos números e dividi-los em **6 grupos** da seguinte forma:

  - O novo jogo é incorporado ao grupo 6 e altera a posição dos números dos jogos anteriores.

  - Por exemplo:<br>
    jogo x - 05 16 38 42 43 48 <br>
    jogo y - 01 02 10 32 34 59 <br>
    jogo z - 09 30 34 45 54 55 - novo jogo<br>

  - Os jogos **x** e **y** estavam no **grupo 6**. Com o sorteio do jogo **z**, ele acaba retirando o jogo **y** do **grupo 6** enviando-o para o **grupo 5**, pois o número **'34'** foi sorteado no jogo **z**.

## Lista de Jogos

- De posse desses grupos(frequência e atraso) o usuário da aplicação vai poder **_escolher as letras do grupo de frequência_ para realizar um jogo e obter _todas as combinações possíveis_**:
  Ex.: B B C D E J

- Depois disso com base no grupo de atraso o usuário pode **aplicar filtros** que podem ser por **números**(_excluindo todos os jogos que contém algum número específico_) ou por **grupo**(_atraso_).

---

# Conclusão:

- Inicialmente são essas funcionalidades, posteriormente novos filtros podem ser inseridos na aplicação.
