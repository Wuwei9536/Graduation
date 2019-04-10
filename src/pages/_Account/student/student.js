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
import styles from './student.less';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;


const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  align: 'center',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '学院',
  dataIndex: 'cpu',
  key: 'cpu',
  align: 'center',
}, {
  title: '班级',
  dataIndex: 'storage',
  key: 'storage',
  align: 'center',
}, {
  title: '学号',
  dataIndex: 'disk',
  key: 'disk',
  align: 'center',
}, {
  title: '归属老师',
  dataIndex: 'software',
  key: 'software',
  align: 'center',
},  {
  title: '操作',
  key: 'action',
  align: 'center',
  render: (text, record) => (
    <span>
      <a href="javascript:;">删除</a>
      <Divider type="vertical" />
      <a href="javascript:;">修改</a>
    </span>
  ),
}]

@Form.create()
class Equipment extends React.Component {

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="学生姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="班级">
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
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button icon="plus" type="primary" style={{ marginLeft: 18 }} onClick={() => this.handleModalVisible(true)}>
               新建学生
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


  render() {
    const { data } = this.props;
    return (
      <Card bordered={false}>
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}

const mapStateToProps = ({ equipment }) => ({
  data: equipment.data,
  columns: equipment.columns
});

export default connect(mapStateToProps)(Equipment);