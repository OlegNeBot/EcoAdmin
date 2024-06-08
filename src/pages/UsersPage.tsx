import {Col, Row, Table, Typography, TableColumnsType, Input, Space} from "antd";
import {useEffect, useMemo, useState} from "react";
import accountStore from "../stores/AccountStore";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

const {Title} = Typography;

const UsersPage = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [dataSource, setDataSource] = useState(accountStore.users);

    useEffect(() => {
        accountStore.loadUsers().then(() => {
            setDataSource(accountStore.users);
        });
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
            <Row style={{marginBottom: 16}}>
                <Col span={6} offset={3}>
                    <Input
                        placeholder="Поиск по имени"
                        value={searchValue}
                        size="large"
                        suffix={<SearchOutlined />}
                        onChange={(e) => {
                            const currValue = e.target.value;
                            setSearchValue(currValue);

                            const searchedData = accountStore.users.filter((record) =>
                                record.name.toLowerCase().includes(currValue)
                            );
                            setDataSource(searchedData);
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={{span: 18, offset: 3}}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                        showSorterTooltip={{target: "sorter-icon"}}
                    />
                </Col>
            </Row>
        </>
    );
};

export default observer(UsersPage);
