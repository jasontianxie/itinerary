import * as React from 'react';
import { List, Avatar, Icon} from 'antd';
import style from './index.scss';
import  './index.noneModules.css';
import BMap from 'BMap';

let a = style;

const IconText = ({ type, text }:any) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

const hocListItem = (WrappedComponent:any) => {
    return class extends React.Component<any,any>{//匿名类
        baiduMap:any = null;
        constructor(props:any){
            super(props);
            this.baiduMap = React.createRef();
        }
        componentDidMount(){
            let map = new BMap.Map(this.baiduMap.current);
            let point = new BMap.Point(116.404, 39.915);
            map.centerAndZoom(point, 15);
        }
        render(){
            const {item} = this.props;
            return (<div styleName='style.listWrap'>
                <WrappedComponent
                    key={item.title}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                >
                    <WrappedComponent.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </WrappedComponent>
                <div styleName='style.listSecond' ref={this.baiduMap}>this is baidu map container</div>
            </div>)
        }
    }
}

export default hocListItem(List.Item);