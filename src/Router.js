import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import EMTComponent from './components/EMTComponent';
import EMTDetailComponent from './components/EMTDetailComponent';
import Constants from './Constants';
import FavoriteButton from './components/FavoriteButton';
import { View, Button } from 'react-native';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="main">
				<Scene key="bus" component={EMTComponent} title="Autobuses EMT" initial navigationBarStyle={styles.navBarStyle} titleStyle={styles.navTitle}/>
				<Scene key="busTimes" component={EMTDetailComponent} title="Detalle" navigationBarStyle={styles.navBarStyle} titleStyle={styles.navTitle} navBarButtonColor="white" back={true} renderRightButton={()=>{return <FavoriteButton/>}}/>
			</Scene>
		</Router>
	);
};

const styles = {
	navBarStyle: {
		backgroundColor: Constants.blueColor,
		borderBottomWidth: 0
	},
	navTitle: {
		color: 'white'
	}
};

export default RouterComponent;