import React from 'react';
import { connect } from 'dva';
import {
    Card,
    Icon,
    Button,
    Dropdown,
    Menu,
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
import { WaterWave } from '@/components/Charts';
import style from './cpu.less';


const columns = [{
    title: '时间点',
    dataIndex: 'tableTime',
    key: 'tableTime',
    align: 'center',
}, {
    title: '使用率',
    dataIndex: 'cpuPercent',
    key: 'cpuPercent',
    align: 'center',
}, {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    render: (cell, row) => (
        <span>
            {parseInt(row.cpuPercent, 10) >= 80 ? <Tag color='red' key='1'>危险</Tag> : null}
            {((parseInt(row.cpuPercent, 10) >= 60 && parseInt(row.cpuPercent, 10) < 80)) ? <Tag color='orange'>警告</Tag> : null}
            {(parseInt(row.cpuPercent, 10) < 60) ? <Tag color='blue'>正常</Tag> : null}
        </span>
    ),
}]

const cols = {
    cpu: {
        min: 0
    },
    time: {
        type: 'time',
        mask: 'HH:mm:ss',
    }
};

class Cpu extends React.Component {
    constructor() {
        super()
        this.state = {
            waveTitle: ''
        }
    }

    // 初始化
    componentDidMount() {
        const { dispatch, location } = this.props;
        const { query, pathname } = location; // 路由参数 无参数时query={}
        this.judgeRoute(pathname);
        dispatch({
            type: 'cpu/fetchCpuData',
            payload: {
                id: query.id ? query.id : null,
                pathname
            }
        });
    }

    judgeRoute = (pathname) => {
        switch (pathname) {
            case '/dashboard/cpu':
                this.setState({
                    waveTitle: 'cpu剩余容量'
                })
                break;
            case '/dashboard/storage':
                this.setState({
                    waveTitle: '内存剩余容量'
                })
                break;
            case '/dashboard/disk':
                this.setState({
                    waveTitle: '磁盘剩余容量'
                })
                break;
            default:
                break;
        }
    }

    // 下拉列表
    menu = () => {
        const { equipmentData } = this.props;
        return (
            <Menu>
                {equipmentData.map((item, index) => <Menu.Item key={item.key} onClick={(e) => this.changeEquipment(e, item.key)}><Icon type="user" />{item.name}</Menu.Item>)}
            </Menu>
        )
    }

    // 点击下拉列表选择设备
    changeEquipment = (e, id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'cpu/fetchCpuData',
            payload: {
                id
            }
        });
    }

    render() {
        // data =>chart数据 percent=>水波纹比例  equipmentData=> 下拉列表数据  defaultEquipment=>默认显示设备
        const { data, percent, defaultEquipment } = this.props;
        const { waveTitle } = this.state;
        return (
            <Card>
                <Dropdown overlay={this.menu()}>
                    <Button style={{ marginLeft: 8 }}>
                        {defaultEquipment} <Icon type="down" />
                    </Button>
                </Dropdown>
                <div>
                    <Chart height={400} data={data} scale={cols} forceFit>
                        <Axis name="time" />
                        <Axis
                            name="cpu"
                            label={{
                                formatter: val => {
                                    return val * 100 + '%';
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
                            title={waveTitle}
                            percent={percent}
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
    data: cpu.data,
    percent: cpu.percent,
    equipmentData: cpu.equipment,
    defaultEquipment: cpu.defaultEquipment
});

export default connect(mapStateToProps)(Cpu);