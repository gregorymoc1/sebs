import React from 'react';
import {Text,View,Image,TouchableOpacity,FlatList,Dimensions,Alert,Linking,ScrollView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from './PaymentScreenStyle';
import { API } from '../../../util/api';
import Moment from 'moment';
import ActionSheet from 'react-native-actionsheet'
const { width } = Dimensions.get('window');
const IMAGES = {
  TOP_BACKGROUND: require("../../../../assets/img/topbg.png")
}
export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: this.props.navigation.state.params.data.serviceType,
      frequencyData: this.props.navigation.state.params.data.frequencyData,
      startedAt: this.props.navigation.state.params.data.selectedDate,
      endDate: this.props.navigation.state.params.data.end_date,
      additionalServiceData: [],
      total: this.props.navigation.state.params.data.total,
      invoicesData: this.props.navigation.state.params.data.invoicesData,
      cardData: this.props.navigation.state.params.data.cardData,
      checked: [],
      isHoliday: this.props.navigation.state.params.data.isHoliday,
      extraFee : this.props.navigation.state.params.data.serviceType.attributes.extra_service_fee_holiday.value,
      optionSelecct : "No deseo diferir mi pago",
      toDiffer : [
        {name : "No deseo diferir mi pago"},
        {name : "Diferir mi pago en 3 meses. Sin intereses"},
      ],
      selectTerms : false
    }
  }

  componentDidMount() {
    var additionalServiceData = []
    this.props.navigation.state.params.data.service_parameters.filter(service => service.count > 0)
                                                              .map(service => additionalServiceData.push(service))
    this.props.navigation.state.params.data.service_addons.filter(service => service.isSelect)
                                                          .map(service => additionalServiceData.push(service))
    this.setState({
      additionalServiceData: additionalServiceData
    })
  }

  updateSelect = (select) => {
    this.setState({ optionSelecct: select })
  }

  _calculateHours = () => {
    let total_work_hours = 0
    if(this.state.additionalServiceData){
      this.state.additionalServiceData.map((p)=>{
        if (p.quantity) {
          total_work_hours += p.count * p.time;
        } else {
          total_work_hours += p.time;
        }
      })
    }
    total_work_hours += this.state.serviceType.attributes.service_base[0].time
    return total_work_hours
  }
  _selectTerms = (e) => {
    this.setState({selectTerms: e})
  }
  onPressHandle = () =>{
    // console.log(this.state.startedAt, Moment.utc(new Date()).subtract(5, 'h'), (this.state.startedAt > Moment.utc(new Date()).subtract(5, 'h')));
    if(this.state.optionSelecct == ""){
      Alert.alert(
        'Alerta',
        'Seleccione opción, diferir tú pago',
        [
          { text: 'OK', onPress: () => console.log('Seleccione opción, diferir tú pago')}
        ],
        { cancelable: false }
      );
    } else if (this.state.selectTerms == false){
      Alert.alert(
        'Alerta',
        'Debe aceptar los terminos y condiciones',
        [
          { text: 'OK', onPress: () => console.log('Debe aceptar los terminos y condiciones')}
        ],
        { cancelable: false }
      );
    } else if (this.state.startedAt < Moment.utc(new Date()).subtract(5, 'h')){
      Alert.alert(
        'Alerta',
        'La fecha de inicio debe ser mayor a la fecha del trabajo',
        [
          { text: 'OK', onPress: () => this.props.navigation.goBack()}
        ],
        { cancelable: false }
    )} else {
      let frequencyDataCall = 0
      let optionSelecctInstallments = 0
      let additionalServiceData = []
      if(this.state.frequencyData[0].name == "Una vez"){
        frequencyDataCall = 0
      }else if(this.state.frequencyData[0].name == "Semanal"){
        frequencyDataCall = 1
      }else if(this.state.frequencyData[0].name == "Quincenal"){
        frequencyDataCall = 2
      }else if(this.state.frequencyData[0].name == "Mensual"){
        frequencyDataCall = 3
      }
      if(this.state.optionSelecct == "No deseo diferir mi pago"){
        optionSelecctInstallments = 1
      }
      if(this.state.optionSelecct == "Diferir mi pago en 3 meses. Sin intereses"){
        optionSelecctInstallments = "3"
      }
      let service_base = this.state.serviceType.attributes.service_base[0]
      additionalServiceData.push({"service_id": service_base.id, "value": 1})
      if(this.state.additionalServiceData){
        this.state.additionalServiceData.map((aS)=>{
          if (aS.id){
            additionalServiceData.push({"service_id": aS.id, "value": (aS.count != null ? aS.count : 1)})
          }
        })
      }
      
      let finished_recurrency_at = (this.state.endDate == null) ? '' : this.state.endDate
      let data = {
        "job": {
          "property_id": this.props.navigation.state.params.data.directionData.attributes.id,
          "started_at": this.state.startedAt, 
          "details": this.props.navigation.state.params.data.additionalData || "",
          "invoice_detail_id": this.state.invoicesData.id,
          "frequency": frequencyDataCall,
          "job_details_attributes": additionalServiceData,
          "credit_card_id": this.state.cardData.id,
          "installments": optionSelecctInstallments,
          "finished_recurrency_at": finished_recurrency_at,
          "source": 1
        }
      }
      API.createJob(this.createJobResponse,data,true);
    }  
  }
  createJobResponse = {
    success: (response) => {
      try {
        Alert.alert('Trabajo creado',response.message,[{text:'OK', onPress: () => this.props.navigation.navigate("CustomerDashboard")}],{cancelable:false});  
      } catch (error) {
        console.log('getJobResponseData catch error ' + JSON.stringify(error));
      }
    },
    error: (err) => {
      console.log('getJobResponseData error ' + JSON.stringify(err));
    }
  }
  _onOpenActionSheet = () => {
    this.ActionSheet.show();
  }
  actionSheetSelect(itemIndex){
    if (itemIndex != 2) {
      var select = this.state.toDiffer[itemIndex].name
      this.setState({optionSelecct: select})
    }
  }
  render() {
    let { data, checked } = this.state;
    let initial_price = this.state.serviceType.attributes.service_base[0].price
    let initial_time = this.state.serviceType.attributes.service_base[0].time
    let total = initial_price * initial_time;
    let vat = 0
    let additional_fee = 0
    if(this.state.additionalServiceData){
      this.state.additionalServiceData.map((item)=>{
        if (item.quantity){
          total += item.price * item.time * item.count
        } else {
          total += item.price * item.time
        }
      })
    }
    
    let additional_fee_percentage = this.state.serviceType.attributes.extra_service_fee_holiday.value / 100
    if (this.state.isHoliday){  
      additional_fee = total * additional_fee_percentage
      total = (total + additional_fee)
    } else {
      total = total;
    }
    vat = total * 0.12
    total += vat
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image source={IMAGES.TOP_BACKGROUND} style={styles.topImage} />
            <Ionicons name={"ios-arrow-back"} size={40} style={styles.backButtonImage} onPress={() => this.props.navigation.goBack()} />
            <View style={{ position: 'absolute', zIndex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15, width: width }}>
              <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>
                {this.state.serviceType.attributes.name}
              </Text>
              <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'helvetica' }}>
                {this.state.frequencyData[0].name}
              </Text>
            </View>
          </View>
          <Text style={{ margin: 5, fontSize: 18, fontFamily: "helvetica" }}>
            {Moment(this.state.startedAt).format('L, h:mm:ss a')}
          </Text>
          <View style={styles.deviderStyle} />
          <View>
            <View style={{ flex: 0.9 }}>
              <FlatList data={this.state.serviceType.attributes.service_base}
                extraData={this.state}
                renderItem={({ item, index }) =>
                  <View style={styles.childContainer}>
                    <View style={styles.itemView}>
                      <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                        {item.name}
                      </Text>
                      <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                        ${(item.price * item.time).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                }
                keyExtractor={(item, index) => index.toString()}
              />
              <FlatList data={this.state.additionalServiceData}
                extraData={this.state}
                renderItem={({ item, index }) =>
                  <View style={styles.childContainer}>
                    <View style={styles.itemView}>
                      <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                        {item.name}
                      </Text>
                      <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                        ${((item.price * item.time) * ((item.count != null) ? (item.count) : (1))).toFixed(2) }
                      </Text>
                    </View>
                  </View>
                }
                keyExtractor={(item, index) => index.toString()}
              />
              {(this.state.isHoliday == true) ? (
                <View style={styles.childContainer}>
                  <View style={styles.itemView}>
                    <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                      Recargo fin de semana o feriados
                    </Text>
                    <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                      ${additional_fee.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ):null}
              <View style={styles.childContainer}>
                <View style={styles.itemView}>
                  <Text style={{ flex: 0.8, fontSize: 16,fontFamily: "helvetica" }}>
                    I.V.A
                  </Text>
                  <Text style={{ flex: 0.2, fontSize: 16,fontFamily: "helvetica" }}>
                    ${vat.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <Text style={{ flex: 0.4,fontSize: 16, fontFamily: "helvetica" }}>
              Horas de limpieza
            </Text>
            <Text style={{ flex: 0.6, fontSize: 16,fontFamily: "helvetica", color: '#288fe2' }}>
              {this._calculateHours()} horas
            </Text>
          </View>
          <View style={styles.deviderStyle} />
            <View style={{ flexDirection: 'row', margin: 5 }}>
              <Text style={{ flex: 0.7, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                Total
              </Text>
              <Text style={{ flex: 0.3, color: '#288fe2', fontSize: 24, fontFamily: "helvetica" }}>
                ${total.toFixed(2)}
              </Text>
            </View>
          <View style={styles.deviderStyle} />
          <Text style={{ margin: 5 }}>
            ¿Quieres diferir tú pago?
          </Text>
          <View style={styles.textInputStyleContainer}>
            <TouchableOpacity onPress={this._onOpenActionSheet}>
              <Text style={{ height: 50, paddingHorizontal:10, paddingVertical:8 }} >{this.state.optionSelecct || "Seleccione opción"}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', margin: 5 }}>
            {(this.state.selectTerms == false) ? (
              <Ionicons name={"ios-square-outline"} size={30} style={styles.iconStyle} onPress={() => this._selectTerms(true)} />
            ) : (
              <Ionicons name={"ios-checkbox"} size={30} style={styles.iconStyle} onPress={() => this._selectTerms(false)} />
            )}
            <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.nocnoc.com.ec/politicas#policies')}}>
              <View>
                <Text style={{ textAlign: 'center', margin: 5, color:'blue'}}>
                  Acepto términos y condiciones
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.onPressHandle()}>
            <View style={styles.buttonViewStyle}>
              <Text style={styles.buttonTextStyle}>Solicitar servicio</Text>
            </View>
          </TouchableOpacity>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Seleccione opción'}
            options={['No deseo diferir mi pago','Diferir mi pago en 3 meses. Sin intereses','Cancelar']}
            cancelButtonIndex={2}
            onPress={(index) => { this.actionSheetSelect(index) }}
          />
        </ScrollView>
      </View>
    )
  }
}