import {Col, Row, Typography} from "antd";
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
                <Col span={6} offset={3}>
                    <Title>Запросы</Title>
                </Col>
            </Row>
            <Row></Row>
        </>
    );
};

export default observer(RequestsPage);
