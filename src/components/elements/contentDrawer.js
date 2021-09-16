import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Image,
	Dimensions,
	Text,
	TouchableWithoutFeedback,
	FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const drawerItems = [
	{
		titulo: "Mapa",
		enlace: "Inicio",
		icono: "place",
		tipoIcono: "MaterialIcons",
	},
	{
		titulo: "Cervecerias",
		enlace: "Cervezerias",
		icono: "store",
		tipoIcono: "MaterialIcons",
	},
	{
		titulo: "Promociones",
		enlace: "Promociones",
		icono: "star",
		tipoIcono: "FontAwesome",
	},
	{
		titulo: "Añadir",
		enlace: "AgregarCer",
		icono: "add-location",
		tipoIcono: "MaterialIcons",
	},
	{
		titulo: "Opciones",
		enlace: "config",
		icono: "gears",
		tipoIcono: "FontAwesome",
	},
];

export default class ContentDrawer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Image
					resizeMode={Image.resizeMode.stretch}
					style={{ width: this.props.widthDrawer, height: 130 }}
					source={require("../../img/portada.png")}
				>
					<View style={styles.fixedContainer}>
						<LinearGradient
							colors={["transparent", "#181818", "#181818"]}
							style={styles.gradiente}
						/>
					</View>
				</Image>
				<FlatList
					style={{ flex: 1 }}
					data={drawerItems}
					keyExtractor={(item, index) => item.titulo}
					renderItem={({ item }) => (
						<TouchableWithoutFeedback
							onPress={() => navigation.navigate(item.enlace)}
						>
							<View style={styles.Item}>
								{item.tipoIcono == "FontAwesome" ? (
									<FontAwesomeIcon
										name={item.icono}
										color="grey"
										size={30}
									/>
								) : null}
								{item.tipoIcono == "MaterialIcons" ? (
									<MaterialIcon
										name={item.icono}
										color="grey"
										size={30}
									/>
								) : null}
								<Text
									style={{
										color: "white",
										fontSize: 20,
										paddingLeft: 10,
									}}
								>
									{item.titulo}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#181818",
	},
	gradiente: {
		width: width,
		height: 20,
	},
	fixedContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},

	Item: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 10,
		paddingVertical: 15,
		borderColor: "red",
		borderBottomWidth: 1,
	},
	separador: {
		backgroundColor: "red",
		height: 2,
		width: "80%",
		borderRadius: 4,
	},
});
