import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, StatusBar, Platform, View, StyleSheet} from "react-native";
import {Button} from 'native-base'

type Props = {};
export default class BaseToolbar extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                {this.props.isBackEnabled ?
                    <TouchableOpacity
                    onPress={()=>{this.props.navigate.goBack()}}>
                        <Image
                            style={styles.backLogo}
                            source={require('../images/back_logo.png')}
                        />
                    </TouchableOpacity> : null
                }

                <Text style={styles.titleTextStyle}>{this.props.title}</Text>
                {this.props.isHomeScreen ?
                    <View style={styles.backLogoContainer}>
                        <Button block style={styles.orderButton}
                                onPress={() => {
                                    this.props.navigate('AddTaskScreen', {
                                        taskId: this.props.taskId,
                                        getTodoList: this.props.getTodoList
                                    })
                                }}>
                            <Text style={styles.buttonText}>Add Task</Text>
                        </Button>
                    </View> : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        backgroundColor: '#464646',
        flexDirection: 'row',
        elevation: 4,
        alignItems: 'center'
    }, backLogo: {
        width: 30,
        height: 26,
        marginStart: 10
    }, orderButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#0953cd',
        borderRadius: 2,
        width: 90,
        height: 35,
        marginEnd: 16
    }, buttonText: {
        color: 'white',
        fontSize: 14,
    }, backLogoContainer: {
        flex: 1
    }, titleTextStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 10
    }

});