import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
`
export const SideBar = styled.div`
  width: 200px;
  height: 100%;
  border-right: gray solid 0px;
  margin-top: 25px;
`
export const CalendarGrid = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;      
`

export const SlotDiv = styled.div`
  background-color: #d9d9d9;
  position: relative;
  width: 240px;
  height: 170px;
  border-style: solid;
  border-width: 2px;
  margin: 25px;
  border-radius: 5px;
`
export const AssistantDiv = styled.div`
  height: 70px;
  width: 140px;
  border: "none";
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 6px;
`