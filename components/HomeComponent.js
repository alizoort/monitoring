import React, { Component } from 'react';
import {MyForm } from './Form';
import { Text, ScrollView, View ,Button} from 'react-native';
import { Card } from 'react-native-elements';
import { Elements } from '../shared/elements';
import { LEADERS } from '../shared/leaders';
function RenderItem(props) {
    
    const item = props.item;
    
    if (item != null) {
        return(
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={props.image}>
                <Text
                    style={{margin: 10,fontWeight:'bold'}}>
                    {item.description}</Text>
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

class Home extends Component {

constructor(props) {
    super(props);
    this.state = {
      dishes: Elements,
      leaders: LEADERS
    };
}

static navigationOptions = {
    title: 'Home',
};

render() {
    return(
        <ScrollView>
            <RenderItem item={this.state.dishes.filter((dish) => dish.id==0)[0]} image={require('./images/icon22.jpg')}/>
            <RenderItem item={this.state.dishes.filter((dish) =>dish.id==1 )[0]} image={require('./images/icon23.jpg')}/>
            <RenderItem item={this.state.dishes.filter((dish) => dish.id==2)[0]} image={require('./images/medica.jpg')}/>
        </ScrollView>
    );
}
}

export default Home;