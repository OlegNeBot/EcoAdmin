import {Card, Col, List, Row, Space, Typography} from "antd";
import {useEffect} from "react";
import supportStore from "../stores/SupportStore";
import {observer} from "mobx-react-lite";
import {RightCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
const {Title, Text} = Typography;

const SuportPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        supportStore.loadSupportRequests();
    }, []);

    return (
        <>
            <Row>
                <Col span={12} offset={3}>
                    <Title>Заявки на тех. поддержку</Title>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={3}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        bordered
                        dataSource={supportStore.supportRequests}
                        renderItem={(item) => {
                            return (
                                <List.Item>
                                    <Card
                                        style={{marginTop: 16}}
                                        title={`Заявка ${item.id}`}
                                        actions={[
                                            <div
                                                onClick={(e) => {
                                                    e.preventDefault();

                                                    supportStore.setResponsible(item.id).then(() => {
                                                        navigate(`${item.id}`);
                                                    });
                                                }}
                                            >
                                                <Space>
                                                    <RightCircleOutlined />
                                                    <a>{"Взять в работу"}</a>
                                                </Space>
                                            </div>,
                                        ]}
                                    >
                                        <Space direction="vertical">
                                            <Text style={{textOverflow: "ellipsis"}}>{item.description}</Text>
                                            <Text type="secondary">{`От: ${item.account.name}, ${item.account.email}`}</Text>
                                        </Space>
                                        <Title level={5}>
                                            {item.supportResponsible
                                                ? `В работе пользователем ${item.supportResponsible.account.name}`
                                                : "Не обработана"}
                                        </Title>
                                    </Card>
                                </List.Item>
                            );
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default observer(SuportPage);
