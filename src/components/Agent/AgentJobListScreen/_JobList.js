import React, {Component} from 'react';
import {Text, TouchableOpacity, View, FlatList, Image, Dimensions,SafeAreaView, ActivityIndicator} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons'
const {height , width} = Dimensions.get('window')
import { API } from '../../../util/api';
import Moment from 'moment';
import AgentTrabajosDashboard from "../AgentTrabajosDashboard/AgentTrabajosDashboard";
const styles = require('./AgentJobListScreenStyles');

var _this = null;
export default class _JobList extends Component {

    //======================================================================
    // constructor
    //======================================================================

    constructor(props){
        super(props)
        _this = this
        this.state = {
            jobList : props.jobList,
            isOnRefresh : false,
            isLoading : props.isLoading || false
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({jobList : newProps.jobList,isOnRefresh:newProps.isOnRefresh,isLoading:newProps.isLoading || false},this.forceUpdate())
        console.log("isLoading",newProps.isLoading)
    }

    //======================================================================
    // setRow
    //======================================================================

    setRow = (index) =>{
        var tempArray = this.state.jobList
        tempArray.splice(index,1);
        this.setState({jobList : tempArray})
    }

    //======================================================================
    // renderItem
    //======================================================================

    renderItem = (item) =>{
        data = item.item.attributes
        var description = ""
        var subDescription = ""
        
        data.job_details.map((val,index)=>{
            if(val.service.type_service == "base"){
                description += val.service.name
            }else{
                subDescription += val.service.name + " X " + val.service.time
                subDescription += (data.job_details.length - 1 == index) ? "" : ", " 
            }
        })
        var date = Moment(data.started_at).format('MMM DD - hh:mm a')
        var location = data.property.data.attributes.p_street + ", " + data.property.data.attributes.s_street +", "+data.property.data.attributes.city
        return(
            <TouchableOpacity onPress={()=> (this.props.type != null) ? AgentTrabajosDashboard.navigateToDetail(item,this.setRow,this.props.type) : this.props.navigateToDetail(item,this.setRow)}>
                <View style={styles.renderRowView}>
                    <View style={styles.listTitleView}>
                        <Text style={styles.titleText}>{(data.customer && data.customer.first_name) || "" + " "+ (data.customer && data.customer.last_name) || ""}</Text>
                        <Text style={[styles.textFont,{color:'rgb(0,121,189)'}]}>{date}</Text>
                    </View>
                    <Text style={[styles.textFont]}>{description}</Text>
                    <Text style={[styles.textFont]}>{description}</Text>
                    <View style={styles.subtextViewStyle}>
                        <View style={{flex:1}}>
                            <Text style={[styles.textFont,{fontSize:12}]}>{subDescription}</Text>
                        </View>
                        <View style={{flex:0.2}}>
                            <Text style={[styles.textFont,{color:'rgb(0,121,189)',fontSize:20}]}>{"$"+data.total.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <EvilIcons name={"location"} size={16} />
                        <Text style={[styles.textFont,{marginLeft:5,fontSize:12}]}>{location}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    //======================================================================
    // ItemSeparatorComponent
    //======================================================================

    ItemSeparatorComponent = () =>{
        return(
            <View style={{height:1,width:width,backgroundColor:'gray'}} />
        )
    }

    //======================================================================
    // ListEmptyComponent
    //======================================================================

    ListEmptyComponent = () =>{
        if(this.props.jobList.length == 0){
            return(
                <View style={{flex:1,width:width,alignItems:'center',justifyContent:'center',paddingVertical:20}} >
                    <Text style={styles.emptyText}>{"No hay trabajos, regrese más tarde"}</Text>
                </View>
            )
        }else{
            return null
        }
    }

    //======================================================================
    // FooterComponent
    //======================================================================

    ListFooterComponent = () =>{
        return this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" animating={this.state.isLoading} /> : null
    }

    //======================================================================
    // ListEmptyComponent
    //======================================================================

    onRefresh = () =>{

    }

    render(){
        return(
            <View>
                <FlatList 
                    data = {this.props.jobList}
                    renderItem = {this.renderItem}
                    refreshing={this.state.isOnRefresh}
                    onRefresh={this.props.onRefresh}
                    ItemSeparatorComponent={this.ItemSeparatorComponent}
                    keyExtractor={(item,index)=>index.toString()}
                    ListEmptyComponent={this.ListEmptyComponent}
                    ListFooterComponent={this.ListFooterComponent}
                    extraData={this.state}
                    onEndReached={this.props.onEndReached}
                    onEndReachedThreshold={0.5}
                />
            </View>
        )
    }
}