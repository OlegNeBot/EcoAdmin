import {Col, Row, Typography} from "antd";
const {Title} = Typography;

const HomePage = () => {
    return (
        <>
            <Row>
                <Col span={6} offset={3}>
                    <Title>Главная</Title>
                </Col>
            </Row>
            <Row></Row>
        </>
    );
};

export default HomePage;
