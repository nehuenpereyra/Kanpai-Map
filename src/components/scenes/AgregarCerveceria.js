import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Orientation from "react-native-orientation";
import CustomHeaderStack from "../elements/customHeaderStack";

import Formulario from "../elements/Formulario";

/**
 * Se utiliza para tener acceso a la base de datos
 */
import { connect } from "react-redux";

class AgregarCerveria extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			redSocial: "",
			email: "",
			description: "",
		};
	}

	componentWillMount() {
		Orientation.lockToPortrait();
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<CustomHeaderStack
						titulo="Añadir Cerveceria"
						drawerNavigation={
							this.props.screenProps.drawerNavigation
						}
					/>
					<View>
						<Formulario />
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181818",
	},
});

/**
 * Se conecta a Redux
 */
const mapStateToProps = (state) => {
	return {
		dataBase: state.storageData,
		config: state.config.data,
		isFetchingConfig: state.config.isFetching,
	};
};

export default connect(mapStateToProps)(AgregarCerveria);
