import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width:200px;
    & img{
        height:200px;
        width:200px;
    }
    position:relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'noy-allowed' : 'pointer'}
`
export const WrapperImageStyle = styled.img`
    top:-1px;
    left:-1px;
    border-top-left-radius:3px;
    position:absolute;
    height:15px !important;
    width:70px !important;
`
export const StyleNameProduct = styled.div`
    font-weight:400;
    font-size:12px;
    line-height:16px;
    color:rgb(56,56,61);
    font-weight:400;
`
export const WrapperReportText = styled.div`
    font-size:11px;
    color:rgb(128,128,132);
    display:flex;
    algin-items:center;
`
export const WrapperPriceText = styled.div`
    color:rgb(255,66,78);
    font-size:16px;
    font-weight:500;
    margin:7px 0 0px;
`
export const WrapperDiscountText = styled.span`
    color:rgb(255,66,78);
    font-size:12px;
    font-weight:500;
`
