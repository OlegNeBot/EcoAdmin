import {Col, List, Row, Typography} from "antd";
import {useEffect} from "react";
import placeRequestStore from "../stores/PlaceRequestStore";
import {observer} from "mobx-react-lite";

const {Title} = Typography;

const RequestsPage = () => {
    useEffect(() => {
        placeRequestStore.loadRequests();
    }, [placeRequestStore.placeRequests]);

    return (
        <>
            <Row>
                <Col span={8} offset={3}>
                    <Title>Заявки по эко-местам</Title>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={3}>
                    <List
                        bordered
                        itemLayout="horizontal"
                        dataSource={placeRequestStore.placeRequests}
                        renderItem={(item) => {
                            return (
                                <List.Item
                                    actions={[
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log(item);
                                            }}
                                        >
                                            Взять в работу
                                        </a>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={`Заявка на ${
                                            item.account ? "становление эко-местом" : "добавление эко-места"
                                        } "${item.ecoPlace.name}"`}
                                        description={`${item.description}`}
                                    />
                                    <div>
                                        {item.placeResponsible
                                            ? `В работе пользователем ${item.placeResponsible.account.name}`
                                            : "Не обработана"}
                                    </div>
                                </List.Item>
                            );
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default observer(RequestsPage);
