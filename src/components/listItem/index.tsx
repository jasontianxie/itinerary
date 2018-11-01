import * as React from 'react';
import { List, Avatar, Icon} from 'antd';
import './index.scss';

const IconText = ({ type, text }:any) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

const hocListItem = (WrappedComponent:any) => {
    return class extends React.Component<any,any>{
        constructor(props:any){
            super(props);
        }
        render(){
            const {item} = this.props;
            return (<div styleName='listWrap'>
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
                <div styleName='listSecond'>this is a test</div>
            </div>)
        }
    }
}

export default hocListItem(List.Item);