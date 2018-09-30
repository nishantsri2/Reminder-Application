/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    NetInfo,
    ToastAndroid
} from 'react-native';
import firebase from 'firebase'
import BaseToolbar from "./BaseToolbar";
import ItemTask from "./ItemTask";
import {Spinner} from 'native-base'

type Props = {};
export default class HomeScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            todoList: []
        }
    }

    componentDidMount() {
        this.getTodoList()
    }

    getTodoList = () => {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected){
                this.setState({isLoading: true});

                firebase.database().ref('Users/').on('value', (snapshot) => {
                    const taskList = [];
                    Object.entries(snapshot.val()).map(([key, value]) => {
                        value['id'] = key;
                        taskList.push(value);
                    });
                    this.setState({todoList: taskList, isLoading: false})
                });
            }else {
                ToastAndroid.showWithGravity('Please connect to internet', ToastAndroid.SHORT,ToastAndroid.BOTTOM)
            }
        });
    };
    renderSeparator = () => {
        return (
            <View style={styles.bottomDivider}/>
        );
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={styles.loaderContainer}>
                        <Spinner color="#262626"/>
                    </View> :
                    <View style={styles.container}>
                        <BaseToolbar
                            title={'Task List'}
                            isHomeScreen={true}
                            getTodoList={this.getTodoList}
                            navigate={navigate}
                            taskId={this.state.todoList.length + 1}
                        />
                        <FlatList
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={(item, index) => item.toString()}
                            data={this.state.todoList}
                            renderItem={({item}) => {
                                return <ItemTask row={item}
                                                 navigate={navigate}
                                                 getTodoList={this.getTodoList}/>
                            }}/>
                    </View>}
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },loaderContainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },bottomDivider: {
        marginStart: 16,
        width: '100%',
        height: 1,
        backgroundColor: '#e8e8e8',
    }
});
