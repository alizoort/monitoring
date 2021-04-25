import React,{Component} from 'react';
import { View, FlatList,Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { LIST } from '../shared/list';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: LIST,
           
        };
     
    }
      

    static navigationOptions = {
        title: 'Menu'
    };
  
    render() {

     const { navigate } = this.props.navigation;
       

    const renderMenuItem = ({item, index}) => {

        return (
     
            
            <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            onPress={() => navigate('ListDetail', { listId: item.id })}
            leftAvatar={{ source: require('./images/realnew.jpg')}}
          />
            

          
         
          
        );
        
    };

    return (
    
       
        <View>
      
            <FlatList 
            data={this.state.list}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
                
              
     </View>
  
               
    );
}
}

export default Menu;