/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import { Badge, Menu, Avatar } from 'antd';

import styles from './index.less';
import React from 'react';

const Header = ({ onTabClick, headerTabs, defaultActiveKey }) => {
  const [todoCount, setToDoCount] = useState(0);

  useEffect(() => {
    setToDoCount(1);
  }, []);

  console.log(styles, 'headerTabs----');

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img
            style={{ width: 50, height: 30, marginLeft: 20 }}
            src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            alt="logo"
          />
        </div>
        <Menu
          onClick={onTabClick}
          className={styles['top-nav']}
          defaultSelectedKeys={[defaultActiveKey]}
          mode="horizontal"
        >
          {headerTabs.map(item => {
            console.log(item, 'header-item');
            return <Menu.Item key={item.key}>{item.name}</Menu.Item>;
          })}
        </Menu>
        <div className={styles['right-part']}>
          <div
            onClick={() => {
              console.log('点击客服');
            }}
            className={styles.customer}
          >
            <span>联系客服</span>
          </div>
          <div onClick={() => {}} className={styles.upcoming}>
            <Badge dot={todoCount > 0}>
              <span>待办</span>
            </Badge>
          </div>
          <div className={styles.avatar}>
            <Avatar shape="square" icon={<img src="https://joeschmoe.io/api/v1/random" />} />
            <span className={styles.name}>张三</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
