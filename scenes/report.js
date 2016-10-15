import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';


import Utils from '../utils'

import ActionButton from 'react-native-action-button';


const data  = [{
  problem: 'Broken Elevator',
  date: '10/14/16',
  color: 'yellow',
  completed: false
}, {
  problem: 'Out of Toilet Paper',
  date: '10/14/16',
  color: 'red',
  completed: false
}, {
  problem: 'Broken Printer',
  date: '10/13/16',
  color: 'yellow',
  completed: true
},{
  problem: 'Coffeee Spill',
  date: '10/13/16',
  color: 'yellow',
  completed: true
},{
  problem: 'Printer out of Paper',
  date: '10/13/16',
  color: 'green',
  completed: true
}]
export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      showCompleted: false,
      data: []
    }

    this.itemsRef = this.getRef('case');

    this._showOpen.bind(this);
    this._showClosed.bind(this);

    this.listenForItems.bind(this);
  }

  getRef() {
    return this.props.firebaseApp.database().ref();
  }
  _showOpen(){
    this.setState({showCompleted: false});
  }
  _showClosed() {
    this.setState({showCompleted: true});
  }

  listenForItems(itemsRef) {
    itemsRef.once('value', (snap) => {
      Object.keys(snap.val().case).map((key)=> {
        const problem = snap.val().case[key].problem;

        let color = 'red';

        if (problem.urgency === 'medium') {
          color = 'yellow'
        }
        else if( problem.urgency === 'low') {
          color = 'green'
        }
        const newData = {
            key,
            problem: problem.description,
            date: problem.date,
            color,
            completed: problem.completed
        }

        if (data.problem !== null) {
          this.setState({
            data: [...this.state.data, newData]
          })
        }

      })

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  // componentWillUpdate() {
  //   this.listenForItems(this.itemsRef);
  // }

  _newChat(key) {
    this.props.chat(key);
  }
  render() {
    const { searchValue, showCompleted } = this.state;

    return (
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={[styles.tab, showCompleted ? styles.closeTab: null]}>
            <TouchableOpacity onPress={this._showOpen.bind(this)}>
              <Text style={[styles.text, showCompleted ? null: styles.openText]}>Open Report</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tab, showCompleted ?  null : styles.closeTab]}>
            <TouchableOpacity onPress={this._showClosed.bind(this)}>
            <Text style={[styles.text, showCompleted ? styles.openText: null]}>Closed Report</Text>
            </TouchableOpacity>
          </View>
        </View>
          
        <View style={styles.search}>
          <TextInput style={styles.searchBox}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({searchValue: text})}
            placeholder={'Search...'}
          />
        </View>

        <View>

          {this.state.data.filter((row)=> {
            if (searchValue === '') {
              return true
            }
            else {
              return row.problem.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
            }
          }).map((row, index) => {
            if (showCompleted === row.completed ) {
              return (
                <TouchableOpacity key={index} onPress={this._newChat.bind(this, row.key)}>
                  <View style={styles.row} >
                    <View style={styles.checkContainer}>
                      {row.completed ? 
                        <Image source={require('../img/checked.png')}/> : 
                        <Image source={require('../img/unchecked.png')}/>}
                    </View>
                    <View style={styles.description}>
                      <Text style={styles.problem}>{row.problem}</Text>
                      <Text style={styles.date}>Submitted on {row.date}</Text>
                    </View>
                    <View style={styles.colorContainer}>

                        <View style={[styles.color, {backgroundColor: row.color}]}>
                          
                        </View>

                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        </View>
        <ActionButton
          buttonColor="rgb(30,89,174)"
          offsetY={10}
          onPress={() => this.props.newReport()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: Utils.REAL_HEIGHT
  },
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
    marginBottom: Utils.HEIGHT_UNIT * 0.5,
    borderRadius: Utils.HEIGHT_UNIT * 1.5,
    justifyContent: 'center',
    marginLeft: Utils.WIDTH_UNIT,
    marginRight: Utils.WIDTH_UNIT,
  },
  searchBox: {
    flex: 1,
    marginLeft: Utils.WIDTH_UNIT,
    marginRight: Utils.WIDTH_UNIT
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: Utils.COLORS.grey,
    borderWidth: 1
  },
  checkContainer: {
    flex: 1,
    alignItems: 'center'
  },
  description: {
    flex: 4
  },
  problem : {
    fontWeight: '900',
    color: '#000'
  },
  date: {
    fontStyle: 'italic',
    fontSize: 12
  },
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  color: {
    height: 15,
    width: 15,
    borderRadius: 15
  }
});
