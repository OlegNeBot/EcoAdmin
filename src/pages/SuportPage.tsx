import {Card, Col, List, Row, Space, Typography} from "antd";
import {useEffect} from "react";
import supportStore from "../stores/SupportStore";
import {observer} from "mobx-react-lite";
import {RightCircleOutlined} from "@ant-design/icons";
const {Title, Text} = Typography;

const SuportPage = () => {
    useEffect(() => {
        supportStore.loadSupportRequests();
    }, [supportStore.supportRequests]);

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
                                        extra={
                                            item.supportResponsible
                                                ? `В работе пользователем ${item.supportResponsible.account.name}`
                                                : "Не обработана"
                                        }
                                        actions={[
                                            <div
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                <Space>
                                                    <RightCircleOutlined />
                                                    <Text>{"Взять в работу"}</Text>
                                                </Space>
                                            </div>,
                                        ]}
                                    >
                                        <Space direction="vertical">
                                            <Text style={{textOverflow: "ellipsis"}}>{item.description}</Text>
                                            <Text type="secondary">{`От: ${item.account.name}, ${item.account.email}`}</Text>
                                        </Space>
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
