import {useEffect, useMemo, useState} from "react";
import {Col, Divider, Dropdown, Image, Layout, Menu, MenuProps, Row, Space, Typography} from "antd";
import {DownOutlined, ExclamationOutlined, HomeOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import logo from "../logo.png";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import accountStore from "../stores/AccountStore";
import {observer} from "mobx-react-lite";
import authStore from "../stores/AuthStore";

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    // Используется для показа соответствующего элемента меню.
    var location = useLocation();
    const [selected, setSelected] = useState(location.pathname.split("/")[1]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            authStore.removeAuth();
            navigate("/login");
        } else {
            authStore.setAuth();

            accountStore.loadAccount();
        }
    }, [authStore.isAuth]);

    const menuItems: MenuItem[] = useMemo(
        () => [
            {
                type: "divider",
            },
            {
                key: "main",
                label: "Главная",
                icon: <HomeOutlined />,
            },
            {
                type: "divider",
            },
            {
                key: "users",
                label: "Пользователи",
                icon: <UserOutlined />,
            },
            {
                type: "divider",
            },
            {
                key: "requests",
                label: "Заявки",
                icon: <MailOutlined />,
            },
            {
                type: "divider",
            },
            {
                key: "support",
                label: "Тех. поддержка",
                icon: <ExclamationOutlined />,
            },
            {
                type: "divider",
            },
        ],
        []
    );

    const items: MenuProps["items"] = useMemo(
        () => [
            {
                key: "exit",
                danger: true,
                label: (
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Exit works!");
                        }}
                    >
                        Выход
                    </a>
                ),
            },
        ],
        []
    );

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                className="ant-layout-sider-light"
            >
                <Image src={logo} style={{paddingTop: 10, paddingBottom: 3}} preview={false} />
                <Menu
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[selected]}
                    onClick={({key}) => {
                        setSelected(key);
                        navigate(key);
                    }}
                />
            </Sider>
            <Layout>
                <Header className="ant-layout-sider-light">
                    <Row>
                        <Col span={8} offset={20}>
                            <Dropdown menu={{items}}>
                                {/* //TODO: Исправить на инлайн-вывод + кнопку с выходом (мб иконка). */}
                                <a
                                    onClick={(e) => {
                                        e.preventDefault();

                                        localStorage.removeItem("accessToken");
                                        localStorage.removeItem("refreshToken");

                                        sessionStorage.removeItem("accessToken");
                                        sessionStorage.removeItem("refreshToken");

                                        navigate("/login");
                                    }}
                                >
                                    <Space>
                                        {accountStore.account.name}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {/* // TODO: Исправить наличие скроллбаров. */}
                    <Outlet />
                </Content>
                <Footer style={{textAlign: "center"}}>EcoAdmin Автор: Олег Голованов Все права защищены</Footer>
            </Layout>
        </Layout>
    );
};

export default observer(MainPage);
