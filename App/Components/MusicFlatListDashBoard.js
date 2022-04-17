import React from 'react';
import { View, Text, Image , FlatList, TouchableOpacity} from 'react-native';
import PlayButton from '../../Assets/Icons/playButton.png'
import styles from '../../Assets/css/style';

export default function MusicFlatListDashBoard() {
    const Music = [
        {
            id: 0,
            uri: 'https://blog.directmusicservice.com/wp-content/uploads/2017/12/rockstar-kue.jpg',
            music: "When I am with you",
            singer: "Westlife - BackHome"
        },
        {
            id: 1,
            uri: 'https://www.nme.com/wp-content/uploads/2021/01/nickelback-2000x1270-1-1392x884.jpg',
            music: "Next To me",
            singer: "Westlife - BackHome"


        },
        {
            id: 2,
            uri: 'https://blog.directmusicservice.com/wp-content/uploads/2017/12/rockstar-kue.jpg',
            music: "Want To Be With You",
            singer: "Westlife - BackHome"
        },
        {
            id: 3,
            uri: 'https://www.nme.com/wp-content/uploads/2021/01/nickelback-2000x1270-1-1392x884.jpg',
            music: "Let Me Talk",
            singer: "Westlife - BackHome"

        },
        {
            id: 4,
            uri: 'https://blog.directmusicservice.com/wp-content/uploads/2017/12/rockstar-kue.jpg',
            music: "Little Angel",
            singer: "Westlife - BackHome"

        },
    ]



    const renderItem = ({ item }) => {
    
        return (
            <View style={{ paddingVertical: 10, backgroundColor: "transparent" }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' ,}}>
                        <Image source={{ uri: item.uri }} style={{ width: 40, height: 40, borderRadius: 99 }} />
                        <View  style={{marginLeft: 10,justifyContent: 'center'}}> 
                            <Text style={[styles.Text, {fontSize: 12}]}>{item.music}</Text>
                            <Text style={[styles.Text, {fontSize: 8}]}>{item.singer}</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Image source={PlayButton} style={styles.playBtn} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ marginTop: 10 , paddingHorizontal: 10}}>
            <FlatList
            
                data={Music}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
