import { Checkbox, Form, Radio } from "antd";
import React, {useState} from "react";
import ButtonComponent from "../../componets/ButtonComponent/ButtonComponent";
import ModalComponent from "../../componets/ModalComponent/ModalComponent";
import InputComponent from "../../componets/InputComponent/InputComponent";
import { Lable, WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRadio, WrapperRight, WrapperStyleHeader, WrapperTotal } from "./style";
import { WrapperInputNumber } from "../../componets/ProductDetailsComponent/style";
import { useDispatch, useSelector} from "react-redux";
import { increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from "../../untils";
import { useMemo } from "react";
import { useEffect } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import Loading from "../../componets/LoadingComponent/Loading";
import * as message from '../../componets/Message/Message'
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from "../../services/PaymentService"


const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('later_money')
    const navigate = useNavigate()
    const [sdkReady, setSdkReady ] = useState(false)
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name:'',
        phone:'',
        address: '',
        city: '',
    })
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    useEffect(() =>{
        form.setFieldsValue(stateUserDetails)
    },[form, stateUserDetails])

    useEffect(() => {
        if(isOpenModalUpdateInfo){
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            })
        }
    },[isOpenModalUpdateInfo])

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSlected?.reduce((total, cur) => {
          return total + ((cur.price * cur.amount))
        },0)
        return result
      },[order])

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSlected?.reduce((total, cur) =>{
            const totalDiscount = cur.discount ? cur.discount : 0
            return total + (priceMemo * (totalDiscount * cur.amount) / 100)
        },0)
        if(Number(result)){
            return result
        }
        return 0
    },[order])

    const diliveryPriceMemo = useMemo(() => {
       if(priceMemo > 200000){
        return 10000
       } else if(priceMemo === 0){
        return 0
       } else{
        return 20000
       }
    },[priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    },[priceMemo,priceDiscountMemo,diliveryPriceMemo])

    
    const handleAddOrder = () => {
        if(user?.access_token && order?.orderItemsSlected && user?.name
            && user?.address && user?.phone && user?.city && priceMemo && user?.id){
                mutationAddOrder.mutate(
                    {
                        token: user?.access_token, orderItems: order?.orderItemsSlected, 
                        fullName: user?.name,
                        address: user?.address, 
                        phone: user?.phone,
                        city: user?.city,
                        paymentMethod: payment,
                        shippingPrice: diliveryPriceMemo,
                        itemsPrice: priceMemo,
                        totalPrice: totalPriceMemo,
                        user: user?.id,
                        email: user?.email
                    }
                    )
            }
    }

    const mutationUpdate = useMutationHooks(
        (data) => {
         const {
            id,
            token, 
            ...rests } = data
         const res = UserService.updateUser(
            id,
           { ...rests },token,)
            return res
        },
      )

      const mutationAddOrder = useMutationHooks(
        (data) => {
         const {
            token, 
            ...rests } = data
         const res = OrderService.createOrder(
           { ...rests },token,)
            return res
        },
      )


    const {isLoading, data} = mutationUpdate
    const {data: dataAdd,isLoading:isLoadingAddOrder, isSuccess, isError} = mutationAddOrder

    useEffect(() => {
        if(isSuccess && dataAdd?.status === 'OK'){
            const arrayOrdered = []
             order?.orderItemsSlected?.forEach(element => {
                arrayOrdered.push(element.product)
             });
            dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
            message.success('Đặt hàng thành công')
            navigate('/orderSuccess', {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemsSlected,
                    totalPriceMemo: totalPriceMemo,
                }
            })
        }else if(isError){
            message.error()
        }
    },[isSuccess,isError])

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name:'',
            email:'',  
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }

    const onSuccessPaypal = (details, data) =>{
        mutationAddOrder.mutate(
            {
                token: user?.access_token, orderItems: order?.orderItemsSlected, 
                fullName: user?.name,
                address: user?.address, 
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                shippingPrice: diliveryPriceMemo,
                itemsPrice: priceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                isPaid: true,
                paidAt: details.update_time,
                email: user?.email
            }
            )
    }

    const handleUpdateInfoUser = () => {
        const  {name, address, city, phone} = stateUserDetails
        if(name && address && city && phone){
            mutationUpdate.mutate({id: user?.id, token: user?.access_token, ...stateUserDetails}, {
                onSuccess: () => {
                    dispatch(updateUser({name, address, city, phone}))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name] : e.target.value
        })
      }


      const handleDilivery = (e) => {
        setDelivery(e.target.value)
      }
    
      const handlePayment = (e) => {
        setPayment(e.target.value)
      }
    
    const addPaypalScript = async () => {
        const {data} = await PaymentService.getConfig()
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
       document.body.appendChild(script)
    }

    useEffect(() => {
        if(!window.paypal){
            addPaypalScript()
        }else {
            setSdkReady(true)
        }
    },[])

    return (
        <div style={{background:'#f5f5fa',width:'100%',height:'100vh'}}>
            <Loading isLoading={isLoadingAddOrder}>
            <div style={{height:'100%',width:'1270px',margin: '0 auto'}}>
                <h3 style={{padding: '0 10px'}}>payment</h3>
                <div style={{ display:'flex',justifyContent:'center'}}>
                    <WrapperLeft>
                    <WrapperInfo>
                <div>
                  <Lable>CSelect delivery method</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}> 
                    <Radio  value="fast"><span style={{color: '#ea8500', fontWeight: 'bold'}}>FAST</span> Economical delivery</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Select payment method</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}> 
                    <Radio value="later_money"> Pay cash upon receipt</Radio>
                    <Radio value="paypal"> Payment by paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{width:'100%'}}>
                        <WrapperInfo>
                            <div>
                                <span>Address: </span>
                                <span style={{fontWeight:'bold'}}>{`${user?.address} ${user?.city}`}</span>
                                <span onClick={handleChangeAddress} style={{color:'blue', cursor:'pointer'}}> EDIT</span>
                            </div>
                        </WrapperInfo>
                            <WrapperInfo>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>Provisional</span>
                                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceMemo)}</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>Discount</span>
                                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(priceDiscountMemo)}</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>Delivery charges</span>
                                <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(diliveryPriceMemo)}</span>
                            </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Total</span>
                                <span style={{display:'flex', flexDirection: 'column'}}>
                                <span style={{color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                                <span style={{color: '#000', fontSize: '11px'}}>(VAT included if any)</span>
                                </span>
                            </WrapperTotal>
                                </div>
                                {payment === 'paypal' && sdkReady ? (
                                <div style={{width:'320px'}}>
                                    <PayPalButton
                                        amount={Math.round(totalPriceMemo / 300)}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={onSuccessPaypal}
                                        onError={() => (
                                            alert('Error')
                                        )}
                                    />
                                </div>
                                ) : (
                                    <ButtonComponent
                                onClick ={() => handleAddOrder()}
                                size={40} 
                                styleButton={{
                                    backgroundColor:'rgb(255,57,69)',
                                    height:'48px',
                                    marginTop:'5px',
                                    width:'320px',
                                    border:'none',
                                    borderRadius:'4px'
                                }}
                                textbutton={'odẻ'}
                                styleTextButton={{ color:'#fff',fontSize:'15px',fontWeight:'700'}}
                                >
                                </ButtonComponent>
                                )}
                            
                    </WrapperRight>
                </div>
            </div>
            </Loading>
    <ModalComponent title="ìnformation in oder" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
            <Loading isLoading={isLoading}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600 }}
                // onFinish={onUpdateUser}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name"/>
                </Form.Item>

                <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
                >
                    <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone"/>
                </Form.Item>

                <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address"/>
                </Form.Item>

                <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please input your city!' }]}
                >
                    <InputComponent value={stateUserDetails.city} onChange={handleOnchangeDetails} name="city"/>
                </Form.Item>
            </Form>
            </Loading>
      </ModalComponent>
    </div>
    )
}
export default PaymentPage