import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
`
export const SideBar = styled.div`
  width: 200px;
  height: 100%;
  border-right: gray solid 0px;
`
export const CalendarGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;      
`

export const SlotDiv = styled.div`
  position: relative;
  width: 235px;
  height: 150px;
  border-style: solid;
  border-width: 2px;
  margin: 25px;
  border-radius: 5px;
`
export const AssistantDiv = styled.div`
  height: 50px;
  width: 110px;
  border-style: solid;
  border-width: 2px;
  margin-bottom: 10px;
`