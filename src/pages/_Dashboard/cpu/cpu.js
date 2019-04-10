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
import { TimelineChart, Pie, WaterWave } from '@/components/Charts';
import style from './cpu.less'

const chartData = [];
for (let i = 0; i < 20; i += 1) {
    chartData.push({
        x: (new Date().getTime()) + (1000 * 60 * 30 * i),
        y1: Math.floor(Math.random() * 100) + 1000,
        // y2: Math.floor(Math.random() * 100) + 10,
    });
}

const columns = [{
    title: '时间点',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: text => <a href="javascript:;">{text}</a>,
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

class Cpu extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <Card>
                <TimelineChart
                    height={200}
                    data={chartData}
                    titleMap={{ y1: 'cpu使用率' }}
                />
                <div className={style.tableWaterWave}>
                    <div style={{textAlign:'center'}}>
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