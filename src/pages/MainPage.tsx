import { useMemo, useState } from 'react';
import { Divider, Image, Layout, Menu, MenuProps, Typography } from 'antd';
import { ExclamationOutlined, HomeOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import logo from "../logo.png";
import AppRouter from '../routers/AppRouter';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const menuItems: MenuItem[] = useMemo(() => [
        {
            type: 'divider',
        },
        {
            key: 'main',
            label: 'Главная',
            icon: <HomeOutlined />
        }, 
        {
            type: 'divider',
        },
        {
            key: 'users',
            label: 'Пользователи',
            icon: <UserOutlined />
        }, 
        {
            type: 'divider',
        },
        {
            key: 'requests',
            label: 'Заявки',
            icon: <MailOutlined />
        }, 
        {
            type: 'divider',
        },
        {
            key: 'support',
            label: 'Тех. поддержка',
            icon: <ExclamationOutlined />
        }, 
        {
            type: 'divider',
        },
    ], []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                className='ant-layout-sider-light'
            >
                <Image 
                    src={logo}
                    style={{paddingTop: 10, paddingBottom: 3}}
                />
                {/* <Divider orientationMargin={0}/> */}
                {/* //TODO: Разобраться с дефолтным выбором item'а в меню. */}
                <Menu
                    mode='inline'
                    items={menuItems}
                    defaultSelectedKeys={["main"]}
                    onClick={({key}) => {
                        navigate(key);
                    }}
                />
            </Sider>
            <Layout>
                <Header
                    className='ant-layout-sider-light'
                >
                    
                </Header>
                <Content>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center'}}>
                    EcoAdmin Автор: Олег Голованов Все права защищены
                </Footer>
            </Layout>
        </Layout>
    );
}

export default MainPage;