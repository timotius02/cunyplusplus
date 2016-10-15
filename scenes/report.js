import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import Utils from '../utils'

export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: 'Search...'
    }
  }
  render() {
    const { searchValue } = this.state;

    return (
      <View>
        <View style={styles.header}>
          <View style={styles.tab}>
            <Text style={[styles.text, styles.openText]}>Open Report</Text>
          </View>
          <View style={[styles.tab, styles.closeTab]}>
            <Text style={styles.text}>Closed Report</Text>
          </View>
        </View>
          
        <View style={styles.search}>
          <TextInput style={styles.searchBox}
            onChangeText={(text) => this.setState({searchValue: text})}
            value={searchValue}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    backgroundColor: '#fff',
    height: Utils.HEIGHT_UNIT,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#fff'
  },
  closeTab: {
    backgroundColor: Utils.COLORS.blue,
  },
  openText: {
    color: Utils.COLORS.blue
  },
  header: {
    height: Utils.HEIGHT_UNIT * 1.5,
    backgroundColor: Utils.COLORS.blue,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  search: {
    height: Utils.HEIGHT_UNIT * 1.3,
    backgroundColor: Utils.COLORS.lightGrey,
    borderColor: Utils.COLORS.grey,
    borderWidth: 2,
    marginTop: Utils.HEIGHT_UNIT * 0.5,
    borderRadius: Utils.HEIGHT_UNIT * 1.5,
    justifyContent: 'center',
    marginLeft: Utils.WIDTH_UNIT,
    marginRight: Utils.WIDTH_UNIT
  },
  searchBox: {
    flex: 1,
    marginLeft: Utils.WIDTH_UNIT,
    marginRight: Utils.WIDTH_UNIT
  }
});