import {Card, Col, Row, Statistic, Typography} from "antd";
import accountStore from "../stores/AccountStore";
import placeRequestStore from "../stores/PlaceRequestStore";
import supportStore from "../stores/SupportStore";
import {ExclamationOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {useEffect} from "react";
const {Title} = Typography;

const HomePage = () => {
    useEffect(() => {
        accountStore.loadUsers();
        placeRequestStore.loadRequests();
        supportStore.loadSupportRequests();
    }, []);

    return (
        <>
            <Row>
                <Col span={6} offset={3}>
                    <Title>Главная</Title>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={3}>
                    <Card bordered>
                        <Statistic
                            title="Всего пользователей:"
                            value={accountStore.users.length}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={18} offset={3}>
                    <Card bordered>
                        <Statistic
                            title="Необработанных заявок по эко-местам:"
                            value={placeRequestStore.placeRequests.length}
                            prefix={<MailOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={18} offset={3}>
                    <Card bordered>
                        <Statistic
                            title="Необработанных запросов в тех. поддержку:"
                            value={supportStore.supportRequests.length}
                            prefix={<ExclamationOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default HomePage;
