import {Button, Col, Form, FormProps, Input, InputNumber, Row, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import accountStore from "../stores/AccountStore";
import {useCallback, useState} from "react";
import {basePutRequest} from "../requests";

type FieldType = {
    name?: string;
    email?: string;
    totalScore?: number;
    role?: string;
};

type UserData = {
    id: string;
    name: string;
    email: string;
    totalScore: number;
};

const EditUserPage = () => {
    const {userId} = useParams();
    const navigate = useNavigate();

    const account = accountStore.users.find((acc) => acc.id === userId);

    const [name, setName] = useState(account!.name);
    const [email, setEmail] = useState(account!.email);
    const [totalScore, setTotalScore] = useState(account!.totalScore);

    const onFinish: FormProps<FieldType>["onFinish"] = useCallback(async (values: any) => {
        console.log("Success:", values);

        const userData: UserData = {
            id: account!.id,
            name: values.name,
            email: values.email,
            totalScore: values.totalScore,
        };

        await basePutRequest<UserData, null>("account", userData).then(() => {
            accountStore.loadUsers().then(() => {
                navigate(-1);
            });
        });
    }, []);

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log(errorInfo);
    };

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
                <Col span={12} offset={3}>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                            ["name"]: account!.name,
                            ["email"]: account!.email,
                            ["totalScore"]: account!.totalScore,
                            ["role"]: account!.role.name,
                        }}
                    >
                        <Form.Item<FieldType>
                            label="Имя"
                            name="name"
                            rules={[{required: true, message: "Имя введено неверно!"}]}
                        >
                            <Input
                                placeholder="Имя пользователя"
                                size="large"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                disabled={false}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{required: true, message: "Email введен неверно!"}]}
                        >
                            <Input
                                placeholder="Email пользователя"
                                size="large"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Количество баллов"
                            name="totalScore"
                            rules={[{required: true, message: "Кол-во баллов введено неверно!"}]}
                        >
                            <InputNumber
                                style={{width: "100%"}}
                                min={0}
                                max={10000}
                                placeholder="Кол-во баллов пользователя"
                                size="large"
                                value={totalScore}
                                onChange={(e) => {
                                    if (e) {
                                        setTotalScore(e);
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item<FieldType> label="Роль" name="role">
                            <Input size="large" value={account!.role.name} disabled={true} />
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" block>
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default EditUserPage;
