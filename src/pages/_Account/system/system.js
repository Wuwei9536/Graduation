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
  Tag
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './system.less';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;


const columns = (deleteSystemUser, showModal) => [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '主目录',
  dataIndex: 'catalogue',
  key: 'catalogue',
  align: 'center',
}, {
  title: '用户组',
  dataIndex: 'group',
  key: 'group',
  align: 'center',
}, {
  title: '状态',
  key: 'status',
  dataIndex: 'status',
  align: 'center',
  render: (cell) => (
    <span>
      {cell ? <Tag color='blue'>登陆中</Tag> : <Tag color='red' key='1'>离线</Tag>}
    </span>
  ),
}, {
  title: '操作',
  key: 'action',
  align: 'center',
  render: (text, record) => (
    <span>
      <a href="javascript:;" onClick={(e) => deleteSystemUser(e, record.key)}>删除</a>
      <Divider type="vertical" />
      <a href="javascript:;" onClick={(e) => showModal(e, record.key)}>修改</a>
    </span>
  ),
}]

@Form.create()
class System extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      modelId: null
    }
  }

  showModal = (e, id) => {
    this.setState({
      visible: true,
      modelId: id
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.updateSystemUser();
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('systemUserName');
    const homedirectory = form.getFieldValue('directory');
    dispatch({
      type: 'system/fetchSystemData',
      payload: {
        name,
        homedirectory
      }
    })
  }

  componentDidMount() {
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('systemUserName');
    const homedirectory = form.getFieldValue('directory');
    dispatch({
      type: 'system/fetchSystemData',
      payload: {
        name,
        homedirectory
      }
    })
  }

  deleteSystemUser = (e, id) => {
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('systemUserName');
    const homedirectory = form.getFieldValue('directory');
    dispatch({
      type: 'system/deleteSystemUser',
      payload: {
        id,
        name,
        homedirectory
      }
    })
  }

  updateSystemUser = () => {
    const { modelId } = this.state;
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('name');
    const homedirectory = form.getFieldValue('homedirectory');
    const groupname = form.getFieldValue('groupname');
    if (modelId) {
      dispatch({
        type: 'system/updateSystemUser',
        payload: {
          id: this.state.modelId,
          name,
          homedirectory,
          groupname
        }
      })
    } else {
      dispatch({
        type: 'system/createSystemUser',
        payload: {
          id: this.state.modelId,
          name,
          homedirectory,
          groupname
        }
      })
    }
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('systemUserName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户组">
              {getFieldDecorator('directory')(
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
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button icon="plus" type="primary" style={{ marginLeft: 18 }} onClick={(e) => this.showModal(e, null)}>
                新建管理员
              </Button>
              <Button icon="plus" type="primary" style={{ marginLeft: 18 }} onClick={() => this.handleModalVisible(true)}>
                批量新建
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderModel() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Modal
        title="信息修改"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form layout="inline" style={{ display: 'flex' }}>
          <FormItem label="姓名">
            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="主目录">
            {getFieldDecorator('homedirectory')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="用户组">
            {getFieldDecorator('groupname')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }


  render() {
    const { data } = this.props;
    return (
      <Card bordered={false}>
        <>
          {this.renderModel()}
        </>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
        </div>
        <Table columns={columns(this.deleteSystemUser, this.showModal)} dataSource={data} />
      </Card>
    );
  }
}

const mapStateToProps = ({ system }) => ({
  data: system.data,
  columns: system.columns
});

export default connect(mapStateToProps)(System);