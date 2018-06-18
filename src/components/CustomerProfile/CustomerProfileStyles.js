const React = require('react-native');
const { Dimensions, StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  header: {
    width: Dimensions.get('window').width,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header_title: {
    fontSize: 20,
    color: '#2478AE',
    fontWeight: '600'
  },
  profile_picture_name_container: {
    width: Dimensions.get('window').width,
    height: 160,
    backgroundColor: '#FAFAFA',
    borderColor: '#DDDCDC',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  profile_name: {
    fontSize: 20,
    fontWeight: '600'
  },
  profile_image: {
    height: 100,
    resizeMode: 'contain'
  },




  section_servicios_container: {
    height: 270,
    padding: 10,
    alignItems: 'flex-start',
  },

  section_trabajos_container: {
    height: 200,
    padding: 10,
    alignItems: 'flex-start',
  },
  trabajos_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  trabajos_item :{
    width: Dimensions.get('window').width - 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: 'lightgray',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 5,
    margin: 10,
  },
  trabajos_avatars_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  trabajos_item_title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '900'
  },
  trabajos_item_date: {
    flex: 1,
    color: '#2478AE'
  },
  trabajos_avatar_image: {
    height: 30,
    resizeMode: 'contain'
  },
  trabajos_item_footer: {
    flex: 1
  },

  section_title:  {
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 20
  },
  servicios_container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  servicios_item :{
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    shadowColor: 'lightgray',
    borderRadius: 5,
    margin: 10,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  servicios_item_image: {
    width: Dimensions.get('window').width - 40,
    flex: 1,
    resizeMode: 'cover',
  },
  servicios_item_description: {
    margin: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 3,
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingHorizontal: 50,
    borderColor: '#DDDCDC'
  },
  footer_item: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  footer_item_text: {
    color: 'gray'
  },
});