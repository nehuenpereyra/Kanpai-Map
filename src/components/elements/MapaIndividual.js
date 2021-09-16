import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import MapView, { Marker } from "react-native-maps";

const LATITUDDELTA = 0.0922;
const LONGITUDEDELTA = 0.0922;

export default class MapaIndividual extends Component {
	constructor() {
		super();
		this.state = {
			posicionDefault: {
				latitude: -34.921297,
				longitude: -57.954587,
				latitudeDelta: LATITUDDELTA,
				longitudeDelta: LONGITUDEDELTA,
			},
			initialRender: true,
		};
	}

	cargar(element) {
		const arrayMarkers = [];
		arrayMarkers.push(
			<Marker
				key={1}
				coordinate={{
					latitude: element.latitude,
					longitude: element.longitude,
				}}
				image={require("../../img/marcador3.png")}
			>
				{}
			</Marker>
		);
		return arrayMarkers;
	}

	render() {
		const arrayMarkers = this.cargar(this.props.location);
		return (
			<View style={styles.container}>
				<MapView
					style={{ flex: 1 }}
					provider={MapView.PROVIDER_GOOGLE}
					region={this.state.posicionDefault}
				>
					{arrayMarkers}
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
