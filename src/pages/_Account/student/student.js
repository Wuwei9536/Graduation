import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import reqwest from 'reqwest';
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
  Upload
} from 'antd';
import styles from './student.less';
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
}, {
  title: '学院',
  dataIndex: 'academy',
  key: 'academy',
  align: 'center',
}, {
  title: '班级',
  dataIndex: 'class',
  key: 'class',
  align: 'center',
}, {
  title: '学号',
  dataIndex: 'number',
  key: 'number',
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
class Student extends React.Component {
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
    const stu_name = form.getFieldValue('name');
    const class_grade = form.getFieldValue('classGrade');
    dispatch({
      type: 'student/fetchStudentData',
      payload: {
        stu_name,
        class_grade
      }
    })
  }

  //上传excel
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file, index) => {
      formData.append(index, file); // index为key值
    });
    this.setState({
      uploading: true,
    });

    reqwest({
      url: '/api/uploadexcelstu',
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


  //修改
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

  //modal ok
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.updateStudentUser();
  }

  //modal取消
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      excelVisible: false
    });
  }

  //点击查询
  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const stu_name = form.getFieldValue('name');
    const class_grade = form.getFieldValue('classGrade');
    dispatch({
      type: 'student/fetchStudentData',
      payload: {
        stu_name,
        class_grade
      }
    })
  }

  //删除学生用户
  deleteSystemUser = (e, id) => {
    const { dispatch, form } = this.props;
    const stu_name = form.getFieldValue('name');
    const class_grade = form.getFieldValue('classGrade');
    dispatch({
      type: 'student/deleteStudentUser',
      payload: {
        id,
        stu_name,
        class_grade
      }
    })
  }

  //更新系统用户
  updateStudentUser = () => {
    const { modelId } = this.state;
    const { dispatch, form } = this.props;
    const stu_name = form.getFieldValue('modalName');
    const academy = form.getFieldValue('modalAcademy');
    const class_grade = form.getFieldValue('modalClassGrade');
    const stu_num = form.getFieldValue('modalStuNumber');
    const selectName = form.getFieldValue('name');
    const selectClassGrade = form.getFieldValue('classGrade');
    if (modelId) {
      dispatch({
        type: 'student/updateStudentUser',
        payload: {
          id: this.state.modelId,
          stu_name,
          academy,
          class_grade,
          stu_num,
          selectName,
          selectClassGrade
        }
      })
    } else {
      dispatch({
        type: 'student/createStudentUser',
        payload: {
          stu_name,
          academy,
          class_grade,
          stu_num,
          selectName,
          selectClassGrade
        }
      })
    }
  }

  //下载excel
  downloadExcelStu = (bool) => {
    window.open('/api/downloadexcelstu?needData=' + bool)
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
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={18}>
            <FormItem label="班级">
              {getFieldDecorator('classGrade')(
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
              新建学生
              </Button>
          </Col>
          <Col md={4} sm={12}>
            <Button icon="plus" type="primary" style={{ marginBottom: 36 }} onClick={() => this.showExcelModal()}>
              批量新建
              </Button>
          </Col>
          <Col md={4} sm={12}>
            <Button type="primary" style={{ marginBottom: 36 }} onClick={() => this.downloadExcelStu(true)}>
              导出
              </Button>
          </Col>
          <Col md={12} sm={36}>
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
        title="基本信息"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form layout="inline" style={{ display: 'flex' }}>
          <FormItem label="姓名">
            {getFieldDecorator('modalName')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="学院">
            {getFieldDecorator('modalAcademy')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="班级">
            {getFieldDecorator('modalClassGrade')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="学号">
            {getFieldDecorator('modalStuNumber')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  renderExcelModel() {
    const { uploading, fileList } = this.state;
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
        visible={this.state.excelVisible}
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
          <Button type="primary" style={{ marginTop: 20 }} onClick={() => this.downloadExcelStu(false)}>
            下载指定格式的excel表格
          </Button>
        </div>
      </Modal >
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

const mapStateToProps = ({ student }) => ({
  data: student.data,
});

export default connect(mapStateToProps)(Student);