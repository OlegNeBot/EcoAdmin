import {Col, Row, Table, Typography, TableColumnsType} from "antd";
import {useEffect, useMemo} from "react";
import accountStore from "../stores/AccountStore";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

const UsersPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        accountStore.loadUsers();
    }, []);

    const columns: TableColumnsType = useMemo(
        () => [
            {
                title: "Имя",
                dataIndex: "name",
                key: "name",
                render: (name: string) => {
                    return <b>{name}</b>;
                },
                showSorterTooltip: {target: "sorter-icon"},
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
                showSorterTooltip: {target: "sorter-icon"},
                sorter: (a, b) => a.email.length - b.email.length,
            },
            {
                title: "Кол-во баллов",
                dataIndex: "totalScore",
                key: "totalScore",
                showSorterTooltip: {target: "sorter-icon"},
                sorter: (a, b) => a.totalScore - b.totalScore,
            },
            {
                title: "Роль",
                dataIndex: "role",
                key: "role",
                render: (role: {name: string}) => {
                    return role.name;
                },
                filters: [
                    {
                        text: "User",
                        value: "User",
                    },
                    {
                        text: "EcoPlace",
                        value: "EcoPlace",
                    },
                    {
                        text: "Admin",
                        value: "Admin",
                    },
                ],
                onFilter: (value, record) => record.role.name.indexOf(value as string) === 0,
            },
            {
                title: "Редактирование",
                dataIndex: "editing",
                render: (_, record) => {
                    return (
                        <Typography.Link
                            onClick={() => {
                                navigate(`${record.id}`);
                            }}
                        >
                            Редактировать
                        </Typography.Link>
                    );
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
                    {/* // TODO: Реализовать поиск по таблице через сортировку массива. */}
                    <Table
                        columns={columns}
                        dataSource={accountStore.users}
                        rowKey={(record) => record.id}
                        showSorterTooltip={{target: "sorter-icon"}}
                    />
                </Col>
            </Row>
        </>
    );
};

export default observer(UsersPage);
