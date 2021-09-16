import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window");

const Slider = (props) => (
	<View style={styles.container}>
		<FastImage
			style={{ flex: 1, width: width }}
			source={{
				uri: props.data,
				headers: { Authorization: "someAuthToken" },
				priority: FastImage.priority.normal,
			}}
			resizeMode={FastImage.resizeMode.stretch}
		/>
	</View>
);

export default class GaleriaImg extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Swiper autoplay={true} height={300}>
					{this.props.galeria.map((item, index) => (
						<Slider data={item} key={index} />
					))}
				</Swiper>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
});
