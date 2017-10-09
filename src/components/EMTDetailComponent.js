import React, {Component} from 'react';
import { View, Text, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Constants from '../Constants';
import BusListItem from './BusListItem';
import { refreshListView } from '../actions';

class EMTDetailComponent extends Component {

	componentWillMount() {
		this.initListView(this.props);
	}

	initListView(props){
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2, sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
		this.dataSource = ds.cloneWithRowsAndSections(this.mapArrives(props.arrives));
	}

	mapArrives(arrives) {
		var myMap = {};
		var myArrives = arrives;
		myArrives.forEach(function(item){
			var myLine = item.idLine[0];
			if (!myMap[myLine]){
				myMap[myLine] = [];
			}
			myMap[myLine].push(item);
		});

		return myMap;

	}

	componentWillReceiveProps(nextProps){
		this.initListView(nextProps);
	}

	renderRow(arrive){
		return  <BusListItem arrive={arrive} />;
	}

	renderSectionHeader(data, id){
		return (
			<View>
				<Text style={styles.sectionHeaderStyle}>
					Línea {id}
				</Text>
			</View>
			
		);
	}

	onRefresh() {
		this.props.refreshListView(this.props.busStopNumber)
	}

	render() {
		return (
			<ListView 
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
				renderSectionHeader={this.renderSectionHeader}
				refreshControl={
		          <RefreshControl
		            refreshing={this.props.refreshingList}
		            onRefresh={this.onRefresh.bind(this)}
		          />
		        }
			/>
		);
	}
};

const styles = {
	sectionHeaderStyle: {
		fontSize: 18,
		padding: 5,
		fontWeight: 'bold',
		backgroundColor: Constants.blueColor,
		color: 'white'
	}
};


const mapStateToProps = (state) => {
	const { arrives, refreshingList, busStopNumber } = state.bus;
	return { arrives, refreshingList, busStopNumber };
};

export default connect(mapStateToProps, { refreshListView })(EMTDetailComponent);