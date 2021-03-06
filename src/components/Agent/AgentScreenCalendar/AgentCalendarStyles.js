import {StyleSheet, Dimensions} from 'react-native'
const {height , width} = Dimensions.get('window')

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImage:{
    height: width * 0.3,
    width : width
  },
  topTitleView:{
    flexDirection:'row',
    justifyContent:"space-between",
    marginTop:10,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'rgb(240,240,240)',
    alignItems:"center"
  },
  mainTitleText:{
    fontSize:16,fontWeight:'400',fontFamily:"helvetica",color:'gray'
  },
  profileView:{
    height:80,width:80,borderRadius:40,backgroundColor:'#fff',alignSelf:'center',borderWidth:1,marginTop:-40,borderColor : '#fff'
  },
  profileImage:{
    height:78,width:78,borderRadius:39
  },
  backButtonImage:{
    color:"#000",position:'absolute',top:20,left:20,zIndex:1,color : '#fff'
  },
  opinionsView:{
    flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5
  },
  opinionsText:{
    fontSize:16,marginLeft:10,color:'gray',fontFamily : 'helvetica'
  },
  bottomButton:{
    alignItems:'center',paddingVertical:10
  },
  textInputTitleText:{
    fontSize:18,fontWeight:'600',fontFamily:"helvetica",marginBottom:5
  },
  textInputCommentText:{
    fontSize:14,fontWeight:'400',fontFamily:"helvetica",marginBottom:5
  },
  textInputVieW:{
    flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:5,marginTop:10
  },
  // opinionsView:{
  //   flexDirection:'row',alignItems:'center',justifyContent:'center',marginVertical:5
  // },
  textInputStyle:{
    borderWidth:1,borderColor:'lightgray',borderRadius:5,height:40,paddingLeft:10
  },
  titleText:{
    fontSize:20,fontWeight:'900',fontFamily:"helvetica"
  },
  subText:{
    fontSize:14,fontFamily:"helvetica",color:'lightgray'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
