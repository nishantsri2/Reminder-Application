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
    Switch,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import firebase from 'firebase';
import PushNotification from "react-native-push-notification";

type Props = {};
export default class ItemTask extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            comment: '',
            title: '',
            isCompleted: false,
            taskId: 0,
            reminderTime: ''
        }
    }

    componentDidMount() {
        const id = this.props.row.id;
        const comment = this.props.row.comment;
        const title = this.props.row.title;
        const progress = this.props.row.isCompleted;
        const taskId = this.props.row.taskId;
        const reminderTime = this.props.row.reminderTime;
        this.setState({
            id: id,
            comment: comment,
            title: title,
            isCompleted: progress,
            taskId: taskId,
            reminderTime: reminderTime
        })
    }

    markCompleteTask = () => {
        const taskObject = {};
        taskObject[this.state.id] = {
            comment: this.state.comment,
            title: this.state.title,
            isCompleted: true,
            taskId: this.state.taskId,
            reminderTime: this.state.reminderTime
        };

        PushNotification.cancelLocalNotifications({id: this.state.taskId.toString()});
        ToastAndroid.showWithGravity('Notification Reminder will also be cancelled', ToastAndroid.SHORT,
            ToastAndroid.BOTTOM);
        firebase.database().ref('Users/').update(taskObject).then(() => {
            this.props.getTodoList()
        });

    };

    render() {
        const navigate = this.props.navigate;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTextStyle}
                          numberOfLines={1}>{this.state.title}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate('TaskDetailScreen', {
                                title: this.state.title,
                                comment: this.state.comment,
                                isCompleted: this.state.isCompleted
                            })
                        }}>
                        <Text style={styles.detailsTextStyle}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.timeTextStyle}>Reminder Time: {this.state.reminderTime}</Text>
                {this.state.isCompleted ? <Text>Task is Completed</Text> :
                    <View style={styles.switchContainer}>
                        <Text>Mark task as completed </Text>
                        <Switch
                            style={styles.switchStyle}
                            onValueChange={(value) => {
                                if (value) {
                                    this.markCompleteTask();
                                    this.setState({isCompleted: true})
                                }
                            }}
                            value={this.state.isCompleted}
                        />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    }, titleContainer: {
        flexDirection: 'row',
    }, titleTextStyle: {
        color: '#262626',
        fontSize: 16,
        width: '70%'
    }, detailsTextStyle: {
        color: '#0953cd',
        fontSize: 14,
        paddingStart: 10,
        fontWeight: 'bold'

    }, timeTextStyle: {
        marginTop: 12,
        color: '#0953cd',
        fontSize: 14,
        marginBottom: 12,
    }, switchStyle: {
        alignSelf: 'flex-start',
        marginStart:10
    }, switchContainer:{
        flexDirection:'row',
        alignItems:'center'
    }
});
