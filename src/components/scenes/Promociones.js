import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList,
	ActivityIndicator,
} from "react-native";
import Orientation from "react-native-orientation";
import CustomHeaderStack from "../elements/customHeaderStack";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import GaleriaImg from "../elements/GaleriaImg";
import { JsonModel } from "../../models/JsonModel";
import { ConfigModel } from "../../models/configModel";
import FastImage from "react-native-fast-image";

/**
 * Se utiliza para tener acceso a la base de datos
 */
import { connect } from "react-redux";

/**
 * Ancho de las imagenes de promocion
 */
const HEIGHT_IMG = 300;

class Promociones extends Component {
	componentWillMount() {
		Orientation.lockToPortrait();
	}

	renderLoad() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	renderItem(item) {
		if (JsonModel.getPromo(item).length != 0) {
			return (
				<View
					style={{
						padding: 15,
						borderColor: "grey",
						borderBottomWidth: 2,
					}}
				>
					<View style={{ flexDirection: "row" }}>
						<FastImage
							style={{ width: 50, height: 50, borderRadius: 10 }}
							source={{
								uri:
									ConfigModel.getIp(this.props.config) +
									JsonModel.getIcono(item),
								headers: { Authorization: "someAuthToken" },
								priority: FastImage.priority.normal,
							}}
						/>
						<View style={{ paddingLeft: 10 }}>
							<Text style={{ color: "white" }}>
								{JsonModel.getTitulo(item)}
							</Text>
							<Text style={{ color: "grey" }}>
								{JsonModel.getDireccion(item)}
							</Text>
						</View>
					</View>
					<View>
						{JsonModel.getPromo(item).map((data, index) => {
							return (
								<View
									key={index}
									style={{
										flexDirection: "row",
										alignItems: "center",
										paddingTop: 10,
									}}
								>
									<Icon
										name="star"
										color="yellow"
										size={30}
									/>
									<View style={{ flex: 1, paddingLeft: 10 }}>
										<Text style={{ color: "white" }}>
											{data.promo}
										</Text>
										<Text style={{ color: "grey" }}>
											Fuente: {data.fuente} - Fecha:{" "}
											{data.fecha}
										</Text>
									</View>
								</View>
							);
						})}
					</View>
				</View>
			);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<CustomHeaderStack
						titulo="Promociones"
						drawerNavigation={
							this.props.screenProps.drawerNavigation
						}
					/>
					<View>
						<View style={{ height: HEIGHT_IMG }}>
							{this.props.isFetchingConfig ? null : (
								<GaleriaImg
									galeria={ConfigModel.getUrlPublicidad(
										this.props.config
									)}
								/>
							)}
							<LinearGradient
								colors={["transparent", "#181818", "#181818"]}
								style={styles.gradiente}
							/>
						</View>
						{this.props.dataBase.data.length != 0 ? (
							<FlatList
								style={{ flex: 1 }}
								renderItem={({ item }) => this.renderItem(item)}
								data={this.props.dataBase.data}
								keyExtractor={(item, index) => item.id}
							/>
						) : (
							this.renderLoad()
						)}
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
	gradiente: {
		width: "100%",
		height: 20,
		position: "absolute",
		top: HEIGHT_IMG - 20,
	},
	fixedContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
});

/**
 * Se cnecta a Redux
 */
const mapStateToProps = (state) => {
	return {
		dataBase: state.storageData,
		config: state.config.data,
		isFetchingConfig: state.config.isFetching,
	};
};

export default connect(mapStateToProps)(Promociones);
