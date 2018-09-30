import {StackNavigator} from 'react-navigation'
import HomeScreen from "./screens/HomeScreen";
import AddTaskScreen from "./screens/AddTaskScreen";
import TaskDetailScreen from "./screens/TaskDetailScreen";

export const AppStack = StackNavigator({

    HomeScreen: {
        screen: HomeScreen,
    },AddTaskScreen: {
        screen: AddTaskScreen,
    },TaskDetailScreen: {
        screen: TaskDetailScreen,
    }
    }, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});