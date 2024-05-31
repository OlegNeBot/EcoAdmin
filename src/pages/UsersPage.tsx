import {Col, Row, Table, Typography} from "antd";
import {useMemo} from "react";

const {Title} = Typography;

const UsersPage = () => {
    const columns = useMemo(
        () => [
            {
                title: "Имя",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Кол-во баллов",
                dataIndex: "totalScore",
                key: "totalScore",
            },
            {
                title: "Роль",
                dataIndex: "role.name",
                key: "role.name",
            },
        ],
        []
    );

    return (
        <>
            <Row>
                <Col span={6} offset={3}>
                    <Title>Пользователи</Title>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={{span: 18, offset: 3}}>
                    <Table columns={columns} />
                </Col>
            </Row>
        </>
    );
};

export default UsersPage;
