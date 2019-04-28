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
  Modal,
  message,
  Divider,
  Table,
  Tag,
  Upload
} from 'antd';
import reqwest from 'reqwest';
import styles from './system.less';

const FormItem = Form.Item;
const { Option } = Select;



const columns = (deleteSystemUser, showModal) => [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  render: text => <a href="">{text}</a>,
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
      <a href="" onClick={(e) => deleteSystemUser(e, record.key)}>删除</a>
      <Divider type="vertical" />
      <a href="" onClick={(e) => showModal(e, record.key)}>修改</a>
    </span>
  ),
}]

@Form.create()
class System extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false,
      modelId: null,
      excelVisible: false,
      fileList: [],
      uploading: false,
    }
  }


  componentDidMount() {
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('systemUserName');
    const groupname = form.getFieldValue('groupName');
    dispatch({
      type: 'system/fetchSystemData',
      payload: {
        name,
        groupname
      }
    })
  }

  // 上传excel
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData(); 
    fileList.forEach((file,index) => {
      formData.append(index, file); // index为key值
    });
    this.setState({
      uploading: true,
    });

    reqwest({
      url: '/api/uploadexcel',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  }

  
  // 修改
  showModal = (e, id) => {
    this.setState({
      visible: true,
      modelId: id
    });
  }

  // 点击批量新建
  showExcelModal = () => {
    this.setState({
      excelVisible: true,
    });
  }

  // modal ok
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.updateSystemUser();
  }

  // modal取消
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      excelVisible: false
    });
  }

  // 点击查询
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('systemUserName');
    const groupname = form.getFieldValue('groupName');
    dispatch({
      type: 'system/fetchSystemData',
      payload: {
        name,
        groupname
      }
    })
  }

  // 删除系统用户
  deleteSystemUser = (e, id) => {
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('systemUserName');
    const groupname = form.getFieldValue('groupName');
    dispatch({
      type: 'system/deleteSystemUser',
      payload: {
        id,
        name,
        groupname
      }
    })
  }

  // 更新系统用户
  updateSystemUser = () => {
    const { modelId } = this.state;
    const { dispatch, form } = this.props;
    const name = form.getFieldValue('name');
    const homedirectory = form.getFieldValue('homedirectory');
    const groupname = form.getFieldValue('groupname');
    const selectName = form.getFieldValue('systemUserName');
    const selectGroupName =  form.getFieldValue('groupName');
    if (modelId) {
      dispatch({
        type: 'system/updateSystemUser',
        payload: {
          id:modelId,
          name,
          homedirectory,
          groupname,
          selectName,
          selectGroupName
        }
      })
    } else {
      dispatch({
        type: 'system/createSystemUser',
        payload: {
          name,
          homedirectory,
          groupname,
          selectName,
          selectGroupName
        }
      })
    }
  }

  // 下载excel
  downloadExcel=(bool)=>{
    window.open('/api/downloadexcel?needData='+bool)
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={18}>
            <FormItem label="姓名">
              {getFieldDecorator('systemUserName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={18}>
            <FormItem label="用户组">
              {getFieldDecorator('groupName')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">正常</Option>
                  <Option value="1">警告</Option>
                  <Option value="2">危险</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={36}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={4} sm={12}>
            <Button icon="plus" type="primary" style={{ marginBottom: 36 }} onClick={(e) => this.showModal(e, null)}>
              新建管理员
            </Button>
          </Col>
          <Col md={4} sm={12}>
            <Button icon="plus" type="primary" style={{ marginBottom: 36 }} onClick={() => this.showExcelModal()}>
              批量新建
            </Button>
          </Col>
          <Col md={4} sm={12}>
            <Button type="primary" style={{ marginBottom: 36 }} onClick={() => this.downloadExcel(true)}>
              导出
            </Button>
          </Col>
          <Col md={12} sm={36} />
        </Row>
      </Form>
    );
  }

  renderModel() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {visible}=this.state;
    return (
      <Modal
        title="基本信息"
        visible={visible}
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

  renderExcelModel() {
    const { uploading, fileList,excelVisible } = this.state;
    const uploadProps = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    }
    return (
      <Modal
        title="批量新建"
        visible={excelVisible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ textAlign: 'center' }}>
          <div>
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> 选择指定格式的文件
              </Button>
            </Upload>
            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? 'Uploading' : '开始上传'}
            </Button>
          </div>
          <Button type="primary" style={{ marginTop: 20 }} onClick={() => this.downloadExcel(false)}>
            下载指定格式的excel表格
          </Button>
        </div>
      </Modal>
    )
  }

  render() {
    const { data } = this.props;
    return (
      <Card bordered={false}>
        {this.renderModel()}
        {this.renderExcelModel()}
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
});

export default connect(mapStateToProps)(System);