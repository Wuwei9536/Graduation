import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/Wuwei9536',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          <Icon type="copyright" /> 大数据管理平台
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
