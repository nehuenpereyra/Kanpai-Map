import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Orientation from "react-native-orientation";

/**
 * Importo el Header
 */
import CustomHeaderStack from "../elements/customHeaderStack";

/**
 * Importo el element Map que visualiza el mapa
 */
import Map from "../elements/Map";

export default class App extends Component {
	static navigationOptions = {
		header: null,
	};

	componentWillMount() {
		Orientation.lockToPortrait();
	}

	render() {
		return (
			<View style={styles.container}>
				{}
				<CustomHeaderStack
					titulo="Kanpai Map"
					drawerNavigation={this.props.screenProps.drawerNavigation}
				/>
				<Map navigation={this.props.navigation} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
