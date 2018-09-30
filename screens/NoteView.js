import React, {Component} from 'react'
import {View, StyleSheet, Text} from "react-native";

type Props = {};
export default class NoteView extends Component<Props> {

    render() {
        return (
            <View style={styles.parent}>
                <Text>Comment</Text>
                <Text style={styles.textNote}>{this.props.comment}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parent:{
        backgroundColor: '#f5f6f5',
        padding:16,
        marginTop:16
    },
    textNote:{
        color: '#262626',
        fontSize: 16,
    }
});
