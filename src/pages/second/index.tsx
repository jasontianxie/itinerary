import * as React from 'react';
import './index.scss';
import { List } from 'antd';
import AddNewRouteForm from '../../components/addNewRouteForm'

const data = [
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
];


class Second extends React.Component<any,any> {
    componentWillMount(){
      document.title = '新增游记'
    } 
    render() {
      return (
      <div className="wrap">
        <div styleName="detailRecord">this panel is for itinerary details</div>
          <div styleName="itinerary">
            <AddNewRouteForm/>
            <List
            dataSource={data}
            renderItem={(item:any) => (
            <List.Item>
              <div>出发地：{item.startSpot}</div>
              <div>目的地：{item.endSpot}</div>
              <div>出发时间：{item.startTime}</div>
              <div>到达时间：{item.endTime}</div>
              <div>耗时：{item.spentTime}</div>
              <div>等待时间：{item.waitTime}</div>
              <div>交通工具：{item.vehicle}</div>
              <div>费用：{item.cost}</div>
              <div>备注：{item.comments}</div>
            </List.Item>
          )}
          />
        </div>
      </div>
      )
    }
  }

  
  // export {Second};
  export default Second;