import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';


 class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    };

     render() {

        const renderLeaders = ({item, index}) => {
            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        titleStyle = {{color: 'black'}}
                        subtitle={item.designation}
                        hideChevron={true}
                        leftAvatar={{ source: require('./images/realnew.jpg')}}
                    />
            );
        };

        return(
            <ScrollView>
                <Card title='Our History'>
                    <Text style={{margin: 10}}>Real-time health-monitoring system design is a challenging task to implement .Many people suffering 
                    from ailments may not receive treatment in proper time due to unavailability of local health-care facility as moving to further distances 
                    causes time and money which may not be affordable always.Smart monitoring allows the acquisition and the analysis of patient vitals remotely 
                    to provide primary care to any abnormality identified .</Text>
                    <Text style={{margin: 10}}>Patient vitals sensed through sensors are analysed at local server to find the health condition . Smart monitoring has various 
                    features to help you manage your health . As the app allows all the subscribers to retrieve the data of a specific person .</Text>     
                </Card>
                <Card title='Corporate Leadership'>
                    <FlatList 
                        data={this.state.leaders}
                        renderItem={renderLeaders}
                        keyExtractor={item => item.id.toString()}
                        />
                </Card>
            </ScrollView>
        );
    }
}

 export default About;