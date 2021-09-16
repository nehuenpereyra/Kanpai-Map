import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	Platform,
	TouchableHighlight,
	Share,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CustomHeaderStack extends Component {
	openShare() {
		Share.share(
			{
				title: "Comparte Kanpai Map",
				url: "",
				message:
					"Descubre las cervecerías cercas a tu zona con KanpaiMap https://play.google.com/store/apps/details?id=com.devflags.kanpaimap",
			},
			{
				//Android
				dialogTitle: "Comparte esta Cerveceria",
				// ios
				excludeActivityTypes: ["com.apple.UIKit.activity.PostToTitter"],
			}
		);
	}

	estadoConexion() {
		return (
			<View
				style={{
					height: 20,
					backgroundColor: "red",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text style={{ color: "black" }}>Sin conexión a internet</Text>
			</View>
		);
	}

	render() {
		console.log(this.props);
		const { navigate } = this.props.drawerNavigation;
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={() => navigate("DrawerOpen")}>
					<Icon name="bars" color="white" size={40} />
				</TouchableHighlight>
				<Text style={{ color: "white", fontSize: 20 }}>
					{this.props.titulo}
				</Text>
				<TouchableHighlight onPress={() => this.openShare()}>
					<Icon name="share-alt" color="white" size={40} />
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 50,
		marginTop: Platform.OS == "ios" ? 20 : 0,
		backgroundColor: "black",
		paddingHorizontal: 20,
	},
});
