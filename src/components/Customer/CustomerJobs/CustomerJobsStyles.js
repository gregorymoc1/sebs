const React = require('react-native');
const {Dimensions, StyleSheet} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  header: {
    width: Dimensions.get('window').width,
    height: 80,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    borderColor: '#DDDCDC',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  add_job_button: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  header_title: {
    fontSize: 20,
    color: '#2478AE',
    fontWeight: '600'
  },
  main_content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between'
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
})