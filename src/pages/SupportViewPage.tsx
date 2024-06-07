import {Row, Col, Typography, Button} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import supportStore from "../stores/SupportStore";

const SupportViewPage = () => {
    const {supportId} = useParams();
    const navigate = useNavigate();

    const support = supportStore.supportRequests.find((sup) => sup.id === supportId);

    return (
        <>
            <Row style={{marginTop: 30}}>
                <Col span={3} offset={3}>
                    <Button size="large" danger onClick={() => navigate(-1)}>
                        Назад
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={3}>
                    <Typography.Title>{`Заявка ${support?.id}`}</Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col span={18} offset={3}>
                    <Typography.Title level={4}>{`От пользователя: ${support?.account.name}`}</Typography.Title>
                    <Typography.Paragraph>{support?.description}</Typography.Paragraph>
                </Col>
            </Row>
            <Row>
                <Col span={6} offset={18}>
                    <Button
                        size="large"
                        type="primary"
                        onClick={() => {
                            supportStore.completeRequest(support!.id).then(() => {
                                navigate(-1);
                            });
                        }}
                    >
                        Проблема решена
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default SupportViewPage;
