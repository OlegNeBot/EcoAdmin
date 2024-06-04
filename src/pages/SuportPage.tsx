import {Col, Row, Typography} from "antd";
import {useEffect} from "react";
import supportStore from "../stores/SupportStore";
import {observer} from "mobx-react-lite";
const {Title} = Typography;

const SuportPage = () => {
    useEffect(() => {
        supportStore.loadSupportRequests();
    }, [supportStore.supportRequests]);

    return (
        <>
            <Row>
                <Col span={12} offset={3}>
                    <Title>Запросы о тех. поддержке</Title>
                </Col>
            </Row>
            <Row></Row>
        </>
    );
};

export default observer(SuportPage);
