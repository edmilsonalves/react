import React, {Component} from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import commonStyles from '../commonStyles.js';
import DateTimePiker from '@react-native-community/datetimepicker';
import 'moment/locale/pt-br';
import moment from 'moment';

const initialState = {desc: '', date: new Date(), showDatePiker: false};

export default class AddTask extends Component {
  state = {
    ...initialState,
  };

  save = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    };

    this.props.onSave && this.props.onSave(newTask);
    this.setState({...initialState});
  };

  getDatePiker = () => {
    let dataPiker = (
      <DateTimePiker
        value={this.state.date}
        mode="date"
        onChange={(_, date) => this.setState({date, showDatePiker: false})}
      />
    );

    let dateString = moment(this.state.date).format(
      'dddd, D [de] MMMM [de] YYYY',
    );
    if (Platform.OS === 'android') {
      dataPiker = (
        <View style={styles.date}>
          <TouchableOpacity
            onPress={() => this.setState({showDatePiker: true})}>
            <Text>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePiker && dataPiker}
        </View>
      );
    }

    return dataPiker;
  };
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        animationType="slide"
        onRequestClose={this.props.onCancel}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.backgroung}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            placeholder="Informe a descrição..."
            onChangeText={desc => this.setState({desc})}
            value={this.state.desc}
            style={styles.input}
          />
          {this.getDatePiker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.backgroung}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backgroung: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 30,
  },
  button: {
    margin: 20,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
