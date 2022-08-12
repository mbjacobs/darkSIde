import React from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { Container, Content } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FooterBar } from "./FooterBar";

export class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = this.props.route.params.currentUser;
  }

  render() {
    return (
      <Container>
        <ImageBackground
          source={require("./images/app-background.jpg")}
          style={styles.image}>
          <Content>
            <View style={styles.header}>
              <Text style={styles.title}>DarkSIde</Text>
              <Text style={styles.subtitle}>
                Detect, understand, and combat dark patterns.
              </Text>
            </View>
            <View style={styles.category_button_container}>
              <TouchableOpacity
                style={styles.category_button}
                onPress={() =>
                  this.props.navigation.navigate("Dictionary", {
                    currentUser: this.currentUser,
                  })
                }>
                <View style={styles.category_icon}>
                  <Image source={require("./icons/icons8-book-30.png")} />
                </View>
                <View style={styles.category_text}>
                  <Text style={styles.category_text_title}>Dark Pattern Dictionary</Text>
                  <Text>Swipe through dark pattern examples.</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.category_button}
                onPress={() =>
                  this.props.navigation.navigate("Quiz", {
                    currentUser: this.currentUser,
                  })
                }>
                <View style={styles.category_icon}>
                  <Image source={require("./icons/icons8-questions-30.png")} />
                </View>
                <View style={styles.category_text}>
                  <Text style={styles.category_text_title}>Quiz and Scores</Text>
                  <Text>Test your knowledge on dark patterns.</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.category_button}
                onPress={() => this.props.navigation.navigate('Database', {user: this.props.route.params.currentUser})}>
                <View style={styles.category_icon}>
                  <Image
                    source={require('./icons/icons8-folder-30.png')}
                  />
                </View>
                <View style={styles.category_text}>
                  <Text style={styles.category_text_title}>Dark Pattern Database</Text>
                  <Text>Test your knowledge on dark patterns.</Text>
                </View>  
              </TouchableOpacity>  */}
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    marginBottom: "15%",
  },
  category_button_container: {
    backgroundColor: "#352661",
    opacity: 0.8,
    height: 425,
    display: "flex",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
  category_button: {
    paddingBottom: "15%",
    paddingTop: "15%",
    paddingLeft: "5%",
    paddingRight: "5%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#A4B3B6",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 10,
  },
  category_icon: {
    backgroundColor: "#033769",
    borderRadius: 10,
    height: 54,
    width: 54,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  category_text: {
    marginLeft: "5%",
  },
  category_text_title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  Text: {
    alignSelf: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    color: "white",
    opacity: 0.7,
  },
  subtitle: {
    fontSize: 12,
    color: "white",
    opacity: 0.7,
  },
});
