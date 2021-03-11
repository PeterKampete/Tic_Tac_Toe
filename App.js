import React from "react";
import * as Animate from "react-native-animatable";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],

      currentPlayer: 1,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  };

  //returns 1,-1 or 0 if player 1,2 or none won respectively.
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;

    //check rows,...
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check columns,...
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check diagonals,...
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    //No winners...
    return 0;
  };

  onTilePress = (row, col) => {
    //Don't allow tile change
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    var currentPlayer = this.state.currentPlayer;

    //set the correct tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //Switch to other player...
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 Won!");
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert("Plaeyr 2 Won!");
      this.initializeGame();
    }
  };

  //check for winners...

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <ImageBackground
        source={require("./assets/images/tic-tac-toe.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <Animate.View
          animation="fadeInDownBig"
          duration={1000}
          style={styles.animatedView}
        >
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <Animate.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{ textAlign: "center" }}
              >
                <TouchableOpacity
                  onPress={() => this.onTilePress(0, 0)}
                  style={styles.tile}
                >
                  {this.renderIcon(0, 0)}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onTilePress(0, 1)}
                  style={styles.tile}
                >
                  {this.renderIcon(0, 1)}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onTilePress(0, 2)}
                  style={styles.tile}
                >
                  {this.renderIcon(0, 2)}
                </TouchableOpacity>
              </Animate.Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Animate.Text
                animation="pulse"
                easing="ease-in"
                iterationCount="infinite"
                style={{ textAlign: "center" }}
              >
                <TouchableOpacity
                  onPress={() => this.onTilePress(1, 0)}
                  style={styles.tile}
                >
                  {this.renderIcon(1, 0)}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onTilePress(1, 1)}
                  style={styles.tile}
                >
                  {this.renderIcon(1, 1)}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onTilePress(1, 2)}
                  style={styles.tile}
                >
                  {this.renderIcon(1, 2)}
                </TouchableOpacity>
              </Animate.Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Animate.Text
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{ textAlign: "center" }}
              >
                <TouchableOpacity
                  onPress={() => this.onTilePress(2, 0)}
                  style={styles.tile}
                >
                  {this.renderIcon(2, 0)}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onTilePress(2, 1)}
                  style={styles.tile}
                >
                  {this.renderIcon(2, 1)}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onTilePress(2, 2)}
                  style={styles.tile}
                >
                  {this.renderIcon(2, 2)}
                </TouchableOpacity>
              </Animate.Text>
            </View>
          </View>
        </Animate.View>
        <View style={styles.buttonView}>
          <Animate.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: "center" }}
          >
            <Button
              title="Restart Game"
              color="white"
              onPress={() => this.initializeGame()}
            />
          </Animate.Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  tile: {
    borderWidth: 4,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "white",
    shadowOpacity: 300,
    shadowRadius: 3,
  },
  tileX: {
    fontSize: 60,
    color: "red",
  },
  tileO: {
    fontSize: 60,
    color: "green",
  },
  animatedView: {
    height: "90%",
  },
  buttonView: {
    alignItems: "center",
    borderWidth: 2,
    marginLeft: 100,
    marginRight: 100,
    borderColor: "green",
    borderRadius: 10,
    backgroundColor: "green",
    marginBottom: 10,
  },
});
