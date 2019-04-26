import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
    Steps,
    Radio,
    Table,
    Tag,
} from 'antd';
import styles from './software.less';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;


const columns = () => [{
    title: '软件名称',
    dataIndex: 'softName',
    key: 'softName',
    align: 'center',
}, {
    title: '软件日志名',
    dataIndex: 'logName',
    key: 'logName',
    align: 'center',
}, {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe',
    align: 'center',
}]

@Form.create()
class Software extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }


    componentDidMount() {
        const { dispatch, form,location } = this.props;
        const { query } = location;
        dispatch({
            type:'software/fetchSoftware',
            payload:query.id ? query : null,
        })
    }

    //下拉列表
    menu = () => {
        const {equipmentData} = this.props;
        return (
            <Menu>
                {equipmentData.map((item, index) => <Menu.Item key={item.key} onClick={(e)=>this.changeEquipment(e,item.key)}><Icon type="user" />{item.name}</Menu.Item>)}
            </Menu>
        )
    }

    changeEquipment=(e,id)=>{
        const { dispatch } = this.props;
        dispatch({
            type:'software/fetchSoftware',
            payload:{
                id
            }
        })
    }


    render() {
        const { data ,defaultEquipment} = this.props;
        return (
            <Card bordered={false}>
                <Dropdown overlay={this.menu()}>
                    <Button style={{ marginBottom: 28 }}>
                        {defaultEquipment} <Icon type="down" />
                    </Button>
                </Dropdown>
                <Table columns={columns()} dataSource={data} />
            </Card>
        );
    }
}

const mapStateToProps = ({ software }) => ({
    data: software.data,
    equipmentData: software.equipment,
    defaultEquipment:software.defaultEquipment
});

export default connect(mapStateToProps)(Software);