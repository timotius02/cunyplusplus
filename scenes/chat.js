import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Utils from '../utils';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 'Peter L',
      title: '',
      // chat: [{
      //   userId: 0,
      //   text: 'hello its me'
      // }, {
      //   userId: 1,
      //   text: 'hello its you'
      // }, {
      //   userId: 1,
      //   text: 'no its me'
      // }, {
      //   userId: 0,
      //   text: 'lets ponder some exastential problems?'
      // }, {
      //   userId: 1,
      //   text: 'Nah'
      // }, {
      //   userId: 0,
      //   text: 'Alright then'
      // }] 
      chat: []
    }

    this.itemsRef = this.getRef('case');

    this._submit.bind(this);
  }
  getRef() {
    return this.props.firebaseApp.database().ref();
  }
  _submit(event) {
    this.refs["chat"].clear(0);

    this.setState({
      chat: [...this.state.chat, {userId: this.state.userId, text: event.nativeEvent.text}]
    })
    this.props.firebaseApp.database().ref('case/' + this.props.reportKey + '/messages').push({
      text: event.nativeEvent.text,
      name: this.state.userId
    });
  }
  listenForItems(itemsRef) {
    itemsRef.once('value', (snap) => {

      Object.values(snap.val().case[this.props.reportKey].messages).map((val) => {
        const stuff = {
          text: val.text, 
          userId: val.name
        }
        this.setState({
            chat: [...this.state.chat, stuff],
            title: snap.val().case[this.props.reportKey].problem.description
          })
      })
      // console.log(snap.val().case[this.props.key].problem)
      // Object.keys(snap.val().case).map((key)=> {
      //   const problem = snap.val().case[key].problem;

      //   let color = 'red';

      //   if (problem.urgency === 'medium') {
      //     color = 'yellow'
      //   }
      //   else if( problem.urgency === 'low') {
      //     color = 'green'
      //   }
      //   const newData = {
      //       key,
      //       problem: problem.description,
      //       date: problem.date,
      //       color,
      //       completed: problem.completed
      //   }

        // console.log(newData)
        // if (data.problem !== null) {
        //   this.setState({
        //     data: [...this.state.data, newData]
        //   })
        // }

      // })

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    const { userId, chat } = this.state;
    return (
      <View style={styles.body}>

        <View style={styles.header}>
          <Text style={styles.title}>{this.state.title}</Text>
          <TouchableOpacity style={styles.arrow} onPress={this.props.back}>
            <Image source={require('../img/arrow.png')}/>
          </TouchableOpacity>
        </View>
        
        <View style={styles.chatLog}>
          { chat.map((message, index) => {
            return (<View key={index }
                  style={[styles.message, userId === message.userId? styles.mine : null]}>
                  <Text style={userId === message.userId? styles.mineText : null}>{message.text}</Text>
            </View>)
          })}
        </View>

          <TextInput 
            ref="chat"
            style={styles.chatBox}
            onSubmitEditing={this._submit.bind(this)}
            underlineColorAndroid="transparent"
            placeholder={'Send a Message...'}
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
  header: {
    height: Utils.HEIGHT_UNIT * 1.5,
    backgroundColor: Utils.COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  arrow: {
    marginRight: Utils.WIDTH_UNIT
  },
  chatBox: {
    height: Utils.HEIGHT_UNIT * 1.5,
    paddingLeft: Utils.WIDTH_UNIT,
    borderColor: Utils.COLORS.grey,
    borderTopWidth: 1
  },
  chatLog: {
    flex: 1,

    justifyContent: 'flex-end',
  },
  message: {
    margin: Utils.HEIGHT_UNIT * 0.2,
    padding: Utils.HEIGHT_UNIT * 0.3,
    backgroundColor: Utils.COLORS.grey,
    alignSelf: 'flex-start',
    borderRadius: 10
  },
  mine: {
    backgroundColor: Utils.COLORS.blue,
    alignSelf: 'flex-end',
  },
  mineText: {
    color: '#fff'
  }
}); 