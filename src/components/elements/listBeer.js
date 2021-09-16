import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Dimensions,
	ScrollView,
	FlatList,
	ActivityIndicator,
	TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { JsonModel } from "../../models/JsonModel";
import { ConfigModel } from "../../models/configModel";
import FastImage from "react-native-fast-image";

/**
 * Funciones de redux
 */
import { connect } from "react-redux";
import { fetchData } from "../../actions/dataAction";
import {
	loadDB,
	resetDB,
	setFilterText,
	setFilterType,
} from "../../actions/cerveceriadbAction";

const { width, height } = Dimensions.get("window");

/**
 * Componente de visualizacion de la lista y buscador
 */
class ListBeer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			data: [],
			filtro: "none",
		};
	}

	componentWillMount() {
		/**
		 * Setea el texto con el filtro de texto que fue utilizado
		 * Setea el valor del filtro i ya estaba definido
		 * -> Al salir de la escena se borra el text filtrado y el typeFilter por eso se utiliza redux para mantener el valor
		 */
		this.setState({
			text: this.props.cerveceriadb.textFilter,
			filtro: this.props.cerveceriadb.typeFilter,
		});
	}

	/**
	 * ShouldComponentUpdate () se invoca antes del render cuando se reciben nuevos apoyos o estado.
	 * El valor predeterminado es verdadero.
	 * Este método no se llama para la representación inicial o cuando se usa forceUpdate ().
	 *
	 * [!] al poner un filtro especifico y luego borrar todo en la scena de la lista se vuelve a mostrar todo y no lo filtrado ver de solucionar eso
	 */
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.filtro != nextState.filtro) {
			this.props.setFilterType(nextState.filtro);
			if (nextState.filtro == "none") {
				this.props.resetDB();
			} else {
				let endPoint = ConfigModel.getEndPoint(
					this.props.config,
					nextState.filtro
				);
				this.props
					.filterDB(ConfigModel.getIp(this.props.config) + endPoint)
					.then(() => {
						this.props.setNewDB(this.props.filtrodb);
					});
			}
		}
		return true;
	}

	/**
	 * Metodo para filtrar los documentos a visualizar
	 */
	filter(text) {
		var dbActual = this.props.storageData.data;
		const newData = dbActual.filter((item) => {
			const itemData = item.titulo.toUpperCase();
			const textData = text.toUpperCase();
			return itemData.indexOf(textData) > -1;
		});
		this.setState({
			text: text,
			filtro: "none",
		});
		this.props.setNewDB(newData);
		this.props.setFilterText(text);
	}

	/**
	 * Elimina el filtro y establece la DB original
	 */
	deleteText() {
		this.setState({
			text: "",
			filtro: "none",
		});
		this.props.resetDB();
		this.props.setFilterText("");
	}

	/**
	 * Setea el filtro actual
	 * default: Ninguno
	 */
	setFilter(f) {
		this.setState({ filtro: f });
	}

	/**
	 * Renderiza un separador entre los elementos
	 */
	renderSeparator = () => {
		return (
			<View
				style={{ height: 2, width: "100%", backgroundColor: "#3a3a3a" }}
			/>
		);
	};

	/**
	 * Renderiza un elemento cargando
	 */
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

	/**
	 * Renderiza un elemento item en pantalla
	 */
	renderItem(item) {
		const { navigate } = this.props.navigation;
		return (
			<TouchableWithoutFeedback
				onPress={() =>
					navigate("Detalle", {
						elemento: item,
						ip: ConfigModel.getIp(this.props.config),
					})
				}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View style={{ flexDirection: "row" }}>
						<FastImage
							style={{ width: 50, height: 50 }}
							source={{
								uri:
									ConfigModel.getIp(this.props.config) +
									JsonModel.getIcono(item),
								headers: { Authorization: "someAuthToken" },
								priority: FastImage.priority.high,
							}}
						/>
						<View style={{ marginLeft: 10 }}>
							<Text style={{ color: "white" }}>
								{JsonModel.getTitulo(item)}
							</Text>
							<Text style={{ color: "grey", fontSize: 10 }}>
								{JsonModel.getDireccion(item)}
							</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	/**
	 * Render del componente
	 */
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Icon
						name="search"
						color="grey"
						size={18}
						style={styles.searchIcon}
					/>
					<TextInput
						value={this.state.text}
						onChangeText={(text) => this.filter(text)}
						style={styles.input}
						placeholder="Buscar"
						placeholderTextColor="grey"
					/>
					{this.state.text ? (
						<TouchableWithoutFeedback
							onPress={() => this.deleteText()}
						>
							<Icon
								name="times-circle"
								color="grey"
								size={18}
								style={styles.closeIcon}
							/>
						</TouchableWithoutFeedback>
					) : null}

					{this.props.isFetchingConfig ? null : (
						<TouchableWithoutFeedback
							onPress={() =>
								navigate("Filtros", {
									setFilter: this.setFilter.bind(this),
									filtroActual: this.state.filtro,
									ArrayTag: ConfigModel.getListFilter(
										this.props.config
									),
								})
							}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text style={{ color: "white" }}>
									{" "}
									Filtrar{" "}
								</Text>
								<Icon
									name="chevron-down"
									color="white"
									size={15}
								/>
							</View>
						</TouchableWithoutFeedback>
					)}
				</View>
				{this.props.storageData.isFetching ? (
					this.renderLoad()
				) : (
					<ScrollView>
						<FlatList
							data={this.props.cerveceriadb.database}
							renderItem={({ item }) => this.renderItem(item)}
							keyExtractor={(item, index) => item.id}
							ItemSeparatorComponent={this.renderSeparator}
							initialNumToRender={15}
						/>
					</ScrollView>
				)}
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
		height: 40,
		backgroundColor: "#181818",
		borderBottomWidth: 1,
		borderColor: "#3a3a3a",
		flexDirection: "row",
		alignItems: "center",
		//
		position: "relative",
	},
	input: {
		width: width - width / 4,
		height: 35,
		backgroundColor: "#323232",
		marginHorizontal: 10,
		paddingLeft: 30,
		borderRadius: 3,
	},
	searchIcon: {
		position: "absolute",
		top: 7,
		left: 15,
		zIndex: 1,
		backgroundColor: "transparent",
	},
	closeIcon: {
		position: "absolute",
		top: 7,
		//right: 75,
		left: width - width / 4 - 10,
		backgroundColor: "transparent",
	},
});

const mapStateToProps = (state) => {
	return {
		storageData: state.storageData,
		cerveceriadb: state.cerveceriadb,
		config: state.config.data,
		isFetchingConfig: state.config.isFetching,
		filtrodb: state.filtrodb.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNewDB: (db) => {
			dispatch(loadDB(db));
		},
		resetDB: () => {
			dispatch(resetDB());
		},
		setFilterText: (text) => {
			dispatch(setFilterText(text));
		},
		setFilterType: (text) => {
			dispatch(setFilterType(text));
		},
		filterDB: (url) => {
			return dispatch(fetchData(url, "filtrodb"));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBeer);
