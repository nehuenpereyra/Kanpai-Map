import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import Orientation from "react-native-orientation";
import CustomHeaderStack from "../elements/customHeaderStack";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");
const WIDTH_IMAGE = width / 2 - 5;

var beers = [
	{
		nombre: "Rubia",
		url: "http://www.abc.es/Media/201108/22/cerveza--644x470.JPG",
		ing: "Ingredientes...",
	},
	{
		nombre: "Negra/Stout",
		url: "https://media-cdn.tripadvisor.com/media/photo-s/0c/c2/88/7b/la-cerveza-negra-caliente.jpg",
		ing: "Ingredientes...",
	},
	{
		nombre: "Amber Ale",
		url: "http://www.fynetimes.co.uk/acorn/wp-content/uploads/2011/12/Real-ale.jpg",
		ing: "Ingredientes...",
	},
	{
		nombre: "Abadía belgas",
		url: "https://media.conmuchagula.es/2010/08/affligem04.jpg",
		ing: "Ingredientes...",
	},
];

export default class Cervezas extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor() {
		super();
		this.state = {
			visibleModal: false,
			modelBeer: {
				nombre: "",
			},
		};
	}

	componentWillMount() {
		Orientation.lockToPortrait();
	}

	_showModal = () => this.setState({ visibleModal: true });

	_hideModal = () => this.setState({ visibleModal: false });

	setModalVisible(visible) {
		this.setState({
			visibleModal: visible,
		});
	}

	setBeer(item) {
		var beer = {
			nombre: item.nombre,
		};
		this.setState({
			modelBeer: beer,
			visibleModal: true,
		});
	}

	_renderModalContent = () => (
		<View style={styles.modalContent}>
			<Text>Cerveza {this.state.modelBeer.nombre}</Text>
			<Text>Locales que la poseen:</Text>
			<TouchableWithoutFeedback>
				<View
					style={{
						backgroundColor: "black",
						borderRadius: 4,
						padding: 5,
						marginTop: 10,
					}}
				>
					<Text style={{ color: "white" }}>Vip 1</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback>
				<View
					style={{
						backgroundColor: "black",
						borderRadius: 4,
						padding: 5,
						marginTop: 10,
					}}
				>
					<Text style={{ color: "white" }}>Vip 2</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback>
				<View
					style={{
						backgroundColor: "black",
						borderRadius: 4,
						padding: 5,
						marginTop: 10,
					}}
				>
					<Text style={{ color: "white" }}>Lista Locales</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);

	renderItem(item) {
		return (
			<TouchableWithoutFeedback onPress={() => this.setBeer(item)}>
				<View>
					<Image
						style={{
							width: WIDTH_IMAGE,
							height: WIDTH_IMAGE,
							borderRadius: 8,
						}}
						source={{ uri: item.url }}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<CustomHeaderStack
					titulo="Tipos de Cervezas"
					drawerNavigation={this.props.screenProps.drawerNavigation}
				/>

				<Modal
					isVisible={this.state.visibleModal}
					onBackdropPress={() => {
						this.setModalVisible(false);
					}}
					onBackButtonPress={() => {
						this.setModalVisible(false);
					}}
				>
					{this._renderModalContent()}
				</Modal>

				<FlatList
					style={{ flex: 1 }}
					numColumns={2}
					columnWrapperStyle={{ marginTop: 5, marginLeft: 5 }}
					renderItem={({ item }) => this.renderItem(item)}
					data={beers}
					keyExtractor={(item, index) => item.nombre}
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

	modalContent: {
		padding: 10,
		backgroundColor: "#FACC2E",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
});
