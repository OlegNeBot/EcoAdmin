import {Col, Form, Input, InputNumber, Row, Table, Typography} from "antd";
import {useEffect, useMemo, useState} from "react";
import accountStore from "../stores/AccountStore";
import {observer} from "mobx-react-lite";
import {AccountModel} from "../models/AccountModel";

const {Title} = Typography;

const UsersPage = () => {
    useEffect(() => {
        accountStore.loadUsers();
    }, [accountStore.users]);

    const edit = (record: AccountModel) => {
        // TODO: Добавить переход на страницу с редактированием.
    };

    const columns = useMemo(
        () => [
            {
                title: "Имя",
                dataIndex: "name",
                key: "name",
                editable: true,
                render: (name: string) => {
                    return <b>{name}</b>;
                },
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                editable: true,
            },
            {
                title: "Кол-во баллов",
                dataIndex: "totalScore",
                key: "totalScore",
                editable: true,
            },
            {
                title: "Роль",
                dataIndex: "role",
                key: "role",
                editable: false,
                render: (role: {name: string}) => {
                    return role.name;
                },
            },
            {
                title: "Редактирование",
                dataIndex: "editing",
                render: (record: AccountModel) => {
                    return <Typography.Link onClick={() => edit(record)}>Редактировать</Typography.Link>;
                },
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
                    {/* //TODO: Добавить сортировку, фильтрацию и т.д. */}
                    <Table columns={columns} dataSource={accountStore.users} />
                </Col>
            </Row>
        </>
    );
};

export default observer(UsersPage);
