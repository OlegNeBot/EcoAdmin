import {Col, Row, Typography} from "antd";

const {Title} = Typography;

const RequestsPage = () => {
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

export default RequestsPage;
