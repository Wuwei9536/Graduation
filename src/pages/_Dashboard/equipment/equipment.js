import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Divider,
  Table,
  Tag,
  Modal
} from 'antd';
import styles from './equipment.less';

const FormItem = Form.Item;
const { Option } = Select;


const columns = (deleteEquipment, showModal, navigate) => [{
  title: '设备名称',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
}, {
  title: 'ip地址',
  dataIndex: 'ip',
  key: 'ip',
  align: 'center',
}, {
  title: '服务器类型',
  dataIndex: 'type',
  key: 'type',
  align: 'center',
}, {
  title: 'cpu型号',
  dataIndex: 'model',
  key: 'model',
  align: 'center',
}, {
  title: 'cpu使用率',
  dataIndex: 'cpu',
  key: 'cpu',
  align: 'center',
}, {
  title: 'cpu核数',
  dataIndex: 'number',
  key: 'number',
  align: 'center',
}, {
  title: '内存使用率',
  dataIndex: 'storage',
  key: 'storage',
  align: 'center',
}, {
  title: '磁盘使用率',
  dataIndex: 'disk',
  key: 'disk',
  align: 'center',
}, {
  title: '软件数量',
  dataIndex: 'software',
  key: 'software',
  align: 'center',
}, {
  title: '是否安装agent',
  dataIndex: 'agent',
  key: 'agent',
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
}, {
  title: '查看详情',
  key: 'detail',
  align: 'center',
  render: (cell, row) => (
    <span>
      <a href="javascript:;" onClick={()=>navigate('/dashboard/cpu', row.key)}>cpu</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={()=>navigate('/dashboard/storage', row.key)}>内存</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={()=>navigate('/dashboard/disk', row.key)}>磁盘</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={()=>navigate('/dashboard/software', row.key)}>软件</a>
    </span>
  ),
}, {
  title: '操作',
  key: 'action',
  align: 'center',
  render: (cell, record) => (
    <span>
      <a href="javascript:;" onClick={(e) => deleteEquipment(e, record.key)}>删除</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={(e) => showModal(e, record.key)}>修改</a>
    </span>
  ),
}]

@Form.create()
class Equipment extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      modelId: null,
    }
  }
  navigate = (path, id) => {
    router.push(`${path}?id=${id}`)
  }

  //修改
  showModal = (e, id) => {
    this.setState({
      visible: true,
      modelId: id
    });
  }


  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.updateEquipment()
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  //删除系统用户
  deleteEquipment = (e, id) => {
    const { dispatch, form } = this.props;
    const equip_name = form.getFieldValue('name');
    const status = form.getFieldValue('status');
    dispatch({
      type: 'equipment/deleteEquipment',
      payload: {
        id,
        equip_name,
        status
      }
    })
  }

  //更新系统用户
  updateEquipment = () => {
    const { modelId } = this.state;
    const { dispatch, form } = this.props;
    const values = form.getFieldsValue();
    if (modelId) {
      dispatch({
        type: 'equipment/updateEquipment',
        payload: {
          id: modelId,
          ...values
        }
      })
    } else {
      dispatch({
        type: 'equipment/createEquipment',
        payload: values
      })
    }
  }

  // 拉取数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'equipment/fetchEquipmentData'
    })
  }

  fetchEquipmentData = () => {
    const { dispatch, form } = this.props;
    const payload = form.getFieldsValue();
    dispatch({
      type: 'equipment/fetchEquipmentData',
      payload
    })
  }

  // 表格渲染
  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="设备名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">正常</Option>
                  <Option value="1">警告</Option>
                  <Option value="2">危险</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit" onClick={this.fetchEquipmentData}>
                查询
              </Button>
              <Button icon="plus" type="primary" style={{ marginLeft: 18 }} onClick={() => this.showModal(true)}>
                新建设备
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderModal() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Modal
        title="新建设备"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSearch} layout="inline">
          <div style={{ display: 'flex' }}>
            <FormItem label="服务器名称">
              {getFieldDecorator('equipmentName')(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="ip地址">
              {getFieldDecorator('ip')(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="服务器类型">
              {getFieldDecorator('nodeType')(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div style={{ display: 'flex' }}>
            <FormItem label="cpu型号">
              {getFieldDecorator('cpuType')(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="cpu核数">
              {getFieldDecorator('cpuNum')(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="磁盘容量">
              {getFieldDecorator('disk')(<Input placeholder="请输入" />)}
            </FormItem>
          </div>
          <div style={{ display: 'flex' }}>
            <FormItem label="内存">
              {getFieldDecorator('storage')(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="是否安装agent">
              {getFieldDecorator('agent')(
                <Select placeholder="请选择">
                  <Option value='1'>是</Option>
                  <Option value="0">否</Option>
                </Select>
              )}
            </FormItem>
          </div>
        </Form>
      </Modal>

    );
  }

  render() {
    const { data } = this.props;
    return (
      <Card bordered={false}>
        {this.renderModal()}
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
        </div>
        <Table columns={columns(this.deleteEquipment, this.showModal,this.navigate)} dataSource={data} />
      </Card>
    );
  }
}

const mapStateToProps = ({ equipment }) => ({
  data: equipment.data,
});

export default connect(mapStateToProps)(Equipment);