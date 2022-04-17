import { StyleSheet } from "react-native";

const Button = {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    padding: 5,
    alignSelf: "stretch",
    margin: 8,
}


const styles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#000'
    },
    TopContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30

    },
    buttonRed: {
        backgroundColor: "#f00",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      buttonGreen: {
        backgroundColor: 'green',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
    
    searchBar: {
        flex: 1,
        height: 25,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center', paddingHorizontal: 20
    },
    weeklyContainer: {
        height: 40,
        borderColor: '#4F1769',
        backgroundColor: '#4F1769',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    InputContainer: {
        height: 40,
        backgroundColor: '#000',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginVertical: 4,
        elevation: 20,
        shadowColor:'#CB3BF7',
        borderColor:'#CB3BF7'

    },
    SearchContainer: {
        borderRadius: 10,
        backgroundColor: 'transparent',
        color: '#fff',
        borderColor: '#CB3BF7',
        borderWidth: 1,
        borderRadius: 50,
        height:35,
        width: 300

    },
    MessageContainer: {
        height: "50%",
        backgroundColor: '#000',
        borderWidth: 0.6,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        marginVertical: 4,
        paddingVertical: 5,
        elevation: 20,
        shadowColor:'#CB3BF7',
        borderColor:'#CB3BF7'

    },
    InputContainerDouble: {
        height: 40,
        backgroundColor: '#000',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 50,
        marginHorizontal: 10,
        marginVertical: 4,
        borderColor:'#CB3BF7'
    },
    Text: {
        color: '#fff'
    },
    underlineStyleBase: {
        width: 45,
        height: 45,
        borderRadius : 999,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#e3e3e3e3',
        elevation:3,
        color: '#000'
    
      },
      sliderContainer: {
        backgroundColor: 'floralwhite',
        borderRadius: 20,
        height: 500,
        width: '90%',
        marginLeft: 22,
        marginRight: 22,
        elevation: 20
      },
    
    
    playBtn: {
        height: 30,
        width: 30,
        borderRadius: 99,
        marginHorizontal: 5
    },
    flatListContainer: {
        height: 30,
        width: 70,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        paddingHorizontal: 5
    },
    sliderContainer: {
        backgroundColor: 'floralwhite',
        borderRadius: 20,
        height: 150,
        padding: 50,
        marginLeft: 25,
        marginRight: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageContainerSlider: {
        height: 150,
        width: 160,
        borderRadius: 20,
    },
    GospelPlatforms: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 10

    },
    VedioContainerSlider: {
        height: 100,
        width: 240,
        shadowColor: "#AD15FD",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    flatListVedios: {
        height: 100,
        width: 180,
        borderColor: '#000',
        borderWidth: 0.2,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        shadowColor: "#AD15FD",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    GospelPlatList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnRadius: {
        flex: 1,
        backgroundColor: "transparent",
        borderRadius: 5,
        paddingHorizontal: 10
    },
    downBar: {
        backgroundColor: '#fff',
        bottom: -45,
        shadowColor: "#AD15FD",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        height: 100,
    },
    column: {
        // marginTop:navHeight,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    buttonLogin: {
        backgroundColor: '#B98E00',
        borderRadius: 30,
        alignItems: "center",
        paddingHorizontal: 140,
        paddingVertical: 10,
        marginVertical: 20
    
      },

  loginContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: "center",
    justifyContent: "center"
  },

    
    textInput: {
        fontSize: 16,
        width: "100%",
        color: "#000",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "#EDEDED",
        borderColor: '#EDEDED',
        borderBottomWidth: 1,
    },
    btnContainer: {
        ...Button,
        backgroundColor: '#4F1769'
    },

    engineerContianer: {
        width: 180,
        height: 250,
        backgroundColor: "#fff",
        paddingHorizontal: 3,

    },
    floatingButton: {
        borderRadius: 5,
        bottom: 20,
        backgroundColor: "#9948a3",
        right: 20,
        padding: 20,
        borderRadius: 999,
        position: "absolute",
    
      },
    




});

export default styles;

