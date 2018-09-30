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
    Switch
} from 'react-native';
import BaseToolbar from "./BaseToolbar";
import NoteView from "./NoteView";

type Props = {};
export default class TaskDetailScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            title: '',
            isCompleted: false
        }
    }

    componentDidMount() {
        const comment = this.props.navigation.state.params.comment;
        const title = this.props.navigation.state.params.title;
        const progress = this.props.navigation.state.params.isCompleted;
        this.setState({comment: comment, title: title, isCompleted: progress})
    }

    render() {
        return (
            <View style={styles.parent}>
                <BaseToolbar
                    navigate={this.props.navigation}
                    title={'Task Details'}
                    isBackEnabled={true}/>
                <View style={styles.container}>
                    <Text
                        numberOfLines={2}
                        style={styles.titleTextStyle}
                    >{this.state.title}</Text>
                    <Text>Task status: {this.state.isCompleted ? 'Completed' : 'Pending'}</Text>
                    <NoteView
                        comment={this.state.comment}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: 'white'
    }, container: {
        margin: 16
    }, titleTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#262626'
    }
});
