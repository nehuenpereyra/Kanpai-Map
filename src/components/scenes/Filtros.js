import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import StopDrawer from "../containers/StopDrawer";

export default class Filtros extends Component {
	static navigationOptions = {
		header: null,
	};

	/**
	 * Función para retornar a la ventana anterior
	 */
	goBack() {
		const { goBack } = this.props.navigation;
		goBack();
	}

	/**
	 * Actualiza el filtro actual
	 * @param String filtro
	 */
	saveFilter(filtro) {
		const { goBack } = this.props.navigation;
		this.props.navigation.state.params.setFilter(filtro);
		goBack();
	}

	/**
	 * Renderización de cada elemento individual
	 * @param {Objetc} item
	 */
	renderItem(item) {
		const { filtroActual } = this.props.navigation.state.params;
		return (
			<TouchableWithoutFeedback
				onPress={() => this.saveFilter(item.type)}
			>
				<View style={styles.filterCheck}>
					<Text style={{ color: "white" }}>{item.name}</Text>
					{filtroActual === item.type ? (
						<Icon name="check" color="white" size={18} />
					) : null}
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={{ color: "white", fontSize: 20 }}>
						Filtros
					</Text>
					<TouchableWithoutFeedback onPress={() => this.goBack()}>
						<View>
							<Text style={{ color: "white" }}>Cancelar</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<FlatList
					style={{ flex: 1 }}
					renderItem={({ item }) => this.renderItem(item)}
					data={this.props.navigation.state.params.ArrayTag}
					keyExtractor={(index) => index.type}
				/>

				<StopDrawer />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181818",
	},
	header: {
		justifyContent: "space-between",
		alignItems: "center",
		height: 50,
		backgroundColor: "black",
		flexDirection: "row",
		paddingHorizontal: 10,
	},
	filterCheck: {
		paddingHorizontal: 5,
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderColor: "black",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
