import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    TimePickerAndroid,
    DatePickerAndroid,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import firebase from 'firebase'
import BaseToolbar from "./BaseToolbar";
import PushNotification from "react-native-push-notification";
import moment from 'moment';
import {Button,Spinner} from 'native-base'

type Props = {};
export default class AddTaskScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            taskTitle: '',
            taskComment: '',
            isCompleted: false,
            date: new Date(),
            timeText: 'Select time',
            dateText: 'Select date',
            taskId: 0
        }
    }

    componentDidMount() {
        PushNotification.configure({
            largeIcon: "ic_launcher",
            smallIcon: "ic_launcher",
            onNotification: function (notification) {
                console.log('NOTIFICATION: ', notification);
            },
            popInitialNotification: true,
        });
        this.setState({taskId: this.props.navigation.state.params.taskId})

    }

    showTimePicker = async () => {
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
                hour: this.state.date.getHours(),
                minute: this.state.date.getMinutes(),
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                const date = this.state.date;
                date.setHours(hour, minute, 0);
                const timeText = moment(date).format('h:mm a');
                this.setState({date: date, timeText: timeText});
                this.setState({date: date})
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    };
    showDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = this.state.date;
                date.setFullYear(year, month, day);
                const dateText = moment(date).format('MMM, Do YYYY');
                this.setState({date: date, dateText: dateText});

            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    addTask = () => {
        this.setState({isLoading: true});
        const ref = firebase.database().ref('Users/');
        const newMessageRef = ref.push();
        newMessageRef.set({
            title: this.state.taskTitle,
            comment: this.state.taskComment,
            isCompleted: false,
            taskId: this.state.taskId,
            reminderTime: moment(this.state.date).format('MMM Do YYYY, h:mm:ss a')

        });

        PushNotification.localNotificationSchedule({
            message: this.state.taskTitle,
            date: this.state.date,
            id: this.state.taskId.toString()
        });
        this.setState({isLoading: false}, () => {
            this.props.navigation.goBack();
            this.props.navigation.state.params.getTodoList()

        });

    };

    render() {
        const title = this.state.taskTitle;
        const comment = this.state.taskComment;
        const timeText = this.state.timeText;
        const selectedDate = this.state.date;
        const currentDate = new Date();
        return (

            <View style={styles.container}>
                {this.state.isLoading ?
                    <View style={styles.loaderContainer}>
                        <Spinner color="#262626"/>
                    </View> :
                    <View style={styles.container}>
                        <BaseToolbar
                            navigate={this.props.navigation}
                            title={'Add Task'}
                            isBackEnabled={true}/>
                        <TextInput
                            style={styles.titleTextInput}
                            onChangeText={(text) => this.setState({taskTitle: text})}
                            placeholder={'Enter title for the task'}
                            value={this.state.taskTitle}/>
                        <TextInput
                            numberOfLines={2}
                            multiline={true}
                            style={styles.taskTextInput}
                            onChangeText={(text) => this.setState({taskComment: text})}
                            placeholder={'Enter comment for the task'}
                            value={this.state.taskComment}/>

                        <TouchableOpacity
                            onPress={() => {
                                this.showDatePicker()
                            }}>
                            <Text style={styles.dateTextStyle}>{this.state.dateText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.showTimePicker()
                        }}>
                            <Text style={styles.dateTextStyle}>{this.state.timeText}</Text>
                        </TouchableOpacity>
                        <Button block style={styles.orderButton}
                                onPress={() => {
                                    if (title === '' || comment === '' || timeText === 'Select time') {
                                        ToastAndroid.showWithGravity('Complete all fields', ToastAndroid.SHORT,
                                            ToastAndroid.BOTTOM)
                                    } else if (selectedDate.getTime() <= currentDate.getTime()) {
                                        ToastAndroid.showWithGravity('Date can be greater than current date', ToastAndroid.SHORT,
                                            ToastAndroid.BOTTOM)
                                    } else {
                                        this.addTask()
                                    }
                                }}>
                            <Text style={styles.buttonText}>Add Task</Text>
                        </Button>
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }, titleTextInput: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 16,
        borderRadius: 2,
        paddingStart: 10
    }, taskTextInput: {
        borderColor: 'black',
        borderWidth: 1,
        margin: 16,
        borderRadius: 2,
        height: 80,
        paddingStart: 10
    }, addButton: {
        margin: 16,
        height: 48

    }, orderButton: {
        backgroundColor: '#0953cd',
        borderRadius: 2,
        height: 50,
        margin: 16
    }, buttonText: {
        color: 'white',
        fontSize: 16,
    }, dateTextStyle: {
        marginStart: 16,
        marginTop: 10,
        fontSize: 16,
        borderRadius: 6,
        borderColor: '#262626',
        borderWidth: 1,
        width: '30%',
        paddingStart: 6,
        paddingEnd: 6,
        textAlign: 'center',
        color: '#262626'
    },loaderContainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    }
});
