import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [tela, setTela] = useState("menu");
  const [jogadorAtual, setJogadorAtual] = useState("");
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, SetGanhador] = useState("");

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);
    setJogadasRestantes(9);
    setTabuleiro([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

    setTela("jogo");
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]); // Operador eliptico

    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");

    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    // Validando as linhas
    if (
      tabuleiro[linha][0] !== '' && tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]
    ) {
      return finalizarJogo(tabuleiro[linha][0]);
    }
    // Validando as as Colunas
    if ( tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] &&  tabuleiro[1][coluna] === tabuleiro[2][coluna] ) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    // Validando as diagonal 1
    if ( tabuleiro[0][0] !== '' &&  tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]    ) {
      return finalizarJogo(tabuleiro[0][0]);
    }

    // Validando as diagonal 2
    if ( tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]  ) {
      return finalizarJogo(tabuleiro[0][2]);
    }

    // Nenhum ganhador
    if ((jogadasRestantes - 1) === 0) {
      return finalizarJogo('');
    }

    // jogo nao finalizado 
    setJogadasRestantes((jogadasRestantes -1));
  }

  function finalizarJogo(jogador) {
    SetGanhador(jogador);
    setTela('ganhador');
  }

  switch (tela) {
    case "menu":
      return getTelaMenu();
    case "jogo":
      return getTelaJogo();
    case "ganhador":
      return getTelaGanhador();
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />


        <Text style={styles.titulo}>Seja bem vindo </Text>
        
        <Text style={styles.titulo}>Ao</Text>

        <Text style={styles.titulo}>Jogo da Velha</Text>        

        <Text  style={styles.subtitulo} >Selecione o Primeiro Jogador</Text>        
 
 
        <View style={styles.alignItems}>
          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo("X")}
          >
            <Text style={styles.jogadorX}> X </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.boxJogador}
            onPress={() => iniciarJogo("O")}
          >
            <Text style={styles.jogadorO}> O </Text>
          </TouchableOpacity>


          
        </View>

        

        <View>
          <Text style={styles.register}>By Laura Games ®</Text>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.subtitulo}> Boa Sorte !!! </Text>

        {tabuleiro.map((linha, numeroLinha) => {
          return (
            <View key={numeroLinha} style={styles.alignItems}>
              {linha.map((coluna, numeroColuna) => {
                return (
                  <TouchableOpacity
                    key={numeroColuna}
                    style={styles.boxJogador}
                    onPress={() => jogar(numeroLinha, numeroColuna)}
                    disabled={coluna !== ""}
                  >
                    <Text
                      style={coluna === "X" ? styles.jogadorX : styles.jogadorO}
                    >
                      {" "}
                      {coluna}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}

        <TouchableOpacity style={styles.voltar} onPress={() => setTela("menu")}>
          <Text style={styles.btnVoltar}> Voltar </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        

        {
          ganhador === '' && 
          <Text style={styles.ganhador}> :-( Que pena nao foi desta vez </Text>
        }

        {
          ganhador!=='' &&
          <>
          <Text style={styles.ganhador}> Venceu o Jogador : </Text>
          <View style={styles.boxJogador}>
            <Text style={ganhador ==='X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>

          </View>

          </>
        }

        <TouchableOpacity style={styles.voltar} onPress={() => setTela("menu")}>
          <Text style={styles.btnVoltar}> Voltar </Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B008B",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {  
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffff",
    justifyContent: "center",
    alignItems: "center"
  },
  register: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#B8860B",
    flexDirection:"column-reverse",
    margin: 50,
    
    
  },
  subtitulo: {
    fontSize: 20,
    // color: '#555',
    fontWeight:"bold",
    // marginTop: 20,
    margin: 30,
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 15,
  },
  jogadorX: {
    fontSize: 40,
    color: "#553fda",
  },
  jogadorO: {
    fontSize: 40,
    color: "#da3f3f",
  },
  alignItems: {
    flexDirection: "row",
  },
  voltar: {
    margin: 50,
  },
  btnVoltar: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ddd",
    backgroundColor: '#B8860B',
    borderRadius: 8,
  },

  ganhador:{
    fontSize:25,
    fontWeight: "bold",
    margin: 3,
    margin: 40,
    
  }
});
