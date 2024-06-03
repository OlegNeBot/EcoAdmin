import {Col, Row, Table, Typography} from "antd";
import {useEffect, useMemo} from "react";
import accountStore from "../stores/AccountStore";
import {observer} from "mobx-react-lite";

const {Title} = Typography;

const UsersPage = () => {
    useEffect(() => {
        accountStore.loadUsers();
    }, [accountStore.users]);

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

    // TODO: Добавить парсинг данных в таблицу.

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

export default observer(UsersPage);
