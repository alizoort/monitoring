import React,{Component} from 'react';
import { Text, View , ScrollView, FlatList } from 'react-native';
import { COMMENTS } from '../shared/comments';
import { Card, Icon } from 'react-native-elements';
import { LIST } from '../shared/list'; 
function Renderlist(props) {
    
    const list = props.list;
    
        if (list != null) {
            return(
                <Card
                featuredTitle={list.name}
                image={props.image}>
                    <Text style={{margin: 10}}>
                        {list.description}
                    </Text>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class ListDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: LIST,
            favorites: []
        };
    
    }

    static navigationOptions = {
        title: 'ListDetail'
    }
    markFavorite(listId) {
        this.setState({favorites: this.state.favorites.concat(listId)});
    }
    render() {
        const listId = this.props.navigation.getParam('listId','');
        lis=this.state.lists[+listId];
        return(
            <ScrollView>
             <Renderlist list={this.state.lists[+listId]}
                    favorite={this.state.favorites.some(el => el === listId)}
                    onPress={() => this.markFavorite(listId)} 
                    image={require('./images/realnew.jpg')}/>
         
        </ScrollView>
        );
    }
}


export default ListDetail;