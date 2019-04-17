import React from 'react';
import { connect } from 'dva';
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
    Tag
} from 'antd';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from "bizcharts";
import { TimelineChart, WaterWave } from '@/components/Charts';
import style from './cpu.less';


const columns = [{
    title: '时间点',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    // render: text => <a href="javascript:;">{text}</a>,
}, {
    title: 'cpu使用率',
    dataIndex: 'cpu',
    key: 'cpu',
    align: 'center',
}, {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    render: (cell, row) => (
        <span>
            {(parseInt(row.cpu, 10) >= 80 || parseInt(row.storage, 10) >= 80 || parseInt(row.disk, 10) >= 80) ? <Tag color='red' key='1'>危险</Tag> : null}
            {((parseInt(row.cpu, 10) >= 60 && parseInt(row.cpu, 10) < 80) || (parseInt(row.cpu, 10) >= 60 && parseInt(row.cpu, 10) < 80) || (parseInt(row.cpu, 10) >= 60 && parseInt(row.cpu, 10) < 80)) ? <Tag color='orange'>警告</Tag> : null}
            {(parseInt(row.cpu, 10) < 60 && parseInt(row.storage, 10) < 60 && parseInt(row.disk, 10) < 60) ? <Tag color='blue'>正常</Tag> : null}
        </span>
    ),
}]

const menuData = [
    {name:'a'},
    {name:'b'}
]


const cols = {
    cpu: {
        min: 0
    },
    time: {
        type: 'time',
        mask: 'HH:mm:ss',
        tickCount: 6,
    }
};

class Cpu extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'cpu/fetchCpuData',
            payload: 1
        })
    }

    menu = (menuData) => {
        return (
            <Menu>
                {menuData.map((item,index) => <Menu.Item key={index}><Icon type="user" />{item.name}</Menu.Item>)}
            </Menu>
        )
    }

    render() {
        const { data } = this.props;
        return (
            <Card>
                <Dropdown overlay={this.menu(menuData)}>
                    <Button style={{ marginLeft: 8 }}>
                        a设备 <Icon type="down" />
                    </Button>
                </Dropdown>
                <div>
                    <Chart height={400} data={data} scale={cols} forceFit>
                        <Axis name="time" />
                        <Axis
                            name="cpu"
                            label={{
                                formatter: val => {
                                    return val * 10 + '%';
                                }
                            }}
                        />
                        <Tooltip
                            crosshairs={{
                                type: "line"
                            }}
                        />
                        <Geom type="area" position="time*cpu" />
                        <Geom type="line" position="time*cpu" size={2} />
                    </Chart>
                </div>
                <div className={style.tableWaterWave}>
                    <div style={{ textAlign: 'center' }}>
                        <WaterWave
                            height={261}
                            title="cpu容量剩余"
                            percent={34}
                            className={style.waterWave}
                        />
                    </div>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 6 }} className={style.table} />
                </div>
            </Card>
        )
    }


}

const mapStateToProps = ({ cpu }) => ({
    data: cpu.data
});

export default connect(mapStateToProps)(Cpu);