import {Button, Col, Row, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import accountStore from "../stores/AccountStore";

const EditUserPage = () => {
    const {userId} = useParams();
    const navigate = useNavigate();

    const account = accountStore.users.find((acc) => acc.id === userId);

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
                    <Typography.Title>{`Пользователь ${account?.name}`}</Typography.Title>
                </Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </>
    );
};

export default EditUserPage;
