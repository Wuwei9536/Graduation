import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { List, Modal, Form, Input, message } from 'antd';
import { connect } from 'dva';


const FormItem = Form.Item;

@Form.create()
class SecurityView extends Component {
  constructor() {
    super()
    this.state = { visible: false }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    const { dispatch, form } = this.props;
    const password = form.getFieldValue('password');
    dispatch({
      type: 'individual/updateSystemUser',
      payload: {
        password,
      }
    })
    message.info('修改成功')
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  getData = () => [
    {
      title: formatMessage({ id: 'app.settings.security.password' }, {}),
      actions: [
        <a href="javascript:;" onClick={this.showModal}>
          <FormattedMessage id="app.settings.security.modify" defaultMessage="Modify" />
        </a>
      ],
    },
  ];


  renderModal() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {visible} =this.state;
    return (
      <Modal
        title="密码修改"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form layout="inline">
          <FormItem label="密码">
            {getFieldDecorator('password')(<Input placeholder="请输入" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderModal()}
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default connect()(SecurityView);
