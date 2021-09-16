import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Header extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>.</Text>
				<Text style={{ color: "white", fontSize: 20 }}>
					Cervecerias de La Plata
				</Text>
				<TouchableHighlight>
					<Icon name="share-alt" color="white" size={30} />
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 50,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "black",
		paddingHorizontal: 10,
	},
});
