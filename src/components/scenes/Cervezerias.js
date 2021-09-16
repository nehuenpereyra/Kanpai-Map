import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Orientation from "react-native-orientation";
import CustomHeaderStack from "../elements/customHeaderStack";
import ListBeer from "../elements/listBeer";

export default class Cervezerias extends Component {
	/**
	 * Configuracion de StackNavigator
	 */
	static navigationOptions = {
		header: null,
	};

	componentWillMount() {
		Orientation.lockToPortrait();
	}

	render() {
		return (
			<View style={styles.container}>
				<CustomHeaderStack
					titulo="Cervezerias"
					drawerNavigation={this.props.screenProps.drawerNavigation}
				/>
				<ListBeer navigation={this.props.navigation} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
