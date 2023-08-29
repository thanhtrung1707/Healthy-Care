import React, { Fragment } from 'react'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import CardComponent from '../../componets/CardComponent/CardComponent'
import NavbarComponent from '../../componets/NavbarComponent/NavbarComponent'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../../componets/LoadingComponent/Loading'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [panigate,setPanigate] = useState({
      page:0,
      limit:10,
      total:1
    })
    const fetchProductType = async (type, page, limit) => {
      setLoading(true)
      const res = await ProductService.getProductType(type, page, limit)
      if(res?.status == 'OK'){
        setLoading(false)
        setProducts(res?.data)
        setPanigate({...panigate,total: res?.total})
      }else {
        setLoading(false)
      }
    }


    useEffect(() => {
      if(state) {
      fetchProductType(state,panigate.page,panigate.limit)
      }
    }, [state,panigate.page,panigate.limit])
    const onChange = (current, pageSize) => {
      setPanigate({...panigate,page: current - 1, limit: pageSize})
    }
  return (
    <Loading isLoading={loading}>
    <div style={{padding:'0 120px',background:'#efefef',width:'100%',height:'calc(100vh - 64px)'}}>
    <div style={{width:'1270px',margin:'0 auto',height:'100%'}}>
    <Row style={{flexWrap:'nowrap',paddingTop:'10px',height:'calc(100% - 20px)'}}>
        <WrapperNavbar span={4} style={{background:'#fff',marginRight:'10px',padding:'10px',borderRadius:'6px'}}>
        <NavbarComponent />
        </WrapperNavbar>
        <Col span={20} style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <WrapperProducts >
            {products?.filter((pro) => {
              if(searchDebounce === ''){
                return pro
              }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                return pro
              }
            })?.map((product) => {
              return (
                <CardComponent 
                    key={product._id} 
                    countInStock={product.countInStock} 
                    description={product.description} 
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                    />
              )
            })}
        </WrapperProducts>
        <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{textAlign:'center',marginTop:'10px'}} />
        </Col>
    </Row>   
    </div>
    </div>
    </Loading>
  )
}

export default TypeProductPage