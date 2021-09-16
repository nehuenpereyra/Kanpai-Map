import React, { Component } from "react";
import { View } from "react-native";

import { connect } from "react-redux";
import { setUnlocked, setLockedClosed } from "../../actions/drawerModeAction";

class StopDrawer extends Component {
	componentDidMount() {
		this.props.notOpen();
	}
	componentWillUnmount() {
		this.props.open();
	}

	render() {
		return <View style={{ width: 1, height: 1 }}></View>;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		notOpen: () => {
			dispatch(setLockedClosed());
		},
		open: () => {
			dispatch(setUnlocked());
		},
	};
};

export default connect(undefined, mapDispatchToProps)(StopDrawer);
