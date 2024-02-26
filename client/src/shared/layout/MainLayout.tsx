import { Button, Layout, Space, theme } from 'antd'
import React from 'react'
import { SideNavigation } from '../navigation/SideNavigation'
import { Link, Outlet } from 'react-router-dom'
import { Header, Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

export const MainLayout = () => {
    
    const { token: { colorBgContainer },} = theme.useToken();
    
  return (
    <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
        </Header>
        <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
                <SideNavigation />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                    padding: 24,
                    margin: 0,
                    marginTop: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    </Layout>
  )
}
